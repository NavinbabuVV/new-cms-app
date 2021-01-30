import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-prepaid',
  templateUrl: './prepaid.page.html',
  styleUrls: ['./prepaid.page.scss'],
})
export class PrepaidPage implements OnInit {
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
  prepaid: any = [];
  userId;
  nodata = false;
  auth_token;
  infinite_value;
  offset_value = 0;
  total_record;
  constructor(private router: Router, public apiservice: ApiService, private theInAppBrowser: InAppBrowser) { }

  ngOnInit() {
    this.userId = localStorage.userId;
    this.auth_token = localStorage.auth_token;
    this.prepaidnotedetails(this.offset_value);

  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      let offset_inc = this.offset_value + 10;
      this.offset_value = offset_inc;
      if (this.prepaid.length != this.total_record) {
        this.prepaidnotedetails(offset_inc);
      }
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (data.length == 1000) {
      // event.target.disabled = true;
      // }
    }, 2000);
  }

  goToTestPage() {
    if (localStorage.getItem('resellerstate') == '1' && localStorage.getItem('reseller_dashboard') == '1') {
      this.router.navigateByUrl('/listing-payouts');
    }else{
      this.router.navigateByUrl('/dashboard');
    }
  }


  prepaidnotedetails(offset) {

    if (this.offset_value == 0) {
      this.apiservice.present("Prepaid Details");
    }
    let licence_list_req: any = new Object();


    let licence_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': licence_list_req
    });


    licence_list_req.action = 'prepaid_note';
    licence_list_req.customer_id = this.userId;
    licence_list_req.limit = '10';
    licence_list_req.offset = offset;

    this.apiservice.newsendServer(licence_list).then((response: any) => {
      console.log(response);
      if (response.status == 'true') {
        this.total_record = response.Total;
        // this.prepaid = response.Prepaid_note;
        for (let plist of response.Prepaid_note) {
          this.prepaid.push(plist);
         
        }
        if (this.prepaid.length == 0) {
          this.nodata = true;
        }

        this.apiservice.dismiss();
      } else {
        this.nodata = true;
        this.apiservice.dismiss();
      }
      this.apiservice.dismiss();
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });






  }

  public openWithSystemBrowser(url: string) {
    let target = "system";
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
