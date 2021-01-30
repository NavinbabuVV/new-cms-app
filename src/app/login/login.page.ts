import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastController, MenuController } from '@ionic/angular';
declare function close(): any;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  responseData: any;
  accessToken: any;
  deviceToken: any;
  navigations: any;
  userData = { "username": "", "password": "" };
  constructor(public menuCtrl: MenuController, public apiservice: ApiService, public toastController: ToastController, private router: Router) { }

  ngOnInit() {
    // this.accessToken = localStorage.getItem('access_user');  
    // this.deviceToken = localStorage.getItem('device_token');  
    // if(this.accessToken){
    // this.router.navigate(['/dashboard']);
    // }
    close()
    this.menuCtrl.enable(false);
    // console.log(this.accessToken);
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



  login(form) {
    // this.navigations = { state: {   username : this.userData.username,isallow : false} };

    // this.router.navigate(['/otppage']);
    //       console.log(this.userData.username);

    if (this.userData.username == '') {
      this.showToast('Please enter the username', 'top');
      return false;
    }


    this.deviceToken = localStorage.getItem('device_token');
    console.log('tok ', this.deviceToken);

    this.apiservice.present("Loading");


    let dataURL = 'https://erp.cal4care.com/cms/cms_data_redirect.php?action=login_finger_chk&customer_email=' + this.userData.username + '';


    this.apiservice.sendcmsServer(dataURL).then((response: any) => {
      this.apiservice.dismiss();


      if (response.customer_info.customer_id != null) {
        var isallow;
        var isallow2;
        if (response.result_finger_chk_state == '1') {
          isallow = true;
        }
        else {
          isallow = false;
        }

        if (response.result_qrcode_chk_state == '1') {
          isallow2 = true;
        }
        else {
          isallow2 = false;
        }
        this.navigations = { state: { username: this.userData.username, isallow: isallow, isallow2: isallow2 } };
        this.router.navigate(['/otppage'], this.navigations);

      } else {
        this.showToast('Username Not Found', 'top');

      }
      // 			if(response.result_finger_chk_state == '1'){

      // this.navigations = { state: {   username : this.userData.username,isallow : true,isallow2:false,userId:response.customer_info.customer_id,userperms:response.customer_info.cus_permission,emailid:response.customer_info.email,auth_token:response.auth_token,logintype:'fingerprintlogin'} };

      //                   this.router.navigate(['/fingerprint'],this.navigations);

      // 			} else if(response.result_qrcode_chk_state == '1'){
      // this.navigations = { state: {   username : this.userData.username,isallow:false,isallow2:true,userId:response.customer_info.customer_id,userperms:response.customer_info.cus_permission,emailid:response.customer_info.email,auth_token:response.auth_token,logintype:'qrcodelogin'} };

      //          this.router.navigate(['/fingerprint'],this.navigations);
      //       }
      // else {
      //         this.navigations = { state: {   username : this.userData.username,isallow : false} };
      //           this.router.navigate(['/otppage'],this.navigations);



      //       }





    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();

      });
  }


}


