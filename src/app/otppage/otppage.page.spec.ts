import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtppagePage } from './otppage.page';

describe('OtppagePage', () => {
  let component: OtppagePage;
  let fixture: ComponentFixture<OtppagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtppagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtppagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
