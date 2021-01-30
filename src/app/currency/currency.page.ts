import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.page.html',
  styleUrls: ['./currency.page.scss'],
})
export class CurrencyPage implements OnInit {
  data: Array<{ title: string, details: string, icon: string, showDetails: boolean }> = [];
  select;
  currencytable;
  userId;
  contact_details: any;
  curdate;
  auth_token: any;
  menu = true;
  constructor(private router: Router, public apiservice: ApiService) {
    // this.select = "cur";

    for (let i = 0; i < 10; i++) {
      this.data.push({
        title: 'Title ' + i,
        details: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        icon: 'ios-add-circle-outline',
        showDetails: false
      });
    }
  }



  toggleDetails(data) {
    if (data.showDetails) {
      data.showDetails = false;
      data.icon = 'ios-add-circle-outline';
    } else {
      data.showDetails = true;
      data.icon = 'ios-remove-circle-outline';
    }
  }

  ngOnInit() {
    this.userId = localStorage.userId;
    this.auth_token = localStorage.auth_token;

    this.getcurrency();
    this.getcontact();
  }
  segmentChanged() {
    console.log(this.select)

  }
  // 

  goToTestPage() {
    if (localStorage.getItem('resellerstate') == '1' && localStorage.getItem('reseller_dashboard') == '1') {
      this.router.navigateByUrl('/listing-payouts');
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }

  MyFunction(number) {
    window.open('tel:' + number, '_system', 'location=yes');
  }

  getcurrency() {

    this.apiservice.present("Loading");
    // let dataURL = 'https://erp.cal4care.com/cms/cms_data_redirect.php?action=currency_info_for_app';
    // // let dataURL ='https://dev.cal4care.com/erp/cms_data.php?action=credit_note_for_app&key_info=3790';

    // this.apiservice.sendcmsServer(dataURL).then((response: any) => {
    //   console.log(response);
    //   this.currencytable = response.result_data.currency_array_values;
    //   this.curdate = response.result_data.curr_date;
    //   console.log(this.currencytable);
    //   // if(response != undefined){
    //   //   this.creditnote= response.result_data.credit_note
    //   //   if(this.creditnote.length == 0)
    //   //     this.nodata = true;

    //   // }
    //   this.apiservice.dismiss();
    // },
    //   (error) => {
    //     console.log(error);
    //     this.apiservice.dismiss();
    //   });





    let currency_list_req: any = new Object();

    let currency_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': currency_list_req
    });


    currency_list_req.action = 'currency_view';

    this.apiservice.newsendServer(currency_list).then((response: any) => {
      console.log(response);
      if (response.status == 'true') {
        this.currencytable = response.currency_array_values;
        this.curdate = response.curr_date;
        console.log(this.currencytable);
      }
      this.apiservice.dismiss();
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });







  }


  menuclicks(newone) {
    if(newone == "toc"){
      this.router.navigateByUrl('/today-currency');
    }else if(newone == "cou"){
      this.router.navigateByUrl('/contact');
    }else if(newone == "acm"){
      this.router.navigateByUrl('/acc-manage');      
    }
    this.menu = false;
  }

  getcontact() {

    // this.apiservice.present("Loading");
    // let dataURL ='https://erp.cal4care.com/cms/cms_data_redirect.php?action=customer_menu_data&key_info="'+this.userId+'"';
    // let dataURL ='https://dev.cal4care.com/erp/cms_data.php?action=credit_note_for_app&key_info=3790';
    // let dataURL = 'https://erp.cal4care.com/cms/cms_data_redirect.php?action=customer_menu_data&key_info=476';

    // this.apiservice.sendcmsServer(dataURL).then((response: any) => {
    //   this.contact_details = response.cms_menu_data.secondary_data;

    //   console.log(response);


    //   // this.apiservice.dismiss();
    // },
    //   (error) => {
    //     console.log(error);
    //     // this.apiservice.dismiss();
    //   });






    let country_list_req: any = new Object();

    let country_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': country_list_req
    });


    country_list_req.action = 'contact_flag';
    country_list_req.customer_id = this.userId;

    this.apiservice.newsendServer(country_list).then((response: any) => {
      console.log(response);
      if (response.status == 'true') {
        this.contact_details = response.cms_menu_data.secondary_data;
      } 
      this.apiservice.dismiss();
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });




  }







}
