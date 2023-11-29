import { Component } from '@angular/core';
import { ProductosService } from '../productos.service';
import { FotoProductoService } from '../foto-producto.service';
import { forkJoin } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/categoria/categoria.service';
import { TallaService } from 'src/app/tallas/talla.service';

@Component({
  selector: 'productos',
  templateUrl: './productos-index.component.html',
  styleUrls: ['./productos-index.component.css']
})
export class ProductosIndexComponent {
  public frmProducto: FormGroup ;
  listProductos:any[]=[];
  listCategoria:any[]=[];
  listTalla:any[]=[];
  id=0;

  constructor(private service: ProductosService,
              private serviceFoto: FotoProductoService, 
              private serviCtegoria: CategoriaService,
              private tallaService: TallaService,
              private activateRoute: ActivatedRoute,
              private route: Router){
                this.frmProducto = new FormGroup({
                  nombre:new FormControl(null,[Validators.required]),
                  precio:new FormControl(null,[Validators.required]),
                  color:new FormControl(null,[Validators.required]),
                  marca:new FormControl(null,[Validators.required]),
                  categoria:new FormControl(null,[Validators.required]),
                  talla:new FormControl(null,[Validators.required]),
                  disponibles:new FormControl(null,[Validators.required]),
                  genero:new FormControl(null,[Validators.required])
                });

  }
  ngOnInit(): void {
    this.getList()
  }
 

getList() { //se obtine una lista de fotos y productos
  let listFotoProductos: any[] = [];
  let listFotosP: any[] = [];
  let productos: any[] = [];

  forkJoin([
    this.service.getAll(),
    this.serviceFoto.getAll(),
    this.serviCtegoria.getAll(),
    this.tallaService.getAll()
  ]).subscribe(
    ([productosResult, fotosResult, cateResult,tallaResul]) => {
      productos = productosResult;
      listFotoProductos = fotosResult;
      this.listCategoria=cateResult;
      this.listTalla=tallaResul;

      console.log(productos);
      console.log(listFotoProductos);
      console.log(this.listCategoria);

      for (let i = 0; i < productos.length; i++) {
        for (let j = 0; j < listFotoProductos.length; j++) {
          if (productos[i].id == listFotoProductos[j].producto) {
            listFotosP.push(listFotoProductos[j].image_path);
          }
        }
        let producto = {
          "id": productos[i].id,
          "nombre": productos[i].nombre_producto,
          "precio": productos[i].precio,
          "color": productos[i].color,
          "marca": productos[i].marca,
          "genero": productos[i].genero,
          "disponibles": productos[i].disponible,
          "fotos": listFotosP
        };
        this.listProductos.push(producto);
        listFotosP = []; // Reinicia la lista para el próximo producto
      }
    },
    error => {
      // Manejo de errores si es necesario
      console.error(error);
    }
  );
}

guardar(){
  if (this.frmProducto.invalid) {
    alert("complete los campos por favor")
  
  }

  let data={
    "nombre_producto":this.frmProducto.controls["nombre"].value,
    "precio":this.frmProducto.controls["precio"].value,
    "color":this.frmProducto.controls["color"].value,
    "marca":this.frmProducto.controls["marca"].value,
    "genero":this.frmProducto.controls["genero"].value,
    "disponible":this.frmProducto.controls["disponibles"].value,
    "local":1,
    "categoria":this.frmProducto.controls["categoria"].value,
    "talla":this.frmProducto.controls["talla"].value 
  }
  this.service.save(data, this.id).subscribe(
    result=>{
      alert("datos guardados");
      this.getList();
    },
    error=>{
      alert("datos no guardados");
      console.log(error);
    }
  );
}


}
