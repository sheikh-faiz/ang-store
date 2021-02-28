import { ComponentFixture, TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { FetchUser } from 'src/app/action/actions';
import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutComponent ],
      imports: [StoreModule.forRoot({})]
    })
    .compileComponents();
    const store = fixture.debugElement.injector.get(Store);
    store.dispatch(new FetchUser());
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
