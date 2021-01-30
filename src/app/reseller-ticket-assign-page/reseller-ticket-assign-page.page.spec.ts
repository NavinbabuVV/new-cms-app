import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResellerTicketAssignPagePage } from './reseller-ticket-assign-page.page';

describe('ResellerTicketAssignPagePage', () => {
  let component: ResellerTicketAssignPagePage;
  let fixture: ComponentFixture<ResellerTicketAssignPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResellerTicketAssignPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResellerTicketAssignPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
