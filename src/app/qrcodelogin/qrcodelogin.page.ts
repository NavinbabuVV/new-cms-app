import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ToastController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-qrcodelogin',
  templateUrl: './qrcodelogin.page.html',
  styleUrls: ['./qrcodelogin.page.scss'],
})
export class QrcodeloginPage implements OnInit {
  isOn = false;
  QRSCANNED_DATA: string;
  scannedData: {};
  qrScan: any;
  navigations: any;
  emailid;
  accessToken: any;
  userId: any;
  userData = { "username": "", isallow: "", userId: "", userperms: "", emailid: "", auth_token: "", logintype: "", isallow2: "" };
  constructor(public toastController: ToastController, public menuCtrl: MenuController, public apiservice: ApiService, private platform: Platform, private qrScanner: QRScanner, private router: Router, private route: ActivatedRoute) {
    this.platform.backButton.subscribeWithPriority(0, () => {
      document.getElementsByTagName("body")[0].style.opacity = "1";
      this.qrScan.unsubscribe();
    })
    this.emailid = localStorage.getItem('emailid');
    this.userId = localStorage.getItem('userId');
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        console.log(this.router.getCurrentNavigation().extras.state)
        this.userData.username = this.router.getCurrentNavigation().extras.state.values.username;
        // this.userData.isallow= this.router.getCurrentNavigation().extras.state.isallow;
        // this.userData.isallow2= this.router.getCurrentNavigation().extras.state.isallow2;
        this.userData.userId = this.router.getCurrentNavigation().extras.state.values.userId;
        this.userData.userperms = this.router.getCurrentNavigation().extras.state.values.userperms;
        this.userData.emailid = this.router.getCurrentNavigation().extras.state.values.emailid;
        this.userData.auth_token = this.router.getCurrentNavigation().extras.state.values.auth_token;
        this.userData.logintype = this.router.getCurrentNavigation().extras.state.values.logintype;


        console.log(this.userData.emailid)
        // this.userData.password= this.router.getCurrentNavigation().extras.state.password;
      }
    });

  }

  ngOnInit() {

    this.loginqr()
  }

  backClicked() {

    this.closeScanner();

    this.navigations = { state: { logintype: 'qrcodelogin' } };

    this.router.navigate(['/fingerprint'], this.navigations);

    //  this.router.navigate(['/login']);

  }
  ionViewDidLeave() {
    // (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
    // window.document.querySelector('ion-app').classList.remove('transparentBody')
  }
  closeScanner() {
    // this.isOn = false;
    this.qrScanner.hide();
    this.qrScanner.destroy();
  }

  sessionlogindetails() {

    this.accessToken = localStorage.getItem('auth_token');

    this.emailid = localStorage.getItem('emailid');
    // this.apiservice.present("Loading");


    // let dataURL = 'https://erp.cal4care.com/cms/cms_data_redirect.php?action=login_finger_chk&customer_email=' + this.emailid + '';


    // this.apiservice.sendcmsServer(dataURL).then((response: any) => {
    //   // this.apiservice.dismiss();

    //   if (response.customer_info.customer_id != null) {

    //     this.userData.username = response.customer_info.email;
    //     this.userData.isallow = response.result_finger_chk_state;
    //     this.userData.isallow2 = response.result_qrcode_chk_state;
    //     this.userData.userId = response.customer_id_encode;
    //     this.userData.userperms = response.customer_info.cus_permission;
    //     this.userData.emailid = response.customer_info.email;
    //     this.userData.auth_token = response.auth_token;


    //   }




    // },
    //   (error) => {
    //     console.log(error);
    //     this.apiservice.dismiss();

    //   });




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
        this.userData.username = response.customer_details.email;
        this.userData.isallow = response.finger_chk_state;
        this.userData.isallow2 = response.qrcode_chk_state;
        this.userData.userId = response.customer_id_encode;
        this.userData.userperms = response.customer_details.cus_permission;
        this.userData.emailid = response.customer_details.email;
        this.userData.auth_token = response.auth_token;
        this.apiservice.userId = response.customer_details.customer_id;
        this.apiservice.username = response.customer_details.customerName;
      }

    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });











  }


  loginqr() {


    this.qrScanner.prepare().then((status: QRScannerStatus) => {

      if (status.authorized) {

        this.qrScanner.show();
        document.getElementsByTagName("body")[0].style.opacity = "0";
        this.qrScan = this.qrScanner.scan().subscribe((res: any) => {
          console.log(res)
          document.getElementsByTagName("body")[0].style.opacity = "1";
          this.closeScanner();
          this.qrScan.unsubscribe();
          var responsedata = JSON.parse(res)
          if (responsedata.email == this.emailid) {
            console.log(responsedata.email)
            console.log(responsedata.type)
            console.log(this.emailid)
            localStorage.setItem('userId', this.userData.userId);
            localStorage.setItem('username', this.userData.username);
            localStorage.setItem('userperms', this.userData.userperms);
            localStorage.setItem('emailid', this.userData.emailid);
            localStorage.setItem('auth_token', this.userData.auth_token);
            this.apiservice.userId = this.userData.userId;
            this.apiservice.username = this.userData.username;
            this.apiservice.emailid = this.userData.emailid;
            this.open()
            // this.router.navigateByUrl('/dashboard');

          }
          else {
            console.log(responsedata.email)
            console.log(responsedata.type)
            console.log(this.emailid)
            this.showToast('Invalid QR Code', 'top');

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
  // showCamera() {    
  //   (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  // }
  // hideCamera() {    
  //   (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  // }

  async open() {

    this.menuCtrl.enable(true);
    this.router.navigate(['/dashboard']);

  }
  async leave() {
    await this.menuCtrl.enable(false);
  }

  ionViewWillEnter() {
    this.leave()

  }


  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');

    window.document.body.style.backgroundColor = 'transparent';

  }
  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
    window.document.body.style.backgroundColor = '#FFF';
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



}
