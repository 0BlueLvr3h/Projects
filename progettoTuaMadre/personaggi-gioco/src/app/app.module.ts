import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelezionePersonaggioComponent } from './selezione-personaggio/selezione-personaggio.component';
import { CardCombattimentoComponent } from './card-combattimento/card-combattimento.component';
import { CharacterSelectedComponent } from './character-selected/character-selected.component';

@NgModule({
  declarations: [
    AppComponent,
    SelezionePersonaggioComponent,
    CardCombattimentoComponent,
    CharacterSelectedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
