import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProceedCartPage } from './proceed-cart.page';

describe('ProceedCartPage', () => {
  let component: ProceedCartPage;
  let fixture: ComponentFixture<ProceedCartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProceedCartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProceedCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
