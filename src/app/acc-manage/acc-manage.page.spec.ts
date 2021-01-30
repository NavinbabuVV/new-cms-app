import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccManagePage } from './acc-manage.page';

describe('AccManagePage', () => {
  let component: AccManagePage;
  let fixture: ComponentFixture<AccManagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccManagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccManagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
