import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-view-tickets',
  templateUrl: './view-tickets.page.html',
  styleUrls: ['./view-tickets.page.scss'],
})
export class ViewTicketsPage implements OnInit {
  ticket_num;
  userId;
  auth_token;
  tic_num;
  tic_status;
  tic_priority;
  tic_dept;
  tic_create_time;
  tic_username;
  tic_user_email;
  tic_source;
  tic_assigned_to;
  tic_due_time;
  tic_help_topic;
  last_msg_time;
  last_reponsed_time;
  datalist;
  staff_img;
  user_img;
  files;
  replaymessage;

  constructor(public apiservice: ApiService, private router: Router) {
    this.ticket_num =localStorage.getItem('tic_num');
    this.userId = localStorage.userId;
    this.auth_token = localStorage.auth_token;
   
   }

  ngOnInit() {
    this.getticketInfo();
  }

  getticketInfo(){
     
   let invoice_req: any = new Object();

    let invoice_list: any = ({
      'api_type': 'web',
      'operation': 'ticket',
      'access_token': this.auth_token,
      'moduleType': 'ticket',
      'element_data': invoice_req
    });

    invoice_req.action = 'getTicketInfo';
    invoice_req.ticket_id = this.ticket_num;

    this.apiservice.newsendServer(invoice_list).then((response: any) => {
      console.log(response);
      // if(response.result.status == true){
       this.staff_img = response.result.data.staff_avatar;
        this.user_img = response.result.data.user_avatar;
       this.tic_num = response.result.data.ticket.ticket_number;
       
       this.tic_status = response.result.data.ticket.ticket_status;
       this.tic_priority =  response.result.data.ticket.priority;
       this.tic_dept = response.result.data.ticket.department;
       this.tic_create_time = response.result.data.ticket.create_timestamp;
       this.tic_username = response.result.data.ticket.user_name;
       this.tic_user_email = response.result.data.ticket.user_email.address;
       this.tic_source = response.result.data.ticket.source;
       console.log(response.result.data.ticket.assigned_to);
       if(response.result.data.ticket.assigned_to.length != 0){
       this.tic_assigned_to = response.result.data.ticket.assigned_to[0].name;
       }
       this.tic_due_time = response.result.data.ticket.due_timestamp;
       this.tic_help_topic = response.result.data.ticket.help_topic;
       console.log(this.tic_help_topic);
       this.last_msg_time = response.result.data.ticket.last_message_timestamp;
       this.last_reponsed_time = response.result.data.ticket.last_response_timestamp;
       console.log(this.last_msg_time);
       console.log(this.last_reponsed_time);
       this.datalist = response.result.data.ticket.thread_entries;
       console.log(this.datalist);
      // }
      // this.apiservice.dismiss();
        },
      (error) => {
        console.log(error);
        this.apiservice.dismiss();
      });

  
  }


  
  changeListener($event): void {
    this.files = $event.target.files[0];
    console.log(this.files);
  }

  replyOldticket(){
    // let access_token: any=localStorage.getItem('at');
    // let customer_id: any=localStorage.getItem('en');
        this.apiservice.present("Loading");

      const forms = new FormData();
      forms.append('name', this.tic_username);
      forms.append('email', this.tic_user_email);
      forms.append('ticket_number', this.tic_num);
      forms.append('message', this.replaymessage);
      forms.append('attachment', this.files);
      forms.append('action_info', 'reply_ticket');
      forms.append('action', 'reply_ticket');
      forms.append('operation', 'ticket');
      forms.append('access_token', this.auth_token);
      forms.append('moduleType', 'ticket');
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
        self.apiservice.dismiss();
        self.getticketInfo();
        //  iziToast.success({
        //          message: "Ticket Created Sucessfully",
        //          position: 'topRight'
        //      });
        }
      });
}

}
