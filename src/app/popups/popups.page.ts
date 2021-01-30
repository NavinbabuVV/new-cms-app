import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-popups',
  templateUrl: './popups.page.html',
  styleUrls: ['./popups.page.scss'],
})
export class PopupsPage implements OnInit {
  notify_id: any;
  constructor(public apiservice: ApiService) { }

  ngOnInit() {
    this.notify_id = localStorage.getItem('notification_id');
    this.popups();

  }

  popups() {

    this.apiservice.present("Loading");

    let notify_list_req: any = new Object();

    let notify_list: any = ({
      'api_type': 'web',
      'operation': 'viewappNotification',
      'moduleType': 'login',
      'element_data': notify_list_req
    });


    notify_list_req.action = 'view_app_notification';
    notify_list_req.app_notification_id = this.notify_id;


    this.apiservice.newsendServer(notify_list).then((response: any) => {
      console.log(response);
      alert(response);
      this.apiservice.dismiss();
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });
  }

}
