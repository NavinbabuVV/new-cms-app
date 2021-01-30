import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastController, MenuController } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var $: any;
import Swal from 'sweetalert2'
declare function ready(): any;
// declare function receiveMessage():any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
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
  accessToken: any;
  quo_count: any;
  nitification: any;
  whitelist: any;
  userId: any;
  emailid;
  did_count: any;
  dashboard_count: any;
  call_balance_count: any;
  userperms: any = [];
  invoice;
  credit;
  license;
  cxbuy;
  callbal;
  bells :any;
  auth_token;
  project;
  calls;
  partnerid;
  termss;
  cxdisc;
  counts_cards = 0;
  blogs: any = [];
  card_count: any = [];

  constructor(private menuController: MenuController, private http: HttpClient, private theInAppBrowser: InAppBrowser, public apiservice: ApiService, public toastController: ToastController, private router: Router) {
    this.userId = localStorage.getItem('userId');
    this.auth_token = localStorage.getItem('auth_token');
    this.emailid = localStorage.getItem('emailid');
    console.log(this.emailid);
    this.userperms = localStorage.getItem('userperms').split(',');
    // this.userperms= this.perms

    console.log(this.userperms)
   
    // this.isUserHere();
    this.getdashboard();
    this.callbalance();
    // this.sms()  
    this.getnewfeeds();
    this.bellcounts();
    this.permissions();
  }

  // $api_user = "cal4carevsadmin";
  // $api_pass = "fc3cffc12f5d8589e3daba40113a8c61";
  // https://dev.cal4care.com/erp/vs_api/index.php

  // "api_user"=>$api_user, "api_pass"=>$api_pass, "access"=>"voipSwitchCredit","page_access"=>"retrive_info","action"=>"getCustomerCreditData","cust_id"=>"4743"

  sms() {
    let enquiry: any = '{"api_pass":"fc3cffc12f5d8589e3daba40113a8c61","api_user":"cal4carevsadmin","access":"voipSwitchCredit","page_access":"retrive_info","action":"getCustomerCreditData","cust_id":"4743"}';
    this.apiservice.sendServers(enquiry).then((response: any) => {
      console.log(response);

    });
  }

  ngOnInit() {
    // this.getdashboard();
    // this.callbalance();
    this.permissions();
    // ready();

    // this.accessToken = localStorage.getItem('access_user');
    // this.userId = localStorage.getItem('userId');


    // if(this.accessToken == ''){
    //   this.router.navigate(['/login']);
    // } else {
    //   this.commonDetails();
    // }

    // this.http.get('https://jsonip.com/').subscribe(data => {
    //   this.whitelist = data['ip'];
    //   console.log(data['ip']);
    // });


    //   return new Promise((resolve, reject) => {
    //     let headers = new HttpHeaders();
    //     headers.append('Content-Type', 'application/json');

    //     this.http.get('https://api.ipify.org?format=json', {headers: headers})
    //       .subscribe(res => {
    //         this.whitelist = res['ip'];
    //         console.log(res);
    //       }, (err) => {
    //         reject(err);
    //       });
    // });
  }
  ionViewDidEnter() {
    this.getdashboard();
    this.callbalance();
    this.refresh();
    this.permissions();
    this.bellcounts();
  }

bellcounts(){
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
    this.bells = response.count;
    // console.log(this.bells);
    }

  },
  (error) => {
    console.log(error);
    this.apiservice.dismiss();
  });

}


  permissions(){
    this.counts_cards = 0;
    for (var i = 0; i < this.userperms.length; i++) {
      if (this.userperms[i] == '101') {
        this.invoice = 1;
        this.counts_cards = this.counts_cards + 1;
      }
      if (this.userperms[i] == '102') {
        this.credit = 1;
        this.counts_cards = this.counts_cards + 1;
      }
      if (this.userperms[i] == '103') {
        this.license = 1;
        this.counts_cards = this.counts_cards + 1;
      }
      if (this.userperms[i] == '118') {
        this.cxbuy = 1;
        this.partnerid = 1;
        this.termss = 1;
        this.cxdisc = 1;
        this.counts_cards = this.counts_cards + 4;
      }
      // 136  - Call Balance
      // 104  - Project
      // 105  - Calls
      // 118  - Partner Id,3cx Discount and Terms
      if (this.userperms[i] == '104') {
        this.project = 1;
      }
      if (this.userperms[i] == '136') {
        this.callbal = 1;
        this.counts_cards = this.counts_cards + 1;
      }
      if (this.userperms[i] == '105') {
        this.calls = 1;
      }
      console.log(this.counts_cards);
    }
  }


  ionViewWillEnter() {
    localStorage.setItem('calling', '1');
    // ready();

    this.refresh();

  }



  getnewfeeds() {

    let licence_list_req: any = new Object();


    let licence_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': licence_list_req
    });


    licence_list_req.action = 'news_events';
    licence_list_req.customer_id = this.userId;
    licence_list_req.limit = '3';
    licence_list_req.offset = '0';

    this.apiservice.newsendServer(licence_list).then((response: any) => {
      console.log(response);
      if (response.status == 'true') {
        // for (let list of response.List) {
        //   this.news.push(list);
        // }

        this.blogs = response.List;
        // this.news = response.List;
        console.log(this.blogs);
      }
      this.apiservice.dismiss();
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });

  }

  gointernal() {
    this.router.navigateByUrl('/newsevents');
  }
  // hello(){
  //   console.log("welcome");
  //   $("#slidedown").slideToggle();
  // }
  refresh() {
    if (localStorage.getItem('calling') == '1') {

      this.userId = localStorage.getItem('userId');
      this.emailid = localStorage.getItem('emailid');
      //   let dataURL = 'https://erp.cal4care.com/cms/cms_data_redirect.php?action=login_finger_chk&customer_email=' + this.emailid + '';


      //   this.apiservice.sendcmsServer(dataURL).then((response: any) => {


      //     localStorage.setItem('userId', response.customer_id_encode);
      //     // localStorage.setItem('userId', 'MTI4OQ==');
      //     localStorage.setItem('username', response.customer_info.customerName);
      //     localStorage.setItem('userperms', response.customer_info.cus_permission);
      //     localStorage.setItem('typef', response.result_finger_chk_state);
      //     localStorage.setItem('typeq', response.result_qrcode_chk_state);
      //     localStorage.setItem('emailid', response.customer_info.email);
      //     this.apiservice.userId = response.customer_info.customer_id;
      //     this.apiservice.username = response.customer_info.customerName;
      //     // this.apiservice.emailid = response.customer_info.email;

      //     this.userperms = localStorage.getItem('userperms').split(',');

      //     console.log(this.userperms)
      //     for (var i = 0; i < this.userperms.length; i++) {
      //       if (this.userperms[i] == '101')
      //         this.invoice = 1;
      //       if (this.userperms[i] == '102')
      //         this.credit = 1;
      //       if (this.userperms[i] == '103')
      //         this.license = 1;
      //       if (this.userperms[i] == '118')
      //         this.cxbuy = 1;

      //     }
      //   },
      //     (error) => {
      //       console.log(error);


      //     });
      // }



      let login_check_req: any = new Object();


      let login_check_list: any = ({
        'api_type': 'web',
        'operation': 'curlDatas',
        'access_token': this.accessToken,
        'moduleType': 'login',
        'element_data': login_check_req
      });


      login_check_req.action = 'login_finger_chk';
      // login_check_req.customer_email = this.emailid;
      login_check_req.customer_id = this.userId;

      this.apiservice.newsendServer(login_check_list).then((response: any) => {
        console.log(response);
        if (response.status == 'true') {
          localStorage.setItem('userId', response.customer_id_encode);
          localStorage.setItem('username', response.customer_details.customerName);
          localStorage.setItem('userperms', response.customer_details.cus_permission);
          localStorage.setItem('typef', response.finger_chk_state);
          localStorage.setItem('typeq', response.qrcode_chk_state);

          localStorage.setItem('emailid', response.customer_details.email);
          this.apiservice.userId = response.customer_details.customer_id;
          this.apiservice.username = response.customer_details.customerName;
          // this.apiservice.emailid = response.customer_info.email;

          this.userperms = localStorage.getItem('userperms').split(',');

          console.log(this.userperms);
          for (var i = 0; i < this.userperms.length; i++) {
            if (this.userperms[i] == '101')
              this.invoice = 1;
            if (this.userperms[i] == '102')
              this.credit = 1;
            if (this.userperms[i] == '103')
              this.license = 1;
            if (this.userperms[i] == '118')
              this.cxbuy = 1;

          }
        }

      },
        (error) => {
          console.log(error);
          this.apiservice.dismiss();
        });

    }



  }







  getdashboard() {

    // this.apiservice.present("Loading Your Credit Note");


    // let dataURL = 'https://erp.cal4care.com/cms/cms_data_redirect.php?action=dashboard_count_for_app&customer_id=' + this.userId + '';
    // this.apiservice.sendcmsServer(dataURL).then((response: any) => {
    //   console.log(response)
    //   if (response != undefined) {

    //     this.dashboard_count = response.result_data.dashboard_count_info
    //   }
    //   // this.apiservice.dismiss();
    // },
    //   (error) => {
    //     console.log(error);
    //     // this.apiservice.dismiss();
    //   });



    let dashboard_count_req: any = new Object();


    let dashboard_count: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': dashboard_count_req
    });


    dashboard_count_req.action = 'dashboardCount';
    dashboard_count_req.customer_id = this.userId;

    this.apiservice.newsendServer(dashboard_count).then((response: any) => {
      console.log(response);
      if (response.status == 'true') {
        this.dashboard_count = response.List;
      }
      // this.apiservice.dismiss();
    },
      (error) => {
        console.log(error);
        // this.apiservice.dismiss();
      });


  }


  callbalance() {
    let call_balance_count_req: any = new Object();

    let call_balance_count: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': call_balance_count_req
    });


    call_balance_count_req.action = 'call_balance';
    call_balance_count_req.customer_id = this.userId;

    this.apiservice.newsendServer(call_balance_count).then((response: any) => {
      console.log(response);
      if (response.status == 'true') {
        this.call_balance_count = response.call_balance_list;
      } else {
        this.call_balance_count = '';
      }
      // this.apiservice.dismiss();
    },
      (error) => {
        console.log(error);
        // this.apiservice.dismiss();
      });

  }



  async isUserHere() {
    const userId = await localStorage.getItem('access_user');
    if (userId) {
      return true;
    } else {
      this.router.navigateByUrl('/otppage');
      return false;
    }
  }
  commonDetails() {
    let qutationList: any = '{"access_token":"' + this.accessToken + '","operation":"count_values","moduleType":"transactionapproval_quotation","api_type":"web","element_data":{"action":"Countvalues"}}';
    this.apiservice.sendServer(qutationList).then((response: any) => {
      console.log(response);
      if (response.quotation_count > 0) {
        this.quo_count = response.quotation_count;
      } else { this.quo_count = '0'; }
      if (response.notification_count > 0) {
        this.nitification = response.notification_count;
      } else { this.nitification = '0'; }
      if (response.didnumber_qry_result > 0) {
        this.did_count = response.didnumber_qry_result;
      } else { this.did_count = '0'; }
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


  whitelistIP() {
    const ipAPI = 'https://api.ipify.org?format=json'

    Swal.queue([{

      confirmButtonText: 'Allow IP',
      title: 'Are you sure?',
      text: 'Allow us to get your current ip',
      icon: 'warning',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return fetch(ipAPI)
          .then(response => response.json())
          .then(data => this.idd(data.ip))
          .catch(() => {
            Swal.insertQueueStep({
              icon: 'error',
              title: 'Unable to get your public IP'
            })
          })
      }
    }])

  }

  idd(ip) {
    Swal.fire({
      title: 'Current IP ' + ip,
      text: 'You want to whitelist your current ip!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Approve it!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        let qutationList: any = '{"access_token":"' + this.accessToken + '","operation":"whitelistip","moduleType":"transactionapproval_quotation","api_type":"web","element_data":{"action":"Whitelistip","userID":"' + this.userId + '","ip":"' + ip + '"}}';
        this.apiservice.sendServer(qutationList).then((response: any) => {
          console.log(response);
          if (response.status == "true") {
            Swal.fire(
              'Whitelisted!',
              '"' + response.message + '"',
              'success'
            )
          } else {
            Swal.fire(
              'Error!',
              '"' + this.whitelist + '"',
              'error'
            )
          }
        });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'error'
        )
      }
    })
  }

  showNotifications() {
    this.router.navigateByUrl('/quotation');
  }

}
