import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ApiService } from '../services/api.service';
import { ToastController, MenuController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
declare function close(): any;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  forgotname: any;
  constructor(private router: Router, private _location: Location, public apiservice: ApiService, public toastController: ToastController) { }

  ngOnInit() {
    close();
  }

  backClicked() {
    this._location.back();
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

    // this.device_token = localStorage.getItem('device_token');
    console.log(this.forgotname);
    alert('heloasfmioe');
    // console.log(form);
    let reset_pwd_req: any = new Object();

    let reset_password: any = ({
      "api_type": "web",
      "operation": "curlData",
      "access_token": "",
      "moduleType": "login",
      "element_data": reset_pwd_req
    });

    reset_pwd_req.action = "forgot_password";
    reset_pwd_req.uname = this.forgotname;
    this.apiservice.newsendServer(reset_password).then((response: any) => {
      console.log(response);
      if (response.status == 'true') {
        this.showToast('Reset password Sent to Mail ID', 'top');
        this.router.navigate(['/otppage']);
        this.apiservice.dismiss();
      }else{
        this.showToast('Please Enter a valid Email ID', 'top');
        this.apiservice.dismiss();
      }
    },
      (error) => {
        console.log(error);
      });
  }
}
