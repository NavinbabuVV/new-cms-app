import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnquiryManagementPage } from './enquiry-management.page';

describe('EnquiryManagementPage', () => {
  let component: EnquiryManagementPage;
  let fixture: ComponentFixture<EnquiryManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiryManagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnquiryManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
