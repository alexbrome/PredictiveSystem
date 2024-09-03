package com.winepredictive.winepredictive.controllers;

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

import com.winepredictive.winepredictive.dto.UserDto;
import com.winepredictive.winepredictive.service.UserServiceImpl;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/api/users", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin("*")
public class UsersResource {

    private final UserServiceImpl usersService;

    public UsersResource(final UserServiceImpl usersService) {
        this.usersService = usersService;
    }

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUserss() {
        return ResponseEntity.ok(usersService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserByID(@PathVariable(name = "id") final Long id) throws NotFoundException {
        return ResponseEntity.ok(usersService.get(id));
    }

    //Useless, make it at signup endpoint(AuthController)
//    @PostMapping 
//    public ResponseEntity<Long> createUsers(@RequestBody @Valid final UserDto usersDTO) {
//        final Long createdId = usersService.create(usersDTO);
//        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
//    }

    @PutMapping("/{id}")
    public ResponseEntity<Long> updateUsers(@PathVariable(name = "id") final Long id,
            @RequestBody @Valid final UserDto usersDTO) throws NotFoundException {
        usersService.update(id, usersDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsers(@PathVariable(name = "id") final Long id) {
        usersService.delete(id);
        return ResponseEntity.noContent().build();
    }
    }
