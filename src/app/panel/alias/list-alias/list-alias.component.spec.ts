import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAliasComponent } from './list-alias.component';

describe('ListAliasComponent', () => {
  let component: ListAliasComponent;
  let fixture: ComponentFixture<ListAliasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAliasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAliasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
