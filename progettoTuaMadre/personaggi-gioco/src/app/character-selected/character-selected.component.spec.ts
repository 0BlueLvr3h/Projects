import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSelectedComponent } from './character-selected.component';

describe('CharacterSelectedComponent', () => {
  let component: CharacterSelectedComponent;
  let fixture: ComponentFixture<CharacterSelectedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterSelectedComponent]
    });
    fixture = TestBed.createComponent(CharacterSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
