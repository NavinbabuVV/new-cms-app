import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanpagePage } from './scanpage.page';

describe('ScanpagePage', () => {
  let component: ScanpagePage;
  let fixture: ComponentFixture<ScanpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanpagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScanpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
