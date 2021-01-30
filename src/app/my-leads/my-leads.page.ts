import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-my-leads',
  templateUrl: './my-leads.page.html',
  styleUrls: ['./my-leads.page.scss'],
})
export class MyLeadsPage implements OnInit {
  accessToken: any;
  enquires: any;
  enquiry_assigned:any;
  public isTransaction = true;
  public oldEnquiry = false;
  public isAccord = 'up';
  filters: any;
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
    let enquiry:any = '{"access_token":"'+this.accessToken+'","operation":"my_lead_list","moduleType":"enquiry_management","api_type":"web","element_data":{"action":"mylead"}}';
    this.apiservice.sendServer(enquiry).then((response:any) => {
      console.log(response);
      if(response.status == 'true'){
        this.enquires = response.website_options;
        this.enquiry_assigned = response.website_assigned_options;
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

    doRefresh(event) {
      this.ngOnInit();
        setTimeout(() => {
          console.log('Async operation has ended');
          event.target.complete();
        }, 2000);
      }
    assignEquiry(enq_no,cust_name){
      localStorage.setItem('enquiy_no', enq_no);
      localStorage.setItem('enquiry_cust_name', cust_name);
      this.router.navigate(['/all-lead-result']);
    }
}
