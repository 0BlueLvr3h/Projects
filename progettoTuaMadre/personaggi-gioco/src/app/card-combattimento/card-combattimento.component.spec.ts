import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCombattimentoComponent } from './card-combattimento.component';

describe('CardCombattimentoComponent', () => {
  let component: CardCombattimentoComponent;
  let fixture: ComponentFixture<CardCombattimentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardCombattimentoComponent]
    });
    fixture = TestBed.createComponent(CardCombattimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
