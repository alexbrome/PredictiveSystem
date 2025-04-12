package com.winepredictive.winepredictive.entity;

import java.time.OffsetDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Measure {

	  @Id
	  @Column(nullable = false, updatable = false)
	  @GeneratedValue(strategy = GenerationType.IDENTITY)
	  private Long id;
	  
	  @Column(updatable = false)
	  private String description;
	  
	  @Column(updatable = false)
	  private OffsetDateTime created;

	  @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "id_wine")
	    @JsonIgnore
	    private Wine idWine;
	  
	  
	public Measure() {
	}

	public Measure(Long id, String description, OffsetDateTime created) {
		this.id = id;
		this.description = description;
		this.created = created;
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

	public Wine getIdWine() {
		return idWine;
	}

	public void setIdWine(Wine idWine) {
		this.idWine = idWine;
	}
	  
	  
	  
	
	
}
