import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllLeadResultPage } from './all-lead-result.page';

describe('AllLeadResultPage', () => {
  let component: AllLeadResultPage;
  let fixture: ComponentFixture<AllLeadResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllLeadResultPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllLeadResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
