import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-listing-payouts',
  templateUrl: './listing-payouts.page.html',
  styleUrls: ['./listing-payouts.page.scss'],
})
export class ListingPayoutsPage implements OnInit {
  userId: any;
  auth_token: any;
  values: any;
  table_listing: any;
  unpaid_cus_amt: any;
  currency_name: any;
  payout_unpaid: any;
  yearly_payment: any;
  constructor(public apiservice: ApiService, private router: Router) {
    this.userId = localStorage.getItem('userId');
    this.auth_token = localStorage.getItem('auth_token');
  }

  ngOnInit() {
    // this.getpayouts();
  }

  ionViewDidEnter() {
    this.getpayouts();
  }

  getpayouts() {
    let payouts_req: any = new Object();



    let call_balance_count: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': payouts_req
    });


    payouts_req.action = 'commission_details';
    payouts_req.customer_id = this.userId;

    this.apiservice.newsendServer(call_balance_count).then((response: any) => {
      if (response.status = 'true') {
        console.log(response);
        this.values = response.List.reverse(); 
        this.table_listing = response.commission_total_details;
        // this.unpaid_cus_amt = response.unpaid_cus_amt;
        this.currency_name = response.def_currency_name;
        this.payout_unpaid = response.unpaid_cus_amt;
        this.yearly_payment = response.year_amount;
      }
      // this.apiservice.dismiss();
    },
      (error) => {
        console.log(error);
        // this.apiservice.dismiss();
      });
  }


}
