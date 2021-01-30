import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
declare var $: any;
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.page.html',
  styleUrls: ['./create-ticket.page.scss'],
})
export class CreateTicketPage implements OnInit {
  userData = { "from": "", "dept": "", "subject": "", "message": "", "customer_id": "", "customerCode": "", "customerName": "", "email": "" };
  fileToUpload: any;
  userId: any;
  auth_token: any;
  constructor(public apiservice: ApiService, private router: Router) {
    this.userId = localStorage.getItem('userId');
    this.auth_token = localStorage.getItem('auth_token');
    this.customerdata();
  }

  ngOnInit() {

  }

  customerdata() {
    //   {
    //     "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJlcnAuY2FsNGNhcmUuY29tIiwiYXVkIjoiZXJwLmNhbDRjYXJlLmNvbSIsImlhdCI6MTYwMTAzMDQ1NywibmJmIjoxNjAxMDMwNDU3LCJleHAiOjE2MDEwNDg0NTcsImFjY2Vzc19kYXRhIjp7InRva2VuX2FjY2Vzc0lkIjpudWxsLCJ0b2tlbl9hY2Nlc3NOYW1lIjpudWxsLCJ0b2tlbl9hY2Nlc3NUeXBlIjpudWxsfX0.DO5AhlihljqX8RVsGTRLZYFhqsbFlvfMeiQuTSEIH7Y",
    //     "operation": "curlDatas",
    //     "moduleType": "login",
    //     "api_type": "web",
    //     "element_data":{
    //         "action":"customer_data",
    //         "customer_id": "NDQ4MQ"
    //         }
    // }




    let login_nootp_req: any = new Object();

    let login_nootp: any = ({
      "api_type": "web",
      "operation": "curlData",
      "access_token": this.auth_token,
      "moduleType": "login",
      "element_data": login_nootp_req
    });

    login_nootp_req.action = "customer_data";
    login_nootp_req.customer_id = this.userId;

    // login_req.otp_from = "otp1";
    // login_req.auth_from = "";

    this.apiservice.newsendServer(login_nootp).then((response: any) => {
      console.log(response);
      this.userData.customer_id = response.customer_id;
      this.userData.customerCode = response.customer_data.customerCode;
      this.userData.customerName = response.customer_data.customerName;
      this.userData.email = response.email_id;


    },
      (error) => {
        console.log(error);
        // this.apiservice.dismiss();
      });


  }



  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);


  }
  // $data  = array("name"=>$name, "email"=>$email, "dept_id"=>$dept_id, 
  // "subject"=>$subject, "message"=>$message,  "custs_id"=>$custs_id,  
  //  "custs_code"=>$custs_code,  "attachment"=>$attachment,
  //   "action_info"=>"add_ticket");

  createticket() {
    // alert('hello');




    this.apiservice.present("Loading");
    // if (this.userData.message != '' && this.userData.subject != '' && this.userData.message != undefined && this.userData.subject != undefined) {
    const forms = new FormData();

    // var filesLength= $("#fuDocument").files.length;
    // for(var i=0;i<filesLength;i++){
    //   forms.append("attachment[]",  $("#fuDocument").files[i]);
    // }

    // $.each($('#fuDocument')[0].files,function(key,input){
    //   forms.append('attachment[]', input);
    //   });

    $.each($('input[type=file]')[0].files, function(i, value){
      forms.append('attachment['+i+']', value); // change this to value
  });


    // var files = $("#fuDocument").files; // this is my file input in which We can select multiple files.
    // alert(files);
    // console.log(files);
    // for (var i = 0; i < files.length; i++) {
    //   forms.append("attachment" + i, files[i]);
    // }
    // console.log(files);
    // return false;
    forms.append('name', this.userData.customerName);
    forms.append('email', this.userData.email);
    forms.append('dept_id', '5');
    forms.append('ss', this.userData.subject);
    forms.append('message', this.userData.message);
    forms.append('custs_id', this.userData.customer_id);
    forms.append('custs_code', this.userData.customerCode);

    // forms.append('attachment', this.fileToUpload);
    forms.append('action_info', 'add_ticket');
    forms.append('action', 'create_ticket');
    forms.append('operation', 'curlData');
    forms.append('access_token', this.auth_token);
    forms.append('moduleType', 'login');
    forms.append('api_type', 'web');


    $.ajax({
      url: "https://erp.cal4care.com/cms/api_cms/v1.0/index_new.php",
      type: 'POST',
      data: forms,
      processData: false,  // tell jQuery not to process the data
      contentType: false,
      enctype: 'multipart/form-data',
      success: function (data) {

      }
    });
    setTimeout(() => {
      $('#test').click();

    }, 3000);
    // } else {
    //   console.log('hello');
    // }


  }


  success() {
    this.apiservice.dismiss();
    // Swal.fire({
    //   title: 'Ticket',
    //   text: 'Ticket has Successfully Created',
    //   icon: 'success',
    //   // showCancelButton: true,
    //   confirmButtonText: 'OK',
    //   // cancelButtonText: 'No'
    // });
    this.router.navigate(['/support-ticket']);

  }



}
