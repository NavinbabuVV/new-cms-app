import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LicenseKeySearchPage } from './license-key-search.page';

describe('LicenseKeySearchPage', () => {
  let component: LicenseKeySearchPage;
  let fixture: ComponentFixture<LicenseKeySearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseKeySearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LicenseKeySearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
