import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-reseller-management',
  templateUrl: './reseller-management.page.html',
  styleUrls: ['./reseller-management.page.scss'],
})
export class ResellerManagementPage implements OnInit {
  accessToken: any;
  enquires: any;
  enquiry_assigned:any;
  public isTransaction = true;
  public oldEnquiry = false;
  public isAccord = 'up';
  constructor(public apiservice: ApiService,public toastController: ToastController,private router:Router) { }

  ngOnInit() {
    this.accessToken = localStorage.getItem('access_user');
    if(this.accessToken == ''){
      this.router.navigate(['/otppage']);
    } 
    this.enquiryList();
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
  enquiryList(){
    let enquiry:any = '{"access_token":"'+this.accessToken+'","operation":"getreseller_list","moduleType":"enquiry_management","api_type":"web","element_data":{"action":"reseller"}}';
    this.apiservice.sendServer(enquiry).then((response:any) => {
      console.log(response);
      if(response.status == 'true'){
        this.enquires = response.reseller_options;
        this.enquiry_assigned = response.reseller_assigned_options;
      }
    });
}

oldEnquires(type){
  if(type === false){
    this.oldEnquiry = true;
    this.isAccord = 'down';
  } else {
    this.oldEnquiry = false;
    this.isAccord = 'up';
  }
  }


  assignEquiry(enq_no,cust_name){
    localStorage.setItem('r_enquiy_no', enq_no);
    localStorage.setItem('r_enquiry_cust_name', cust_name);
    this.router.navigate(['/reseller-ticket-assign-page']);
  }
  doRefresh(event) {
    this.enquiryList();
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);
    }
  


    showComments(id){

      let enquiry:any = '{"access_token":"'+this.accessToken+'","operation":"getreseller_message","moduleType":"enquiry_management","api_type":"web","element_data":{"action":"reseller_message","enquiry_id":"'+id+'"}}';
      this.apiservice.sendServer(enquiry).then((response:any) => {
        console.log(response);
        if(response.status == 'true'){
                Swal.fire(response.enquiry_message)

        }
      });


    }
}
