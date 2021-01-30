import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewTicketsPage } from './view-tickets.page';

describe('ViewTicketsPage', () => {
  let component: ViewTicketsPage;
  let fixture: ComponentFixture<ViewTicketsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTicketsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewTicketsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
