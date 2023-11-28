import { Component, OnInit } from '@angular/core';
import { OfertaService } from '../oferta.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/productos/productos.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit{
public fmrOferta: FormGroup;
listOfertas:any[]=[]
listProductos:any[]=[]
id=0;
constructor(private service:OfertaService,
            private productoService: ProductosService
  ){
this.fmrOferta=new FormGroup({
  tipo:new FormControl(null,[Validators.required]),
  descuento:new FormControl(null,[Validators.required]),
  fechaInicio:new FormControl(null,[Validators.required]),
  fechaFin:new FormControl(null,[Validators.required]),
  producto:new FormControl(null,[Validators.required])
});
}

ngOnInit(): void {
  this.getList();
}
getList() { //se obtine una lista de fotos y productos
  let ofertas:any[] = [];
  let producto:any;
  forkJoin([
    this.service.getAll(),
    this.productoService.getAll()
  ]).subscribe(
    ([ ofertasResult, productosResult]) => {
     ofertas= ofertasResult;
     this.listProductos = productosResult;

      console.log(this.listProductos);
      console.log(ofertas)

      for (let i = 0; i < ofertas.length; i++) {
        for (let j = 0; j < this.listProductos.length; j++) {
          if (ofertas[i].producto == this.listProductos[j].id) {
            producto=this.listProductos[j].nombre_producto;
          }
        }
       let oferta={
        "tipo": ofertas[i].tipo_oferta,
        "descuento":ofertas[i].descuento,
        "fecha_inicio":ofertas[i].start_date,
        "fecha_fin":ofertas[i].end_date,
        "producto":producto
       }
       this.listOfertas.push(oferta);
       producto=" ";
      }
    },
    error => {
      // Manejo de errores si es necesario
      console.error(error);
    }
  );
}

guardar(){
  if (this.fmrOferta.invalid) {
    alert("Los datos no son correctos ")
  }
  let data={
    "tipo_oferta":this.fmrOferta.controls['tipo'].value,
    "descuento":this.fmrOferta.controls['descuento'].value,
    "start_date":this.fmrOferta.controls['fechaInicio'].value,
    "end_date":this.fmrOferta.controls['fechaFin'].value,
    "producto":this.fmrOferta.controls['producto'].value,
  }
  this.service.save(data, this.id).subscribe(result=>{
    alert("Oferta guardada correctamente")
    this.getList();
  },
  error=>{
    alert("hay un error al guardar")
    console.log(error)
  }
  )
}
}
