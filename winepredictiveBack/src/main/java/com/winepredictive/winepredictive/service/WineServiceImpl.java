package com.winepredictive.winepredictive.service;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.winepredictive.winepredictive.dto.WineDto;
import com.winepredictive.winepredictive.dto.WinePredictionDto;
import com.winepredictive.winepredictive.entity.Users;
import com.winepredictive.winepredictive.entity.Wine;
import com.winepredictive.winepredictive.entity.WinePrediction;
import com.winepredictive.winepredictive.repository.UserRepository;
import com.winepredictive.winepredictive.repository.WinePredictionRepository;
import com.winepredictive.winepredictive.repository.WineRepository;


@Service
public class WineServiceImpl implements WineService {

	
	private final WineRepository wineRepository;
	private final UserRepository usersRepository;
	private final WinePredictionRepository winePredictionRepository;

	//Constructor
	 public WineServiceImpl(final WineRepository wineRepository, final UserRepository usersRepository,
			 final WinePredictionRepository winePredictionRepository
	            ) {
	        this.wineRepository = wineRepository;
	        this.usersRepository = usersRepository;
	        this.winePredictionRepository = winePredictionRepository;
	    }

	@Override
	public Wine getWineById(Long id) {
		
		return this.wineRepository.findById(id).get();
	}

	 //  WinePredictions by idWine
    public List<WinePredictionDto> getWinePredictionsByWineId(final Long idWine) throws NotFoundException {
        // Utilizamos el repositorio para encontrar todas las WinePredictions asociadas con un idWine
        List<WinePrediction> predictions = winePredictionRepository.findByIdWine_Id(idWine);
        if (predictions.isEmpty()) {
            throw new NotFoundException();
        }
        return predictions.stream()
                .map(this::mapToWinePredictionDto)
                .collect(Collectors.toList());
    }
	  
    
    
	    public List<WinePredictionDto> getWinePredictionsByidWine(final Long idWine) throws NotFoundException {
	        // Buscamos el vino por su ID y manejamos el caso en que no exista
	        Wine wine = wineRepository.findById(idWine)
	                .orElseThrow(() -> new NotFoundException());
	        // Mapeamos las predicciones de WinePrediction a WinePredictionDto
	        return wine.getWinePredictions().stream()
	                .map(this::mapToWinePredictionDto)
	                .collect(Collectors.toList());
	    }

	   
	    //Get wines by idUser
	    // Método para encontrar todos los vinos de un usuario y mapearlos a WineDTO
	    public Set<WineDto> findAllWinesByUserId(final Long idUser) {
	        return usersRepository.findById(idUser)
	                .orElseThrow(() -> new RuntimeException("User not found")) // Maneja el caso en que el usuario no se encuentre
	                .getWines()
	                .stream()
	                .map(wine -> mapToDTO(wine, new WineDto())) // Utiliza el método de mapeo local para convertir cada Wine a WineDTO
	                .collect(Collectors.toSet());
	    }
	    

	    public List<WineDto> findAll() {
	        final List<Wine> wines = wineRepository.findAll(Sort.by("id"));
	        return wines.stream()
	                .map(wine -> mapToDTO(wine, new WineDto()))
	                .toList();
	    }

	    public WineDto get(final Long id) throws NotFoundException {
	        return wineRepository.findById(id)
	                .map(wine -> mapToDTO(wine, new WineDto()))
	                .orElseThrow(NotFoundException::new);
	    }

	    public Long create(final WineDto wineDTO) throws NotFoundException {
	        final Wine wine = new Wine();
	        mapToEntity(wineDTO, wine);
	        return wineRepository.save(wine).getId();
	    }

	    public void update(final Long id, final WineDto wineDTO) throws NotFoundException {
	        final Wine wine = wineRepository.findById(id)
	                .orElseThrow(NotFoundException::new);
	        mapToEntity(wineDTO, wine);
	        wineRepository.save(wine);
	    }

	    public void delete(final Long id) {
	        wineRepository.deleteById(id);
	    }

	    public WineDto mapToDTO(final Wine wine, final WineDto wineDTO) {
	        wineDTO.setId(wine.getId());
	        wineDTO.setName(wine.getName());
	        wineDTO.setIdUser(wine.getIdUser() == null ? null : wine.getIdUser().getId());
	        wineDTO.setDateCreated(wine.getDateCreated());
	        wineDTO.setWinePredictions(wine.getWinePredictions());
	        return wineDTO;
	    }

	    private Wine mapToEntity(final WineDto wineDTO, final Wine wine) throws NotFoundException {
	        wine.setName(wineDTO.getName());
	        final Users idUser = wineDTO.getIdUser() == null ? null : usersRepository.findById(wineDTO.getIdUser())
	                .orElseThrow(() -> new NotFoundException());
	        wine.setIdUser(idUser);
	        return wine;
	    }

	    public boolean nameExists(final String name) {
	        return wineRepository.existsByNameIgnoreCase(name);
	    }

	    private WinePredictionDto mapToWinePredictionDto(WinePrediction winePrediction) {
	        WinePredictionDto dto = new WinePredictionDto();
	        // Mapeo de los campos de WinePrediction a WinePredictionDto
	        dto.setId(winePrediction.getId());
	        dto.setFixedAcidity(winePrediction.getFixedAcidity());
	        dto.setVolatileAcidity(winePrediction.getVolatileAcidity());
	        dto.setCitricAcid(winePrediction.getCitricAcid());
	        dto.setResidualSugar(winePrediction.getResidualSugar());
	        dto.setChlorides(winePrediction.getChlorides());
	        dto.setFreeSulfurDioxide(winePrediction.getFreeSulfurDioxide());
	        dto.setTotalSulfureDioxide(winePrediction.getTotalSulfureDioxide());
	        dto.setDensity(winePrediction.getDensity());
	        dto.setPH(winePrediction.getPH());
	        dto.setSulphates(winePrediction.getSulphates());
	        dto.setAlcohol(winePrediction.getAlcohol());
	        dto.setQuality(winePrediction.getQuality());
	        
	        // Suponiendo que idWine es una referencia a Wine dentro de WinePrediction
	        if (winePrediction.getIdWine() != null) {
	            dto.setIdWine(winePrediction.getIdWine().getId());
	        }

	        return dto;
	    }

	
}
