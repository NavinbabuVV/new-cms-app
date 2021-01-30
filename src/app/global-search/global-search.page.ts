import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.page.html',
  styleUrls: ['./global-search.page.scss'],
})
export class GlobalSearchPage implements OnInit {
  responseData : any;
  accessToken : any;
  currency : any;
  edition : any;
  key_type : any;
  price : any;
  err_msg: any;
  concurrent : any;
  date : any;
  selected_price : any;
  userData = {"licensce_key": ""};
  public isKeyAvail = false;
  public isItemAvailable = false;
  public isItemAvailableC = false;
  s_name : any;
  s_code: any;
  items: any;
  itemC: any;
  constructor(public apiservice: ApiService,public toastController: ToastController,private router:Router) { }

  ngOnInit() {
    this.accessToken = localStorage.getItem('access_user');  
  }

  async showToast(message,position) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: position,
      showCloseButton: true,
      closeButtonText: 'OK'
    });
    toast.present();
  }
  searchLK(key){
    this.s_name = key;
    this.isItemAvailable = false;
 }
  initializeItems(val){
    let searchData:any = '{"access_token":"'+this.accessToken+'","operation":"customer_autocomplete","moduleType":"global_search","api_type":"web","element_data":{"action":"autocomplete_customer_name","keyword":"'+val+'"}}';
    this.apiservice.sendServer(searchData).then((response:any) => {
      if(response.status){
        this.items = response.options;
      } else {
        this.showToast('No Data Found','top');
      }
    });
    }
  
    getItems(ev: any) {
      const val = ev.target.value;
      this.initializeItems(val);
    if (val && val.trim() != '') {
          this.isItemAvailable = true;
          this.isKeyAvail = false;
          this.items = this.items.filter((item) => {
          return item;
          }
     )}
    }

    searchC(key){
      this.s_code = key;
      this.isItemAvailableC = false;
      return false;
   }
    initializeItemsC(val){
      let searchData:any = '{"access_token":"'+this.accessToken+'","operation":"customer_autocomplete","moduleType":"global_search","api_type":"web","element_data":{"action":"autocomplete_customer_code","keyword":"'+val+'"}}';
      this.apiservice.sendServer(searchData).then((response:any) => {
        if(response.status){
          this.itemC = response.options;
        } else {
          this.showToast('No Data Found','top');
        }
      });
      }
    
      getItemsC(ev: any) {
        const val = ev.target.value;
        this.initializeItemsC(val);
      if (val && val.trim() != '') {
            this.isItemAvailableC = true;
            this.isKeyAvail = false;
            this.items = this.items.filter((item) => {
            return item;
            }
       )}
      }



Globalsearch(){
        var customer_id = this.s_code;
        var search_val = this.s_name;
      if(customer_id == undefined && search_val == undefined){
        this.showToast('Please Choose the Value','top');
        return false;
      }
        localStorage.setItem('global_search_name', this.s_name);
        localStorage.setItem('global_search_code', this.s_code);
        this.router.navigate(['/global-search-result']);
      }
}
