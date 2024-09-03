package com.winepredictive.winepredictive.entity;


import java.io.Serializable;
import java.time.OffsetDateTime;
import java.util.Set;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table( name = "wine" )
public class Wine implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;


    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_user_id")
    private Users idUser;

    @OneToMany(mappedBy = "idWine")
    private Set<WinePrediction> winePredictions;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private OffsetDateTime dateCreated;

    @LastModifiedDate
    @Column(nullable = false)
    private OffsetDateTime lastUpdated;

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

    public Users getIdUser() {
        return idUser;
    }

    public void setIdUser(final Users idUser) {
        this.idUser = idUser;
    }

    public Set<WinePrediction> getWinePredictions() {
        return winePredictions;
    }

    public void setWinePredictions(final Set<WinePrediction> winePredictions) {
        this.winePredictions = winePredictions;
    }

    public OffsetDateTime getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(final OffsetDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public OffsetDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(final OffsetDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

	public Wine(Long id, String name, Users idUser, Set<WinePrediction> winePredictions, OffsetDateTime dateCreated,
			OffsetDateTime lastUpdated) {
		
		this.id = id;
		this.name = name;
		this.idUser = idUser;
		this.winePredictions = winePredictions;
		this.dateCreated = dateCreated;
		this.lastUpdated = lastUpdated;
	}

	public Wine() {
	}
	
    
	
}
