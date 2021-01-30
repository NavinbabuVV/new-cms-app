import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-news-data',
  templateUrl: './news-data.page.html',
  styleUrls: ['./news-data.page.scss'],
})
export class NewsDataPage implements OnInit {
  voip: any;
  auth_token: any;
  newsdata: any = [];
  constructor(public apiservice: ApiService) { }

  ngOnInit() {
    this.voip = localStorage.voip_id;
    this.auth_token = localStorage.auth_token;
    this.getnewsdata();
  }

  //   {
  //     "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJlcnAuY2FsNGNhcmUuY29tIiwiYXVkIjoiZXJwLmNhbDRjYXJlLmNvbSIsImlhdCI6MTYwMTAzMDQ1NywibmJmIjoxNjAxMDMwNDU3LCJleHAiOjE2MDEwNDg0NTcsImFjY2Vzc19kYXRhIjp7InRva2VuX2FjY2Vzc0lkIjpudWxsLCJ0b2tlbl9hY2Nlc3NOYW1lIjpudWxsLCJ0b2tlbl9hY2Nlc3NUeXBlIjpudWxsfX0.DO5AhlihljqX8RVsGTRLZYFhqsbFlvfMeiQuTSEIH7Y",
  //     "operation": "curlDatas",
  //     "moduleType": "login",
  //     "api_type": "web",
  //     "element_data":{
  //         "action":"news_events_data",
  //         "mrvoip_other_service_id": "4"
  //         }
  // }

  getnewsdata() {
    
    let licence_list_req: any = new Object();


    let licence_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': licence_list_req
    });


    licence_list_req.action = 'news_events_data';
    licence_list_req.mrvoip_other_service_id = this.voip;


    this.apiservice.newsendServer(licence_list).then((response: any) => {
      console.log(response);
        if(response.status == 'true'){
          this.newsdata = response.news_details;
        }
        console.log(this.newsdata);
      this.apiservice.dismiss();
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });






  }



}
