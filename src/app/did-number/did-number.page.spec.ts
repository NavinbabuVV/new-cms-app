import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DidNumberPage } from './did-number.page';

describe('DidNumberPage', () => {
  let component: DidNumberPage;
  let fixture: ComponentFixture<DidNumberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DidNumberPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DidNumberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
