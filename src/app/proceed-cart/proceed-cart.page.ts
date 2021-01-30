import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
declare var $: any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proceed-cart',
  templateUrl: './proceed-cart.page.html',
  styleUrls: ['./proceed-cart.page.scss'],
})
export class ProceedCartPage implements OnInit {
  userId;
  auth_token;
  options_cart;
  c_datas_name;
  c_datas_address1;
  c_datas_city;
  c_datas_state;
  c_datas_country;
  c_datas_reseller_id;
  c_datas_currency;
  total_price;
  total_tax;
  tax_discount_values;
  couponcodes;
  grand_total;
  c_terms_condition;
  order_date;
  payment_1;
  payment_2;
  disc_percent;
  discount_percentages;
  payment_3;
  item_number = 0;
  datalist: any;
  new_radio;
  selectpayment;
  invoice_id;
  credit_data;
  count;
  trans_amount;
  paynows = false;
  addcarts = true;
  constructor(private router: Router, public apiservice: ApiService, public toastController: ToastController) {

  }

  ngOnInit() {
    this.userId = localStorage.userId;
    console.log(this.userId);
    this.auth_token = localStorage.auth_token;
    this.getviewcart();
  }

  async presentToast(Message, positions) {
    const toast = await this.toastController.create({
      message: Message,
      duration: 2000,
      position: positions
    });
    toast.present();
  }

  getviewcart() {

    let licence_list_req: any = new Object();


    let licence_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': licence_list_req
    });


    licence_list_req.action = 'viewcartlist';
    licence_list_req.customer_id = this.userId;


    this.apiservice.newsendServer(licence_list).then((response: any) => {
      console.log(response.Customer_data.c_datas_currency);
      if (response.status == 'true') {
        this.datalist = response;
        console.log(this.datalist);
        
        this.c_datas_name = response.Customer_data.customerName;
        this.c_datas_address1 = response.Customer_data.customerAddress1;
        this.c_datas_city = response.Customer_data.city;
        this.c_terms_condition = response.Customer_data.terms_condition;
        this.c_datas_state = response.Customer_data.state;
        this.c_datas_country = response.Customer_data.country;
        this.c_datas_reseller_id = response.Customer_data.reseller_id;
        this.c_datas_currency = response.Customer_data.currency_name;
        this.tax_discount_values = response.Customer_data.tax_percent;
        this.options_cart = response.options;
        this.item_number = this.options_cart.length;
        this.count = this.options_cart.length;
        this.total_price = response.total_price_all;
        this.total_tax = response.total_tax_value;
        this.grand_total = response.grand_total_value;
        this.order_date = response.order_date;
        this.payment_1 = response.payment_gateway[0];
        this.payment_2 = response.payment_gateway[1];
        this.payment_3 = response.payment_gateway[2];
      }
      this.apiservice.dismiss();
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });



  }

  getvalues() {
    console.log(this.new_radio);
    this.selectpayment = this.new_radio;
    let payment_list_req: any = new Object();


    let payment_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'payment',
      'element_data': payment_list_req
    });


    payment_list_req.action = 'transaction_charges';
    payment_list_req.customer_id = this.userId;
    payment_list_req.total_amount = this.grand_total;
    payment_list_req.currency_name = this.c_datas_currency;
    payment_list_req.selected_rdo = this.new_radio;


    this.apiservice.newsendServer(payment_list).then((response: any) => {
      if (response.status == 'true') {
        console.log(response);
        this.trans_amount = response.tansaction_charges;
        this.grand_total = response.total_amount;
      }
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });


  }

  verifycoupon() {


    let coupon_list_req: any = new Object();


    let coupon_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'payment',
      'element_data': coupon_list_req
    });


    coupon_list_req.action = 'coupon_code_verify';
    coupon_list_req.customer_id = this.userId;
    coupon_list_req.coupon_code = this.couponcodes;
    coupon_list_req.net_total = this.total_price;
    coupon_list_req.tax_value = this.total_tax;
    coupon_list_req.transaction_charges = this.trans_amount;


    this.apiservice.newsendServer(coupon_list).then((response: any) => {
      if (response.status == 'true') {
        this.grand_total = response.grand_total;
        this.discount_percentages = response.discount_price;
        this.disc_percent = response.discount_percentage;
      }
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });



  }

  paynow() {
    this.paynows = true;
    this.addcarts = false;
  }

  back() {
    // this.paynows =  false;
    // this.addcarts = true;
    // this.getviewcart();
    this.router.navigateByUrl('/view-cart');
  }

  // submit() {
  //   this.selectpayment = this.new_radio;
  //   if (this.selectpayment == '' || this.selectpayment == undefined) {


  //     this.presentToast('Please Select any payment', 'top');
  //     return false;
  //   }
  //   //  console.log($('[name=billing_id]').val())

  //   // console.log($('[name=credit_data]').val())
  //   //  console.log($('[name=action]').val())
  //   // console.log($('[name=payment_order]').val())
  //   // console.log($('[name=payment_from]').val())

  //   // console.log($('[name=currency_code]').val())

  //   // console.log($('[name=order_id]').val())
  //   //  console.log($('[name=credit_data]').val())
  //   // console.log($('[name=transaction_data]').val())
  //   // console.log($('[name=payment_from]').val())

  //   // $('#stripePay_frm').submit();
  //   // $('#payPaylPayment').submit();
  //   // $('#ocbc_sg').submit();

  //   // let datas: any = new Object();
  //   // let datasend: any = new Object();
  //   // let access_token: any = localStorage.getItem('at');
  //   // let customer_id: any = localStorage.getItem('en');

  //   // let payments_list: any = ({
  //   //   'api_type': 'web',
  //   //   'operation': 'curlDatas',
  //   //   'access_token': this.auth_token,
  //   //   'moduleType': 'login',
  //   //   'element_data': datas
  //   // });

  //   let datas: any = new Object();
  //   let datasend: any = new Object();
  //   // let access_token: any = localStorage.getItem('at');
  //   // let customer_id: any = localStorage.getItem('en');


  //   datas.action = "cms_invoice_generate";
  //   datas.customer_id = this.userId;
  //   datas.customer_discount = this.datalist.Customer_data.reseller_dis_per;
  //   datas.select_pay = this.selectpayment;
  //   datas.coupon_code = this.couponcodes;

  //   datasend.access_token = this.auth_token;
  //   datasend.operation = "curlDatas";
  //   datasend.moduleType = "login";
  //   datasend.api_type = "web";
  //   datasend.element_data = datas;


  //   // datas.action = "cms_invoice_generate";
  //   // datas.customer_id = this.userId;
  //   // datas.customer_discount = this.datalist.Customer_data.reseller_dis_per;
  //   // datas.select_pay = this.selectpayment;
  //   // datas.coupon_code = this.couponcodes;

  //   Swal.fire('Please wait');
  //   Swal.showLoading();
  //   // this.apiservice.newsendServer(payments_list).then((response: any) => {

  //   this.apiservice.sendServersss(datasend).subscribe((response: any) => {
  //     console.log(response)
  //     if (response && response.status == "true") {
  //       // Swal.close();
  //       // 
  //       this.invoice_id = response.invoice_id;
  //       this.credit_data = response.credit_data;


  //       setTimeout(() => {


  //         Swal.close();
  //         if (this.selectpayment == 'payment_type_offline') {

  //           $('#licenseKeyGenerate').submit();
  //         }

  //         else if (this.selectpayment == 'payment_type_stripe_pay') {

  //           $('#stripePay_frm').submit();
  //         }

  //         else if (this.selectpayment == 'payment_type_ocbc_sg_payment') {

  //           $('#ocbc_sg').submit();

  //         }

  //         else if (this.selectpayment == 'payment_type_paypal_checkout') {


  //           $('#payPaylPayment').submit();
  //         }
  //         console.log("Hello from setTimeout");
  //       }, 2000);

  //       //   iziToast.success({
  //       //     message: "Product removed from your cart",
  //       //     position: 'topRight'
  //       // });
  //     }
  //     else {
  //       Swal.close();
  //       this.presentToast('Please try again later', 'top');

  //     }


  //   },
  //     (error) => {
  //       console.log(error);
  //     });
  // }









  submitpaymentangular() {

    this.selectpayment = this.new_radio;
    if (this.selectpayment == '' || this.selectpayment == undefined) {


      this.presentToast('Please Select any payment', 'top');
      return false;
    }
  

    let datas: any = new Object();
    let datasend: any = new Object();
    let access_token: any = localStorage.getItem('at');
    // let customer_id: any = localStorage.getItem('en');


    datas.action = "cms_invoice_generate";
    datas.customer_id = this.userId;
    datas.customer_discount = this.datalist.Customer_3cx_data.Reseller_dis_per;
    datas.select_pay = this.selectpayment;
    datas.coupon_code = this.couponcodes;

    datasend.access_token = this.auth_token;
    datasend.operation = "curlDatas";
    datasend.moduleType = "login";
    datasend.api_type = "web";
    datasend.element_data = datas;
    Swal.fire('Please wait')
    Swal.showLoading()
    this.apiservice.sendServersss(datasend).subscribe((response: any) => {
      console.log(response)
      if (response && response.status == "true") {
        // Swal.close();
        // 
        this.invoice_id = response.invoice_id;
        this.credit_data = response.credit_data;


        setTimeout(() => {


          Swal.close();
          if (this.selectpayment == 'payment_type_offline') {

            $('#licenseKeyGenerate').submit();
          }


          else if (this.selectpayment == 'payment_type_stripe_pay') {

            $('#stripePay_frm').submit();
          }

          else if (this.selectpayment == 'payment_type_ocbc_sg_payment') {

            $('#ocbc_sg').submit();

          }

          else if (this.selectpayment == 'payment_type_ocbc_my_payment') {

            $('#ocbc_my').submit();

          }

          else if (this.selectpayment == 'payment_type_paypal_checkout') {


            $('#payPaylPayment').submit();
          }
       // console.log("Hello from setTimeout");
        }, 2000);
                //   iziToast.success({
        //     message: "Product removed from your cart",
        //     position: 'topRight'
        // });
      }
      else {
        Swal.close();
        this.presentToast('Please try again later', 'top');

      }


    },
      (error) => {
        console.log(error);
      });
  }





}
