import { Component } from '@angular/core';
import { NavController, Events } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { NativeRingtones } from '@ionic-native/native-ringtones/ngx';
import Swal from 'sweetalert2'
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { AudioService } from './services/audio.service';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { AlertController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

var title;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  accessToken: any;
  userId;
  customerCode;
  notifyid;
  username;
  invoice;
  credit;
  license;
  gcc;
  cxbuy;
  imagess;
  projects;
  renewal;
  auth_token;
  phones; leads; reseller; rma; calls; idd_price_list; calltel; support_ticket;
  userperms: any = [];
  emailid;
  navigations: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    private router: Router,
    private nav: NavController,
    private statusBar: StatusBar,
    public apiservice: ApiService,
    public ringtones: NativeRingtones,
    public nativeAudio: NativeAudio,
    private audio: AudioService,
    private backgroundMode: BackgroundMode,
    private androidPermissions: AndroidPermissions,
    private oneSignal: OneSignal
  ) {
    // events.subscribe( SETTINGS_CONSTANTS.EVENT_REQUEST_TIMEOUT, this.sessionLogout);
    this.emailid = localStorage.getItem('emailid');
    console.log(this.emailid);
    this.initializeApp();

    this.auth_token = localStorage.auth_token;
    // setInterval(data => {
    // this.logoutsession()
    // }, 240000);
    // }, 1200000);

  }
  ngOnInit() {

    this.accessToken = localStorage.getItem('auth_token');


    this.userId = localStorage.getItem('userId');

    this.username = localStorage.getItem('user_name');
    if (localStorage.getItem('auth_token') == null) {

      if (localStorage.getItem('typef') == '1') {
        this.navigations = { state: { logintype: 'fingerprintlogin' } };
        this.router.navigate(['/fingerprint'], this.navigations);
      }
      // else if (localStorage.getItem('typeq') == '1') {
      //   this.navigations = { state: { logintype: 'qrcodelogin' } };
      //   this.router.navigate(['/fingerprint'], this.navigations);
      // } 
      else {
        this.router.navigate(['/otppage']);

      }

    }
    else {
      // if(localStorage.getItem('app_acc') == '1'){
      this.refresh();
      this.nav.navigateRoot('/dashboard');

      // }else{

      // this.router.navigate(['/email']);


    }

    this.platform.ready().then(() => {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        result => console.log('Has permission?', result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
      );
      this.androidPermissions.requestPermissions(
        [
          this.androidPermissions.PERMISSION.CAMERA,
          this.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS,
          this.androidPermissions.PERMISSION.RECORD_AUDIO
        ]);
    });
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);


  }



  goToTestPage() {
    if (localStorage.getItem('resellerstate') == '1' && localStorage.getItem('reseller_dashboard') == '1') {
      this.router.navigateByUrl('/listing-payouts');
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }


  initializeApp() {
    this.platform.ready().then(() => {





      if (localStorage.getItem('auth_token') == null) {

        if (localStorage.getItem('typef') == '1') {
          this.navigations = { state: { logintype: 'fingerprintlogin' } };
          this.router.navigate(['/fingerprint'], this.navigations);
        }
        // else if (localStorage.getItem('typeq') == '1') {
        //   this.navigations = { state: { logintype: 'qrcodelogin' } };
        //   this.router.navigate(['/fingerprint'], this.navigations);
        // } 

        else {
          this.router.navigate(['/otppage']);

        }
      }
      else {

        if (localStorage.getItem('resellerstate') == '1' && localStorage.getItem('reseller_dashboard') == '1') {
          this.nav.navigateRoot('/listing-payouts');
          this.refresh();
        } else {

          this.nav.navigateRoot('/dashboard');
        }

      }
      this.statusBar.backgroundColorByHexString('#1e2934');
      this.splashScreen.hide();
      if (this.platform.is('cordova')) {
        this.setupPush();
      }

    });


  }

  logout() {



    // localStorage.setItem('calling', '0');
    this.logoutsession();
    // localStorage.clear();

    // this.router.navigate(['/otppage']);




  }




  playAudio() {

    this.audio.play("audio1");
  }

  logoutsession() {
    // localStorage.clear();

    if (localStorage.getItem('typef') == '1') {
      console.log(localStorage.getItem('typef'));

      localStorage.setItem('calling', '0');
      localStorage.removeItem("userperms");
      localStorage.removeItem("username");
      localStorage.removeItem("auth_token");
      localStorage.removeItem("emailid");

      this.navigations = { state: { logintype: 'fingerprintlogin' } };
      this.router.navigate(['/fingerprint'], this.navigations);

    } else {
      console.log("0");
      var myItem = localStorage.getItem('device_token');
      localStorage.clear();
      localStorage.setItem('device_token', myItem);
      this.router.navigate(['/otppage']);

    }

    let logout_device_token_req: any = new Object();

    let logout_req: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': logout_device_token_req
    });


    logout_device_token_req.action = 'clear_device_token';
    logout_device_token_req.customer_id = this.userId;


    this.apiservice.newsendServer(logout_req).then((response: any) => {
      if (response.status == 'true') {


      }
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });

  }



  setupPush() {
    title = '';

    this.oneSignal.startInit('73ecc90e-e836-47cc-ad36-8f4010b3cc02', '99217243583');




    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(data => {
      // this.playAudio()
      console.log(data)
      let msg = data.payload.body;
      title = data.payload.title;
      let additionalData = data.payload.additionalData;
      // this.title = data.payload.title;
      // this.showAlert();
    });
    this.oneSignal.handleNotificationOpened().subscribe(data => {
      // Just a note that the data is a different place here!
      console.log(data)
      let additionalData = data.notification.payload.additionalData;
      this.notifyid = data.notification.androidNotificationId;
      localStorage.setItem('notification_id', this.notifyid);
      // alert(this.notifyid);
      // if (this.notifyid != null || this.notifyid != undefined) {
      if (this.notifyid) {
        this.nav.navigateRoot('/notification');
      } else {
        alert('no notifying');
      }
      // this.showAlert()
    });

    this.oneSignal.endInit();



    this.oneSignal.getIds().then((data) => {
      localStorage.setItem('device_token', data.userId);
    });

  }


  async showAlert() {
    this.accessToken = localStorage.getItem('access_user');

    // if (localStorage.getItem('access_user') == null)
    if (localStorage.getItem('auth_token') == null) {
      if (localStorage.getItem('typef') == '1') {

        this.navigations = { state: { logintype: 'fingerprintlogin' } };
        this.router.navigate(['/fingerprint'], this.navigations);

      }
      // else if (localStorage.getItem('typeq') == '1') {

      //   this.navigations = { state: { logintype: 'qrcodelogin' } };

      //   this.router.navigate(['/fingerprint'], this.navigations);
      // }
      else {
        this.nav.navigateRoot('/otppage');

      }
    }
    else {
      this.nav.navigateRoot('/dashboard');
    }

  }





  refresh() {

    if (localStorage.getItem('calling') == '1') {

      // setTimeout(() => {
      this.emailid = localStorage.getItem('emailid');
      this.userId = localStorage.getItem('userId');
      // console.log(this.emailid)
      // let dataURL = 'https://erp.cal4care.com/cms/cms_data_redirect.php?action=login_finger_chk&customer_email=' + this.emailid + '';


      // this.apiservice.sendcmsServer(dataURL).then((response: any) => {


      //   localStorage.setItem('userId', response.customer_id_encode);
      //   localStorage.setItem('username', response.customer_info.customerName);
      //   localStorage.setItem('userperms', response.customer_info.cus_permission);
      //   localStorage.setItem('typef', response.result_finger_chk_state);
      //   localStorage.setItem('typeq', response.result_qrcode_chk_state);

      //   localStorage.setItem('emailid', response.customer_info.email);
      //   this.apiservice.userId = response.customer_info.customer_id;
      //   this.apiservice.username = response.customer_info.customerName;
      //   // this.apiservice.emailid = response.customer_info.email;

      //   this.userperms = localStorage.getItem('userperms').split(',');

      //   console.log(this.userperms)
      //   for (var i = 0; i < this.userperms.length; i++) {
      //     if (this.userperms[i] == '101') // Invoice
      //       this.invoice = 1;
      //     if (this.userperms[i] == '102') // Credit Note,Prepaid Note
      //       this.credit = 1;
      //     if (this.userperms[i] == '103') // Licence
      //       this.license = 1;
      //     if (this.userperms[i] == '104')  // Projects
      //       this.projects = 1;
      //     if (this.userperms[i] == '105') // Phones
      //       this.phones = 1;
      //     if (this.userperms[i] == '107') // Leads
      //       this.leads = 1;
      //     if (this.userperms[i] == '131') // Reseller Price List    
      //       this.reseller = 1;
      //     if (this.userperms[i] == '108') // RMA
      //       this.rma = 1;
      //     if (this.userperms[i] == '109') //Call History,Call History PBX,Call History VS PBX
      //       this.calls = 1;
      //     if (this.userperms[i] == '134') // IDD Price List
      //       this.idd_price_list = 1;
      //     if (this.userperms[i] == '118') // Buy 3CX
      //       this.cxbuy = 1;
      //     if (this.userperms[i] == '138') // Call4tel License
      //       this.calltel = 1;
      //     if (this.userperms[i] == '157') // Support Ticket
      //       this.support_ticket = 1;



      //   }
      // },
      //   (error) => {
      //     console.log(error);


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
          localStorage.setItem('userId', response.customer_id_encode);
          localStorage.setItem('username', response.customer_details.customerName);
          localStorage.setItem('userperms', response.customer_details.cus_permission);
          localStorage.setItem('typef', response.finger_chk_state);
          localStorage.setItem('typeq', response.qrcode_chk_state);

          localStorage.setItem('emailid', response.customer_details.email);
          this.apiservice.userId = response.customer_details.customer_id;
          this.apiservice.username = response.customer_details.customerName;
          this.customerCode = response.customer_details.customerCode;
          // this.apiservice.emailid = response.customer_info.email;
          var new_images = response.profile_image;
          if (new_images == 'https://erp.cal4care.com/cms/api_cms/v1.0/profile_image/no_photo.jpg') {
            this.imagess = '../../assets/imgs/profile.svg';
          } else {
            this.imagess = new_images;
          }
          // this.imagess = response.profile_image;
          this.userperms = localStorage.getItem('userperms').split(',');
          console.log(this.userperms);
          // alert("hello");
          for (var i = 0; i < this.userperms.length; i++) {
            if (this.userperms[i] == '101') // Invoice
              this.invoice = 1;
            if (this.userperms[i] == '102') // Credit Note,Prepaid Note
              this.credit = 1;
            if (this.userperms[i] == '103') // Licence
              this.license = 1;
            if (this.userperms[i] == '104')  // Projects
              this.projects = 1;
            if (this.userperms[i] == '105') // Phones
              this.phones = 1;
            if (this.userperms[i] == '107') // Leads
              this.leads = 1;
            if (this.userperms[i] == '131') // Reseller Price List    
              this.reseller = 1;
            if (this.userperms[i] == '108') // RMA
              this.rma = 1;
            if (this.userperms[i] == '109') //Call History,Call History PBX,Call History VS PBX
              this.calls = 1;
            if (this.userperms[i] == '134') // IDD Price List
              this.idd_price_list = 1;
            if (this.userperms[i] == '118') // Buy 3CX
              this.cxbuy = 1;
            if (this.userperms[i] == '138') // Call4tel License
              this.calltel = 1;
            if (this.userperms[i] == '157') // Support Ticket
              this.support_ticket = 1;
            if (this.userperms[i] == '158') // Renewal
              this.renewal = 1;
            if (this.userperms[i] == '160') // GCC
              this.gcc = 1;

          }
        }

      },
        (error) => {
          console.log(error);
          this.apiservice.dismiss();
        });


      // }, 1500);


    }


  }






  logoutfunction() {
    // https://erp.cal4care.com/cms/includes/modules/ajax_files.php?customerid=4805&action=clear_session

    let dataURL = 'https://erp.cal4care.com/cms/includes/modules/ajax_files.php?customerid=' + this.apiservice.userId + '&action=clear_session';


    this.apiservice.sendcmsServer(dataURL).then((response: any) => {

      console.log(response);
    },
      (error) => {
        console.log(error);


      });


  }













}
