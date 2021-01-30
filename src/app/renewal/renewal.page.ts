import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-renewal',
  templateUrl: './renewal.page.html',
  styleUrls: ['./renewal.page.scss'],
})
export class RenewalPage implements OnInit {
  userId: any;
  auth_token: any;
  // renewals: any;
  renewals: any = [];
  total_pages: any;
  offset_value = 0;
  constructor(public apiservice: ApiService, private router: Router) {
    this.userId = localStorage.userId;
    this.auth_token = localStorage.auth_token;
  }

  ngOnInit() {
    this.getRenewal(this.offset_value);
  }


  searchbars(events){
  
  let renewal_search_req: any = new Object();

  let renewal_search_list: any = ({
    'api_type': 'web',
    'operation': 'curlDatas',
    'access_token': this.auth_token,
    'moduleType': 'login',
    'element_data': renewal_search_req
  });


  renewal_search_req.action = 'list_renewal_reminder';
  renewal_search_req.customer_id = this.userId;
  renewal_search_req.limit = '10';
  renewal_search_req.offset = this.offset_value;
  renewal_search_req.search_text = events.detail.value;

  this.apiservice.newsendServer(renewal_search_list).then((response: any) => {
    console.log(response);
    this.renewals = [];
    for (let row of response.options) {
    this.renewals.push(row);
  }

  },
  (error) => {
    console.log(error);
    this.apiservice.dismiss();
  });

    
  }


  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      let offset_inc = this.offset_value + 10;
      this.offset_value = offset_inc;
      if (this.renewals.length != this.total_pages) {
        this.getRenewal(offset_inc);
      }
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (data.length == 1000) {
      // event.target.disabled = true;
      // }
    }, 2000);
  }

  goToTestPage() {
    if (localStorage.getItem('resellerstate') == '1') {
      this.router.navigateByUrl('/listing-payouts');
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }

  getRenewal(offset) {
    // {"access_token":"","operation":"curlDatas","moduleType":"login","api_type":"web","element_data":{"action":"list_renewal_reminder","customer_id":"NDgwNQ===","limit":"10","offset":"0"}}
  
    

    let renewal_list_req: any = new Object();

    let renewal_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': renewal_list_req
    });


    renewal_list_req.action = 'list_renewal_reminder';
    renewal_list_req.customer_id = this.userId;
    renewal_list_req.limit = '10';
    renewal_list_req.offset = offset;

    this.apiservice.newsendServer(renewal_list).then((response: any) => {
      if(response.status == 'true'){
      console.log(response);
      // this.renewals = response.options;
      for (let row of response.options) {
        this.renewals.push(row);
      }
      this.total_pages = response.total;
      }

    },
    (error) => {
      console.log(error);
      this.apiservice.dismiss();
    });
  
  }


}
