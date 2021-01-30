import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-enquiry-ticket-assign',
  templateUrl: './enquiry-ticket-assign.page.html',
  styleUrls: ['./enquiry-ticket-assign.page.scss'],
})
export class EnquiryTicketAssignPage implements OnInit {
  accessToken: any;
  enqury: any;
  billerName:any;
  transaction_date:any;
  enquiry_cust_name:any;
  department_list:any;
  agents:any;
  department:any;
  department_id: any;
  department_mail: any;
  agent: any;
  public isTransaction = false;
  constructor(public apiservice: ApiService,public toastController: ToastController,private router:Router) { }

  ngOnInit() {
    this.accessToken = localStorage.getItem('access_user');
    if(this.accessToken == ''){
      this.router.navigate(['/otppage']);
    } 
    this.enqury = localStorage.getItem('enquiy_no');
    if(this.enqury){
      this.enquiry_cust_name = localStorage.getItem('enquiry_cust_name');
      this.departmentlist();
    } else{
      this.router.navigate(['/tabs']);
    }
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
  departmentlist(){
    let enquiry:any = '{"access_token":"'+this.accessToken+'","operation":"get_departmentdetails","moduleType":"enquiry_management","api_type":"web","element_data":{"action":"department_dropdown","ticket_id":"'+this.enqury+'"}}';
    this.apiservice.sendServer(enquiry).then((response:any) => {
      console.log(response);
      if(response.status == 'true'){
        this.department_list = response.options;
      }
    });
  }


  departmentAgent(dept_id){
    var array = dept_id.split(','); // this will make string an array 
  	this.department_id = array[0];
    this.department_mail = array[1];
    this.department = array[2];
    let enquiry:any = '{"access_token":"'+this.accessToken+'","operation":"get_agentdetails","moduleType":"enquiry_management","api_type":"web","element_data":{"action":"agent_dropdown","ticket_id":"'+this.enqury+'","dept_id":"'+this.department_id+'"}}';
    this.apiservice.sendServer(enquiry).then((response:any) => {
      console.log(response);
      if(response.status == 'true'){
        this.agents = response.options;
      }
    });
  }

  doRefresh(event) {
    this.ngOnInit();
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);
    }

assignAgent(){
if(this.department_id == undefined || this.department_id == ''){
  this.showToast('Please select department','top');
  return false;
}
if(this.agent == '' || this.agent == undefined){
  this.showToast('Please select agent','top');
  return false;
}

    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to assign this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
    let enquiry:any = '{"access_token":"'+this.accessToken+'","operation":"create_ticket_website","moduleType":"enquiry_management","api_type":"web","element_data":{"action":"enquiry_website_ticket_create","enquiry_id":"'+this.enqury+'","department_id":"'+this.department_id+'","department_email":"'+this.department_mail+'","agent_name":"'+this.agent+'"}}';
    console.log(enquiry);
    this.apiservice.sendServer(enquiry).then((response:any) => {
      console.log(response);
      if(response.status == 'true'){
        Swal.fire(
          'Assigned!',
          'success'
        );
        localStorage.removeItem('enquiy_no');
        localStorage.removeItem('enquiry_cust_name');
        this.router.navigate(['/enquiry-management']);
      } else {
        Swal.fire(
          'Sorry, error occured',
        );
        localStorage.removeItem('enquiy_no');
        localStorage.removeItem('enquiry_cust_name');
        this.router.navigate(['/enquiry-management']);
      }
    });
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    Swal.fire(
      'Cancelled',
    )
  }
})
  }
}
