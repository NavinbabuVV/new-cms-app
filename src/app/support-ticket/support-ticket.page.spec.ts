import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SupportTicketPage } from './support-ticket.page';

describe('SupportTicketPage', () => {
  let component: SupportTicketPage;
  let fixture: ComponentFixture<SupportTicketPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportTicketPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SupportTicketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
