import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LovsCheckComponent } from './lovs-check.component';

describe('LovsCheckComponent', () => {
  let component: LovsCheckComponent;
  let fixture: ComponentFixture<LovsCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LovsCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LovsCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
