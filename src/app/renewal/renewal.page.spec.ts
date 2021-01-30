import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RenewalPage } from './renewal.page';

describe('RenewalPage', () => {
  let component: RenewalPage;
  let fixture: ComponentFixture<RenewalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RenewalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
