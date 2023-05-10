import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelezionePersonaggioComponent } from './selezione-personaggio.component';

describe('SelezionePersonaggioComponent', () => {
  let component: SelezionePersonaggioComponent;
  let fixture: ComponentFixture<SelezionePersonaggioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelezionePersonaggioComponent]
    });
    fixture = TestBed.createComponent(SelezionePersonaggioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
