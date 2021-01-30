import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PettyCashPage } from './petty-cash.page';

describe('PettyCashPage', () => {
  let component: PettyCashPage;
  let fixture: ComponentFixture<PettyCashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PettyCashPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PettyCashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
