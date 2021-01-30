import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-license',
  templateUrl: './license.page.html',
  styleUrls: ['./license.page.scss'],
})
export class LicensePage implements OnInit {
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
  license: any = [];
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
    this.getlicensedetails(this.offset_value);
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
      if (this.license.length != this.total_record) {
        this.getlicensedetails(offset_inc);
      }
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (data.length == 1000) {
      // event.target.disabled = true;
      // }
    }, 2000);
  }


  searchbars(events){
  
    console.log(events.detail.value);

  let licence_search_req: any = new Object();

  let licence_search_list: any = ({
    'api_type': 'web',
    'operation': 'curlDatas',
    'access_token': this.auth_token,
    'moduleType': 'login',
    'element_data': licence_search_req
  });


  licence_search_req.action = 'license_list';
  licence_search_req.customer_id = this.userId;
  licence_search_req.limit = '10';
  licence_search_req.offset = this.offset_value;
  licence_search_req.search_text = events.detail.value;

  this.apiservice.newsendServer(licence_search_list).then((response: any) => {
    console.log(response);
    this.license = [];
      for (let row of response.License_List) {
      this.license.push(row);
    }
  },
  (error) => {
    console.log(error);
    this.apiservice.dismiss();
  });

    
  }

  getlicensedetails(offset) {

    // this.apiservice.present("License Details");
    // let dataURL = 'https://erp.cal4care.com/cms/cms_data_redirect.php?action=license_details_for_app&key_info=' + this.userId + '';
    // this.apiservice.sendcmsServer(dataURL).then((response: any) => {
    //   console.log(response)
    //   if (response != undefined) {
    //     this.license = response.result_data.license_details
    //     if (this.license.length == 0)
    //       this.nodata = true;
    //   }
    //   this.apiservice.dismiss();
    // },
    //   (error) => {
    //     console.log(error);
    //     this.apiservice.dismiss();
    //   });



    if (this.offset_value == 0) {
      this.apiservice.present("License Details");
    }
    let licence_list_req: any = new Object();

    let licence_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': licence_list_req
    });


    licence_list_req.action = 'license_list';
    licence_list_req.customer_id = this.userId;
    licence_list_req.limit = '10';
    licence_list_req.offset = offset;

    this.apiservice.newsendServer(licence_list).then((response: any) => {
      console.log(response);
      if (response.status == 'true') {
        this.total_record = response.Total;
        // for (let i = 0; i < response.License_List; i++) {
        //   this.license.push(response.License_List[i]);
        // }
        for (let row of response.License_List) {
          this.license.push(row);
        }
        if (this.license.length == 0) {
          this.nodata = true;
        }
      }else{
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
