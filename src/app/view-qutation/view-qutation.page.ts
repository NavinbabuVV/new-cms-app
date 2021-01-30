import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-view-qutation',
  templateUrl: './view-qutation.page.html',
  styleUrls: ['./view-qutation.page.scss'],
})
export class ViewQutationPage implements OnInit {
  accessToken: any;
  quotation: any;
  billerName:any;
  transaction_date:any;
  priority:any
  public isTransaction = false;
  constructor(public apiservice: ApiService,public toastController: ToastController,private router:Router) { }

  ngOnInit() {
    this.accessToken = localStorage.getItem('access_user');
    if(this.accessToken == ''){
      this.router.navigate(['/login']);
    } 
    this.quotation = localStorage.getItem('transaction_approval_id');
    if(this.quotation){
      this.viewQuotation(this.quotation);
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
  viewQuotation(quotation){
    console.log(quotation);
    let qutationList:any = '{"access_token":"'+this.accessToken+'","operation":"quotationView","moduleType":"transactionapproval_quotation","api_type":"web","element_data":{"action":"view_quotation","transaction_approval_id":"'+quotation+'"}}';
      this.apiservice.sendServer(qutationList).then((response:any) => {
      	console.log(response);
        if(response.status == 'true'){
          this.billerName = response.options[0].billerName;
          this.transaction_date = response.options[0].transaction_date;
          this.priority = response.options[0].priority;
        }
      });
  }
  approve(quotation){
    console.log(quotation);
    let qutationList:any = '{"access_token":"'+this.accessToken+'","operation":"Approve","moduleType":"transactionapproval_quotation","api_type":"web","element_data":{"action":"Approve_quotation","transaction_approval_id":"'+quotation+'"}}';
    this.apiservice.sendServer(qutationList).then((response:any) => {
      console.log(response);
      if(response.status == 'true'){
        this.showToast('Transaction has been Approved','top');
        this.router.navigate(['/quotation']);
      } else {
        this.showToast('Sorry! some error occured','top');
        this.router.navigate(['/quotation']);
      }
    });
  }
  reject(quotation){
    console.log(quotation);
    let qutationList:any = '{"access_token":"'+this.accessToken+'","operation":"Reject","moduleType":"transactionapproval_quotation","api_type":"web","element_data":{"action":"Reject_quotation","transaction_approval_id":"'+quotation+'"}}';
    this.apiservice.sendServer(qutationList).then((response:any) => {
      console.log(response);
      if(response.status == 'true'){
        this.showToast('Transaction has been Rejected','top');
        this.router.navigate(['/quotation']);
      } else {
        this.showToast('Sorry! some error occured','top');
        this.router.navigate(['/quotation']);
      }
    });
  }
}
