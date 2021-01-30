import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewseventsPage } from './newsevents.page';

describe('NewseventsPage', () => {
  let component: NewseventsPage;
  let fixture: ComponentFixture<NewseventsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewseventsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewseventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
