import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-support-ticket',
  templateUrl: './support-ticket.page.html',
  styleUrls: ['./support-ticket.page.scss'],
})
export class SupportTicketPage implements OnInit {
  infinite_value;
  offset_value = 0;
  userId;
  auth_token: any;
  tickets: any = [];
  total_pages;
  nodata = false;
  isdata = false;

  constructor(public apiservice: ApiService, private router: Router,) { 
    this.userId = localStorage.userId;
    this.auth_token = localStorage.auth_token;
    // this.getinvoice('open', this.offset_value);
  }

  ngOnInit() {
    // this.userId = localStorage.userId;
    // this.auth_token = localStorage.auth_token;
    // this.getinvoice('open', this.offset_value);
  }


  ionViewWillEnter(){

    this.getinvoice('open', this.offset_value);
  }

  goToTestPage() {
    if (localStorage.getItem('resellerstate') == '1' && localStorage.getItem('reseller_dashboard') == '1') {
      this.router.navigateByUrl('/listing-payouts');
    }else{
      this.router.navigateByUrl('/dashboard');
    }
  }

  sendto(){
    this.router.navigate(['/create-ticket']);
    }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.infinite_value = ev.detail.value;
    this.offset_value = 0;
    this.getinvoice(ev.detail.value, this.offset_value);

  }


  getinvoice(value, offset) {
    if (this.offset_value == 0) {
      this.apiservice.present("Loading Your Tickets");
    }
    let invoice_req: any = new Object();

    let invoice_list: any = ({
      'api_type': 'web',
      'operation': 'curlDatas',
      'access_token': this.auth_token,
      'moduleType': 'login',
      'element_data': invoice_req
    });




    if (value == 'open') {
      invoice_req.action = 'open_ticket';
      invoice_req.customer_id = this.userId;
      invoice_req.limit = '10';
      invoice_req.offset = offset;
      if (offset == 0) {
        this.tickets = [];
      }


    } else {
      invoice_req.action = 'closed_ticket';
      invoice_req.customer_id = this.userId;
      invoice_req.limit = '10';
      invoice_req.offset = offset;
      if (offset == 0) {
        this.tickets = [];
      }
    }

    this.apiservice.newsendServer(invoice_list).then((response: any) => {
      console.log(response);
      // this.apiservice.dismiss();
      if (response.status == 'true') {
        this.total_pages = response.Total;
        if (value == 'open') {
          for (let i = 0; i < response.open.length; i++) {
            this.tickets.push(response.open[i]);
            // alert('open');
          }
        } else {
          for (let i = 0; i < response.closed.length; i++) {
            this.tickets.push(response.closed[i]);
            // alert('closed');
          }
        }
        this.isdata = true;
        this.nodata = false;
        if (this.tickets.length == 0) {
          this.nodata = true;
        }
      } else if (response.status == 'false') {
        this.nodata = true;
        this.isdata = false;
      } else {
        this.nodata = true;
        this.isdata = false;
      }
      this.apiservice.dismiss();
    },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });
  }



  viewtickets(ticket_num){
    localStorage.setItem('tic_num',ticket_num);
    this.router.navigateByUrl('/view-tickets');
  }

}
