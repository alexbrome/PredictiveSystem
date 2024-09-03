package com.winepredictive.winepredictive.dto;

import java.time.OffsetDateTime;

public class WinePredictionDto {
	private Long id;

    private Double fixedAcidity;

    private Double volatileAcidity;

    private Double citricAcid;

    private Double residualSugar;

    private Double chlorides;

    private Double freeSulfurDioxide;

    private Double totalSulfureDioxide;

    private Double density;

    private Double pH;

    private Double sulphates;

    private Double alcohol;

    private Double quality;

    private Long idWine;
    
    private OffsetDateTime dateCreated;

    
    
    public OffsetDateTime getDateCreated() {
		return dateCreated;
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

    public Long getIdWine() {
        return idWine;
    }

    public void setIdWine(final Long idWine) {
        this.idWine = idWine;
    }

	public WinePredictionDto(Long id, Double fixedAcidity, Double volatileAcidity, Double citricAcid,
			Double residualSugar, Double chlorides, Double freeSulfurDioxide, Double totalSulfureDioxide,
			Double density, Double pH, Double sulphates, Double alcohol, Double quality, Long idWine,OffsetDateTime dateTime) {
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
		this.dateCreated = dateTime;
	}

	public WinePredictionDto() {
	}
    
    
    
}
