package com.winepredictive.winepredictive.entity;

import java.time.OffsetDateTime;

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
import jakarta.persistence.Table;

@Entity
@Table( name = "wineprediction" )
public class WinePrediction {


    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Double fixedAcidity;

    @Column
    private Double volatileAcidity;

    @Column
    private Double citricAcid;

    @Column
    private Double residualSugar;

    @Column
    private Double chlorides;

    @Column
    private Double freeSulfurDioxide;

    @Column
    private Double totalSulfureDioxide;

    @Column
    private Double density;

    @Column
    private Double pH;

    @Column
    private Double sulphates;

    @Column
    private Double alcohol;

    @Column
    private Double quality;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_wine_id")
    @JsonIgnore
    private Wine idWine;

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

    public Double getFixedAcidity() {
        return fixedAcidity;
    }

    public void setFixedAcidity(final Double fixedAcidity) {
        this.fixedAcidity = fixedAcidity;
    }

    public Double getVolatileAcidity() {
        return volatileAcidity;
    }

    public void setVolatileAcidity(final Double volatileAcidity) {
        this.volatileAcidity = volatileAcidity;
    }

    public Double getCitricAcid() {
        return citricAcid;
    }

    public void setCitricAcid(final Double citricAcid) {
        this.citricAcid = citricAcid;
    }

    public Double getResidualSugar() {
        return residualSugar;
    }

    public void setResidualSugar(final Double residualSugar) {
        this.residualSugar = residualSugar;
    }

    public Double getChlorides() {
        return chlorides;
    }

    public void setChlorides(final Double chlorides) {
        this.chlorides = chlorides;
    }

    public Double getFreeSulfurDioxide() {
        return freeSulfurDioxide;
    }

    public void setFreeSulfurDioxide(final Double freeSulfurDioxide) {
        this.freeSulfurDioxide = freeSulfurDioxide;
    }

    public Double getTotalSulfureDioxide() {
        return totalSulfureDioxide;
    }

    public void setTotalSulfureDioxide(final Double totalSulfureDioxide) {
        this.totalSulfureDioxide = totalSulfureDioxide;
    }

    public Double getDensity() {
        return density;
    }

    public void setDensity(final Double density) {
        this.density = density;
    }

    public Double getPH() {
        return pH;
    }

    public void setPH(final Double pH) {
        this.pH = pH;
    }

    public Double getSulphates() {
        return sulphates;
    }

    public void setSulphates(final Double sulphates) {
        this.sulphates = sulphates;
    }

    public Double getAlcohol() {
        return alcohol;
    }

    public void setAlcohol(final Double alcohol) {
        this.alcohol = alcohol;
    }

    public Double getQuality() {
        return quality;
    }

    public void setQuality(final Double quality) {
        this.quality = quality;
    }

    public Wine getIdWine() {
        return idWine;
    }

    public void setIdWine(final Wine idWine) {
        this.idWine = idWine;
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

	public WinePrediction(Long id, Double fixedAcidity, Double volatileAcidity, Double citricAcid, Double residualSugar,
			Double chlorides, Double freeSulfurDioxide, Double totalSulfureDioxide, Double density, Double pH,
			Double sulphates, Double alcohol, Double quality, Wine idWine, OffsetDateTime dateCreated,
			OffsetDateTime lastUpdated) {
		this.id = id;
		this.fixedAcidity = fixedAcidity;
		this.volatileAcidity = volatileAcidity;
		this.citricAcid = citricAcid;
		this.residualSugar = residualSugar;
		this.chlorides = chlorides;
		this.freeSulfurDioxide = freeSulfurDioxide;
		this.totalSulfureDioxide = totalSulfureDioxide;
		this.density = density;
		this.pH = pH;
		this.sulphates = sulphates;
		this.alcohol = alcohol;
		this.quality = quality;
		this.idWine = idWine;
		this.dateCreated = dateCreated;
		this.lastUpdated = lastUpdated;
	}

	public WinePrediction() {
	}
	
    
    
    
}
