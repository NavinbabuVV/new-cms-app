import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-extension-list',
  templateUrl: './extension-list.page.html',
  styleUrls: ['./extension-list.page.scss'],
})
export class ExtensionListPage implements OnInit {
  userId: any;
  auth_token: any;
  extnlist: any;
  nodata = false;
  isdata = false;
  constructor(public apiservice: ApiService) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.auth_token = localStorage.getItem('auth_token');
    this.Extensionlist();
  }


  Extensionlist() {
    this.apiservice.present("Loading");

    let extn_list_req: any = new Object();


    let dashboard_count: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': extn_list_req
    });


    extn_list_req.action = 'viewall_extension';
    extn_list_req.customer_id = this.userId;

    this.apiservice.newsendServer(dashboard_count).then((response: any) => {
      console.log(response);
      if (response.status == 'true') {
        this.extnlist = response.CMS_extension;
        
        this.isdata = true;
        this.nodata = false;
      }else{
        
        this.isdata = false;
        this.nodata = true;
      }
      this.apiservice.dismiss();
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });
  }



}
