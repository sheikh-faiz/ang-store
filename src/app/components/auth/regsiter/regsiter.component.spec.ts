import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegsiterComponent } from './regsiter.component';

describe('RegsiterComponent', () => {
  let component: RegsiterComponent;
  let fixture: ComponentFixture<RegsiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegsiterComponent ],
      imports: [FormsModule, ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegsiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
