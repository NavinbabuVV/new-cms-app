import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular';
import Swal from 'sweetalert2'
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-did-number',
  templateUrl: './did-number.page.html',
  styleUrls: ['./did-number.page.scss'],
})
export class DidNumberPage implements OnInit {
  accessToken: any;
  didnumbers: any;
  didnumbers_approved:any;
  public isTransaction = true;
  public isOldQuotation = false;
  public isAccord = 'up';
  constructor(private theInAppBrowser: InAppBrowser,public apiservice: ApiService,public toastController: ToastController,private router:Router) { }

  ngOnInit() {
    this.accessToken = localStorage.getItem('access_user');
    if(this.accessToken == ''){
      this.router.navigate(['/otppage']);
    } 
    this.didList();
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
  didList(){
      let didList:any = '{"access_token":"'+this.accessToken+'","operation":"getdidnumberList","moduleType":"transactionapproval_didnumber","api_type":"web","element_data":{"action":"transactionapproval_didnumber_list"}}';
      this.apiservice.sendServer(didList).then((response:any) => {
      	console.log(response);
        if(response.status == 'true'){
          this.didnumbers = response.options;
          this.didnumbers_approved = response.approved_options;
        }
      });
  }


  doRefresh(event) {
  this.didList();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
        var data='10';
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (data.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }



  approve(quotation){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to approve this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Approve it!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        let qutationList:any = '{"access_token":"'+this.accessToken+'","operation":"Approve","moduleType":"transactionapproval_quotation","api_type":"web","element_data":{"action":"Approve_quotation","transaction_approval_id":"'+quotation+'"}}';
        this.apiservice.sendServer(qutationList).then((response:any) => {
          console.log(response);
          if(response.status == 'true'){
            Swal.fire(
              'Approved!',
              'Transaction has been Approved',
              'success'
            );
            this.didList();
            this.router.navigate(['/did-number']);

          } else {
            this.showToast('Sorry! some error occured','top');
            this.didList();
            this.router.navigate(['/did-number']);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Transaction not Approved',
          'error'
        )
      }
    })
  }



  reject(quotation){
    console.log(quotation);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to reject this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject it!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        let qutationList:any = '{"access_token":"'+this.accessToken+'","operation":"Reject","moduleType":"transactionapproval_quotation","api_type":"web","element_data":{"action":"Reject_quotation","transaction_approval_id":"'+quotation+'"}}';
        this.apiservice.sendServer(qutationList).then((response:any) => {
          console.log(response);
          if(response.status == 'true'){
           // this.showToast('Transaction has been Rejected','top');
           Swal.fire(
            'Rejected!',
            'Transaction has been Rejected',
            'success'
          );
          this.didList();
            this.router.navigate(['/did-number']);
          } else {
            this.showToast('Sorry! some error occured','top');
            this.router.navigate(['/did-number']);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Transaction not rejected',
          'error'
        );
        this.didList();
      }
    })

  }

  oldQutation(type){
    if(type === false){
      this.isOldQuotation = true;
      this.isAccord = 'down';
    } else {
      this.isOldQuotation = false;
      this.isAccord = 'up';
    }
    }
}
