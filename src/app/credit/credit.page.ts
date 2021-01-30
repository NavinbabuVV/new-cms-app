import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.page.html',
  styleUrls: ['./credit.page.scss'],
})
export class CreditPage implements OnInit {
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
  creditnote: any = [];
  userId;
  auth_token;
  infinite_value;
  offset_value = 0;
  total_record;
  nodata = false;
  constructor(private router: Router, public apiservice: ApiService, private theInAppBrowser: InAppBrowser) {

  }

  ngOnInit() {
    this.userId = localStorage.userId;
    this.auth_token = localStorage.auth_token;
    this.getcredit(this.offset_value);
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
      if (this.creditnote.length != this.total_record) {
        this.getcredit(offset_inc);
      }
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (data.length == 1000) {
      // event.target.disabled = true;
      // }
    }, 2000);
  }

  getcredit(offset) {


    // let dataURL = 'https://erp.cal4care.com/cms/cms_data_redirect.php?action=credit_note_for_app&key_info=' + this.userId + '';
    // // let dataURL ='https://dev.cal4care.com/erp/cms_data.php?action=credit_note_for_app&key_info=3790';

    // this.apiservice.sendcmsServer(dataURL).then((response: any) => {
    //   console.log(response)
    //   if (response != undefined) {
    //     this.creditnote = response.result_data.credit_note
    //     if (this.creditnote.length == 0)
    //       this.nodata = true;

    //   }
    //   this.apiservice.dismiss();
    // },
    //   (error) => {
    //     console.log(error);
    //     this.apiservice.dismiss();
    // });


    // Credit Note List API:
    // {
    //   "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJlcnAuY2FsNGNhcmUuY29tIiwiYXVkIjoiZXJwLmNhbDRjYXJlLmNvbSIsImlhdCI6MTYwMTAzMDQ1NywibmJmIjoxNjAxMDMwNDU3LCJleHAiOjE2MDEwNDg0NTcsImFjY2Vzc19kYXRhIjp7InRva2VuX2FjY2Vzc0lkIjpudWxsLCJ0b2tlbl9hY2Nlc3NOYW1lIjpudWxsLCJ0b2tlbl9hY2Nlc3NUeXBlIjpudWxsfX0.DO5AhlihljqX8RVsGTRLZYFhqsbFlvfMeiQuTSEIH7Y",
    //     "operation": "curlDatas",
    //       "moduleType": "login",
    //         "api_type": "web",
    //           "element_data": {
    //     "action": "credit_note",
    //       "customer_id": "1806"
    //   }
    // }




    if (this.offset_value == 0) {
      this.apiservice.present("Loading Your Credit Note");
    }
    let credit_list_req: any = new Object();

    let credit_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': credit_list_req
    });


    credit_list_req.action = 'credit_note';
    credit_list_req.customer_id = this.userId;
    credit_list_req.limit = '10';
    credit_list_req.offset = offset;

    this.apiservice.newsendServer(credit_list).then((response: any) => {
      console.log(response);
      if (response.status == 'true') {
        this.total_record = response.Total;
        // this.creditnote = response.Credit_note;
        for (let list of response.Credit_note) {
          this.creditnote.push(list);
        }
        console.log(this.creditnote.length);
        if (this.creditnote.length == 0) {
          this.nodata = true;
        }
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
