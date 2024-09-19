package com.winepredictive.winepredictive.service;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.winepredictive.winepredictive.dto.UserDto;
import com.winepredictive.winepredictive.dto.WineDto;
import com.winepredictive.winepredictive.entity.Users;
import com.winepredictive.winepredictive.entity.Wine;
import com.winepredictive.winepredictive.repository.UserRepository;
import com.winepredictive.winepredictive.repository.WineRepository;




@Service
public class UserServiceImpl implements UserService{

	 private final UserRepository usersRepository;
	    private final WineRepository wineRepository;
	    private final WineServiceImpl wineServiceImpl;

	    public UserServiceImpl(final UserRepository usersRepository,
	            final WineRepository wineRepository,
	            WineServiceImpl wineServiceImpl) {
	        this.usersRepository = usersRepository;
	        this.wineRepository = wineRepository;
	        this.wineServiceImpl = wineServiceImpl;
	    }
	
   @Override
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {    	
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                return usersRepository.findFirstByEmail(username)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            }
        };
    }
 

	@Override
	public String getEmailByUserId(Long id) {
		Users user=usersRepository.findById(id).get();
		return user.getEmail();
	}
	
	
	 // Wines by userId
	public Set<WineDto> findAllWinesByUserId(final Long idUser) {
	    return usersRepository.findById(idUser)
	            .orElseThrow(() -> new RuntimeException("User not found")) // Maneja el caso en que el usuario no se encuentre
	            .getWines()
	            .stream()
	            .map(wine -> wineServiceImpl.mapToDTO(wine, new WineDto())) // Usa una lambda en lugar de una referencia de método
	            .collect(Collectors.toSet());
	}
	
	
	
	 public List<UserDto> findAll() {
	        final List<Users> userses = usersRepository.findAll(Sort.by("id"));
	        return userses.stream()
	                .map(users -> mapToDTO(users, new UserDto()))
	                .toList();
	    }
	
	 public UserDto get(final Long id) throws NotFoundException {
	        return usersRepository.findById(id)
	                .map(users -> mapToDTO(users, new UserDto()))
	                .orElseThrow(NotFoundException::new);
	    }
	
	  public Long create(final UserDto usersDTO) {
	        final Users users = new Users();
	        mapToEntity(usersDTO, users);
	        return usersRepository.save(users).getId();
	    }
	 
	 
	  public void update(final Long id, final UserDto usersDTO) throws NotFoundException {
	        final Users users = usersRepository.findById(id)
	                .orElseThrow(NotFoundException::new);
	        mapToEntity(usersDTO, users);
	        usersRepository.save(users);
	    }

	    public void delete(final Long id) {
	        usersRepository.deleteById(id);
	    }
	 
	 
	    private UserDto mapToDTO(final Users users, final UserDto usersDTO) {
	        usersDTO.setId(users.getId());
	        usersDTO.setName(users.getName());
	        usersDTO.setEmail(users.getEmail());
	        usersDTO.setPassword(users.getPassword());
	        usersDTO.setUserRole(users.getUserRole());
	        return usersDTO;
	    }

	    private Users mapToEntity(final UserDto usersDTO, final Users users) {
	        users.setName(usersDTO.getName());
	        users.setEmail(usersDTO.getEmail());
	        users.setPassword(usersDTO.getPassword());
	        users.setUserRole(usersDTO.getUserRole());
	        return users;
	    }
	 
	 
}
