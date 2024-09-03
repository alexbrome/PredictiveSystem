package com.winepredictive.winepredictive.service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.winepredictive.winepredictive.dto.WinePredictionDto;
import com.winepredictive.winepredictive.entity.Wine;
import com.winepredictive.winepredictive.entity.WinePrediction;
import com.winepredictive.winepredictive.repository.WinePredictionRepository;
import com.winepredictive.winepredictive.repository.WineRepository;

@Service
public class WinePredictionServiceImpl implements WinePredictionService{
	
	 private final WinePredictionRepository winePredictionRepository;
	    private final WineRepository wineRepository;

	    public WinePredictionServiceImpl(final WinePredictionRepository winePredictionRepository,
	            final WineRepository wineRepository) {
	        this.winePredictionRepository = winePredictionRepository;
	        this.wineRepository = wineRepository;
	    }

	
	    public List<WinePredictionDto> findAll() {
	        final List<WinePrediction> winePredictions = winePredictionRepository.findAll(Sort.by("id"));
	        return winePredictions.stream()
	                .map(winePrediction -> mapToDTO(winePrediction, new WinePredictionDto()))
	                .toList();
	    }

	    public WinePredictionDto get(final Long id) throws NotFoundException {
	        return winePredictionRepository.findById(id)
	                .map(winePrediction -> mapToDTO(winePrediction, new WinePredictionDto()))
	                .orElseThrow(NotFoundException::new);
	    }

	    public Long create(final WinePredictionDto winePredictionDTO) throws NotFoundException {
	        final WinePrediction winePrediction = new WinePrediction();
	        mapToEntity(winePredictionDTO, winePrediction);
	        return winePredictionRepository.save(winePrediction).getId();
	    }

	    public void update(final Long id, final WinePredictionDto winePredictionDTO) throws NotFoundException {
	        final WinePrediction winePrediction = winePredictionRepository.findById(id)
	                .orElseThrow(NotFoundException::new);
	        mapToEntity(winePredictionDTO, winePrediction);
	        winePredictionRepository.save(winePrediction);
	    }

	    public void delete(final Long id) {
	        winePredictionRepository.deleteById(id);
	    }

	    private WinePredictionDto mapToDTO(final WinePrediction winePrediction,
	            final WinePredictionDto winePredictionDTO) {
	    	winePredictionDTO.setDateCreated(winePrediction.getDateCreated());
	        winePredictionDTO.setId(winePrediction.getId());
	        winePredictionDTO.setFixedAcidity(winePrediction.getFixedAcidity());
	        winePredictionDTO.setVolatileAcidity(winePrediction.getVolatileAcidity());
	        winePredictionDTO.setCitricAcid(winePrediction.getCitricAcid());
	        winePredictionDTO.setResidualSugar(winePrediction.getResidualSugar());
	        winePredictionDTO.setChlorides(winePrediction.getChlorides());
	        winePredictionDTO.setFreeSulfurDioxide(winePrediction.getFreeSulfurDioxide());
	        winePredictionDTO.setTotalSulfureDioxide(winePrediction.getTotalSulfureDioxide());
	        winePredictionDTO.setDensity(winePrediction.getDensity());
	        winePredictionDTO.setPH(winePrediction.getPH());
	        winePredictionDTO.setSulphates(winePrediction.getSulphates());
	        winePredictionDTO.setAlcohol(winePrediction.getAlcohol());
	        winePredictionDTO.setQuality(winePrediction.getQuality());
	        winePredictionDTO.setIdWine(winePrediction.getIdWine() == null ? null : winePrediction.getIdWine().getId());
	        return winePredictionDTO;
	    }

	    private WinePrediction mapToEntity(final WinePredictionDto winePredictionDTO,
	            final WinePrediction winePrediction) throws NotFoundException {
	        winePrediction.setFixedAcidity(winePredictionDTO.getFixedAcidity());
	        winePrediction.setVolatileAcidity(winePredictionDTO.getVolatileAcidity());
	        winePrediction.setCitricAcid(winePredictionDTO.getCitricAcid());
	        winePrediction.setResidualSugar(winePredictionDTO.getResidualSugar());
	        winePrediction.setChlorides(winePredictionDTO.getChlorides());
	        winePrediction.setFreeSulfurDioxide(winePredictionDTO.getFreeSulfurDioxide());
	        winePrediction.setTotalSulfureDioxide(winePredictionDTO.getTotalSulfureDioxide());
	        winePrediction.setDensity(winePredictionDTO.getDensity());
	        winePrediction.setPH(winePredictionDTO.getPH());
	        winePrediction.setSulphates(winePredictionDTO.getSulphates());
	        winePrediction.setAlcohol(winePredictionDTO.getAlcohol());
	        winePrediction.setQuality(winePredictionDTO.getQuality());
	        final Wine idWine = winePredictionDTO.getIdWine() == null ? null : wineRepository.findById(winePredictionDTO.getIdWine())
	                .orElseThrow(() -> new NotFoundException());
	        winePrediction.setIdWine(idWine);
	        winePrediction.setDateCreated(winePredictionDTO.getDateCreated());
	        winePrediction.setLastUpdated(OffsetDateTime.now());
	        return winePrediction;
	    }
	    
	    
	    
	    
	    
	    
	    public List<WinePrediction> winePredictionsByIdWine(Long idWine) throws NotFoundException {  
	        // Buscar el vino por su ID
	        Optional<Wine> wineOptional = wineRepository.findById(idWine);
	        
	        System.out.println("Predicciones en el servicio: "+wineOptional.get().getWinePredictions());
	        // Si el vino existe, retorna sus predicciones, de lo contrario, lanza una excepción
	        if (wineOptional.isPresent()) {
	            return (List<WinePrediction>) wineOptional.get().getWinePredictions();
	        } else {
	            throw new NotFoundException();
	        }
	    }

	
	
}
