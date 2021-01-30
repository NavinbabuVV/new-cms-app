import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-global-search-result',
  templateUrl: './global-search-result.page.html',
  styleUrls: ['./global-search-result.page.scss'],
})
export class GlobalSearchResultPage implements OnInit {
  responseData : any;
  accessToken : any;
  s_name : any;
  s_code: any;
  items: any;
  constructor(public apiservice: ApiService,public toastController: ToastController,private router:Router) { }

  ngOnInit() {
    this.accessToken = localStorage.getItem('access_user');  
    this.s_code = localStorage.getItem('global_search_code');  
    this.s_name = localStorage.getItem('global_search_name');  
    this.Globalsearch();
  }

  async showToast(message,position) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: position,
    });
    toast.present();
  }
  Globalsearch(){
    let searchData:any = '{"access_token":"'+this.accessToken+'","operation":"search_details","moduleType":"global_search","api_type":"web","element_data":{"action":"view_search_details","customer_id":"'+this.s_code+'","search_val":"'+this.s_name+'"}}';
    this.apiservice.sendServer(searchData).then((response:any) => {
      if(response.status){
        this.items = response.options;
        this.router.navigate(['/global-search-result']);
      } else {
        this.showToast('No Data Found','top');
      }
    });
    localStorage.removeItem('global_search_code');  
    localStorage.removeItem('global_search_name');
  }
  specialEdit(id){
    console.log(id);
    localStorage.setItem('customer_special_id', id);
    this.router.navigate(['/customer-special-edit']);
   
  }
}
