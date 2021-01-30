import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyLeadsPage } from './my-leads.page';

describe('MyLeadsPage', () => {
  let component: MyLeadsPage;
  let fixture: ComponentFixture<MyLeadsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyLeadsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyLeadsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
