import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-license-key-search',
  templateUrl: './license-key-search.page.html',
  styleUrls: ['./license-key-search.page.scss'],
})
export class LicenseKeySearchPage implements OnInit {
  responseData : any;
  customer_name;
  reseller_discount:any;
  customerlogid:any;
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
  s_licence_key : any;
  items: any;
  navigations:any;
  reseller_id;
  constructor(public apiservice: ApiService,public toastController: ToastController,private router:Router) { }

  ngOnInit() {
    this.accessToken = localStorage.getItem('access_user');  
  }

  async showToast(message,position) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: position,
    });
    toast.present();
  }

  searchLK(key){
     this.apiservice.present("Loading Please Wait");
    this.s_licence_key = key;
    let searchData:any = '{"access_token":"'+this.accessToken+'","operation":"get_details","moduleType":"licensekey_search","api_type":"web","element_data":{"action":"getdetails","search_text":"'+key+'"}}';
   this.apiservice.sendServer(searchData).then((response:any) => {
     this.apiservice.dismiss();
   if(response.status){
    this.isItemAvailable = false;
    this.isKeyAvail = true;
    this.currency = response.currency;
    this.edition = response.edition;
    this.key_type = response.key_type;
    this.price = response.price;
    this.concurrent = response.concurrent;
    this.err_msg = response.err_message;
    this.date = response.date;
    this.customerlogid = response.customer_id;
    this.reseller_discount =  response.reseller_discount
   } else if(response.error) {

    console.log('error = '+response);
   }
  }, 
    (error)=>{
        console.log(error);
        this.apiservice.dismiss();
    });
 }





 initializeItems(val){
  let searchData:any = '{"access_token":"'+this.accessToken+'","operation":"autocomplete_licensekey","moduleType":"licensekey_search","api_type":"web","element_data":{"action":"autocomplete_licensekey","search_text":"'+val+'"}}';
  this.apiservice.sendServer(searchData).then((response:any) => {
    if(response.status = true){
      this.items = response.license_key;
    } else {
      this.showToast(response.error.code,'top');
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

preOrder(){
  // if(this.selected_price == undefined){
  //   this.showToast('Please Select the Currency','top');
  // } else {
    // localStorage.setItem('selected_price',this.selected_price); 
    this.navigations = { state: {   reseller_discount : this.reseller_discount,edition_key: this.edition,customer_id:this.customerlogid,code:this.currency} }; 
    this.router.navigate(['/order-license'],this.navigations);
  // }
}
 
}
