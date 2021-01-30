import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrepaidPage } from './prepaid.page';

describe('PrepaidPage', () => {
  let component: PrepaidPage;
  let fixture: ComponentFixture<PrepaidPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepaidPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrepaidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
