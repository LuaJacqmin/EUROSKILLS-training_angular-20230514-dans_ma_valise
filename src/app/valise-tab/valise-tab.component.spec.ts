import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiseTabComponent } from './valise-tab.component';

describe('ValiseTabComponent', () => {
  let component: ValiseTabComponent;
  let fixture: ComponentFixture<ValiseTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValiseTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValiseTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
