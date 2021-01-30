import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.page.html',
  styleUrls: ['./profile-details.page.scss'],
})
export class ProfileDetailsPage implements OnInit {
  userId: any;
  auth_token: any;
  file: any;
  images: any;
  profiles: any;
  emailids: any;
  fin_emailids: any;
  profile = {
    "company_name": "",
    "customerName": "",
    "customer_id": "",
    "customer_code": "",
    "phone_no": "",
    "google_auth": "",
    "address1": "",
    "address2": "",
    "city": "",
    "state": "",
    "country": "",
    "phone2": "",
    "mobile": "",
    "fax": "",
    "contact_person": "",
    "bank_acc_name": "",
    "bank_acc_num": "",
    "reset_password": "",
    "credit": "",
    "bill_code": "",
    "customer_status": "",
    "cms_vs_pbx_dispaly": false,
    "cms_username_dispaly": false

  }
  constructor(public apiservice: ApiService, private router: Router) {

    this.userId = localStorage.getItem('userId');
    this.auth_token = localStorage.getItem('auth_token');
    this.emailids = localStorage.getItem('emailid');
    this.fin_emailids = localStorage.getItem('finance_emailid');
    console.log(['joe', 'jane', 'mary'].includes('jane'));
  }

  ngOnInit() {
    this.getprofile();

  }

  backmenu() {
    this.router.navigate(['/dashboard']);
  }

  changeListener($event): void {
    this.file = $event.target.files[0];
    console.log(this.file);
    if(this.file == undefined){
      this.file = '';
    }
    this.profiles = this.file;
    this.uploadprofile();
  }


  uploadprofile(){
      const forms = new FormData();
    forms.append('customer_id', this.profile.customer_id);
    forms.append('attachment', this.profiles);
    forms.append('action', 'update_profile_image');
    forms.append('operation', 'curlData');
    forms.append('access_token', this.auth_token);
    forms.append('moduleType', 'profile');
    forms.append('api_type', 'web');

    $.ajax({
      url: "https://erp.cal4care.com/cms/api_cms/v1.0/index_new.php",
      type: 'POST',
      data: forms,
      processData: false,  // tell jQuery not to process the data
      contentType: false,
      success: function (data) {
        console.log(data);
        //  iziToast.success({
        //          message: "Ticket Created Sucessfully",
        //          position: 'topRight'
        //      });
      }
    });

  }

  getprofile() {

    let edition_change_req: any = new Object();


    let edition_change_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': edition_change_req
    });

    edition_change_req.action = 'get_user_profile';
    edition_change_req.customer_id = this.userId;

    this.apiservice.newsendServer(edition_change_list).then((response: any) => {
      console.log(response);
      if (response.status == 'true') {
        this.profile.company_name = response.company_name;
        this.profile.phone_no = response.phone_no;
        this.profile.customer_id = response.customer_id;
        this.profile.customer_code = response.customerCode;
        // this.profile.google_auth = response;
        this.profile.address1 = response.address1;
        this.profile.address2 = response.address2;
        this.profile.city = response.city;
        this.profile.state = response.state;
        this.profile.country = response.country;
        this.profile.mobile = response.mobilePhone;
        this.profile.fax = response.fax;
        this.profile.contact_person = response.contact_person;
        this.profile.customerName = response.customerName;
        this.profile.bank_acc_name = response.bank_account_name;
        this.profile.bank_acc_num = response.bank_account_no;
        this.profile.credit = response.credit_limit;
        this.profile.bill_code = response.bill_code;
        this.profile.customer_status = response.customer_status;
        
        this.profiles = response.profile_image_url;
        if(this.profiles == 'https://erp.cal4care.com/cms/api_cms/v1.0/profile_image/'){
        this.images ='../../assets/imgs/profile.svg';
        }else{
          this.images = this.profiles;
        }
        // this.profile.cms_username_dispaly = response.cms_username_dispaly;
        // this.profile.cms_vs_pbx_dispaly = response.cms_vs_pbx_dispaly;
        this.profile.cms_username_dispaly = (response.cms_username_dispaly == 0) ? true : false;
        this.profile.cms_vs_pbx_dispaly = (response.cms_vs_pbx_dispaly == 0) ? true : false;
        // cms_vs_pbx_dispaly11
        // cms_username_dispaly

      }
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });

  }


  postprofile() {
    if(this.file == undefined){
      this.file = '';
    }
    // let access_token: any=localStorage.getItem('at');
    // let customer_id: any=localStorage.getItem('en');
    const forms = new FormData();
    forms.append('email_id', this.emailids);
    forms.append('finance_email_id', this.fin_emailids);
    forms.append('customer_id', this.profile.customer_id);
    forms.append('customerCode', this.profile.customer_code);
    forms.append('customerName', this.profile.customerName);
    forms.append('customerAddress1', this.profile.address1);
    forms.append('customerAddress2', this.profile.address2);
    forms.append('city', this.profile.city);
    forms.append('state', this.profile.state);
    forms.append('country', this.profile.country);
    forms.append('customerPhone', this.profile.phone_no);
    forms.append('mobilePhone', this.profile.mobile);
    forms.append('fax', this.profile.fax);
    forms.append('contact_person', this.profile.contact_person);
    forms.append('companyName', this.profile.company_name);
    forms.append('credit_amt', this.profile.credit);
    forms.append('reset_password', this.profile.reset_password);
    // forms.append('attachment', this.file);
    forms.append('action', 'update_user_profile');
    forms.append('operation', 'curlData');
    forms.append('access_token', this.auth_token);
    forms.append('moduleType', 'profile');
    forms.append('api_type', 'web');
    console.log(forms);
    var self = this;
    $.ajax({
      url: "https://erp.cal4care.com/cms/api_cms/v1.0/index_new.php",
      type: 'POST',
      data: forms,
      processData: false,  // tell jQuery not to process the data
      contentType: false,
      success: function (data) {
        console.log(data);
        //  iziToast.success({
        //          message: "Ticket Created Sucessfully",
        //          position: 'topRight'
        //      });
      }
    });
  }


}
