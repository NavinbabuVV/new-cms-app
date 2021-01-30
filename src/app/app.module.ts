import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
// import { Gesture, GestureController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NativeRingtones } from '@ionic-native/native-ringtones/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { DatePipe } from '@angular/common';
import { TermsPageModule } from './terms/terms.module';

 const firebaseConfig = {
    apiKey: "AIzaSyAo3CUjk7KA-VqnbXBhIv4ssCgNBjMLUxI",
    authDomain: "erpcustomer-b13be.firebaseapp.com",
    databaseURL: "https://erpcustomer-b13be.firebaseio.com",
    projectId: "erpcustomer-b13be",
    storageBucket: "erpcustomer-b13be.appspot.com",
    messagingSenderId: "99217243583",
    appId: "1:99217243583:web:728f8d2dc499fe3023b50a",
    measurementId: "G-LS8GJ60MJH"
  };


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,TermsPageModule,
    IonicModule.forRoot(),
    AppRoutingModule,HttpClientModule
  ],
  providers: [
    StatusBar,
    DatePipe,
    SplashScreen,InAppBrowser,
    NativeRingtones,
    NativeAudio,BackgroundMode,HTTP,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    OneSignal,FingerprintAIO,QRScanner,AndroidPermissions,
    File,FileTransfer,DocumentViewer
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
