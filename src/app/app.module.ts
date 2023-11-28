import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ProductosIndexComponent } from './productos/productos-index/productos-index.component';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { CategoriaIndexComponent } from './categoria/categoria-index/categoria-index.component';
import { OfertasComponent } from './Ofertas/ofertas/ofertas.component';
import { TallaComponent } from './tallas/talla/talla.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductosIndexComponent,
    CategoriaIndexComponent,
    OfertasComponent,
    TallaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      autoDismiss: false,
      positionClass: "toast-bottom-right",
    }),
    NgSelectModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
