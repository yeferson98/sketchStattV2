import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProfesionalesComponent } from './list-profesionales.component';

describe('ListProfesionalesComponent', () => {
  let component: ListProfesionalesComponent;
  let fixture: ComponentFixture<ListProfesionalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProfesionalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProfesionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
