import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.page.html',
  styleUrls: ['./app-settings.page.scss'],
})
export class AppSettingsPage implements OnInit {
  userId: any;
  auth_token: any;
  reseller_dash = false;
  checksum = false;
  fingers: any;
  resell_dashboard: any;
  reseller_view = false;
  constructor(public apiservice: ApiService, private router: Router,) {
    this.userId = localStorage.userId;
    this.auth_token = localStorage.auth_token;
    this.appsettings();
    if ((localStorage.getItem('resellerstate') == '1')) {
      this.reseller_view = true;
      if(localStorage.getItem('reseller_dashboard') == '1'){
        this.reseller_dash = true;
      }else if(localStorage.getItem('reseller_dashboard') == '0'){
        this.reseller_dash = false;
      }
    }
  }

  ngOnInit() {
;
  }

  goToTestPage() {
    if (localStorage.getItem('resellerstate') == '1' && localStorage.getItem('reseller_dashboard') == '1') {
      this.router.navigateByUrl('/listing-payouts');
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }

  logout() {
    this.router.navigate(['/otppage']);
  }

  appsettings() {

    this.apiservice.present("Loading");
    let setting_req: any = new Object();

    let settings: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': setting_req
    });


    setting_req.action = 'app_settings';
    setting_req.customer_id = this.userId;

    this.apiservice.newsendServer(settings).then((response: any) => {
      console.log(response);
      if (response.status == 'true') {
        if (response.finger_chk == 1) {
          this.checksum = true;
        } else if (response.finger_chk == 0) {
          this.checksum = false;
        }
      }
      this.apiservice.dismiss();
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });


  }


  logoutsession() {


    let logout_clear_req: any = new Object();

    let logout_clear: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': logout_clear_req
    });

    logout_clear_req.action = "clear_session";
    logout_clear_req.customer_id = this.userId;


    this.apiservice.newsendServer(logout_clear).then((response: any) => {
      console.log(response);

      console.log(localStorage.getItem('typef'));
      // if (localStorage.getItem('typef') == '1') {
      //   console.log(localStorage.getItem('typef'));

      //   localStorage.setItem('calling', '0');
      //   localStorage.removeItem("userperms");
      //   localStorage.removeItem("username");
      //   localStorage.removeItem("auth_token");
      //   localStorage.removeItem("emailid");

      //   this.navigations = { state: { logintype: 'fingerprintlogin' } };
      //   this.router.navigate(['/fingerprint'], this.navigations);

      // } else {
      console.log("0");
      var myItem = localStorage.getItem('device_token');
      localStorage.clear();
      localStorage.setItem('device_token', myItem);
      this.router.navigate(['/otppage']);

      // }
    },
      (error) => {
        console.log(error);
      });

  }


  updatesettings(events: any, types) {

    console.log(types);
    console.log(events.detail.checked);
    let values = events.detail.checked;

    if (values == true && types == 'al') {
      this.fingers = 1;
    } else if (values == false && types == 'al') {
      this.fingers = 0;
    }
    // return false;


    let update_setting_req: any = new Object();

    let update_settings: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': update_setting_req
    });


    update_setting_req.action = 'app_settings_update';
    update_setting_req.customer_id = this.userId;
    update_setting_req.finger_chk = this.fingers;

    this.apiservice.newsendServer(update_settings).then((response: any) => {
      console.log(response);
      if (response.status == 'true') {
      }
      this.apiservice.dismiss();
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });

  }



updatecheck(events, types){

  console.log(types);
  console.log(events.detail.checked);
  let values = events.detail.checked;


  if (values == true && types == 'rd') {
    this.resell_dashboard = 1;
  } else if (values == false && types == 'rd') {
    this.resell_dashboard = 0;
  }


  let update_setting_req: any = new Object();

  let update_settings: any = ({
    'api_type': 'web',
    'operation': 'curlDatas',
    'access_token': this.auth_token,
    'moduleType': 'login',
    'element_data': update_setting_req
  });


  update_setting_req.action = 'reseller_dashboard_update';
  update_setting_req.customer_id = this.userId;
  update_setting_req.reseller_dashboard = this.resell_dashboard;

  this.apiservice.newsendServer(update_settings).then((response: any) => {
    if(response.status == 'true'){
      localStorage.setItem('reseller_dashboard', response.response);
    }
  },
  (error) => {
    console.log(error);
    this.apiservice.dismiss();
  });

}

}