import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListingPayoutsPage } from './listing-payouts.page';

describe('ListingPayoutsPage', () => {
  let component: ListingPayoutsPage;
  let fixture: ComponentFixture<ListingPayoutsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingPayoutsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListingPayoutsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
