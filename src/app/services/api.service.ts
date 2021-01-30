import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
// import {Http,Response,Headers,RequestOptions} from '@angular/http'; 


import { map } from 'rxjs/operators'; @Injectable({
  providedIn: 'root'
})
export class ApiService {
  isLoading = false;
  endpoint: any;
  public userId;
  public username;
  public emailid;

  constructor(private https: HTTP, private http: HttpClient, public loadingController: LoadingController) {
    this.userId = localStorage.getItem('userId');
    this.username = localStorage.getItem('username');
    this.emailid = localStorage.getItem('emailid');

  }

  // sendServer(postData:any[]) {        
  //     const httpOptions = {
  //       headers: new HttpHeaders({
  //         'Content-Type':  'application/json'
  //       })
  //     };
  //     return this.http.post("https://erp.cal4care.com/cms/apps", postData,httpOptions);
  // }


  sendServer(postData: any[]) {


    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');


      this.http.post('https://erp.cal4care.com/cms/apps/', postData, { headers: headers })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  sendurlpost(url, postData: any[]) {


    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');


      this.http.post(url, postData, { headers: headers })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }



  sendServers(postData: any[]) {


    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');


      this.http.post('https://dev.cal4care.com/erp/vs_api/index.php/', postData, { headers: headers })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }





  sendcmsServer(postDatas: any) {
    return new Promise((resolve, reject) => {
      var headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin', 'http://localhost:8100');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept', 'application/json');
      headers.append('Access-Control-Allow-Credentials', 'true')
      headers.append('Content-Type', 'Access-Control-Request-Headers')
      headers.append('content-type', 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');


      // this.http.get(this.endpoint+ postDatas)
      this.http.get(postDatas, { headers: headers })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  sendServersss(postData: any[]) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post("https://erp.cal4care.com/cms/api_cms/v1.0/index.php", postData, httpOptions);
  }



  newsendServer(postData: any[]) {

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json'
    //   })
    // };

    // return this.http.post("https://call4drivers.com/api/", postData,httpOptions);
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');

      this.http.post('https://erp.cal4care.com/cms/api_cms/v1.0/index.php', JSON.stringify(postData), { headers: headers })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


















  async present(data) {
    this.isLoading = true;
    return await this.loadingController.create({
      message: data,
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }




}






