import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
userId: any;
auth_token: any;
contact_details: any;
  constructor(private router: Router, public apiservice: ApiService) { }

  ngOnInit() {
    this.userId = localStorage.userId;
    this.auth_token = localStorage.auth_token;
    this.getcontact();
  }

  
  
  goToTestPage() {
    if (localStorage.getItem('resellerstate') == '1') {
      this.router.navigateByUrl('/listing-payouts');
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }
  
getcontact(){
  this.apiservice.present("Loading");
  let country_list_req: any = new Object();

  let country_list: any = ({
    'api_type': 'web',
    'operation': 'curlDatas',
    'access_token': this.auth_token,
    'moduleType': 'login',
    'element_data': country_list_req
  });


  country_list_req.action = 'contact_flag';
  country_list_req.customer_id = this.userId;

  this.apiservice.newsendServer(country_list).then((response: any) => {
    console.log(response);
    if (response.status == 'true') {
      this.contact_details = response.cms_menu_data.secondary_data;
    } 
    this.apiservice.dismiss();
  },
    (error) => {
      console.log(error);
      this.apiservice.dismiss();
    });
}

myfunction(number){
  window.open('tel:'+number+'','_self');
}


}
