import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-today-currency',
  templateUrl: './today-currency.page.html',
  styleUrls: ['./today-currency.page.scss'],
})
export class TodayCurrencyPage implements OnInit {
  userId: any;
  auth_token: any;
  today_dates: any;
  datas: any;
  curr_values: any;
  keys:any;

  constructor(public apiservice: ApiService, private router: Router) {
    this.userId = localStorage.getItem('userId');
    this.auth_token = localStorage.getItem('auth_token');
    this.curr_values = 'EUR';
  }

  ngOnInit() {
    this.getcurrency();
  }


  currency_values() {
    console.log(this.curr_values);
    this.getcurrency();
  }
  getcurrency() {
    let currency_list_req: any = new Object();
    // this.mainObject  =  { 'name': 'Mike', 'age':36, 'job':'programmer'}
    // this.keys = Object.keys(this.mainObject);

    let currency_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': currency_list_req
    });

    currency_list_req.action = 'single_currency_view';
    currency_list_req.currency_name = this.curr_values;

    this.apiservice.newsendServer(currency_list).then((response: any) => {
      if (response.status == 'true') {
        this.datas = response.currency_array_values;
        this.keys = Object.keys(this.datas);
        console.log(this.keys);
        this.today_dates = response.curr_date;
      }
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });
  }

}
