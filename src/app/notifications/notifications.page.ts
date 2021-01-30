import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  accessToken: any;
  notifications: any;
  auth_token: any;
  userId: any;
  nodata = false;
  datas = false;
  constructor(private http: HttpClient, private theInAppBrowser: InAppBrowser, public apiservice: ApiService, public toastController: ToastController, private router: Router) {
  }

  ngOnInit() {
    this.auth_token = localStorage.getItem('auth_token');
    this.accessToken = localStorage.getItem('access_user');
    this.userId = localStorage.getItem('userId');
    this.commonDetails();
  }


  
  goToTestPage() {
    if (localStorage.getItem('resellerstate') == '1') {
      this.router.navigateByUrl('/listing-payouts');
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }
  

  doRefresh(ev) {
    //   Notification list API
    //   {
    //      "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJlcnAuY2FsNGNhcmUuY29tIiwiYXVkIjoiZXJwLmNhbDRjYXJlLmNvbSIsImlhdCI6MTYwMTAzMDQ1NywibmJmIjoxNjAxMDMwNDU3LCJleHAiOjE2MDEwNDg0NTcsImFjY2Vzc19kYXRhIjp7InRva2VuX2FjY2Vzc0lkIjpudWxsLCJ0b2tlbl9hY2Nlc3NOYW1lIjpudWxsLCJ0b2tlbl9hY2Nlc3NUeXBlIjpudWxsfX0.DO5AhlihljqX8RVsGTRLZYFhqsbFlvfMeiQuTSEIH7Y",
    //      "operation": "curlDatas",
    //      "moduleType": "notification",
    //      "api_type": "web",
    //      "element_data":{
    //          "action":"notification_list",
    //          "customer_id": "NTIyOA=="
    //          }
    //  }

  }

  commonDetails() {
    let get_notify_req: any = new Object();


    let edition_change_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'notification',
      'element_data': get_notify_req
    });

    get_notify_req.action = 'notification_list';
    get_notify_req.customer_id = this.userId;

    this.apiservice.newsendServer(edition_change_list).then((response: any) => {
      if(response.status == 'true'){
      console.log(response);
      this.datas = true;
      this.notifications = response.list;
      
      }else{
        this.datas = false;
        this.nodata = true;
      }
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });

  }


  updatenotify(ids,types) {

    if(types == 'support'){
      this.router.navigateByUrl('/support-ticket');
    }else if(types == 'referral'){
      this.router.navigateByUrl('/referral');
    }else if(types == 'renewal'){
      this.router.navigateByUrl('/license');
    }else if(types == 'payment_add'){
      this.router.navigateByUrl('/dashboard');
    }else if(types == 'invoice'){
      this.router.navigateByUrl('/invoice');
    }else if(types == 'payment_made'){
      this.router.navigateByUrl('/dashboard');
    }else if(types == 'app'){
      this.router.navigateByUrl('/newsevents');
    }

    let get_notify_update_req: any = new Object();


    let notify_change_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'notification',
      'element_data': get_notify_update_req
    });

    get_notify_update_req.action = 'notification_update';
    get_notify_update_req.customer_id = this.userId;
    get_notify_update_req.id = ids;

    this.apiservice.newsendServer(notify_change_list).then((response: any) => {
      console.log(response);
      // this.notifications = response.options;
      if(response.status == 'true'){
      this.commonDetails();
      }
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });
  }





}
