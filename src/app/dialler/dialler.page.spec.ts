import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiallerPage } from './dialler.page';

describe('DiallerPage', () => {
  let component: DiallerPage;
  let fixture: ComponentFixture<DiallerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiallerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiallerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
