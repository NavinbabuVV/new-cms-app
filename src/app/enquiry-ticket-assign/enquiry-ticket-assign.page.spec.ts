import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnquiryTicketAssignPage } from './enquiry-ticket-assign.page';

describe('EnquiryTicketAssignPage', () => {
  let component: EnquiryTicketAssignPage;
  let fixture: ComponentFixture<EnquiryTicketAssignPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiryTicketAssignPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnquiryTicketAssignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
