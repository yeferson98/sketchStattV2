import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProfesionalesComponent } from './new-profesionales.component';

describe('NewProfesionalesComponent', () => {
  let component: NewProfesionalesComponent;
  let fixture: ComponentFixture<NewProfesionalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProfesionalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProfesionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
