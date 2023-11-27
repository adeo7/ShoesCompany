import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HelperServiceService {

  constructor(private toastr:ToastrService) { }

  showNotify( type: string, message: string){

    if(type == "success"){
      this.toastr.success(message);
   }
   if(type == "warning"){
      this.toastr.warning(message);
   }

   if(type == "error"){
      this.toastr.error(message);
   }
 }
}
