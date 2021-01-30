import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExtensionListPage } from './extension-list.page';

describe('ExtensionListPage', () => {
  let component: ExtensionListPage;
  let fixture: ComponentFixture<ExtensionListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtensionListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExtensionListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
