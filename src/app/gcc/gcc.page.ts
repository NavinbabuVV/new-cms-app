import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

// import { Gesture, GestureController } from '@ionic/angular';
declare var $: any;
import Swal from 'sweetalert2';


@Component({
  selector: 'app-gcc',
  templateUrl: './gcc.page.html',
  styleUrls: ['./gcc.page.scss'],
})
export class GccPage implements OnInit {
  userId;
  auth_token;
  username;
  timers;
  listing_gcc: any;
  count: number = 0;
  total: any;

  constructor(public toastController: ToastController, public apiservice: ApiService, private router: Router, public alertController: AlertController) {

  }



  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.auth_token = localStorage.getItem('auth_token');
    this.username = localStorage.getItem('username');
    this.getgcc();

  }


  async presentToast(Messages) {
    const toast = await this.toastController.create({
      message: Messages,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  goToTestPage() {
    if (localStorage.getItem('resellerstate') == '1') {
      this.router.navigateByUrl('/listing-payouts');
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }

  getgcc() {
    //   {
    //     "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJlcnAuY2FsNGNhcmUuY29tIiwiYXVkIjoiZXJwLmNhbDRjYXJlLmNvbSIsImlhdCI6MTYwMTAzMDQ1NywibmJmIjoxNjAxMDMwNDU3LCJleHAiOjE2MDEwNDg0NTcsImFjY2Vzc19kYXRhIjp7InRva2VuX2FjY2Vzc0lkIjpudWxsLCJ0b2tlbl9hY2Nlc3NOYW1lIjpudWxsLCJ0b2tlbl9hY2Nlc3NUeXBlIjpudWxsfX0.DO5AhlihljqX8RVsGTRLZYFhqsbFlvfMeiQuTSEIH7Y",
    //     "operation": "curlDatas",
    //     "moduleType": "gcc",
    //     "api_type": "web",
    //     "element_data":{
    //         "action":"ip_list",
    //         "customer_id": "NDgwNQ==",
    //         "limit":"10",
    //         "offset":"0"
    //         }
    // }

    let edition_change_req: any = new Object();


    let edition_change_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'gcc',
      'element_data': edition_change_req
    });

    edition_change_req.action = 'ip_list';
    edition_change_req.customer_id = this.userId;
    edition_change_req.limit = '10';
    edition_change_req.offset = '0';

    this.apiservice.newsendServer(edition_change_list).then((response: any) => {
      if (response.status == 'true') {
        console.log(response);
        this.listing_gcc = response.gcclist;
        this.total = response.result_data.total;
      } else {

      }

    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });



  }


  popups() {
    // alert('hello navin');
    // this.presentAlertPrompt();
    Swal.fire({
      title: 'Add IP Address',
      showCancelButton: true,
      confirmButtonText: 'Approve it!',
      cancelButtonText: 'Cancel',
      html:
        '<label>Customer Name</label>' +
        '<input id="swal-input1" value="' + this.username + '" readonly class="swal2-input">' +
        '<label>IPv4 IP Address</label>' +
        '<input id="swal-input2" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        var customer_name = $('#swal-input1').val();
        var ip_values = $('#swal-input2').val();
        console.log(customer_name);
        console.log(ip_values);

        let create_ip_req: any = new Object();


        let edition_change_list: any = ({
          'api_type': 'web',
          'operation': 'curlDatas',
          'access_token': this.auth_token,
          'moduleType': 'gcc',
          'element_data': create_ip_req
        });

        create_ip_req.action = 'add_ip_list';
        create_ip_req.customer_id = this.userId;
        create_ip_req.global_customer_name = this.username;
        create_ip_req.ip_data = ip_values;

        this.apiservice.newsendServer(edition_change_list).then((response: any) => {
          if (response.status == 'true') {
            this.presentToast('Added successfully');
            this.getgcc();
          }
        },
          (error) => {
            console.log(error);
            this.apiservice.dismiss();
          });


      }
    })

    // if (formValues) {
    //   Swal.fire(JSON.stringify(formValues))
    // }
  }


  async presentAlertConfirm(Messages, testing, ips_child, masters_ip) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation!',
      message: Messages,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Submit',
          handler: () => {
            console.log('Confirm Okay');

            if (testing == 0) {
              let get_auto_req: any = new Object();


              let get_change_list: any = ({
                'api_type': 'web',
                'operation': 'curlDatas',
                'access_token': this.auth_token,
                'moduleType': 'gcc',
                'element_data': get_auto_req
              });

              get_auto_req.action = 'auto_renewal';
              get_auto_req.customer_id = this.userId;
              get_auto_req.global_customer_name = this.username;
              get_auto_req.ip_child_id = masters_ip;
              get_auto_req.ip_data = ips_child;

              this.apiservice.newsendServer(get_change_list).then((response: any) => {
                if (response.status == 'true') {
                  this.getgcc();
                }
              },
                (error) => {
                  console.log(error);
                  this.apiservice.dismiss();
                });
            } else if (testing == 1) {

              let remove_auto_req: any = new Object();


              let remove_auto_change_list: any = ({
                'api_type': 'web',
                'operation': 'curlDatas',
                'access_token': this.auth_token,
                'moduleType': 'gcc',
                'element_data': remove_auto_req
              });

              remove_auto_req.action = 'auto_renewal_remove';
              remove_auto_req.customer_id = this.userId;
              remove_auto_req.global_customer_name = this.username;
              remove_auto_req.ip_child_id = masters_ip;
              remove_auto_req.ip_data = ips_child;

              this.apiservice.newsendServer(remove_auto_change_list).then((response: any) => {
                if (response.status == 'true') {
                  this.getgcc();
                }
              },
                (error) => {
                  console.log(error);
                  this.apiservice.dismiss();
                });

            } else if (testing == 2) {

              let flush_req: any = new Object();

              let flush_change_list: any = ({
                'api_type': 'web',
                'operation': 'curlDatas',
                'access_token': this.auth_token,
                'moduleType': 'gcc',
                'element_data': flush_req
              });

              flush_req.action = 'flush_ip_list';
              flush_req.customer_id = this.userId;
              flush_req.global_customer_name = this.username;
              flush_req.ip_child_id = masters_ip;
              flush_req.ip_data = ips_child;

              this.apiservice.newsendServer(flush_change_list).then((response: any) => {
                if (response.status == 'true') {
                  this.getgcc();
                }
              },
                (error) => {
                  console.log(error);
                  this.apiservice.dismiss();
                });

            }


          }
        }
      ]
    });

    await alert.present();

  }

  clickactions(renewal_values, ip_child, master_ip) {
    this.count++;
    setTimeout(() => {
      if (this.count == 1) {
        this.count = 0;
        // alert('Single Tap');
        console.log(renewal_values);
        if (renewal_values == 0) {
          var messages = 'Are you sure want to Auto Renew this IP?';
          this.presentAlertConfirm(messages, 0, ip_child, master_ip);

        } else if (renewal_values == 1) {
          var messages = 'Are you sure want to Remove Auto Renew this IP?';
          this.presentAlertConfirm(messages, 1, ip_child, master_ip);
        }

      } if (this.count > 1) {
        this.count = 0;
        // alert('Double Tap');
        var messages = 'Are you sure want to Flush this IP?';
        this.presentAlertConfirm(messages, 2, ip_child, master_ip);

      }
    }, 250);

  }

}