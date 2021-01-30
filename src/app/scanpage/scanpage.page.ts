import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ToastController, MenuController } from '@ionic/angular';
@Component({
  selector: 'app-scanpage',
  templateUrl: './scanpage.page.html',
  styleUrls: ['./scanpage.page.scss'],
})
export class ScanpagePage implements OnInit {
  isOn = false;
  QRSCANNED_DATA: string;
  scannedData: {};
  qrScan: any;
  navigations: any;
  emailid;
  storedatas: any = {};
  username;
  device_token: any;
  opens;
  constructor(public toastController: ToastController, public menuCtrl: MenuController, public apiservice: ApiService, private platform: Platform, private qrScanner: QRScanner, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    //   var hh= [{"type":"Y21z","en":"NDgwNQ=="}]
    //         var gg = JSON.parse(hh)
    // console.log(gg)
    this.device_token = localStorage.getItem('device_token');
    this.loginqr()
    // this.logins("NDY0NA==")
  }

  backClicked() {
    this.router.navigate(['/otppage']);
  }

  ionViewDidLeave() {

  }
  closeScanner() {
    this.opens = false;
    this.qrScanner.hide();
    this.qrScanner.destroy();
  }




  loginqr() {
    this.opens = true;
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        this.qrScanner.show();
        this.qrScan = this.qrScanner.scan().subscribe((res: any) => {
          console.log(res)
          this.closeScanner();
          this.qrScan.unsubscribe();
          var responsedata = JSON.parse(res)
          // console.log(responsedata)
          // console.log(responsedata.type)
          var types = btoa('cms')


          if (responsedata[0].type == types) {
            console.log(responsedata[0].type)
            // this.getdatas[0].address
            this.logins(responsedata[0].en)

          }
          else {
            // console.log(responsedata.email)
            // console.log(responsedata.type)

            this.showToast('Invalid QR Code', 'top');
            this.loginqr()


          }

        }, (err) => {
          console.log(JSON.stringify(err));
        })

      } else if (status.denied) {
        this.qrScan.openSettings()
      }
      else {

      }
    })

  }







  logins(en_id) {


    let list_req: any = new Object();
    this.device_token = localStorage.getItem('device_token');


    let list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'moduleType': 'login',
      'element_data': list_req
    });


    list_req.action = 'customer_data';
    list_req.customer_id = en_id;
    list_req.device_token = this.device_token;
    this.apiservice.present("Authenticating");

    this.apiservice.newsendServer(list).then((response: any) => {
      console.log(response);
      if (response.status == 'true') {
        this.apiservice.dismiss();

        localStorage.setItem('userId', response.customer_id_encode);
        // localStorage.setItem('userId', 'MTI4OQ==');
        localStorage.setItem('username', response.customer_data.customerName);
        localStorage.setItem('userperms', response.customer_data.cus_permission);
        localStorage.setItem('emailid', response.customer_data.email);
        localStorage.setItem('auth_token', response.auth_token);
        localStorage.setItem('typef', '0');
        localStorage.setItem('typeq', '0');
        localStorage.setItem('resellerstate', response.customer_data.reseller_state);
        localStorage.setItem('reseller_dashboard', response.customer_data.reseller_dashboard);
        localStorage.setItem('system_discount_3cx', response.customer_data.system_discount_3cx);
        localStorage.setItem('reseller_dis_per', response.customer_data.reseller_dis_per);
        this.apiservice.userId = response.customer_data.customer_id;
        this.apiservice.username = response.customer_data.customerName;
        this.apiservice.emailid = response.customer_data.email;
        this.showToast('Logged In Successfully', 'top');
        // this.router.navigate(['/dashboard']);

        if (response.customer_data.reseller_state == '1') {
          this.router.navigate(['/listing-payouts']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      }
      else {
        this.showToast('Connection Refused! Please try again later', 'top');
        this.apiservice.dismiss();

      }
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });






  }










  async showToast(message, position) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: position,
      showCloseButton: true,
      closeButtonText: 'OK'
    });
    toast.present();
  }

  async open() {

    this.menuCtrl.enable(true);
    this.router.navigate(['/dashboard']);

  }

  ionViewWillEnter() {
    this.leave()
  }

  async leave() {
    await this.menuCtrl.enable(false);
  }


}