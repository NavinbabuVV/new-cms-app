import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular';
import Swal from 'sweetalert2'
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.page.html',
  styleUrls: ['./quotation.page.scss'],
})
export class QuotationPage implements OnInit {
  accessToken: any;
  quotations: any;
  quotations_approved:any;
  public isTransaction = true;
  public isOldQuotation = false;
  public isAccord = 'up';
  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
};
  
  constructor(private theInAppBrowser: InAppBrowser,public apiservice: ApiService,public toastController: ToastController,private router:Router) { }

  ngOnInit() {
    this.accessToken = localStorage.getItem('access_user');
    if(this.accessToken == ''){
      this.router.navigate(['/otppage']);
    } 
    this.quotationList();
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
  quotationList(){
      let qutationList:any = '{"access_token":"'+this.accessToken+'","operation":"getquotationList","moduleType":"transactionapproval_quotation","api_type":"web","element_data":{"action":"transactionapproval_quotation_list"}}';
      this.apiservice.sendServer(qutationList).then((response:any) => {
      	console.log(response);
        if(response.status == 'true'){
          this.quotations = response.options;
          this.quotations_approved = response.approved_options;
        }
      });
  }
  quotationDetails(quotation){

  }
  viewQuotation(quotation){
    localStorage.setItem('transaction_approval_id', quotation);
    this.router.navigate(['/view-qutation']);
  }

  doRefresh(event) {
  this.quotationList();
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

  actualCost(quotationID){
    localStorage.setItem('quotation_id', quotationID);
    this.router.navigate(['/actual-cost']);
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
            this.quotationList();
            this.router.navigate(['/quotation']);

          } else {
            this.showToast('Sorry! some error occured','top');
            this.quotationList();
            this.router.navigate(['/quotation']);
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
          this.quotationList();
            this.router.navigate(['/quotation']);
          } else {
            this.showToast('Sorry! some error occured','top');
            this.router.navigate(['/quotation']);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Transaction not rejected',
          'error'
        );
        this.quotationList();
      }
    })

  }


  public openWithInAppBrowser(url){
    let target = "_system";
    this.theInAppBrowser.create(url,target,this.options);
}



enquiryCommand(tranc_quotation_id){
  localStorage.setItem('tranc_quotation_id', tranc_quotation_id);
  this.router.navigate(['/quotation-comments']);
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
deleteQuote(quotation){
  console.log(quotation);
  Swal.fire({
    title: 'Are you sure?',
    text: 'You want to delete this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, Delete it!',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.value) {
      let qutationList:any = '{"access_token":"'+this.accessToken+'","operation":"quotationDelete","moduleType":"transactionapproval_quotation","api_type":"web","element_data":{"action":"Delete_quotation","transaction_approval_id":"'+quotation+'"}}';
      this.apiservice.sendServer(qutationList).then((response:any) => {
        console.log(response);
        if(response.status == 'true'){
         // this.showToast('Transaction has been Rejected','top');
         Swal.fire(
          'Rejected!',
          'Transaction has been Deleted',
          'success'
        );
        this.quotationList();
          this.router.navigate(['/quotation']);
        } else {
          this.showToast('Sorry! some error occured','top');
          this.router.navigate(['/quotation']);
        }
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Transaction not Deleted',
        'error'
      );
      this.quotationList();
    }
  })

}
}
