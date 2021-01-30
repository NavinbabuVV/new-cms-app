import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-newsevents',
  templateUrl: './newsevents.page.html',
  styleUrls: ['./newsevents.page.scss'],
})
export class NewseventsPage implements OnInit {
  news: any = [];
  userId: any;
  auth_token: any;
  offset_value = 0;
  total_record;

  constructor(public apiservice: ApiService, private router: Router) { }

  ngOnInit() {
    this.userId = localStorage.userId;
    this.auth_token = localStorage.auth_token;
    this.getnewsevents(this.offset_value);
  }

  goToTestPage() {
    if (localStorage.getItem('resellerstate') == '1' && localStorage.getItem('reseller_dashboard') == '1') {
      this.router.navigateByUrl('/listing-payouts');
    }else{
      this.router.navigateByUrl('/dashboard');
    }
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');

      let offset_inc = this.offset_value + 10;
      this.offset_value = offset_inc;
      if (this.news.length != this.total_record) {
        this.getnewsevents(offset_inc);
        event.target.complete();
      }
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (data.length == 1000) {
      // event.target.disabled = true;
      // }
    }, 2000);
  }

  readmore(id){
    this.router.navigate(['/news-data']);
    localStorage.setItem('voip_id', id);
  }

  getnewsevents(offset) {
    // this.apiservice.present("Loading Your Invoice");
    // let dataURL = 'https://erp.cal4care.com/cms/cms_data_redirect.php?action=get_popup_content_details_for_app&key_info=MTY0OA==';
    // this.apiservice.sendcmsServer(dataURL).then((response: any) => {
    //   console.log(response)
    //   this.news = response.result_data.cms_popup_service_description
    //   console.log(this.news);

    //   // if(response != undefined){
    //   //   this.invoice= response.result_data.invoice_details

    //   // }
    //   // this.apiservice.dismiss();
    // },
    //   (error) => {
    //     console.log(error);
    //     // this.apiservice.dismiss();
    //   });



    let licence_list_req: any = new Object();


    let licence_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': licence_list_req
    });


    licence_list_req.action = 'news_events';
    licence_list_req.customer_id = this.userId;
    licence_list_req.limit = '10';
    licence_list_req.offset = offset;

    this.apiservice.newsendServer(licence_list).then((response: any) => {
      console.log(response);
      if (response.status == 'true') {
        for (let list of response.List) {
          this.news.push(list);
        }
        // this.news = response.List;
        console.log(this.news);
      }
      this.apiservice.dismiss();
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });






  }




}
