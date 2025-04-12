package com.winepredictive.winepredictive.service;

import java.util.List;
import java.util.Optional;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;
import com.winepredictive.winepredictive.dto.MeasureDto;
import com.winepredictive.winepredictive.entity.Measure;
import com.winepredictive.winepredictive.entity.Wine;
import com.winepredictive.winepredictive.repository.MeasureRepository;
import com.winepredictive.winepredictive.repository.WineRepository;

@Service
public class MeasureServiceImpl {

	 private final MeasureRepository measureRepository;
	 private final WineRepository wineRepository;
	    
	    public MeasureServiceImpl(final MeasureRepository measureRepository,
	            final WineRepository wineRepository) {
	        this.measureRepository = measureRepository;
	        this.wineRepository = wineRepository;
	    }
 
    public Long create(final MeasureDto measureDto) throws NotFoundException {
        final Measure measure = new Measure();
        mapToEntity(measureDto, measure);
        return measureRepository.save(measure).getId();
    }
    
    @SuppressWarnings("unchecked")
	public List<Measure> measuresByIdWine(Long idWine) throws NotFoundException {  
        // Buscar el vino por su ID
        Optional<Wine> wineOptional = wineRepository.findById(idWine);
        
        // Si el vino existe, retorna sus predicciones, de lo contrario, lanza una excepción
        if (wineOptional.isPresent()) {
            return (List<Measure>) wineOptional.get().getMeasures();
        } else {
            throw new NotFoundException();
        }
    }

	
	private MeasureDto mapToDTO(final Measure measure,
            final MeasureDto measureDto) {
		measureDto.setId(measure.getId());
		measureDto.setCreated(measure.getCreated());
		measureDto.setDescription(measure.getDescription());
		measureDto.setIdWine(measure.getIdWine() == null ? null : measure.getIdWine().getId());
        return measureDto;
    }

    private Measure mapToEntity(final MeasureDto measureDto,
            final Measure measure) throws NotFoundException {
        measure.setId(measureDto.getId());
        measure.setCreated(measureDto.getCreated());
        measure.setDescription(measureDto.getDescription());
        final Wine idWine = measureDto.getIdWine() == null ? null : wineRepository.findById(measureDto.getIdWine())
                .orElseThrow(() -> new NotFoundException());
        measure.setIdWine(idWine);
        return measure;
    }
    



	
	
	
}
