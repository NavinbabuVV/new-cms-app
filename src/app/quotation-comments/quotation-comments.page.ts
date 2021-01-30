import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-quotation-comments',
  templateUrl: './quotation-comments.page.html',
  styleUrls: ['./quotation-comments.page.scss'],
})
export class QuotationCommentsPage implements OnInit {
  accessToken: any;
  quotation: any;
  comments:any;
  comment:any;
  constructor(public apiservice: ApiService,public toastController: ToastController,private router:Router) { }

  ngOnInit() {
    this.accessToken = localStorage.getItem('access_user');
    if(this.accessToken == ''){
      this.router.navigate(['/otppage']);
    } 
    this.quotation = localStorage.getItem('tranc_quotation_id');
    if(this.quotation){
      this.enquiryCommand(this.quotation);
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
  doRefresh(event) {
    this.quotation = localStorage.getItem('tranc_quotation_id');
    if(this.quotation){
      this.enquiryCommand(this.quotation);
    } 
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);
    }
  enquiryCommand(tranc_quotation_id){
    console.log(tranc_quotation_id)
    let qutationList:any = '{"access_token":"'+this.accessToken+'","operation":"Enquirycommand","moduleType":"transactionapproval_quotation","api_type":"web","element_data":{"action":"transaction_enquiry_command","transaction_approval_id":"'+tranc_quotation_id+'"}}';
    this.apiservice.sendServer(qutationList).then((response:any) => {
      console.log(response);
      if(response.status == 'true'){
this.comments = response.comments;

      }
    });
    }

    addComment(tranc_quotation_id){
      console.log(tranc_quotation_id)
      let qutationList:any = '{"access_token":"'+this.accessToken+'","operation":"Savecomment","moduleType":"transactionapproval_quotation","api_type":"web","element_data":{"action":"save_comment","transaction_approval_id":"'+tranc_quotation_id+'","comments":"'+this.comment+'"}}';
      this.apiservice.sendServer(qutationList).then((response:any) => {
        console.log(response);
        if(response.status == 'true'){
          Swal.fire(
            'Added!',
            'Comment has been added',
            'success'
          )
        this.comments = response.comments;
        }
      });
    }

    goBack() {
      localStorage.removeItem('tranc_quotation_id');
      this.router.navigate(['/quotation']); 
    }
    
}
