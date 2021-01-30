import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllLeadsPage } from './all-leads.page';

describe('AllLeadsPage', () => {
  let component: AllLeadsPage;
  let fixture: ComponentFixture<AllLeadsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllLeadsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllLeadsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
