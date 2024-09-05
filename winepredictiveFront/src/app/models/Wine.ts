export class Wine{
  name!:string;
 idUser!:number;

constructor(name: string = '', idUser: number = 0) {
    this.name = name;
    this.idUser = idUser;
  }
}