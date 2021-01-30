import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastController, AlertController } from '@ionic/angular';

declare var $: any;
@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.page.html',
  styleUrls: ['./view-cart.page.scss'],
})
export class ViewCartPage implements OnInit {
  accessToken: any;
  selected_currency: any;
  cart: any;
  cartItems: any;
  net_total: any;
  tax_value: any;
  viewinput = false;
  grand_total: any;
  edit_reseller: any;
  tax_discount: any;
  reseller_id: any;
  currency_code: any = [];
  userId;
  auth_token;
  constructor(public apiservice: ApiService, public toastController: ToastController, private router: Router, public alertController: AlertController) { }

  ngOnInit() {
    this.accessToken = localStorage.getItem('access_user');
    this.userId = localStorage.getItem('userId');
    this.selected_currency = localStorage.getItem('selected_price');
    this.auth_token = localStorage.getItem('auth_token');

    this.cartProducts();

  }


  // cartProducts(){
  //   let products_list:any = '{"access_token":"'+this.accessToken+'","operation":"get_cart_list","moduleType":"shopping_cart","api_type":"web","element_data":{"action":"getcartlist","code":"'+this.selected_currency+'"}}';


  //   this.apiservice.sendServer(products_list).then((response:any) => {
  //   	console.log(response);
  //     if(response.status == 'true'){
  //         this.cartItems = response.options;
  //         this.net_total = response.net_total;
  //         this.tax_value = response.tax_value;
  //         this.grand_total = response.grand_total;
  //         this.reseller_id = response.reseller_id;
  //     }
  //   });
  // }





  cartProducts() {
    // this.apiservice.present("Loading Your Invoice");

    let view_cart_req: any = new Object();


    let view_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': view_cart_req
    });


    view_cart_req.action = 'getcartlist';
    view_cart_req.customer_id = this.userId;


    this.apiservice.newsendServer(view_list).then((response: any) => {
      console.log(response);
      if (response.status == 'true') {
        // this.currency_code = response.Customer_data.currency_name;
        for (let i = 0; i < response.Customer_data.currency_name.length; i++) {
        }
        this.currency_code.push(response.Customer_data.currency_name);
        this.cartItems = response.options;
        this.net_total = response.total_price_all;
        this.tax_value = response.total_tax_value;
        this.grand_total = response.grand_total_value;
        this.reseller_id = response.Customer_data.reseller_id;
        this.tax_discount = response.Customer_data.tax_percent;
      } else {
        this.currency_code = [];
        this.showToast('No Cart Data', 'top');
      }
      this.apiservice.dismiss();
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });


    // let dataURL = 'https://erp.cal4care.com/cms/includes/modules/getdata/getFormTemplate/cart_page_for_app.php?action=view_cart&customer_id=' + this.userId + ''
    // this.apiservice.sendcmsServer(dataURL).then((response: any) => {
    //   console.log(response)
    //   if (response.option_value) {
    //     // this.phones= response.concurrency_option
    //     // console.log(this.phones)
    //     this.cartItems = response.option_value;
    //     this.net_total = response.Nettotal;
    //     this.tax_value = response.Taxvalue;
    //     this.grand_total = response.Grandtotal;
    //     this.reseller_id = response.Resellerid;
    //   }
    //   // this.apiservice.dismiss();
    // },
    //   (error) => {
    //     console.log(error);
    //     // this.apiservice.dismiss();
    //   });




  }




  async removecart() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Dear User',
      message: 'Do you wish to delete the cart items?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'okay',
          handler: () => {

            this.removeAllCart()
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }





  //    removeCart(cart_id){
  //    	// console.log(cart_id);
  //    let remove_item:any = '{"select_chk":'+cart_id+'}';

  // let dataURL ='https://erp.cal4care.com/cms/includes/modules/getdata/getFormTemplate/cart_page_for_app.php?action=cms_3cx_single_cart_delete&customer_id='+this.userId+'';

  //       this.apiservice.sendurlpost(dataURL,remove_item).then((response:any) => {
  //       	console.log(response);
  //         // if(response.status == 'true'){
  //         		// this.cartProducts();
  //         	// }
  //       });
  //    }



  removesCart(cart_id) {

    this.apiservice.present("Deleting");


    // var formData = new FormData();
    // formData.append('select_chk', cart_id);



    let delete_single_list_req: any = new Object();


    let delete_single_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': delete_single_list_req
    });


    delete_single_list_req.action = 'remove_cart';
    delete_single_list_req.customer_id = this.userId;
    delete_single_list_req.select_chk = cart_id;


    this.apiservice.newsendServer(delete_single_list).then((response: any) => {
      console.log(response);
      if (response.status == 'true') {
        // if (this.phones.length == 0) {
        //   this.nodata = true;
        // }
        this.showToast('Product deleted Successfully', 'top');
        this.cartProducts();
        setTimeout(() => {    //<<<---    using ()=> syntax
          this.router.navigate(['/view-cart']);
        }, 1500);
      } else {
        this.showToast('Error Occured,Try again', 'top');
      }
      this.apiservice.dismiss();
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });





    // var s = this;
    // $.ajax({
    //   url: 'https://erp.cal4care.com/cms/includes/modules/getdata/getFormTemplate/cart_page_for_app.php?action=cms_3cx_single_cart_delete&customer_id=' + this.userId + '',
    //   type: 'POST',
    //   data: formData,
    //   processData: false,  // tell jQuery not to process the data
    //   contentType: false,
    //   success: function (data) {
    //     console.log(JSON.parse(data));
    //     var responsedata = JSON.parse(data)
    //     s.apiservice.dismiss();

    //     if (responsedata.Result == 1) {


    //       s.showToast('Product deleted Successfully', 'top');
    //       s.cartProducts();
    //       //    setTimeout(()=>{    //<<<---    using ()=> syntax
    //       //      s.router.navigate(['/view-cart']);
    //       // }, 1500);


    //     } else {
    //       s.showToast('Error Occured,Try again', 'top');
    //     }




    //   }
    // });



  }

  removeAllCart() {


    this.apiservice.present("Deleting");

    var formData = new FormData();


    var deleteids = []

    for (var i = 0; i < this.cartItems.length; i++) {
      deleteids.push(this.cartItems[i].Cartid)
    }
    var json_arr = JSON.stringify(deleteids);
    formData.append('select_chk', json_arr);

    var s = this;
    $.ajax({

      url: 'https://erp.cal4care.com/cms/includes/modules/getdata/getFormTemplate/cart_page_for_app.php?action=cms_3cx_cart_delete&customer_id=' + this.userId + '',
      type: 'POST',
      data: formData,
      processData: false,  // tell jQuery not to process the data
      contentType: false,
      success: function (data) {
        console.log(JSON.parse(data));
        var responsedata = JSON.parse(data)
        s.apiservice.dismiss();

        if (responsedata.Result == 1) {


          s.showToast('Cart deleted Successfully', 'top');
          s.cartProducts();
          //    setTimeout(()=>{    //<<<---    using ()=> syntax
          //      s.router.navigate(['/view-cart']);
          // }, 1500);


        } else {
          s.showToast('Error Occured,Try again', 'top');
        }




      }
    });



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

  goback() {
    this.router.navigate(['/order-license']);
  }

  goforward() {
    console.log(this.cartItems.length);
    if (this.cartItems.length > 0) {
      this.router.navigate(['/proceed-cart']);
    }
  }

  doRefresh(event) {
    this.cartProducts();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  editing() {
    this.viewinput = true;
  }

  cancelinput() {
    this.viewinput = false;
  }


  editresellerid() {

    let edit_reseller_req: any = new Object();


    let edit_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'payment',
      'element_data': edit_reseller_req
    });


    edit_reseller_req.action = 'reseller_id_change';
    edit_reseller_req.customer_id = this.userId;
    edit_reseller_req.new_reseller_id = this.edit_reseller;


    this.apiservice.newsendServer(edit_list).then((response: any) => {
      if (response.status == 'true') {

      }
      this.apiservice.dismiss();
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });

  }

}
