import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActualCostPage } from './actual-cost.page';

describe('ActualCostPage', () => {
  let component: ActualCostPage;
  let fixture: ComponentFixture<ActualCostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualCostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActualCostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
