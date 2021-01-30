import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopupsPage } from './popups.page';

describe('PopupsPage', () => {
  let component: PopupsPage;
  let fixture: ComponentFixture<PopupsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
