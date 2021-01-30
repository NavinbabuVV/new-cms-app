import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ApiService } from '../services/api.service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-call-history',
  templateUrl: './call-history.page.html',
  styleUrls: ['./call-history.page.scss'],
})
export class CallHistoryPage implements OnInit {

  newone2 = false;
  newone = false;
  months = false;
  dates = false;
  nodata = false;
  resellerselection = false;
  filtercardlist = false;
  filter: any;
  order_type: any;
  auth_token: any;
  userId: any;
  reseller_billcode: any;
  choiced_reseller_id: any;
  month: any;
  month_type_value: any;
  bill_code_host: any;
  filtering_type: any;
  fromdate: any;
  todate: any;
  get_bill_code_750: any;
  get_bill_code_750_8: any;
  bill_code_740: any;
  bill_code_dcsg: any;
  bill_code_jp: any;
  bill_code_kl: any;
  bill_code_name: any;
  total_call_details: any;
  total_record: any;
  list_call_history: any = [];
  offset_value = 0;
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

  constructor(private theInAppBrowser: InAppBrowser,public datepipe: DatePipe, private router: Router, public apiservice: ApiService) { }

  ngOnInit() {
    this.newone = true;
    this.newone2 = false;
    this.userId = localStorage.userId;
    this.auth_token = localStorage.auth_token;
    this.getData();
  
  }

  passwordpage() {
    this.newone = true;
    this.newone2 = false;
    this.list_call_history = [];
    this.offset_value = 0;
  }

  // filterpageback(){

  // }

  month_type() {
    // console.log(this.month_type_value);
    var array = this.month_type_value.split(',');
    console.log(array);
  }

  resellerfilter(order_type) {
    console.log(order_type);
    this.choiced_reseller_id = order_type;
  }

  extension() {
    this.router.navigateByUrl('/extension-list');
  }


  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      let offset_inc = this.offset_value + 10;
      this.offset_value = offset_inc;
      // alert(this.list_call_history.length);
      if (this.list_call_history.length != this.total_record) {
        this.submit();
      }
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (data.length == 1000) {
      // event.target.disabled = true;
      // }
    }, 2000);
  }

  reselleridsubmit() {
    this.apiservice.present("Loading");


    let selected_reseller_list_req: any = new Object();

    let selected_reseller_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'callhistory',
      'element_data': selected_reseller_list_req
    });

    selected_reseller_list_req.action = 'call_history';
    selected_reseller_list_req.customer_bill_code_hd_id = this.choiced_reseller_id;
    selected_reseller_list_req.customer_id = this.userId;

    this.apiservice.newsendServer(selected_reseller_list).then((response: any) => {
      console.log(response);
      if (response.status == 'true') {
        this.filtercardlist = true;
        this.resellerselection = false;
        this.get_bill_code_750 = response.bill_code_750;
        this.get_bill_code_750_8 = response.bill_code_750_8;
        this.bill_code_host = response.bill_code_host;
        this.total_call_details = response.total_details;
        this.bill_code_740 = response.bill_code_740;
        this.bill_code_dcsg = response.bill_code_dcsg;
        this.bill_code_jp = response.bill_code_jp;
        this.bill_code_kl = response.bill_code_kl;
        this.bill_code_name = response.bill_code_name;


      }
      this.apiservice.dismiss();
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });



  }

  getData() {

    this.apiservice.present("Loading");
    let send_list_req: any = new Object();

    let send_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'callhistory',
      'element_data': send_list_req
    });



    send_list_req.action = 'call_history';
    send_list_req.customer_id = this.userId;

    this.apiservice.newsendServer(send_list).then((response: any) => {
      console.log(response);
      if (response.status == 'true') {
        this.get_bill_code_750 = response.bill_code_750;
        this.get_bill_code_750_8 = response.bill_code_750_8;
        this.bill_code_host = response.bill_code_host;
        this.total_call_details = response.total_details;
        this.bill_code_740 = response.bill_code_740;
        this.bill_code_dcsg = response.bill_code_dcsg;
        this.bill_code_jp = response.bill_code_jp;
        this.bill_code_kl = response.bill_code_kl;
        this.bill_code_name = response.bill_code_name;
        this.reseller_billcode = response.reseller_billcode;
        this.month = response.month;
        this.bill_code_host = response.bill_code_host;
        if (this.reseller_billcode.length > 1) {
          this.resellerselection = true;
          this.filtercardlist = false;
        } else {
          this.filtercardlist = true;
          this.resellerselection = false;
        }
      }
      this.apiservice.dismiss();
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });


  }

  generateexcel() {

    this.apiservice.present("Loading Call Details");

    let excel_list_req: any = new Object();

    let excel_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'callhistory',
      'element_data': excel_list_req
    });

    // if (this.filtering_type == 1) {

      let f_date =this.datepipe.transform(this.fromdate, 'dd-MM-yyyy');
      let t_date =this.datepipe.transform(this.todate, 'dd-MM-yyyy');
      excel_list_req.action = 'call_history_data';
      excel_list_req.bill_code_host = this.bill_code_host;
      excel_list_req.filter = this.filtering_type;
      excel_list_req.filter_by_month = this.month_type_value;
      excel_list_req.from_dt = f_date;
      excel_list_req.to_dt = t_date;
      excel_list_req.bill_code_750 = this.get_bill_code_750;
      excel_list_req.bill_code_750_8 = this.get_bill_code_750_8;
      excel_list_req.bill_code_740 = this.bill_code_740;
      excel_list_req.bill_code_dcsg = this.bill_code_dcsg;
      excel_list_req.bill_code_jp = this.bill_code_jp;
      excel_list_req.bill_code_kl = this.bill_code_kl;
      excel_list_req.bill_code_name = this.bill_code_name;
      excel_list_req.customer_id = this.userId;
      excel_list_req.export_type = 'excel';
    // }
   
    this.apiservice.newsendServer(excel_list).then((response: any) => {
      console.log(response);
      if (response.status == 'true') {
        console.log(response);
        this.openWithSystemBrowser(response.file_name);
      }
      this.apiservice.dismiss();
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });
  }




  generatepdf() {

    this.apiservice.present("Loading Call Details");

    let excel_list_req: any = new Object();

    let excel_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'callhistory',
      'element_data': excel_list_req
    });

    // if (this.filtering_type == 1) {

      let f_date =this.datepipe.transform(this.fromdate, 'dd-MM-yyyy');
      let t_date =this.datepipe.transform(this.todate, 'dd-MM-yyyy');
      excel_list_req.action = 'call_history_data';
      excel_list_req.bill_code_host = this.bill_code_host;
      excel_list_req.filter = this.filtering_type;
      excel_list_req.filter_by_month = this.month_type_value;
      excel_list_req.from_dt = f_date;
      excel_list_req.to_dt = t_date;
      excel_list_req.bill_code_750 = this.get_bill_code_750;
      excel_list_req.bill_code_750_8 = this.get_bill_code_750_8;
      excel_list_req.bill_code_740 = this.bill_code_740;
      excel_list_req.bill_code_dcsg = this.bill_code_dcsg;
      excel_list_req.bill_code_jp = this.bill_code_jp;
      excel_list_req.bill_code_kl = this.bill_code_kl;
      excel_list_req.bill_code_name = this.bill_code_name;
      excel_list_req.customer_id = this.userId;
      excel_list_req.export_type = 'pdf';
    // }
  
    this.apiservice.newsendServer(excel_list).then((response: any) => {
      console.log(response);
      if (response.status == 'true') {
        this.openWithSystemBrowser(response.file_name);
      }
      this.apiservice.dismiss();
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });
  }

  filters(filtering) {
    // alert(filtering);
    if (filtering == 'dates') {
      this.dates = true;
      this.months = false;
      this.filtering_type = 1;
    } else if (filtering == 'months') {
      this.months = true;
      this.dates = false;
      this.filtering_type = 2;

    }

  }


  filteringpage() {
    this.nodata = false;
    this.newone = true;
  }

  submit() {

    this.apiservice.present("Loading Call Details");

    let month_list_req: any = new Object();

    let year_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'callhistory',
      'element_data': month_list_req
    });

    // if(offset == 0 || offset == undefined ){
    //   offset == this.offset_value;
    // }


    if (this.filtering_type == 1) {


      // {"access_token":"","operation":"curlDatas","moduleType":"callhistory","api_type":"web","element_data":{
      //   "bill_code_kl":"870268,45,870281,870282,870283,870291",
      //   "bill_code_host":"2",
      //   "action":"call_history_data",
      //   "customer_id":"Mzc4Mg==",
      //   "filter":1,
      //   "filter_by_month":"-undefined",
      //   "from_dt":"01-12-2020",
      //   "to_dt":"30-01-2021",
      //   "bill_code_name":"",
      //   "from_display_name_id":[],
      //   "limit":100,
      //   "offset":0}}
      let f_date =this.datepipe.transform(this.fromdate, 'dd-MM-yyyy');
      let t_date =this.datepipe.transform(this.todate, 'dd-MM-yyyy');
      month_list_req.action = 'call_history_data';
      month_list_req.bill_code_host = this.bill_code_host;
      month_list_req.filter = this.filtering_type;
      month_list_req.from_dt = f_date;
      month_list_req.to_dt = t_date;
      month_list_req.bill_code_750 = this.get_bill_code_750;
      month_list_req.bill_code_750_8 = this.get_bill_code_750_8;
      month_list_req.bill_code_740 = this.bill_code_740;
      month_list_req.bill_code_dcsg = this.bill_code_dcsg;
      month_list_req.bill_code_jp = this.bill_code_jp;
      month_list_req.bill_code_kl = this.bill_code_kl;
      month_list_req.filter_by_month = "";
      month_list_req.bill_code_name = this.bill_code_name;
      
      month_list_req.customer_id = this.userId;
      month_list_req.export_type = "";
      month_list_req.offset = this.offset_value;
      month_list_req.limit = '5';

    } else if (this.filtering_type == 2) {

      month_list_req.action = 'call_history_data';
      month_list_req.bill_code_host = this.bill_code_host;
      month_list_req.filter = this.filtering_type;
      month_list_req.filter_by_month = this.month_type_value;
      month_list_req.bill_code_740 = this.bill_code_740;
      month_list_req.bill_code_750 = this.get_bill_code_750;
      month_list_req.bill_code_750_8 = this.get_bill_code_750_8;
      month_list_req.bill_code_dcsg = this.bill_code_dcsg;
      month_list_req.bill_code_jp = this.bill_code_jp;
      month_list_req.bill_code_kl = this.bill_code_kl;
      month_list_req.bill_code_name = this.bill_code_name;
      month_list_req.offset = this.offset_value;
      month_list_req.limit = '5';

      month_list_req.customer_id = this.userId;
    }

    this.apiservice.newsendServer(year_list).then((response: any) => {
      console.log(response);
      if (response.status == 'true') {
        this.total_record = response.list_cnt;
        this.newone = false;
        this.newone2 = true;
        // this.list_call_history = response.call_history_data;
        for (let row of response.call_history_data) {
          this.list_call_history.push(row);
        }

//         call_cost: 0.26
// call_duration: "225"
// call_end_show: "31/12/2020 06:00:56 PM"
// call_start_show: "31/12/2020 05:57:11 PM"
// called_number: "060169714911"
// caller_id: "0330993343"
// caller_name: "+60330993343"
// client_id: "870283"
// destination_country: "Malaysia-Mobile"
// slno: 1
        this.total_call_details = response.total_details;

      } else {
        this.nodata = true;
        this.newone = false;
        this.newone2 = false;
      }
      this.apiservice.dismiss();
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });


  }



  public openWithSystemBrowser(url: string) {
    let target = 'system';
    this.theInAppBrowser.create(url, target, this.options);
  }
  public openWithInAppBrowser(url: string) {
    let target = '_blank';
    this.theInAppBrowser.create(url, target, this.options);
  }
  public openWithCordovaBrowser(url: string) {
    let target = '_self';
    this.theInAppBrowser.create(url, target, this.options);
  }


}
