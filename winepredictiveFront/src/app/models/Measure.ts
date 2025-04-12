export class Measure {
  created!: Date;
  idWine!: number;
  description!: string;

  constructor(description:string,date: Date ,  wineId: number ) {
    this.created = date;
    this.idWine = wineId;
    this.description = description;
  }

 

}