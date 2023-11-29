import { Component, OnInit } from '@angular/core';
import { TallaService } from '../talla.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-talla',
  templateUrl: './talla.component.html',
  styleUrls: ['./talla.component.css']
})
export class TallaComponent implements OnInit{
  id=0;
  listTallas:any[] = [];
  fmrTalla:FormGroup;

  constructor(private service: TallaService){
    this.fmrTalla = new FormGroup({
      talla:new FormControl(null,[Validators.required])
    }
    );
  }

  ngOnInit(): void {
    this.getList()
  }

  getList(){
    this.service.getAll().subscribe(
      result=>{
        this.listTallas = result;
        this,this.getList();
      },
      error=>{
        console.log(error);
      }
    );

  }

  guardar(){
    if(this.fmrTalla.invalid){
      alert("por favor complete todos los campos")
    }

    let data={
      "talla": this.fmrTalla.controls["talla"].value,
      "local": 1
    }

    this.service.save(data).subscribe(
      result=>{
        alert("datos guardados");
      },
      error=>{
        alert("error al gardar");
        console.log(error);
      }
      
    )
  }
 
}
