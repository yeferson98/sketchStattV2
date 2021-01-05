import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAliasComponent } from './new-alias.component';

describe('NewAliasComponent', () => {
  let component: NewAliasComponent;
  let fixture: ComponentFixture<NewAliasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAliasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAliasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
