import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaIndexComponent } from './categoria-index.component';

describe('CategoriaIndexComponent', () => {
  let component: CategoriaIndexComponent;
  let fixture: ComponentFixture<CategoriaIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriaIndexComponent]
    });
    fixture = TestBed.createComponent(CategoriaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
