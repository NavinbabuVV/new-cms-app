import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastController, MenuController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
// import { Resolve,  } from '@angular/router';
declare function close(): any;
@Component({
  selector: 'app-otppage',
  templateUrl: './otppage.page.html',
  styleUrls: ['./otppage.page.scss'],
})
export class OtppagePage implements OnInit {
  userData = { "otp": "", "username": "", "password": "", "isallow": false, "isallow2": false };
  showotp = false;
  sendallow;
  sendallow2;
  select = "psw";
  device_token;
  constructor(public menuCtrl: MenuController, private _location: Location, public apiservice: ApiService, public toastController: ToastController, private router: Router, private route: ActivatedRoute) {

    // this.route.queryParams.subscribe(params => {
    //   if (this.router.getCurrentNavigation().extras.state) {

    //     this.userData.username= this.router.getCurrentNavigation().extras.state.username;
    //     this.userData.isallow= this.router.getCurrentNavigation().extras.state.isallow;
    //     this.userData.isallow2= this.router.getCurrentNavigation().extras.state.isallow2;

    //   }
    // });
  }


  checkvalues(name, val) {
    console.log(name)
    console.log(val)
    if (name == "finger") {
      if (val == true) {
        this.userData.isallow = true
        this.userData.isallow2 = false


      } else {
        this.userData.isallow = false

      }
    } else {
      if (val == true) {
        this.userData.isallow2 = true
        this.userData.isallow = false


      } else {
        this.userData.isallow2 = false

      }
    }

  }

  backClicked() {
    this.router.navigate(['/login']);
    // this._location.back();
  }
  loginWithQrcode() {


    this.router.navigate(['/scanpage']);



  }

  passwordpage() {
    this.showotp = false;
  }



  ngOnInit() {
    close()

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    this.showotp = false;
    this.userData.username = "";
    this.userData.password = "";
    this.userData.isallow = false;
    this.userData.isallow2 = false;
    this.userData.otp = "";

  }

  ionViewDidLeave() {
    this.menuCtrl.enable(true);
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


  sendotp(frm) {
    console.log(this.userData);

    if (this.userData.password == '') {
      this.showToast('Please enter the password', 'top');
      return false;
    }
    if (this.userData.isallow == true)
      this.sendallow = 1;
    else
      this.sendallow = 0;

    if (this.userData.isallow2 == true)
      this.sendallow2 = 1;
    else
      this.sendallow2 = 0;

    this.apiservice.present("Sending OTP");
    // let dataURL = 'https://erp.cal4care.com/cms/includes/modules/ajax_files.php?action=login_validation_for_app&auth_from=undefined&otp_from=otp1&otp_val=&pwd=' + this.userData.password + '&uname=' + this.userData.username + '&finger_chk=""&qrcode_chk=""';

    // this.apiservice.sendcmsServer(dataURL).then((response: any) => {
    //   console.log(response)
    //   this.apiservice.dismiss();
    //   if (response == 1) {
    //     this.showToast('OTP Send Successfully', 'top');
    //     this.showotp = true;
    //   }
    //   else {
    //     this.showToast('Invalid Credientials', 'top');
    //   }


    // },
    //   (error) => {
    //     console.log(error);
    //     this.apiservice.dismiss();
    //   });


    // ========================= WITH OTP =================================

    // this.device_token = localStorage.getItem('device_token');


    // let login_req: any = new Object();

    // let login: any = ({
    //   "api_type": "web",
    //   "operation": "curlData",
    //   "access_token": "",
    //   "moduleType": "login",
    //   "element_data": login_req
    // });

    // login_req.action = "login_validation";
    // login_req.device_token = this.device_token;
    // login_req.uname = this.userData.username;
    // login_req.pwd = this.userData.password;
    // login_req.otp_from = "otp1";
    // login_req.auth_from = "";

    // this.apiservice.newsendServer(login).then((response: any) => {
    //   console.log(response)
    //   this.apiservice.dismiss();
    //   if (response.status == 'true') {
    //     this.showToast('OTP Send Successfully', 'top');
    //     this.showotp = true;
    //   }
    //   else {
    //     this.showToast('Invalid Credientials', 'top');
    //   }
    // },
    //   (error) => {
    //     console.log(error);
    //   });



    // ========================== WITHOUT OTP =====================================

    this.device_token = localStorage.getItem('device_token');


    let login_nootp_req: any = new Object();

    let login_nootp: any = ({
      "api_type": "web",
      "operation": "curlData",
      "access_token": "",
      "moduleType": "login",
      "element_data": login_nootp_req
    });

    login_nootp_req.action = "app_login_without_otp";
    // login_nootp_req.device_token = this.device_token;
    login_nootp_req.uname = this.userData.username;
    login_nootp_req.pwd = this.userData.password;
    // login_req.otp_from = "otp1";
    // login_req.auth_from = "";

    this.apiservice.newsendServer(login_nootp).then((response: any) => {
      console.log(response);
      this.apiservice.dismiss();
      if (response.result.data.result_state == "success") {

        // localStorage.setItem('access_user', response.access_token); 
        localStorage.setItem('userId', response.result.data.customer_id_encode);
        // localStorage.setItem('userId', 'MTI4OQ==');
        localStorage.setItem('username', response.result.data.result_data.customer_details.customerName);
        localStorage.setItem('userperms', response.result.data.result_data.customer_details.cus_permission);
        localStorage.setItem('emailid', response.result.data.result_data.customer_details.email);
        localStorage.setItem('auth_token', response.result.data.auth_token);
        localStorage.setItem('finance_emailid', response.result.data.result_data.customer_details.finance_email);
        localStorage.setItem('typef', response.result_finger_chk_state);
        localStorage.setItem('typeq', response.result_qrcode_chk_state);
        localStorage.setItem('resellerstate', response.result.data.result_data.customer_details.reseller_state);
        localStorage.setItem('reseller_dashboard', response.result.data.result_data.customer_details.reseller_dashboard);
        localStorage.setItem('system_discount_3cx', response.result.data.result_data.customer_details.system_discount_3cx);
        localStorage.setItem('reseller_dis_per', response.result.data.result_data.customer_details.reseller_dis_per);
        this.apiservice.userId = response.result.data.result_data.customer_details.customerId;
        this.apiservice.username = response.result.data.result_data.customer_details.customerName;
        this.apiservice.emailid = response.result.data.result_data.customer_details.email;

        this.showToast('Logged In Successfully', 'top');
        if (response.result.data.result_data.customer_details.reseller_state == '1') {
          this.router.navigate(['/listing-payouts']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      }
      else {
        this.showToast('Invalid OTP', 'top');
      }
    },
      (error) => {
        console.log(error);
      });






  }



  // sendotp(){
  //       console.log(this.userData);

  //       if(this.userData.password == ''){
  //         this.showToast('Please enter the password','top');
  //         return false;
  //       }
  //  if(this.userData.isallow == true)
  //    this.sendallow = 1;
  //  else
  //    this.sendallow = 0;
  //    this.apiservice.present("Sending OTP");

  // let dataURL='https://erp.cal4care.com/cms/cms_data_redirect.php?uname='+this.userData.username+'&pwd='+this.userData.password+'&auth_from=undefined&otp_val=&otp_from=otp1&action=login_validation_for_app_wo_otp';
  //       this.apiservice.sendcmsServer(dataURL).then((response:any) => {
  //         console.log(response)
  //           this.apiservice.dismiss();
  //         if(response.customerId != null){

  //             localStorage.setItem('userId', response.customerId); 
  //             localStorage.setItem('username', response.customer_info.customerName);
  //             localStorage.setItem('userperms', response.customer_info.cus_permission);
  //             localStorage.setItem('emailid',  this.userData.username);
  //              this.apiservice.userId =response.customerId;
  //              this.apiservice.username =response.customer_info.customerName;
  //              this.apiservice.emailid =this.userData.username;

  //             this.showToast('Logged In Successfully','top');
  //             this.router.navigate(['/dashboard']);
  //       } 
  //     }, 
  //       (error)=>{
  //           console.log(error);
  //           this.apiservice.dismiss();
  //       });
  //    }
  submitotp(frm) {
    console.log(this.userData.username);

    if (this.userData.otp == '') {
      this.showToast('Please enter the otp', 'top');
      return false;
    }

    // let dataUrl = 'https://erp.cal4care.com/cms/includes/modules/ajax_files.php?uname=' + this.userData.username + '&pwd=' + this.userData.password + '&auth_from=undefined&otp_val=' + this.userData.otp + '&otp_from=otp1&action=otp_validation_for_app&finger_chk=' + this.sendallow + '&qrcode_chk=' + this.sendallow2 + '';


    // this.apiservice.sendcmsServer(dataUrl).then((response: any) => {
    //   console.log(response)
    //   if (response.customerId != '') {
    //     // localStorage.setItem('access_user', response.access_token); 
    //     localStorage.setItem('userId', response.customer_id_encode);
    //     localStorage.setItem('username', response.customerName);
    //     localStorage.setItem('userperms', response.cus_permission);
    //     localStorage.setItem('emailid', this.userData.username);
    //     localStorage.setItem('auth_token', response.auth_token);
    //     localStorage.setItem('typef', response.result_finger_chk_state);
    //     localStorage.setItem('typeq', response.result_qrcode_chk_state);
    //     this.apiservice.userId = response.customerId;
    //     this.apiservice.username = response.customerName;
    //     this.apiservice.emailid = this.userData.username;

    //     this.showToast('Logged In Successfully', 'top');
    //     this.router.navigate(['/dashboard']);
    //   }
    //   else {
    //     this.showToast('Invalid OTP', 'top');
    //   }
    // },
    //   (error) => {
    //     console.log(error);
    //   });

    this.device_token = localStorage.getItem('device_token');

    let otp_req: any = new Object();

    let otpsend: any = ({
      "api_type": "web",
      "operation": "curlData",
      "access_token": "",
      "moduleType": "login",
      "element_data": otp_req
    });
    var sendss;
    if (this.userData.isallow == true) {
      sendss = 1;
    } else {
      sendss = 0;
    }
    otp_req.finger_chk = sendss;
    otp_req.qrcode_chk = 0;
    otp_req.action = "otp_validation_for_app";
    otp_req.uname = this.userData.username;
    otp_req.pwd = this.userData.password;
    otp_req.device_token = this.device_token;
    otp_req.otp_from = "otp1";
    otp_req.auth_from = "";
    otp_req.auth_code = this.userData.otp;


    this.apiservice.newsendServer(otpsend).then((response: any) => {
      console.log(response);
      console.log(response.result.data.result_data.customer_details.customerName);

      if (response.result.data.result_state == "success") {

        // localStorage.setItem('access_user', response.access_token); 
        localStorage.setItem('userId', response.result.data.customer_id_encode);
        // localStorage.setItem('userId', 'MTI4OQ==');
        localStorage.setItem('username', response.result.data.result_data.customer_details.customerName);
        localStorage.setItem('userperms', response.result.data.result_data.customer_details.cus_permission);
        localStorage.setItem('emailid', response.result.data.result_data.customer_details.email);
        localStorage.setItem('auth_token', response.result.data.auth_token);
        localStorage.setItem('typef', response.result_finger_chk_state);
        localStorage.setItem('typeq', response.result_qrcode_chk_state);
        localStorage.setItem('resellerstate', response.result.data.result_data.customer_details.reseller_state);
        localStorage.setItem('reseller_dashboard', response.result.data.result_data.customer_details.reseller_dashboard);
        localStorage.setItem('system_discount_3cx', response.result.data.result_data.customer_details.system_discount_3cx);
        localStorage.setItem('reseller_dis_per', response.result.data.result_data.customer_details.reseller_dis_per);
        this.apiservice.userId = response.result.data.result_data.customer_details.customerId;
        this.apiservice.username = response.result.data.result_data.customer_details.customerName;
        this.apiservice.emailid = response.result.data.result_data.customer_details.email;

        this.showToast('Logged In Successfully', 'top');
        this.router.navigate(['/dashboard']);
      }
      else {
        this.showToast('Invalid OTP', 'top');
      }
    },
      (error) => {
        console.log(error);
      });







  }




}


