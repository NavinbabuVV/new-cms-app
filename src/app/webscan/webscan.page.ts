import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Router,ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ToastController,MenuController } from '@ionic/angular';
import { Location } from "@angular/common";
import { AlertController } from '@ionic/angular';

// import { Base64 } from '@ionic-native/base64/ngx';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-webscan',
  templateUrl: './webscan.page.html',
  styleUrls: ['./webscan.page.scss'],
})
export class WebscanPage implements OnInit {
   isOn = false;
   QRSCANNED_DATA: string;
   scannedData: {};
   datas:{};
   qrScan:any;
   navigations : any;
  websocket:any;
  sendid;
  userName;
  userId;
  open;
 constructor(public alertCtrl: AlertController,private location: Location,public toastController: ToastController,public menuCtrl: MenuController,public apiservice: ApiService,private platform: Platform,private qrScanner: QRScanner,private router:Router,private route:ActivatedRoute) {
this.websocket = new WebSocket("wss://myscoket.mconnectapps.com:4007"); 
// this.websocket = new WebSocket("wss://18.140.188.228:4007"); 

this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {



      }
    });



var s = this;
 this.websocket.onmessage = function(event) {
   

   this.datas = JSON.parse(event.data)
   console.log(this.datas)
 

   s.idd(this.datas)


   
}

this.websocket.onerror = function(event){
   console.log('error');
   console.log(event);
   console.log(event.message);

   console.log(event.data);

s.presentAlertConfirm(event)

}

   }



opensocket(){
   this.websocket.onopen = function(event) { 
   console.log('socket connected');

 }
}


 async presentAlertConfirm(text) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Dear User',
      message: text,
      buttons: [
        // {
        //   text: 'Cancel',
        //   role: 'cancel',
        //   cssClass: 'secondary',
        //   handler: (blah) => {
        //     console.log('Confirm Cancel: blah');
        //   }
        // },
         {
          text: 'OK',
          handler: () => {
             // this.alertsawsend() 
 
            
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }



idd2(socket_message){
// console.log(data)

 Swal.fire({
    title: 'Dear'+' '+this.userName,
    text: 'Do you Want to LogIn your Web account?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  }).then((result) => {
    console.log(result)
if(result.isConfirmed == true){
  this.websocket.send(socket_message);

}

else{
  this.loginqr()
  // this.open = false;
}

  })

}

idd(data){
// console.log(data)

 this.sendid = localStorage.getItem('userId');
if(data[0].userId == this.sendid){

  Swal.fire({
    title: 'Dear'+' '+this.userName,
    text: 'You are Sucessfully Logged In Web',
    icon: 'success',
    // showCancelButton: true,
    confirmButtonText: 'OK',
    // cancelButtonText: 'No'
  }).then((result) => {
if(result.isConfirmed == true){
  this.backClicked()

}

  
  })

}
// else{
//     Swal.fire({
//     title: 'Dear'+' '+this.userName,
//     text: 'Connection Refused! Please try again later',
//     icon: 'warning',
//     // showCancelButton: true,
//     confirmButtonText: 'Ok',
//     // cancelButtonText: 'No'
//   }).then((result) => {

// if(result.isConfirmed == true){
//   this.loginqr()

// }

  
//   })
// }

// }


}


loginqrs(){
   // this.idd(JSON.parse("hhh"))
 this.sendid = localStorage.getItem('userId');
  var socket_message='[{"userId":"'+this.sendid+'","address":"gfhdt6u56yu64y"}]';
this.idd2(socket_message)
// this.closeScanner()

}

// check on socket open

// receive datas via socket
// this.websocket.onmessage = function(event) {
   // console.log('socket message');
// }
// get socket connection error
// this.websocket.onerror = function(event){
   // console.log('error');
// }

// send datas through socket




  ngOnInit() {
  
    this.loginqr()
  }

backClicked(){
// this.websocket.close();
 this.location.back();
 
  }

 ionViewWillEnter(){
// this.socketopen()
this.opensocket()
this.userName = localStorage.getItem('username');
 // this.userId = localStorage.getItem('userId');

  this.sendid = localStorage.getItem('userId');


 }


ionViewWillLeave() {
this.websocket.close();
this.closeScanner()


}

ionViewDidLeave() {
   
 }

closeScanner() {
    // this.socketclose()
    this.open = false;
this.qrScanner.hide();
this.qrScanner.destroy();

}




loginqr(){
this.open = true;

this.qrScanner.prepare().then((status:QRScannerStatus)=>{

   if (status.authorized) {

     this.qrScanner.show();
 this.qrScan = this.qrScanner.scan().subscribe((res:any) => {
   console.log(res)
 

   this.closeScanner();
  this.qrScan.unsubscribe();
  var responsedata = JSON.parse(res)
 var types =btoa('cms')
 console.log(types)
 if(responsedata[0].type == types){

    this.sendid = localStorage.getItem('userId');
var socket_message='[{"userId":"'+this.sendid+'","address":"'+responsedata[0].address+'"}]';
 this.idd2(socket_message)
 }else{
   this.showToast('Invalid QR Code', 'top');
     
 }



},(err)=>{
console.log(JSON.stringify(err));
})

}else if (status.denied) {
  this.qrScan.openSettings()
}
else{

}
})

}


  async showToast(message,position) {
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
