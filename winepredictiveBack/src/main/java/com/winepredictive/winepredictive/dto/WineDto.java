package com.winepredictive.winepredictive.dto;

import java.time.OffsetDateTime;
import java.util.Set;

import com.winepredictive.winepredictive.entity.WinePrediction;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class WineDto {
	private Long id;

    @NotNull
    @Size(max = 255)
    private String name;

    private Long idUser;
    
    private OffsetDateTime dateCreated;


    private Set<WinePrediction> winePredictions;
    

    //Getters and setters
    
    public OffsetDateTime getDateCreated() {
    	return dateCreated;
    }
    
	public Set<WinePrediction> getWinePredictions() {
		return winePredictions;
	}

	public void setWinePredictions(Set<WinePrediction> winePredictions) {
		this.winePredictions = winePredictions;
	}

	public void setDateCreated(OffsetDateTime dateCreated) {
		this.dateCreated = dateCreated;
	}

	public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(final Long idUser) {
        this.idUser = idUser;
    }



	public WineDto(Long id, @NotNull @Size(max = 255) String name, Long idUser, OffsetDateTime dateCreated
			) {
		this.id = id;
		this.name = name;
		this.idUser = idUser;
		this.dateCreated = dateCreated;
	
	}

	public WineDto() {
	}

	
    
    
    
    
}
