import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewsDataPage } from './news-data.page';

describe('NewsDataPage', () => {
  let component: NewsDataPage;
  let fixture: ComponentFixture<NewsDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsDataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewsDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
