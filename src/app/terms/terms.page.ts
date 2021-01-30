import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }



  hello(){
    console.log("welcome");
    $("#slidedown").slideToggle();
  }
}
