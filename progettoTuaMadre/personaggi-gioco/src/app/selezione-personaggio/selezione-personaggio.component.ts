import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-selezione-personaggio',
  templateUrl: './selezione-personaggio.component.html',
  styleUrls: ['./selezione-personaggio.component.css']
})
export class SelezionePersonaggioComponent implements OnInit{
  public characters : {src : String, name :String, atk : number, def : number, incAtk : number, incDef : number, description : String}[] = [];
  public name : String = "";
  public descrizione : String = "";
  public atk : number = 0;
  public def : number = 0;
  public styleForAtk : String = "";
  public styleForDef : String = "";
  public toggled : boolean = false;
  public selected : String = "";
  public selectedImageSrc : String = "";
  public incAtk : number = 0;
  public incDef : number = 0;

  @Input() playerName: String = "";
  
  private link1 : String = "https://www.cronacalive.it/wp-content/uploads/2023/05/amadeus.jpg";
  private link2 : String = "https://www.rainews.it/dl/img/2022/9/01/1662045809164_berlusconi_tiktok.jpg";
  private link3 : String = "https://www.corriere.it/methode_image/2022/03/29/Spettacoli/Foto%20Spettacoli%20-%20Trattate/insinna-flavio-ksLG-U333013657712580SD-656x492@Corriere-Web-Sezioni.jpg";
  private link4 : String = "https://www.superguidatv.it/wp-content/uploads/2023/05/Carlo-Conti.jpg";
  private link5 : String = "https://www.chenews.it/wp-content/uploads/2023/05/Paolo-Bonolis-Avanti-un-altro.jpg";
  private link6 : String = "https://steamuserimages-a.akamaihd.net/ugc/1469813569892642799/A6447D21C195AA071A00E95F69F484418895C437/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true";



  ngOnInit() {
    this.characters = [
      {
        "src" : this.link1,
        "name": "Amadeus",
        "atk" : 4,
        "def" : 6,
        "incAtk": 2,
        "incDef" : 2,
        "description" : "Per me è la cipolla"
      },
      {
        "src" : this.link2,
        "name": "Silvio",
        "atk" : 3,
        "def" : 7,
        "incAtk": 1,
        "incDef" : 3,
        "description" : "Ciao ragazzi, eccomi qua!"
      },
      {
        "src" : this.link3,
        "name": "Flavio Insinna",
        "atk" : 5,
        "def" : 5,
        "incAtk": 3,
        "incDef" : 2,
        "description" : "Non sono un potere forte."
      },
      {
        "src" : this.link4,
        "name": "Carlo Conti",
        "atk" : 7,
        "def" : 3,
        "incAtk": 4,
        "incDef" : 2,
        "description" : "Scossa?? Va beeeene"
      },
      {
        "src" : this.link5,
        "name": "Paolo Bonolis",
        "atk" : 8,
        "def" : 2,
        "incAtk": 2,
        "incDef" : 4,
        "description" : "Si copra, signorina si copra!"
      },
      {
        "src" : this.link6,
        "name": "Gerry Scotti",
        "atk" : 4,
        "def" : 6,
        "incAtk": 2,
        "incDef" : 4,
        "description" : "E allora signori, buonasera!!"
      }
    
    ];
  }


  @HostListener('mouseover', ['$event'])
  public onImgOver(event: MouseEvent) : void{
    if(event.target instanceof HTMLImageElement){
      
      for(let character of this.characters){
        if(character.src == event.target.src && !this.toggled){
          let current : {src : String; name : String; atk : number; def: number; incAtk : number; incDef : number; description : String} = character;
          this.name = current.name;
          this.descrizione = current.description;
          this.atk = current.atk;
          this.def = current.def;    
        }
      }

    }
  }

  @HostListener('mouseout',["$event"])
  public onExitImg(event: MouseEvent) : void{
    if(!this.toggled){
      this.name = "";
      this.descrizione = "Seleziona personaggio";
    }
  }


  @HostListener('click',["$event"])
  public onMouseClick(event : MouseEvent) : void {
    if(event.target instanceof HTMLImageElement){
      for(let character of this.characters){
        if(character.src == event.target.src){
          let current : {src : String; name : String; atk : number; def: number; incAtk : number; incDef : number; description : String} = character;
          this.toggleVisibility();
          this.selected = current.name;
          this.selectedImageSrc = current.src;
          this.descrizione = current.description;
          this.incAtk = current.incAtk;
          this.incDef = current.incDef;
        }
      }
    }
  }

  public calculate(value : number) : number {
    return value*10;
  }

  public toggleVisibility() : void {
    this.toggled = true;
  }

  public toggleVisibilityOff() : void {
    this.toggled = false;
  }


}
