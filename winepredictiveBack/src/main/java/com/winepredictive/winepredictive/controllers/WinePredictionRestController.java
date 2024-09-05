package com.winepredictive.winepredictive.controllers;

import java.time.OffsetDateTime;
import java.util.List;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.winepredictive.winepredictive.dto.WinePredictionDto;
import com.winepredictive.winepredictive.service.WinePredictionServiceImpl;
import com.winepredictive.winepredictive.service.WineServiceImpl;

import jakarta.validation.Valid;


@RestController
@RequestMapping(value = "/api/winePredictions", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin("*")
public class WinePredictionRestController {

	 private final WinePredictionServiceImpl winePredictionServiceImpl;
	 private final WineServiceImpl wineService;

	    public WinePredictionRestController(final WinePredictionServiceImpl winePredictionServiceImpl,
	    		WineServiceImpl wineService	) {
	        this.winePredictionServiceImpl = winePredictionServiceImpl;
	        this.wineService = wineService;
	    }


	//Predictions by idWine
	    @GetMapping("/{idWine}")
	    public ResponseEntity<List<WinePredictionDto>> getWinePredictionsByIdWine(@PathVariable Long idWine) {
	 
	        try {
	            List<WinePredictionDto> predictions = wineService.getWinePredictionsByWineId(idWine);
	            return ResponseEntity.ok(predictions);
	        } catch (NotFoundException e) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	        }
	    }
	
	   @GetMapping
	    public ResponseEntity<List<WinePredictionDto>> getAllWinePredictions() {
	        return ResponseEntity.ok(winePredictionServiceImpl.findAll());
	    }

	    @GetMapping("getWinePrediction/{id}")
	    public ResponseEntity<WinePredictionDto> getWinePrediction(
	            @PathVariable(name = "id") final Long id) throws NotFoundException {
	        return ResponseEntity.ok(winePredictionServiceImpl.get(id));
	    }

	    @PostMapping    
	    public ResponseEntity<Long> createWinePrediction(
	            @RequestBody @Valid final WinePredictionDto winePredictionDTO) throws NotFoundException {
	    	winePredictionDTO.setDateCreated(OffsetDateTime.now());
	        final Long createdId = winePredictionServiceImpl.create(winePredictionDTO);
	        
	        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<Long> updateWinePrediction(@PathVariable(name = "id") final Long id,
	            @RequestBody @Valid final WinePredictionDto winePredictionDTO) throws NotFoundException {
	    	winePredictionServiceImpl.update(id, winePredictionDTO);
	        return ResponseEntity.ok(id);
	    }

	    @DeleteMapping("/{id}")
	    
	    public ResponseEntity<Void> deleteWinePrediction(@PathVariable(name = "id") final Long id) {
	        winePredictionServiceImpl.delete(id);
	        return ResponseEntity.noContent().build();
	    }
	
	   
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
