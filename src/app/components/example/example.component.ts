import { Component, OnInit } from '@angular/core';
declare var $: any;
declare var doCall: any;
declare var transferCall: any;
declare var init_page: any;
declare var getinStatusV2: any;
declare var iziToast: any;
declare var outgoingCallEnd: any;
declare var makecallTransfer: any;
declare var makecallTransfer2: any;
declare var doCall3: any;
@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#sip_urld').val("cal4care.3cx.sg");
    $('#server').val("sip:cal4care.3cx.sg:5060");
    $('#username').val("sip:000@cal4care.3cx.sg");
    $('#authuser').val("3YAEcao70l");
    $('#password').val("htfsfXhi8n");
    $('#displayname').val('devomni Channel');
    setTimeout(() => { init_page("sip:000@cal4care.3cx.sg", "3YAEcao70l", "htfsfXhi8n", "sip:cal4care.3cx.sg:5060", "5060"); }, 3000);


  }


  webMakeCall(number_key) {
    // alert(number_key); return false;
    $('#make_call_number').val(number_key);
    doCall3('', number_key);
  }

  outgoingCallEnd() {
    outgoingCallEnd();
    $("#makecallHanupBtn").click();
    $('#makeCallForwordNumber').val('');
  }

  hello() {
    console.log("welcome");
    $("#slidedown").slideToggle();
  }

}
