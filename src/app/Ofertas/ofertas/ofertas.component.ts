import { Component, OnInit } from '@angular/core';
import { OfertaService } from '../oferta.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit{

constructor(private service:OfertaService){}
listOfertas:any[]=[]
ngOnInit(): void {
  this.getList();
}
getList(){
  this.service.getAll().subscribe(
    result=>{
      this.listOfertas=result
      console.log(this.listOfertas)
    }
  ); 
}
}
