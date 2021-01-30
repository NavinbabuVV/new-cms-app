import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderLicensePage } from './order-license.page';

describe('OrderLicensePage', () => {
  let component: OrderLicensePage;
  let fixture: ComponentFixture<OrderLicensePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderLicensePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderLicensePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
