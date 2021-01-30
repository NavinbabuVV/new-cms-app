import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-actual-cost',
  templateUrl: './actual-cost.page.html',
  styleUrls: ['./actual-cost.page.scss'],
})
export class ActualCostPage implements OnInit {
  accessToken: any;
  quotation: any;
  products: any;
  total_net_total:any;
  total_actual_price:any;
  total_actual_net_total:any
  public isTransaction = false;
  constructor(public apiservice: ApiService,public toastController: ToastController,private router:Router) { }

  ngOnInit() {
    this.accessToken = localStorage.getItem('access_user');
    if(this.accessToken == ''){
      this.router.navigate(['/otppage']);
    } 
    this.quotation = localStorage.getItem('quotation_id');
    if(this.quotation){
      this.viewActualCost(this.quotation);
    } 
   
  }


  removeCart(name){

  }
  doRefresh(ev){

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
  viewActualCost(quotation){
    console.log(quotation);
    let qutationList:any = '{"access_token":"'+this.accessToken+'","operation":"actualcostview","moduleType":"transactionapproval_quotation","api_type":"web","element_data":{"action":"actual_cost_view","quotation_id":"'+quotation+'"}}';
      this.apiservice.sendServer(qutationList).then((response:any) => {
      	console.log(response);
        if(response.status == 'true'){
          this.products = response.options;
          this.total_net_total = response.total_net_total;
          this.total_actual_price = response.total_actual_price;
          this.total_actual_net_total = response.total_actual_net_total
        }
      });
  }
}
