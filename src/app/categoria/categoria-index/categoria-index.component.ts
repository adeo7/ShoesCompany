import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperServiceService } from 'src/services/helper-service.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-categoria-index',
  templateUrl: './categoria-index.component.html',
  styleUrls: ['./categoria-index.component.css']
})
export class CategoriaIndexComponent implements OnInit{
  public fmrCategoria: FormGroup;
  public id=0;
  listCategorias:any[]=[]
  ngOnInit(): void {  
    this.getList()
  }
  constructor(private service: CategoriaService,
              private helperService:HelperServiceService,
              private router:Router
    ){
    this.fmrCategoria=new FormGroup({
      nombre:new FormControl(null,[Validators.required])
    });
  }

  getList(){
    this.service.getAll().subscribe(
      result=>{
        this.listCategorias=result
        console.log(this.listCategorias)
      }
    ); 
  }

  guardar(){
    if (this.fmrCategoria.invalid) {
      this.helperService.showNotify("warning","El campo no cumple con las validaciones")
      return
    }

    let data={
      "categoria":this.fmrCategoria.controls["nombre"].value,
      "local":1
    }
    this.service.save(data,this.id).subscribe(
      result=>{
        this.helperService.showNotify("success","Categoria guardada correctamente")
      },
      error=>{
        console.log(error)
        this.helperService.showNotify("error","No se pudo guardar")
      }
    )
  }
}
