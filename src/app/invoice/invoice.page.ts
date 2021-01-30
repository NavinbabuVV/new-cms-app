import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { LoadingController } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {
  userId;
  invoice: any = [];
  checkedbillid: any = [];
  testdata: any = [];
  nodata = false;
  isdata = false;
  foo: boolean = false;
  auth_token;
  infinite_value;
  offset_value = 0;
  total_pages;
  selectedbill_values;
  checks: any;
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
  constructor(private router: Router, private theInAppBrowser: InAppBrowser, public apiservice: ApiService, public loadingController: LoadingController) { }

  ngOnInit() {
    this.userId = localStorage.userId;
    this.auth_token = localStorage.auth_token;
    console.log(this.userId);
    this.infinite_value = 'unpaid';
    this.getinvoice('unpaid', this.offset_value);
  }
  // getinvoice(){
  //   this.apiservice.present("Loading Your Invoice");
  //      let dataURL = 'https://erp.cal4care.com/cms/cms_data_redirect.php?action=invoice_details_for_app&key_info='+this.userId+'';
  //       // let dataURL = 'https://dev.cal4care.com/erp/cms_data.php?action=invoice_details_for_app&key_info=3790';

  //       this.apiservice.sendcmsServer(dataURL).then((response:any) => {
  //         console.log(response)
  //         if(response != undefined){
  //           this.invoice= response.result_data.invoice_details
  //     if(this.invoice.length == 0)
  //       this.nodata = true;
  //         }
  //         this.apiservice.dismiss();
  //     },
  //       (error)=>{
  //           console.log(error);
  //            this.apiservice.dismiss();
  //       });
  //  }

  goToTestPage() {
    if (localStorage.getItem('resellerstate') == '1' && localStorage.getItem('reseller_dashboard') == '1') {
      this.router.navigateByUrl('/listing-payouts');
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }

  selected(events, billId, currencys) {
    // console.log(events.detail.checked);
    // events.detail.checked =  false;
    if (this.testdata.length == 0) {
      this.testdata.push(currencys);
      console.log(this.testdata);
    } else {
      console.log("error");
      var n = this.testdata.includes(currencys);
      console.log(n);
      if (n == true) {
        this.foo = true;
        alert('remove');
      }
    }
    let checked_req: any = new Object();



    let check_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': checked_req
    });


    if (events.detail.checked == true) {
      this.checkedbillid.push(billId);
      console.log(this.checkedbillid);
    } else {
      const index = this.checkedbillid.indexOf(billId);
      if (index > -1) {
        this.checkedbillid.splice(index, 1);
        console.log(this.checkedbillid);
      }
    }


    checked_req.action = 'overdue_payment';
    checked_req.customer_id = this.userId;
    checked_req.select_billid = this.checkedbillid.join(',');

    this.apiservice.newsendServer(check_list).then((response: any) => {
      console.log(response);
      if (response.status == 'true') {
        this.selectedbill_values = response.total_amount;
      } else {
        this.selectedbill_values = 0;
      }
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });

  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.infinite_value = ev.detail.value;
    this.offset_value = 0;
    this.getinvoice(ev.detail.value, this.offset_value);

  }


  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      let offset_inc = this.offset_value + 10;
      this.offset_value = offset_inc;
      if (this.invoice.length != this.total_pages) {
        this.getinvoice(this.infinite_value, offset_inc);
      }
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (data.length == 1000) {
      // event.target.disabled = true;
      // }
    }, 2000);
  }



  getinvoice(value, offset) {
    if (this.offset_value == 0) {
      this.apiservice.present("Loading Your Invoice");
    }
    let invoice_req: any = new Object();

    let invoice_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': invoice_req
    });

    if (value == 'unpaid') {
      invoice_req.action = 'invoice_list';
      // invoice_req.customer_id = this.userId;
      invoice_req.customer_id = this.userId;
      invoice_req.type = 'unpaid';
      invoice_req.limit = '10';
      invoice_req.offset = offset;
      if (offset == 0) {
        this.invoice = [];
      }
    } else if (value == 'paid') {
      invoice_req.action = 'invoice_list';
      // invoice_req.customer_id = this.userId;
      invoice_req.customer_id = this.userId;
      invoice_req.type = 'paid';
      invoice_req.limit = '10';
      invoice_req.offset = offset;
      if (offset == 0) {
        this.invoice = [];
      }
    } else if (value == 'pro') {

      invoice_req.action = 'invoice_list';
      invoice_req.customer_id = this.userId;
      invoice_req.type = 'pi';
      invoice_req.limit = '10';
      invoice_req.offset = offset;
      if (offset == 0) {
        this.invoice = [];
      }
    }

    if (value == 'unpaid') {
      this.apiservice.newsendServer(invoice_list).then((response: any) => {
        console.log(response);
        // this.apiservice.dismiss();
        if (response.status == 'true') {
          this.total_pages = response.Total;
          // for (let i = 0; i < response.List.length; i++) {
          //   this.invoice.push(response.List[i]);
          // }
          for (let row of response.List) {
            if (row.performa_invoice != 1) {
              this.invoice.push(row);
            }
          }
          this.isdata = true;
          this.nodata = false;
          if (this.invoice.length == 0) {
            this.nodata = true;
          }
        } else if (response.status == 'false') {
          this.nodata = true;
          this.isdata = false;
        } else {
          this.nodata = true;
          this.isdata = false;
        }
        this.apiservice.dismiss();
      },
        (error) => {
          console.log(error);
          this.apiservice.dismiss();
        });

    } else {
      this.apiservice.newsendServer(invoice_list).then((response: any) => {
        console.log(response);
        // this.apiservice.dismiss();
        if (response.status == 'true') {
          this.total_pages = response.Total;
          // for (let i = 0; i < response.List.length; i++) {
          //   this.invoice.push(response.List[i]);
          // }
          for (let row of response.List) {
            this.invoice.push(row);
          }
          this.isdata = true;
          this.nodata = false;
          if (this.invoice.length == 0) {
            this.nodata = true;
          }
        } else if (response.status == 'false') {
          this.nodata = true;
          this.isdata = false;
        } else {
          this.nodata = true;
          this.isdata = false;
        }
        this.apiservice.dismiss();
      },
        (error) => {
          console.log(error);
          this.apiservice.dismiss();
        });
    }

  }


  paymentlink() {
    console.log(this.selectedbill_values);
    if (this.selectedbill_values == 0 || this.selectedbill_values == null || this.selectedbill_values == undefined)
      return false;

    let payment_req: any = new Object();

    let payment_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'payment',
      'element_data': payment_req
    });

    payment_req.action = 'invoice_payment_link';
    payment_req.customer_id = this.userId;
    payment_req.select_billid = this.checkedbillid.join(',');

    this.apiservice.newsendServer(payment_list).then((response: any) => {
      console.log(response);
      // this.apiservice.dismiss();
      if (response.status == 'true') {
        this.openWithSystemBrowser(response.payment_url);
      }
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


  // async present() {
  //     this.isLoading = true;
  //     return await this.loadingController.create({
  //       message: 'Loading Your Invoice',
  //     }).then(a => {
  //       a.present().then(() => {
  //         console.log('presented');
  //         if (!this.isLoading) {
  //           a.dismiss().then(() => console.log('abort presenting'));
  //         }
  //       });
  //     });
  //   }

  //   async dismiss() {
  //     this.isLoading = false;
  //     return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  //   }




}
