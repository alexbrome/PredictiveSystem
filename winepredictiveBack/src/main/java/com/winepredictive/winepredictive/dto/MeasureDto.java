package com.winepredictive.winepredictive.dto;

import java.time.OffsetDateTime;


public class MeasureDto {

	 
	  private Long id;
	  
	
	  private String description;
	  

	  private OffsetDateTime created;

	
	    private Long idWine;
	  
	  
	public MeasureDto() {
	}



	public MeasureDto(Long id, String description, OffsetDateTime created, Long idWine) {
		this.id = id;
		this.description = description;
		this.created = created;
		this.idWine = idWine;
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public OffsetDateTime getCreated() {
		return created;
	}

	public void setCreated(OffsetDateTime created) {
		this.created = created;
	}



	public Long getIdWine() {
		return idWine;
	}



	public void setIdWine(Long idWine) {
		this.idWine = idWine;
	}
	  
	  
	
	
	
	
}
