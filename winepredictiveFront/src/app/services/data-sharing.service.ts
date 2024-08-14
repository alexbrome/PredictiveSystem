import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  //Form white and red wine data
  whiteWineData: any = null;
  redWineData: any = null;
  wineName:any = '';

  //Predicted quality( white and red )
  whiteWineQualityPredicted!: Number;
  redWineQualityPredicted!: Number ;


  constructor() { }

  //setters and getters wineData
  setWhiteWineData(data: any) {
    this.whiteWineData = data;
  }

  getwhiteWineData() {
    return this.whiteWineData;
  }

  setRedWineData(data: any) {
    this.redWineData = data;
  }

  getRedWineData() {
    return this.redWineData;
  }

  // setters and getters Quality predicted
  setWhiteWineQualityPredicted(quality: Number) {
    this.whiteWineQualityPredicted = quality;
  }

  getWhiteWineQualityPredicted() {
    return this.whiteWineQualityPredicted;
  }

  setRedWineQualityPredicted(quality: Number) {
    this.redWineQualityPredicted = quality;
  }

  getRedWineQualityPredicted() {
    return this.redWineQualityPredicted;
  }

  setNameWine(name:any){
   this.wineName = name;
  }

  getNameWine(){
    return this.wineName;
  }



}
