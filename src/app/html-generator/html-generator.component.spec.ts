import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlGeneratorComponent } from './html-generator.component';

describe('HtmlGeneratorComponent', () => {
  let component: HtmlGeneratorComponent;
  let fixture: ComponentFixture<HtmlGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
