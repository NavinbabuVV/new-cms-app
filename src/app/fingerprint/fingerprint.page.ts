import { Component, OnInit } from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

declare function close(): any;

@Component({
  selector: 'app-fingerprint',
  templateUrl: './fingerprint.page.html',
  styleUrls: ['./fingerprint.page.scss'],
})
export class FingerprintPage implements OnInit {
  available;
  emailid;
  userId;
  navigations: any;
  storedatas: any = {};
  device_token: any;
  accessToken: any;
  userData = { "username": "", isallow: "", userId: "", userperms: "", emailid: "", auth_token: "", logintype: "", isallow2: "" };
  constructor(public apiservice: ApiService, private route: ActivatedRoute, public menuCtrl: MenuController, public alertController: AlertController, private faio: FingerprintAIO, private router: Router) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {

        // this.userData.username= this.router.getCurrentNavigation().extras.state.username;
        // this.userData.isallow= this.router.getCurrentNavigation().extras.state.isallow;
        //  this.userData.isallow2= this.router.getCurrentNavigation().extras.state.isallow2;
        // this.userData.userId= this.router.getCurrentNavigation().extras.state.userId;
        // this.userData.userperms= this.router.getCurrentNavigation().extras.state.userperms;
        // this.userData.emailid= this.router.getCurrentNavigation().extras.state.emailid;

        this.userData.logintype = this.router.getCurrentNavigation().extras.state.logintype;

        // console.log(this.userData.isallow)
        // this.userData.password= this.router.getCurrentNavigation().extras.state.password;
      }
    });
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
    //     this.apiservice.userId = response.customer_info.customer_id;
    //     this.apiservice.username = response.customer_info.customerName;

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

  logins() {


    let list_req: any = new Object();
    this.device_token = localStorage.getItem('device_token');
    this.userId = localStorage.getItem('userId');


    let list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'moduleType': 'login',
      'element_data': list_req
    });


    list_req.action = 'customer_data';
    list_req.customer_id = this.userId;
    // list_req.device_token  = this.device_token;
    // this.apiservice.present("Authenticating");

    this.apiservice.newsendServer(list).then((response: any) => {
      console.log(response);
      if (response.status == 'true') {
        // this.apiservice.dismiss();
        this.storedatas = response;

        // this.showToast('Logged In Successfully', 'top');
        // this.router.navigate(['/dashboard']);
      }
      else {
        // this.showToast('Connection Refused! Please try again later','top');
        // this.apiservice.dismiss();

      }
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });

  }


  storevalues() {
    localStorage.setItem('userId', this.storedatas.customer_id_encode);
    localStorage.setItem('username', this.storedatas.customer_data.customerName);
    localStorage.setItem('userperms', this.storedatas.customer_data.cus_permission);
    localStorage.setItem('emailid', this.storedatas.customer_data.email);
    localStorage.setItem('auth_token', this.storedatas.auth_token);
    // localStorage.setItem('typef','0');
    // localStorage.setItem('typeq', '0');
    this.apiservice.userId = this.storedatas.customer_data.customer_id;
    this.apiservice.username = this.storedatas.customer_data.customerName;
    this.apiservice.emailid = this.storedatas.customer_data.email;
  }













  ngOnInit() {
    close()
    this.isFingerprintAvailable()

    // this.menuCtrl.enable(false);
  }
  loginWithQrcode() {


    this.navigations = { state: { values: this.userData } };

    this.router.navigate(['/qrcodelogin'], this.navigations);

  }



  ionViewWillEnter() {

    this.menuCtrl.enable(false);
    // this.sessionlogindetails()
    this.logins();
  }

  ionViewDidLeave() {
    this.menuCtrl.enable(true);
  }

  presentFingerPrint() {

    return this.faio.show({

      title: 'Cal4care Customer Erp',
      subtitle: 'Finger Print Login',
      description: 'Please authenticate',
      fallbackButtonTitle: 'Use Backup',
      disableBackup: false
    })
    //   .then((result: any) => {
    //   console.log(result)

    // this.router.navigateByUrl('/dashboard');

    //   })
    //   .catch((error: any) => {
    //     console.log(error)


    // });
    // return this.faio.show({

    //  title: 'Cal4care Customer Erp', // (Android Only) | optional | Default: "<APP_NAME> Biometric Sign On"
    //    subtitle: 'Finger Print Login' ,// (Android Only) | optional | Default: null
    //    description: 'Please authenticate' ,// optional | Default: null
    //    fallbackButtonTitle: 'Use Backup', // optional | When disableBackup is false defaults to "Use Pin".
    //                                       // When disableBackup is true defaults to "Cancel"
    //    disableBackup:true// optional | default: false
    // });

  }





  async isFingerprintAvailable() {
    let result = false;
    const promise = await this.faio.isAvailable(); promise.then((response) => {
      result = true;
      console.log('fingerprint available : ', response);
    });
    promise.catch((error) => {
      result = false;
      console.log('fingerprint error : ', error);
    });
    this.available = result;
    return result;
  }



  loginWithFingerprint() {
    if (this.isFingerprintAvailable()) {
      this.presentFingerPrint()
        .then((result: any) => {
          console.log(result)
          this.storevalues()

          // localStorage.setItem('userId',this.userData.userId); 
          //  localStorage.setItem('username',this.userData.username);
          //  localStorage.setItem('userperms',this.userData.userperms);
          //  localStorage.setItem('emailid',this.userData.emailid);
          //  localStorage.setItem('auth_token',this.userData.auth_token);  
          //  //  this.apiservice.userId =this.userData.userId;
          //  //  this.apiservice.username =this.userData.username;
          //  this.apiservice.emailid = this.userData.emailid;

          this.router.navigateByUrl('/dashboard');

        })
        .catch((error: any) => {
          console.error('fingerprint : ', 'error');
        });
    }
    else {
      this.presentAlertConfirm()
    }



  }

  loginWithotp() {

    // this.navigations = { state: {   username : this.userData.username,isallow:this.userData.isallow,isallow2:this.userData.isallow2} };

    //  this.router.navigate(['/otppage'],this.navigations);
    localStorage.clear()
    this.router.navigate(['/otppage']);
  }









  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Dear Customer',
      message: 'You are not enrolled fingerprint in device.Please enroll fingerprint or  Use OTP login',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'OTP Login',
          handler: () => {

            this.router.navigate(['/login']);

            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }


}











