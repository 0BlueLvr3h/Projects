import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-selezione-personaggio',
  templateUrl: './selezione-personaggio.component.html',
  styleUrls: ['./selezione-personaggio.component.css']
})
export class SelezionePersonaggioComponent implements OnInit{
  public characters : {src : String, name :String, atk : number, def : number, description : String}[] = [];
  public name : String = "";
  public descrizione : String = "";
  public atk : number = 0;
  public def : number = 0;
  public styleForAtk : String = "";
  public styleForDef : String = "";
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
        "description" : "Per me è la cipolla"
      },
      {
        "src" : this.link2,
        "name": "Silvio Berlusconi",
        "atk" : 3,
        "def" : 7,
        "description" : "Benevenuti nel mio canale di TikTok"
      },
      {
        "src" : this.link3,
        "name": "Flavio Insinna",
        "atk" : 5,
        "def" : 5,
        "description" : "Non sono un potereforte."
      },
      {
        "src" : this.link4,
        "name": "Carlo Conti",
        "atk" : 7,
        "def" : 3,
        "description" : "Scossa?? Va beeeene"
      },
      {
        "src" : this.link5,
        "name": "Paolo Bonolis",
        "atk" : 8,
        "def" : 2,
        "description" : "Si copra, signorina si copra!"
      },
      {
        "src" : this.link6,
        "name": "Gerry Scotti",
        "atk" : 4,
        "def" : 6,
        "description" : "E allora signori, buonasera!!"
      }
    
    ];
  }


  @HostListener('mouseover', ['$event'])
  public onImgOver(event: MouseEvent) : void{
    if(event.target instanceof HTMLImageElement){
      
      for(let character of this.characters){
        if(character.src == event.target.src){
          let current : {src : String; name : String; atk : number; def: number; description : String} = character;
          this.name = current.name;
          this.descrizione = current.description;
          this.atk = current.atk;
          this.def = current.def;
          this.styleForAtk = "w-" + this.calculate(current.atk);
          this.styleForDef = "w-" + this.calculate(current.def);          
        }
      }

    }
  }

  @HostListener('mouseout',["$event"])
  public onExitImg(event: MouseEvent) : void{
    this.name = "";
  }


  @HostListener('click',["$event"])
  public onMouseClick(event : MouseEvent) : void {
    if(event.target instanceof HTMLImageElement){
      for(let character of this.characters){
        if(character.src == event.target.src){
          let current : {src : String; name : String; atk : number; def: number; description : String} = character;
          console.log("Hai cliccato " + current.name);
        }
      }
    }
  }

  public calculate(value : number) : number {
    if(value > 0 && value <=2){
      return 20;
    }else if(value >= 2 && value <=4){
      return 40;
    }else if(value >= 4 && value <=6){
      return 60;
    }else if(value >= 6 && value <=8){
      return 80;
    }else if(value >= 8 && value <=10){
      return 100;
    }
    return 0;
  }

}
