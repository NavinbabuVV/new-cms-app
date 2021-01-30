import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WebscanPage } from './webscan.page';

describe('WebscanPage', () => {
  let component: WebscanPage;
  let fixture: ComponentFixture<WebscanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebscanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WebscanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
