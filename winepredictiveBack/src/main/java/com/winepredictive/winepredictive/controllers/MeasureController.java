package com.winepredictive.winepredictive.controllers;


import java.util.ArrayList;
import java.util.List;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.winepredictive.winepredictive.dto.MeasureDto;
import com.winepredictive.winepredictive.service.MeasureServiceImpl;
import com.winepredictive.winepredictive.service.WineServiceImpl;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/api/measure", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin("*")
public class MeasureController {

	 private final MeasureServiceImpl measureImpl;
	 private final WineServiceImpl wineService;
	 
	public MeasureController(MeasureServiceImpl measureImpl, WineServiceImpl wineService) {
		this.measureImpl = measureImpl;
		this.wineService = wineService;
	}
	
	//Predictions by idWine
    @GetMapping("/{idWine}")
    public ResponseEntity<List<MeasureDto>> getWMeasuresByIdWine(@PathVariable Long idWine) {
        try {
            List<MeasureDto> measures = wineService.getMeasuresByWineId(idWine);
            return ResponseEntity.ok(measures);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ArrayList<MeasureDto>());
        }
    }
	

    @PostMapping    
    public ResponseEntity<Long> createMeasure(
            @RequestBody @Valid final MeasureDto measureDto) throws NotFoundException {
    	System.out.printf("Impreso el measureDto en el metodo post del controller "+measureDto.getCreated());
    	//measureDto.setCreated(OffsetDateTime.now());
        final Long createdId = measureImpl.create(measureDto);
        
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

	
	
}
