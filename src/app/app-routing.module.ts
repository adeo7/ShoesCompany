import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductosIndexComponent } from './productos/productos-index/productos-index.component';
import { CategoriaIndexComponent } from './categoria/categoria-index/categoria-index.component';
import { OfertasComponent } from './Ofertas/ofertas/ofertas.component';

const routes: Routes=[
  {
    path: 'productos',
    component: ProductosIndexComponent
  },
  {
    path: 'categorias',
    component: CategoriaIndexComponent
  },
  {
    path: 'ofertas',
    component: OfertasComponent
  }
  

]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
