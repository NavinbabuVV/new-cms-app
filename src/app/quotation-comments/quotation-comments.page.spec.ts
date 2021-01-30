import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuotationCommentsPage } from './quotation-comments.page';

describe('QuotationCommentsPage', () => {
  let component: QuotationCommentsPage;
  let fixture: ComponentFixture<QuotationCommentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationCommentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuotationCommentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
