import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular';
declare var $: any;

@Component({
  selector: 'app-order-license',
  templateUrl: './order-license.page.html',
  styleUrls: ['./order-license.page.scss'],
})
export class OrderLicensePage implements OnInit {
  accessToken: any;
  userId;
  auth_token;
  phones: any = [];
  customerlogid: any;
  reseller_discount: any;
  selected_currency: any;
  order_type: any;
  edition: any;
  con_lic_option_value: any;
  perpetual: any;
  quantity: any;
  maintenance: any;
  edition_type: any;
  l_key_main: any;
  l_edition_key: any;
  l_edition: any;
  l_temp_maintenace_price: any;
  l_options_edition: any;
  l_options_simultaneouscall: any;
  cart_value: any;
  price_message: any;
  con_lic_value: any;
  con_lic_discount_value: any;
  con_lic_price_value: any;
  concurrent_licence_select: any;
  l_edition_options_edition: any;
  l_edition_options_simultaneouscall: any;
  l_r_price: any;
  l_r_year: any = 1;
  l_r_actual_price: any;
  l_r_temp_price: any;
  l_r_edition: any;
  price_data: any;
  l_r_simultaneous_call: any;
  l_r_edition_key: any;
  l_r_temp_maintenace_price: any;
  temp_maintenace_price: any;
  cust_cx_data: any;
  reseller_dis_per: any;
  system_discount_3cx: any;
  public isNewLicense = false;
  public isChange = false;
  public isUpgrade = false;
  public isRenew = false;
  consurrent_license: any = [];
  constructor(public route: ActivatedRoute, public apiservice: ApiService, public toastController: ToastController, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.selected_currency = this.router.getCurrentNavigation().extras.state.code;
        this.customerlogid = this.router.getCurrentNavigation().extras.state.customer_id;
        this.reseller_discount = this.router.getCurrentNavigation().extras.state.reseller_discount; console.log(this.selected_currency)
        console.log(this.customerlogid);


        console.log(this.reseller_discount);
      }
    });
  }

  ngOnInit() {
    this.accessToken = localStorage.getItem('access_user');
    this.userId = localStorage.getItem('userId');
    this.auth_token = localStorage.getItem('auth_token');

    this.reseller_dis_per = localStorage.getItem('reseller_dis_per');
    this.system_discount_3cx = localStorage.getItem('system_discount_3cx');
    // this.getcx()

    this.quantity = '1';
    this.maintenance = '0';
    this.l_key_main = '';
  }

  goToTestPage() {
    if (localStorage.getItem('resellerstate') == '1' && localStorage.getItem('reseller_dashboard') == '1') {
      this.router.navigateByUrl('/listing-payouts');
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }


  async showToast(message, position) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: position,
      showCloseButton: true,
      closeButtonText: 'OK'
    });
    toast.present();
  }
  orderType(order_type) {
    if (order_type === 'new') {
      this.isNewLicense = true;
      this.isChange = true;
    } else if (order_type == 'upgrade') {
      this.isChange = true;
      this.isNewLicense = false;
      this.isUpgrade = false;
      this.isRenew = false;
    }
    else {
      this.isChange = true;
      this.isNewLicense = false;
      this.isUpgrade = false;
      this.isRenew = false;
    }
  }

  getcx() {
    // this.apiservice.present("Loading Your Invoice");


    // let dataURL = 'https://erp.cal4care.com/cms/includes/modules/getdata/getFormTemplate/buyReseller_for_app.php?action=get_cart_form_template&product_sale_type=new&customer_id=' + this.userId + '';
    // // let dataURL = 'https://erp.cal4care.com/cms/includes/modules/getdata/getFormTemplate/buyReseller_for_app.php?action=get_cart_form_template&product_sale_type=new&customer_id=80';
    // this.apiservice.sendcmsServer(dataURL).then((response: any) => {
    //   console.log(response)
    //   if (response != undefined) {
    //     this.phones = response.concurrency_option
    //     console.log(this.phones)
    //     // if(this.invoice.length == 0)
    //     //   this.nodata = true;
    //   }
    //   // this.apiservice.dismiss();
    // },
    //   (error) => {
    //     console.log(error);
    //     // this.apiservice.dismiss();
    //   });

    let edition_list_req: any = new Object();


    let edition_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': edition_list_req
    });


    edition_list_req.action = 'online_order';
    edition_list_req.customer_id = this.userId;
    edition_list_req.product_sale_type = 'new';


    this.apiservice.newsendServer(edition_list).then((response: any) => {
      console.log(response);
      if (response.status == 'true') {
        this.phones = response.Edition;
        this.cust_cx_data = response.Customer_3cx_data;
        console.log(this.phones);
        // if (this.phones.length == 0) {
        //   this.nodata = true;
        // }
      }
      // this.apiservice.dismiss();
    },
      (error) => {
        console.log(error);
        // this.apiservice.dismiss();
      });


  }


  editionType(edition_type) {


    this.apiservice.present("Loading");

    this.edition_type = edition_type;

    // let dataURL = 'https://erp.cal4care.com/cms/includes/modules/getdata/getFormTemplate/buyReseller_for_app.php?action=get_simultaneous_call_list&edition_key=' + edition_type + '&customer_id=' + this.userId + '';

    // this.apiservice.sendcmsServer(dataURL).then((response: any) => {
    //   this.apiservice.dismiss();

    //   console.log(response)
    //   if (response != undefined) {
    //     this.consurrent_license = response.option_value;
    //     console.log(this.consurrent_license)

    //   }

    // },
    //   (error) => {
    //     console.log(error);
    //     this.apiservice.dismiss();
    //   });

    // "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJlcnAuY2FsNGNhcmUuY29tIiwiYXVkIjoiZXJwLmNhbDRjYXJlLmNvbSIsImlhdCI6MTYwMTAzMDQ1NywibmJmIjoxNjAxMDMwNDU3LCJleHAiOjE2MDEwNDg0NTcsImFjY2Vzc19kYXRhIjp7InRva2VuX2FjY2Vzc0lkIjpudWxsLCJ0b2tlbl9hY2Nlc3NOYW1lIjpudWxsLCJ0b2tlbl9hY2Nlc3NUeXBlIjpudWxsfX0.DO5AhlihljqX8RVsGTRLZYFhqsbFlvfMeiQuTSEIH7Y",
    // "operation": "curlDatas",
    // "moduleType": "login",
    // "api_type": "web",
    // "element_data":{
    //     "action":"edition_change",
    //     "customer_id": "4481",
    //     "edition_key": "3CXPSPROFENT",
    //     "api_key": "bYy12Q4VOsNhFzfESZZ7",
    //     "reseller_id": "237633",
    //     "customer_currency": "USD",
    //     "customer_currency_symbol": "US $",
    //     "currency_value": "1"
    //     }



    let edition_change_req: any = new Object();


    let edition_change_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': edition_change_req
    });

    console.log(this.cust_cx_data);
    edition_change_req.action = 'edition_change';
    edition_change_req.customer_id = this.userId;
    edition_change_req.edition_key = this.edition_type;

    edition_change_req.api_key = this.cust_cx_data.Apikey;
    edition_change_req.reseller_id = this.cust_cx_data.Resellerid;
    edition_change_req.customer_currency = this.cust_cx_data.Customer_currency;
    edition_change_req.customer_currency_symbol = this.cust_cx_data.Currency_symbol;
    edition_change_req.currency_value = this.cust_cx_data.Currency_value;
    edition_change_req.system_discount_3cx = this.system_discount_3cx;
    edition_change_req.reseller_dis_per = this.reseller_dis_per;

    this.apiservice.newsendServer(edition_change_list).then((response: any) => {
      console.log(response);
      if (response.status == 'true') {
        this.consurrent_license = response.Options;
        console.log(this.consurrent_license);
      }
      this.apiservice.dismiss();
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });






  }


  conLicence(concurrent_licence_select) {
    console.log(concurrent_licence_select);
    var array = concurrent_licence_select.split(':::'); // this will make string an array 
    this.con_lic_value = array[0];
    this.con_lic_discount_value = array[1];
    this.con_lic_price_value = array[2];
    this.con_lic_option_value = array[3];
    // console.log(concurrent_licence_select);
    console.log(this.con_lic_option_value);
    console.log(array);



    let concurrent_licence_req: any = new Object();


    let concurrent_license_change: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': concurrent_licence_req
    });

    console.log(this.cust_cx_data);
    concurrent_licence_req.action = 'concurrent_license_change';
    concurrent_licence_req.customer_id = this.userId;
    concurrent_licence_req.edition_key = this.edition_type;
    concurrent_licence_req.api_key = this.cust_cx_data.Apikey;
    concurrent_licence_req.reseller_id = this.cust_cx_data.Resellerid;
    concurrent_licence_req.customer_currency = this.cust_cx_data.Customer_currency;
    concurrent_licence_req.customer_currency_symbol = this.cust_cx_data.Currency_symbol;
    concurrent_licence_req.currency_value = this.cust_cx_data.Currency_value;
    concurrent_licence_req.simultaneous_call = this.con_lic_price_value;



    this.apiservice.newsendServer(concurrent_license_change).then((response: any) => {
      console.log(response);
      if (response.status == 'true') {
        this.consurrent_license = response.Options;
        console.log(this.consurrent_license);
      }
      this.apiservice.dismiss();
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });















    // this.con_lic_option_value = array[0];
    // this.con_lic_price_value = array[1];
    // this.con_lic_value = array[4];
    // let dataURL = 'https://erp.cal4care.com/cms/includes/modules/getdata/getFormTemplate/buyReseller_for_app.php?action=get_maintance_for_existing&edition_key=' + this.edition_type + '&simultaneous_call=' + this.con_lic_value + '&customer_id=' + this.userId + '';

    // this.apiservice.sendcmsServer(dataURL).then((response: any) => {
    //   this.apiservice.dismiss();

    //   console.log(response)
    //   if (response != undefined) {
    //     if (response.status == 'true') {
    //       this.edition = response.edition;
    //       this.perpetual = response.perpetual;
    //       this.price_message = response.message;
    //       this.temp_maintenace_price = response.money;

    //     } else {
    //       this.edition = response.edition;
    //       this.perpetual = response.perpetual;
    //       this.price_message = response.message;
    //       this.temp_maintenace_price = response.money;

    //     }

    //   }

    // },
    //   (error) => {
    //     console.log(error);
    //     this.apiservice.dismiss();
    //   });













    //   let conc_type_list:any = '{"access_token":"'+this.accessToken+'","operation":"get_maintance_for_existing","moduleType":"licensekey_search","api_type":"web","element_data":{"action":"getmaintanceforexisting","edition_key":"'+this.edition_type+'","code":"'+this.selected_currency +'","Simultaneous_call":"'+this.con_lic_value+'"}}';
    //   this.apiservice.sendServer(conc_type_list).then((response:any) => {
    //     console.log(response);
    //     if(response.status == 'true'){
    //         this.edition = response.edition;
    //         this.perpetual = response.perpetual;
    //         this.price_message = response.message;
    //      } else {
    //        this.edition = response.edition;
    //         this.perpetual = response.perpetual;
    //         this.price_message = response.message;
    //      }
    //   });
  }


  upLicenceEditition(l_edition_options_edition) {
    var array = l_edition_options_edition.split(','); // this will make string an array 
    console.log(l_edition_options_edition);
    var Ledition_typo = array[1];
    console.log(array);
    console.log(Ledition_typo);

    //   let conc_type_list:any = '{"access_token":"'+this.accessToken+'","operation":"edition_change","moduleType":"shopping_cart","api_type":"web","element_data":{"action":"editionchange","product_sale_type":"'+this.order_type+'","code":"'+this.selected_currency +'","license_key":"'+this.l_key_main+'","edition_type":"'+Ledition_typo+'"}}';

    //   this.apiservice.sendServer(conc_type_list).then((response:any) => {
    //     console.log(response);
    //     if(response.status == 'true'){
    //         this.l_options_simultaneouscall = response.options_simultaneouscall;
    //      } else {

    //      }
    //   });


    // this.apiservice.present("Loading");



    // let dataURL = 'https://erp.cal4care.com/cms/includes/modules/getdata/getFormTemplate/buyReseller_for_app.php?action=price_information_upgrade&license_key=' + this.l_key_main + '&product_sale_type=upgrade&edition_type=' + Ledition_typo + '&customer_id=' + this.userId + '';
    // this.apiservice.sendcmsServer(dataURL).then((response: any) => {
    //   this.apiservice.dismiss();

    //   console.log(response)
    //   if (response) {
    //     console.log(response.edit_value)
    //     console.log(response.pro_option_value)

    //     this.l_options_edition = response.edit_value;
    //     console.log(this.l_options_edition)

    //     this.l_options_simultaneouscall = response.pro_option_value;
    //     // this.l_options_simultaneouscall = response.pro_option_value;
    //     console.log(this.l_options_simultaneouscall)

    //   }

    // },
    //   (error) => {
    //     console.log(error);
    //     this.apiservice.dismiss();
    //   });
  }

  upLicenceSimult(l_edition_options_simultaneouscall) {

    this.apiservice.present("Loading");
    var array = this.l_edition_options_edition.split(','); // this will make string an array 
    var l_opt_edition = array[0];
    var l_opt_edition_key = array[1];
    var l_opt_edition_option = array[2];
    var arrays = this.l_edition_options_simultaneouscall.split(','); // this will make string an array 
    var l_opt_sc_value = arrays[0];
    var l_opt_sc_price = arrays[1];
    var l_opt_sc_option_value = arrays[2];
    var l_opt_sc_discount = arrays[3];
    var l_opt_sc_prices = arrays[4];

    let simult_upgrade_req: any = new Object();


    let simult_upgrade: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': simult_upgrade_req
    });


    simult_upgrade_req.action = 'simultaneous_call_change';
    simult_upgrade_req.customer_id = this.userId;
    simult_upgrade_req.product_sale_type = 'upgrade';
    simult_upgrade_req.license_key = this.l_key_main;
    simult_upgrade_req.edition = l_opt_edition_key;
    simult_upgrade_req.simultaneous_call = l_opt_sc_prices;
    simult_upgrade_req.actual_price = l_opt_sc_price;
    simult_upgrade_req.temp_price = l_opt_sc_price;
    simult_upgrade_req.perpetual = '1';
    simult_upgrade_req.maintenance = '0';
    simult_upgrade_req.quantity = this.quantity;
    simult_upgrade_req.temp_maintenace_price = '0';
    simult_upgrade_req.customer_currency = this.cust_cx_data.Customer_currency;
    simult_upgrade_req.customer_currency_symbol = this.cust_cx_data.Currency_symbol;
    simult_upgrade_req.currency_value = this.cust_cx_data.Currency_value;


    this.apiservice.newsendServer(simult_upgrade).then((response: any) => {
      console.log(response);
      if (response.status == 'true') {
        this.isUpgrade = true;
        this.isRenew = false;
        // this.l_edition_options_edition =response.edit_value[0]
        // this.l_edition_key= response.edition_key;
        // this.l_edition = response.edition;
        // this.l_temp_maintenace_price = response.temp_maintenace_price;
        // this.l_options_edition = response.Edition;
        // this.perpetual= response.perpetual;
        // this.l_options_simultaneouscall = response.Simultaneouscall;
        // if(response != undefined){


      }
      this.apiservice.dismiss();
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });


  }
  verifyLicence() {
    if (this.l_key_main == '') {
      this.showToast('please enter the licence key', 'top');
      return false;
    } else {
      if (this.order_type == 'upgrade') {



        this.apiservice.present("Loading");


        // let dataURL = 'https://erp.cal4care.com/cms/includes/modules/getdata/getFormTemplate/buyReseller_for_app.php?action=price_information_upgrade&license_key='+this.l_key_main+'&product_sale_type=upgrade&customer_id='+this.userId+''

        // let dataURL = 'https://erp.cal4care.com/cms/includes/modules/getdata/getFormTemplate/buyReseller_for_app.php?action=price_information_upgrade&license_key=' + this.l_key_main + '&product_sale_type=upgrade&customer_id=' + this.userId + '';
        // this.apiservice.sendcmsServer(dataURL).then((response: any) => {
        //   this.apiservice.dismiss();

        //   console.log(response);
        //   if (response) {
        //     this.isUpgrade = true;
        //     this.isRenew = false;
        //     // this.l_edition_options_edition =response.edit_value[0]
        //     // this.l_edition_key= response.edition_key;
        //     // this.l_edition = response.edition;
        //     // this.l_temp_maintenace_price = response.temp_maintenace_price;
        //     this.l_options_edition = response.edit_value;
        //     // this.perpetual= response.perpetual;
        //     this.l_options_simultaneouscall = response.pro_option_value;
        //     // if(response != undefined){


        //   }

        // },
        //   (error) => {
        //     console.log(error);
        //     this.apiservice.dismiss();
        //   });




        let edition_list_req: any = new Object();


        let edition_list: any = ({
          'api_type': 'web',
          'operation': 'curlDatas',
          'access_token': this.auth_token,
          'moduleType': 'login',
          'element_data': edition_list_req
        });


        edition_list_req.action = 'price_information_upgrade';
        edition_list_req.customer_id = this.userId;
        edition_list_req.product_sale_type = 'upgrade';
        edition_list_req.license_key = this.l_key_main;
        edition_list_req.customer_currency = this.cust_cx_data.Customer_currency;
        edition_list_req.customer_currency_symbol = this.cust_cx_data.Currency_symbol;
        edition_list_req.currency_value = this.cust_cx_data.Currency_value;


        this.apiservice.newsendServer(edition_list).then((response: any) => {
          console.log(response);
          if (response.status == 'true') {
            this.isUpgrade = true;
            this.isRenew = false;
            // this.l_edition_options_edition =response.edit_value[0]
            // this.l_edition_key= response.edition_key;
            // this.l_edition = response.edition;
            // this.l_temp_maintenace_price = response.temp_maintenace_price;
            this.l_options_edition = response.Edition;
            // this.perpetual= response.perpetual;
            this.l_options_simultaneouscall = response.Simultaneouscall;
            // if(response != undefined){


          }
          this.apiservice.dismiss();
        },
          (error) => {
            console.log(error);
            this.apiservice.dismiss();
          });


        // let conc_type_list:any = '{"access_token":"'+this.accessToken+'","operation":"get_price_information_upgrade","moduleType":"shopping_cart","api_type":"web","element_data":{"action":"priceinformationupgrade","product_sale_type":"'+this.order_type+'","code":"'+this.selected_currency +'","license_key":"'+this.l_key_main+'"}}';      
        // this.apiservice.sendServer(conc_type_list).then((response:any) => { 
        // this.isUpgrade = true;
        // this.isRenew = false;
        // this.l_edition_key= response.edition_key;
        // this.l_edition = response.edition;
        // this.l_temp_maintenace_price = response.temp_maintenace_price;
        // this.l_options_edition= response.options_edition;
        // this.perpetual= response.perpetual;
        // this.l_options_simultaneouscall = response.options_simultaneouscall;




        // });
      } else {
        this.apiservice.present("Loading");




        let edition_list_req: any = new Object();


        let edition_list: any = ({
          'api_type': 'web',
          'operation': 'curlDatas',
          'access_token': this.auth_token,
          'moduleType': 'login',
          'element_data': edition_list_req
        });

        edition_list_req.action = 'anual_renew_maintenance';
        edition_list_req.customer_id = this.userId;
        edition_list_req.product_sale_type = 'maintenance';
        edition_list_req.license_key = this.l_key_main;
        edition_list_req.customer_currency = this.cust_cx_data.Customer_currency;
        edition_list_req.customer_currency_symbol = this.cust_cx_data.Currency_symbol;
        edition_list_req.currency_value = this.cust_cx_data.Currency_value;


        this.apiservice.newsendServer(edition_list).then((response: any) => {
          console.log(response);
          if (response.status == 'true') {
            // this.l_edition_options_edition =response.edit_value[0]
            // this.l_edition_key= response.edition_key;
            // this.l_edition = response.edition;
            // this.l_temp_maintenace_price = response.temp_maintenace_price;
            this.l_options_edition = response.Edition;
            // this.perpetual= response.perpetual;
            this.l_options_simultaneouscall = response.simultaneousCalls;
            // if(response != undefined){


            // Edition: "3CXPSPROF"
            // Perpetual: 1
            // actual_price: "9083.20"
            // discount: 40
            // edition: "Professional"
            // maintenance: "1"
            // maintenance_date: ""
            // price_data: "MYR 9,083.20"
            // simultaneousCalls: 64
            // status: "true"
            // temp_maintenace_price: "0"
            // temp_price: "9083.20"
            this.isUpgrade = false;
            this.l_r_price = response.maintenance;
            this.l_r_year = 1;
            this.price_data = response.price_data;
            this.l_r_actual_price = response.actual_price;
            this.l_r_temp_price = response.temp_price;
            this.l_r_edition = response.Edition;
            this.l_r_simultaneous_call = response.simultaneousCalls;
            this.l_r_edition_key = response.edition_key;
            this.l_r_temp_maintenace_price = response.temp_maintenace_price;
            this.perpetual = response.Perpetual;
            this.isRenew = true;


          }else{
            this.showToast('please enter valid License Key','top'); 
          }
          this.apiservice.dismiss();
        },
          (error) => {
            console.log(error);
            this.apiservice.dismiss();
          });


        // let dataURL = 'https://erp.cal4care.com/cms/includes/modules/getdata/getFormTemplate/buyReseller_for_app.php?action=anual_renew_maintenance_price&product_sale_type=maintenance&license_key=' + this.l_key_main + '&customer_id=' + this.userId + ''

        // this.apiservice.sendcmsServer(dataURL).then((response: any) => {
        //   this.apiservice.dismiss();

        //   console.log(response)
        //   if (response) {
        //     this.isUpgrade = false;
        //     this.l_r_price = response.maintenance_val;
        //     this.l_r_year = 1;
        //     this.l_r_actual_price = response.actual_price;
        //     this.l_r_temp_price = response.actual_price;
        //     this.l_r_edition = response.edition;
        //     this.l_r_simultaneous_call = response.simultaneous_call;
        //     this.l_r_edition_key = response.edition_key;
        //     this.l_r_temp_maintenace_price = response.temp_maintenace_price;
        //     this.perpetual = response.perpetual;
        //     this.isRenew = true;

        //   }

        // },
        //   (error) => {
        //     console.log(error);
        //     this.apiservice.dismiss();
        //   });


        // let conc_type_list:any = '{"access_token":"'+this.accessToken+'","operation":"anual_renew_maintenance_price","moduleType":"shopping_cart","api_type":"web","element_data":{"action":"anualrenewmaintenanceprice","product_sale_type":"'+this.order_type+'","code":"'+this.selected_currency +'","license_key":"'+this.l_key_main+'"}}';      
        // console.log(conc_type_list);
        // this.apiservice.sendServer(conc_type_list).then((response:any) => {
        //   console.log(response);
        //   this.isUpgrade = false;
        //   this.l_r_price= response.price;
        //   this.l_r_year= response.year;
        //   this.l_r_actual_price= response.actual_price;
        //   this.l_r_temp_price= response.temp_price;
        //   this.l_r_edition= response.edition;
        //   this.l_r_simultaneous_call= response.simultaneous_call;
        //   this.l_r_edition_key= response.edition_key;
        //   this.l_r_temp_maintenace_price= response.temp_maintenace_price;
        //   this.perpetual= response.perpetual;
        //   this.isRenew = true;


        // });
      }
    }

  }
  addtoCart() {
    console.log(this.order_type);
    if (this.order_type != null || this.order_type != undefined){

    this.apiservice.present("Adding");


    // if(this.order_type === 'new'){
    // this.cart_value = '{"access_token":"'+this.accessToken+'","operation":"add_to_cart","moduleType":"shopping_cart","api_type":"web","element_data":{"action":"addtocart","product_sale_type":"'+this.order_type+'","code":"'+this.selected_currency +'","edition":"'+this.edition+'","edition_key":"'+this.edition_type+'","simultaneous_call_value":"'+this.con_lic_value+'","simultaneous_call_pricevalue":"'+this.con_lic_price_value+'","simultaneous_call":"'+this.con_lic_option_value+'","quantity":"'+this.quantity+'","perpetual":"'+this.perpetual+'","maintenance":"'+this.maintenance+'","temp_price":"'+this.con_lic_price_value+'","actual_price":"'+this.con_lic_price_value+'","temp_maintenance_price":"409.51"}}';      
    // } else {
    //  if(this.order_type === 'upgrade'){
    // var array = this.l_edition_options_edition.split(','); // this will make string an array 
    // var l_opt_edition = array[0];
    // var l_opt_edition_key = array[1];
    // var array = this.l_edition_options_simultaneouscall.split(','); // this will make string an array 
    // var l_opt_sc_value = array[0];
    // var l_opt_sc_price = array[1];
    // var l_opt_sc_option_value = array[2];
    // this.cart_value = '{"access_token":"'+this.accessToken+'","operation":"add_to_cart","moduleType":"shopping_cart","api_type":"web","element_data":{"action":"addtocart","product_sale_type":"'+this.order_type+'","code":"'+this.selected_currency +'","license_key":"'+this.l_key_main+'","edition":"'+l_opt_edition+'","edition_key":"'+l_opt_edition_key+'","simultaneous_call_value":"'+l_opt_sc_value+'","simultaneous_price_value":"'+l_opt_sc_price+'","simultaneous_call":"'+l_opt_sc_option_value+'","quantity":"'+this.quantity+'","perpetual":"'+this.perpetual+'","maintenance":"'+this.maintenance+'","temp_price":"'+l_opt_sc_price+'","actual_price":"'+l_opt_sc_price+'","temp_maintenance_price":"409.51"}}';      
    //  } else {
    //    this.cart_value = '{"access_token":"'+this.accessToken+'","operation":"add_to_cart","moduleType":"shopping_cart","api_type":"web","element_data":{"action":"addtocart","product_sale_type":"'+this.order_type+'","code":"'+this.selected_currency +'","license_key":"'+this.l_key_main+'","edition":"'+this.l_r_edition+'","edition_key":"'+this.l_r_edition_key+'","simultaneous_call_value":"'+this.l_r_simultaneous_call+'","quantity":"'+this.quantity+'","perpetual":"'+this.perpetual+'","maintenance":"'+this.l_r_year+'","temp_price":"'+this.l_r_temp_price+'","actual_price":"'+this.l_r_actual_price+'","temp_maintenance_price":"'+this.l_r_temp_maintenace_price+'"}}';      
    //  }
    // }

    // if(this.maintenance > 5){
    //  this.showToast('please enter valid maintenance','top'); 
    //  return false;
    // }
    // console.log(this.cart_value);
    //  this.apiservice.sendServer(this.cart_value).then((response:any) => { 
    //    console.log(response);
    //    this.showToast('Product Added To Cart','top');
    //    setTimeout(()=>{    //<<<---    using ()=> syntax
    //      this.router.navigate(['/view-cart']);
    // }, 1500);
    //  });


    let insert_cart_req: any = new Object();


    let insert_cart: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': insert_cart_req
    });

    console.log(this.cust_cx_data);
    if (this.order_type === 'new') {
      insert_cart_req.action = 'insert_cart';
      insert_cart_req.customer_id = this.userId;
      insert_cart_req.product_sale_type = this.order_type;
      insert_cart_req.quantity = this.quantity;
      insert_cart_req.maintenance = this.maintenance;
      insert_cart_req.simultaneous_call = this.con_lic_value;
      insert_cart_req.license_key = this.l_key_main;
      insert_cart_req.edition_key = this.edition_type;
      insert_cart_req.dicountPercentage = this.con_lic_discount_value;
      insert_cart_req.temp_price = this.con_lic_price_value;
      insert_cart_req.actual_price = this.con_lic_price_value;
      insert_cart_req.perpetual = '1';
      insert_cart_req.edition = this.edition;
      insert_cart_req.temp_maintenace_price = this.temp_maintenace_price;
    } else if (this.order_type === 'upgrade') {


      console.log(this.l_edition_options_edition);
      console.log(this.l_edition_options_edition);
      if (this.l_edition_options_edition == undefined) {
        this.showToast('please select the edition', 'top');
        return false;
      }
      if (this.l_edition_options_simultaneouscall == undefined) {
        this.showToast('please select the simultaneouscall ', 'top');
        return false;
      }

      var array = this.l_edition_options_edition.split(','); // this will make string an array 
      var l_opt_edition = array[0];
      var l_opt_edition_key = array[1];
      var l_opt_edition_option = array[2];
      var array = this.l_edition_options_simultaneouscall.split(','); // this will make string an array 
      var l_opt_sc_value = array[0];
      var l_opt_sc_price = array[1];
      var l_opt_sc_option_value = array[2];
      var l_opt_sc_discount = array[3];

      insert_cart_req.action = 'insert_cart';
      insert_cart_req.customer_id = this.userId;
      insert_cart_req.product_sale_type = this.order_type;
      insert_cart_req.quantity = this.quantity;
      insert_cart_req.maintenance = this.maintenance;
      insert_cart_req.simultaneous_call = l_opt_sc_value;
      insert_cart_req.license_key = this.l_key_main;
      insert_cart_req.edition_key = l_opt_edition;
      insert_cart_req.dicountPercentage = l_opt_sc_discount;
      insert_cart_req.temp_price = l_opt_sc_price;
      insert_cart_req.actual_price = l_opt_sc_price;
      insert_cart_req.perpetual = '1';
      insert_cart_req.edition = l_opt_edition_option;
      insert_cart_req.temp_maintenace_price = '0';

      // formData.append('product_sale_type', this.order_type);
      // formData.append('edition', l_opt_edition);
      // formData.append('license_key', this.l_key_main);
      // formData.append('edition_key', l_opt_edition_key);
      // formData.append('simultaneous_call', l_opt_sc_value);

      // formData.append('temp_price', l_opt_sc_price);
      // formData.append('actual_price', l_opt_sc_price);
      // formData.append('temp_maintenace_price', '0');
      // formData.append('quantity', '1');
      // formData.append('maintenance', '0');
      // formData.append('perpetual', '1');


    } else if (this.order_type === 'maintenance') {

      console.log(this.l_edition_options_edition);
      console.log(this.l_edition_options_edition);
      if (this.l_edition_options_edition == undefined) {
        this.showToast('please select the edition', 'top');
        return false;
      }
      if (this.l_edition_options_simultaneouscall == undefined) {
        this.showToast('please select the simultaneouscall ', 'top');
        return false;
      }

      var array = this.l_edition_options_edition.split(','); // this will make string an array 
      var l_opt_edition = array[0];
      var l_opt_edition_key = array[1];
      var l_opt_edition_option = array[2];
      var array = this.l_edition_options_simultaneouscall.split(','); // this will make string an array 
      var l_opt_sc_value = array[0];
      var l_opt_sc_price = array[1];
      var l_opt_sc_option_value = array[2];
      var l_opt_sc_discount = array[3];

      // "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJlcnAuY2FsNGNhcmUuY29tIiwiYXVkIjoiZXJwLmNhbDRjYXJlLmNvbSIsImlhdCI6MTYwMTAzMDQ1NywibmJmIjoxNjAxMDMwNDU3LCJleHAiOjE2MDEwNDg0NTcsImFjY2Vzc19kYXRhIjp7InRva2VuX2FjY2Vzc0lkIjpudWxsLCJ0b2tlbl9hY2Nlc3NOYW1lIjpudWxsLCJ0b2tlbl9hY2Nlc3NUeXBlIjpudWxsfX0.DO5AhlihljqX8RVsGTRLZYFhqsbFlvfMeiQuTSEIH7Y",
      //   "operation": "curlDatas",
      //     "moduleType": "login",
      //       "api_type": "web",
      //         "element_data": {
      //   "action": "insert_cart",
      //     "customer_id": "4481",
      //       "product_sale_type": "maintenance",
      //         "quantity": "1",
      //           "maintenance": "1",
      //             "simultaneous_call": "64",
      //               "license_key": "COX6-2AQO-9ZDR-7F93",
      //                 "edition_key": "3CXPSPROF",
      //                   "dicountPercentage": "30",
      //                     "temp_price": "2240.00",
      //                       "actual_price": "2240.00",
      //                         "perpetual": "1",
      //                           "edition": "Professional",
      //                             "temp_maintenace_price": "0"
      // }

      insert_cart_req.action = 'insert_cart';
      insert_cart_req.customer_id = this.userId;
      insert_cart_req.product_sale_type = this.order_type;
      insert_cart_req.quantity = this.quantity;
      insert_cart_req.maintenance = '1';
      insert_cart_req.simultaneous_call = this.l_r_simultaneous_call;
      insert_cart_req.license_key = this.l_key_main;
      insert_cart_req.edition_key = this.l_r_edition_key;
      insert_cart_req.dicountPercentage = l_opt_sc_discount;
      insert_cart_req.temp_price = this.l_r_temp_price;
      insert_cart_req.actual_price = this.l_r_actual_price;
      insert_cart_req.perpetual = this.perpetual;
      insert_cart_req.edition = l_opt_edition_option;
      insert_cart_req.temp_maintenace_price = this.l_r_temp_maintenace_price;


      // formData.append('product_sale_type', this.order_type);

      // formData.append('edition', this.l_r_edition);
      // formData.append('license_key', this.l_key_main);
      // formData.append('edition_key', this.l_r_edition_key);
      // formData.append('simultaneous_call', this.l_r_simultaneous_call);
      // formData.append('temp_maintenace_price', this.l_r_temp_maintenace_price);
      // formData.append('maintenance', this.l_r_year);
      // formData.append('perpetual', '1');

      // formData.append('temp_price', this.l_r_temp_price);
      // formData.append('actual_price', this.l_r_actual_price);

      // formData.append('quantity', '1');
    }


    this.apiservice.newsendServer(insert_cart).then((response: any) => {
      console.log(response);
      if (response.status == 'true') {
        this.apiservice.dismiss();
        this.showToast('Product Added To Cart', 'top');

        setTimeout(() => {
          this.resets();   //<<<---    using ()=> syntax
          this.router.navigate(['/view-cart']);
        }, 1200);
      }
      this.apiservice.dismiss();
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });



    // var formData = new FormData();
    // if (this.order_type === 'new') {
    //   formData.append('product_sale_type', this.order_type);
    //   formData.append('edition', this.edition);
    //   formData.append('license_key', this.l_key_main);
    //   formData.append('edition_key', this.edition_type);
    //   formData.append('temp_price', this.con_lic_price_value);
    //   formData.append('actual_price', this.con_lic_price_value);
    //   formData.append('temp_maintenace_price', this.temp_maintenace_price);
    //   formData.append('simultaneous_call', this.con_lic_value);
    //   formData.append('quantity', this.quantity);
    //   formData.append('maintenance', this.maintenance);
    //   formData.append('perpetual', this.perpetual);

    // }
    // else if (this.order_type === 'upgrade') {
    //   console.log(this.l_edition_options_edition)
    //   console.log(this.l_edition_options_edition)
    //   if (this.l_edition_options_edition == undefined) {
    //     this.showToast('please select the edition', 'top');
    //     return false;
    //   }
    //   if (this.l_edition_options_simultaneouscall == undefined) {
    //     this.showToast('please select the simultaneouscall ', 'top');
    //     return false;
    //   }

    //   var array = this.l_edition_options_edition.split(','); // this will make string an array 
    //   var l_opt_edition = array[0];
    //   var l_opt_edition_key = array[1];
    //   var array = this.l_edition_options_simultaneouscall.split(','); // this will make string an array 
    //   var l_opt_sc_value = array[0];
    //   var l_opt_sc_price = array[1];
    //   var l_opt_sc_option_value = array[2];

    //   // 
    //   formData.append('product_sale_type', this.order_type);
    //   formData.append('edition', l_opt_edition);
    //   formData.append('license_key', this.l_key_main);
    //   formData.append('edition_key', l_opt_edition_key);
    //   formData.append('simultaneous_call', l_opt_sc_value);

    //   formData.append('temp_price', l_opt_sc_price);
    //   formData.append('actual_price', l_opt_sc_price);
    //   formData.append('temp_maintenace_price', '0');
    //   formData.append('quantity', '1');
    //   formData.append('maintenance', '0');
    //   formData.append('perpetual', '1');




    // }
    // else {

    //   formData.append('product_sale_type', this.order_type);

    //   formData.append('edition', this.l_r_edition);
    //   formData.append('license_key', this.l_key_main);
    //   formData.append('edition_key', this.l_r_edition_key);
    //   formData.append('simultaneous_call', this.l_r_simultaneous_call);
    //   formData.append('temp_maintenace_price', this.l_r_temp_maintenace_price);
    //   formData.append('maintenance', this.l_r_year);
    //   formData.append('perpetual', '1');

    //   formData.append('temp_price', this.l_r_temp_price);
    //   formData.append('actual_price', this.l_r_actual_price);

    //   formData.append('quantity', '1');
    // }









    // var s = this;
    // $.ajax({
    //   url: 'https://erp.cal4care.com/cms/includes/modules/getdata/getFormTemplate/cart_page_for_app.php?action=cms_3cx_cart_add&customer_id=' + this.userId + '',
    //   type: 'POST',
    //   data: formData,
    //   processData: false,  // tell jQuery not to process the data
    //   contentType: false,
    //   success: function (data) {
    //     console.log(JSON.parse(data));
    //     var responsedata = JSON.parse(data)
    //     //  s.apiservice.dismiss();

    //     if (responsedata.Result == 1) {
    //       s.apiservice.dismiss();
    //       s.showToast('Product Added To Cart', 'top');

    //       setTimeout(() => {
    //         s.resets()   //<<<---    using ()=> syntax
    //         s.router.navigate(['/view-cart']);
    //       }, 1200);


    //     } else {
    //       s.apiservice.dismiss();
    //       s.showToast('Error Occured,Try again', 'top');
    //     }





    //   }
    // });

    }

  }

  ionViewWillEnter() {

    this.resets();
    this.getcx();

    this.quantity = '1';
    this.maintenance = '0';
    this.l_key_main = '';
  }
  resets() {
    this.phones = [];
    this.customerlogid = '';
    this.reseller_discount = '';
    this.selected_currency = '';
    this.order_type = '';
    this.edition = '';
    this.con_lic_option_value = '';
    this.perpetual = '';
    this.quantity = '';
    this.maintenance = '';
    this.edition_type = '';
    this.l_key_main = '';
    this.l_edition_key = '';
    this.l_edition = '';
    this.l_temp_maintenace_price = '';
    this.l_options_edition = '';
    this.l_options_simultaneouscall = '';
    this.cart_value = '';
    this.price_message = '';
    this.con_lic_value = '';
    this.con_lic_price_value = '';
    this.concurrent_licence_select = '';
    this.l_edition_options_edition = '';
    this.l_edition_options_simultaneouscall = '';
    this.l_r_price = '';
    this.l_r_year = '';
    this.l_r_actual_price = '';
    this.l_r_temp_price = '';
    this.l_r_edition = '';
    this.l_r_simultaneous_call = '';
    this.l_r_edition_key = '';
    this.l_r_temp_maintenace_price = '';
    this.temp_maintenace_price = '';
    this.isNewLicense = false;
    this.isChange = false;
    this.isUpgrade = false;
    this.isRenew = false;
    // this.isNewLicense = true;
    // this.isChange = true;
  }



}






