package com.winepredictive.winepredictive.controllers;

import java.util.List;
import java.util.Set;

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
import com.winepredictive.winepredictive.dto.WineDto;
import com.winepredictive.winepredictive.entity.Wine;
import com.winepredictive.winepredictive.service.UserServiceImpl;
import com.winepredictive.winepredictive.service.WineServiceImpl;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/api/wine", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin("*")
public class WineRestController {

	final WineServiceImpl wineService;
	final UserServiceImpl userService;

	public WineRestController(WineServiceImpl wineService,UserServiceImpl userService) {
		this.wineService = wineService;
		this.userService = userService;
	}

	@GetMapping
    public ResponseEntity<List<WineDto>> getAllWines() {
        return ResponseEntity.ok(wineService.findAll());
    }
	
	
	 @GetMapping("/user/{idUser}")
	    public ResponseEntity<Set<WineDto>> getAllWinesByUserId(@PathVariable Long idUser) {
	        Set<WineDto> wines = wineService.findAllWinesByUserId(idUser);
	        System.out.println("Vinos del ususario desde el controller:  "+wines);
	        return ResponseEntity.ok(wines);
	    }
	
	@GetMapping("/{id}")
	public ResponseEntity<Wine> getWineById(@PathVariable Long id) {
		return ResponseEntity.ok(this.wineService.getWineById(id));
	}

	@PostMapping
	public ResponseEntity<Long> createWine(@RequestBody @Valid final WineDto wineDTO) throws NotFoundException {
		final Long createdId = wineService.create(wineDTO);
		return new ResponseEntity<>(createdId, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Long> updateWine(@PathVariable(name = "id") final Long id,
			@RequestBody @Valid final WineDto wineDTO) throws NotFoundException {
		wineService.update(id, wineDTO);
		return ResponseEntity.ok(id);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteWine(@PathVariable(name = "id") final Long id) {
		wineService.delete(id);
		return ResponseEntity.noContent().build();
	}

}
