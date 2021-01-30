import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PartneridPage } from './partnerid.page';

describe('PartneridPage', () => {
  let component: PartneridPage;
  let fixture: ComponentFixture<PartneridPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartneridPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PartneridPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
