import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-acc-manage',
  templateUrl: './acc-manage.page.html',
  styleUrls: ['./acc-manage.page.scss'],
})
export class AccManagePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  
  goToTestPage() {
    if (localStorage.getItem('resellerstate') == '1') {
      this.router.navigateByUrl('/listing-payouts');
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }
  

}
