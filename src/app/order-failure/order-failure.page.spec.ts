import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderFailurePage } from './order-failure.page';

describe('OrderFailurePage', () => {
  let component: OrderFailurePage;
  let fixture: ComponentFixture<OrderFailurePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderFailurePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderFailurePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
