import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewQutationPage } from './view-qutation.page';

describe('ViewQutationPage', () => {
  let component: ViewQutationPage;
  let fixture: ComponentFixture<ViewQutationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewQutationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewQutationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
