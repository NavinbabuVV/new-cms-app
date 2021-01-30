import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GccPage } from './gcc.page';

describe('GccPage', () => {
  let component: GccPage;
  let fixture: ComponentFixture<GccPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GccPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GccPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
