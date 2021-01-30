import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.page.html',
  styleUrls: ['./referral.page.scss'],
})
export class ReferralPage implements OnInit {
  options: InAppBrowserOptions = {
    location: 'yes',//Or 'no' 
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes',//Android only ,shows browser zoom controls 
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only 
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only 
    toolbar: 'yes', //iOS only 
    enableViewportScale: 'no', //iOS only 
    allowInlineMediaPlayback: 'no',//iOS only 
    presentationstyle: 'pagesheet',//iOS only 
    fullscreen: 'yes',//Windows only    
  };
  referral_list: any = [];
  accessToken: any;
  userId: any;
  auth_token: any;
  infinite_value;
  offset_value = 0;
  total_record: any;
  nodata = false;
  constructor(public apiservice: ApiService, private router: Router, private theInAppBrowser: InAppBrowser) { }

  ngOnInit() {
    this.accessToken = localStorage.getItem('access_user');
    this.userId = localStorage.getItem('userId');
    this.auth_token = localStorage.getItem('auth_token');
    this.referralList(this.offset_value);
  }

  goToTestPage() {
    if (localStorage.getItem('resellerstate') == '1' && localStorage.getItem('reseller_dashboard') == '1') {
      this.router.navigateByUrl('/listing-payouts');
    }else{
      this.router.navigateByUrl('/dashboard');
    }
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      let offset_inc = this.offset_value + 10;
      this.offset_value = offset_inc;
      if (this.referral_list.length != this.total_record) {
        this.referralList(offset_inc);
      }
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (data.length == 1000) {
      // event.target.disabled = true;
      // }
    }, 2000);
  }

  referralList(offset) {

    // this.apiservice.present("Loading");

    let referral_list_req: any = new Object();


    let edition_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': referral_list_req
    });


    referral_list_req.action = 'referral';
    referral_list_req.customer_id = this.userId;
    referral_list_req.limit = '10';
    referral_list_req.offset = offset;


    this.apiservice.newsendServer(edition_list).then((response: any) => {
      console.log(response);
      if (response.status == 'true') {
        this.total_record = response.Total;
        // this.referral_list = response.Referral;
        for (let row of response.Referral) {
          this.referral_list.push(row);
         
        }
        console.log(this.referral_list);;
      } else {
        this.nodata = true;
      }
      this.apiservice.dismiss();
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });


  }



  public openWithSystemBrowser(url: string) {
    let target = "_system";
    this.theInAppBrowser.create(url, target, this.options);
  }
  public openWithInAppBrowser(url: string) {
    let target = "_blank";
    this.theInAppBrowser.create(url, target, this.options);
  }
  public openWithCordovaBrowser(url: string) {
    let target = "_self";
    this.theInAppBrowser.create(url, target, this.options);
  }



}
