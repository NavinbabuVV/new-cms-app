import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResellerManagementPage } from './reseller-management.page';

describe('ResellerManagementPage', () => {
  let component: ResellerManagementPage;
  let fixture: ComponentFixture<ResellerManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResellerManagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResellerManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
