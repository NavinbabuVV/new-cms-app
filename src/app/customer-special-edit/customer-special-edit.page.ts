import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-customer-special-edit',
  templateUrl: './customer-special-edit.page.html',
  styleUrls: ['./customer-special-edit.page.scss'],
})
export class CustomerSpecialEditPage implements OnInit {
  responseData : any;
  accessToken : any;
  s_name : any;
  customer_special_id: any;
  emails: any;
  financeemail_options:any;
  all_terms_condition: any;
  customer_terms_condition: any;
  credit_limit:any;
  reseller_id:any;
  discount_percentage: any;
  system_discount_3cx: any;
  fin_emials: any;
  mails: any;
  data = {
    "title": "testing title",
    "paragraphs": [
      { "paragraph": "testing paragraph 1" },
      { "paragraph": "testing paragraph 2" },
      { "paragraph": "testing paragraph 3" }
    ]
  }
  constructor(public apiservice: ApiService,public toastController: ToastController,private router:Router) { }

  ngOnInit() {
    this.accessToken = localStorage.getItem('access_user');  
    this.customer_special_id = localStorage.getItem('customer_special_id');  
    this.customerSpecialEdit();
  }

  async showToast(message,position) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: position,
    });
    toast.present();
  }
customerSpecialEdit(){
  let searchData:any = '{"access_token":"'+this.accessToken+'","operation":"customer_edit","moduleType":"global_search","api_type":"web","element_data":{"action":"edit_customer_popup","customer_id":"'+this.customer_special_id+'"}}';
  this.apiservice.sendServer(searchData).then((response:any) => {
    if(response.status){
      this.emails = response.email_options;
      this.financeemail_options = response.financeemail_options;
      this.all_terms_condition = response.all_terms_condition;
      this.customer_terms_condition = response.customer_terms_condition;
      this.credit_limit = response.credit_limit;
      this.reseller_id = response.reseller_id;
      this.discount_percentage = response.discount_percentage;
      if(response.system_discount_3cx == 0){
        this.system_discount_3cx = false;
      } else {
        this.system_discount_3cx = true;
      }
    } else {
      this.showToast('No Data Found','top');
    }
  });
  localStorage.removeItem('customer_special_id'); 
}
addEmail(mail) {
  
  if(mail == 'email'){
    this.emails.push({ "email": "" },);
    console.log(this.emails);
  } else{
    this.financeemail_options.push({ "finance_email": "" },
    );
    console.log(this.financeemail_options)
  }
  
  
}

delEmail(mail,id) {
  if(mail === 'email' ){
    this.emails.splice(id, 1)
    console.log(this.emails);
  } else{
    this.financeemail_options.splice(id, 1)
    console.log(this.financeemail_options)
  }
}
datachanged(e:any){
  this.system_discount_3cx = e.detail.checked;
 }
Update(){
  console.log(this.emails);
  console.log(this.financeemail_options);
  if(this.system_discount_3cx == true){
    this.system_discount_3cx = '1';
  } else {
    this.system_discount_3cx = '0';
  }
  let updteData:any = '{"access_token":"'+this.accessToken+'","operation":"customer_update","moduleType":"global_search","api_type":"web","element_data":{"action":"update_customer","customer_id":"'+this.customer_special_id+'","email":'+JSON.stringify(this.emails)+',"finance_email":'+JSON.stringify(this.financeemail_options)+',"terms_condition":"'+this.customer_terms_condition+'","credit_amt":"'+this.credit_limit+'","reseller_id":"'+this.reseller_id+'","system_discount":"'+this.system_discount_3cx+'","reseller_dis_per":"'+this.discount_percentage+'"}}';
  console.log(updteData);
  this.apiservice.sendServer(updteData).then((response:any) => {
    if(response.status){
      this.showToast('Data Updated successfully','top');
      localStorage.removeItem('customer_special_id'); 
      this.router.navigate(['/global-search']);
    } else {
      this.showToast('some Error Occured','top');
    }
  });
}
}
