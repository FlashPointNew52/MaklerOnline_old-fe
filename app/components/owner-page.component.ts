import {  Component, AUTO_STYLE, trigger,state,style,transition,animate} from '@angular/core';
import { User } from '../classes/user';
import { RealtyListService } from '../services/realty_list.service';

@Component({
    inputs:[
        "user"
    ],
    providers: [RealtyListService],
    animations: [
      trigger('openMenu', [
          state('true', style({height: AUTO_STYLE})),
          state('false, void', style({height: '0px'})),
          transition('* <=> *', animate(250))
      ]),
      trigger('hideMenu', [
          state('true', style({width: '100%'})),
          state('false', style({width: '0px'})),
          transition('* <=> *', animate(100))
      ])
  ],
  selector: 'owner-page',
  template: `
      <div class = "search_panel" (window:resize)="onResize()">
        <ul class = "parameter" [@hideMenu]="hideMenu()">
            <li class="general" id="helper" (click)="setOpen(0, $event)" [class.subparam_open]="(open[0] || set[0]) && isMobile"><span>Рассылка</span><div></div>
                <ul  class = "subparameter" [@openMenu]="openMenu(0)" >
                    <span>Введите свой e-mail и</span>
                    <span>получайте предложения на почту</span>
                    <div>Email </div><input class = 'email' type='email' (keydown) = "interEmail($event)"><div (click)="removeEmail($event)"></div>
                    <span>Всегда в курсе всего нового</span>
                    <!--<li (click)="click($event, 0)">Включен</li><hr>
                    <li (click)="click($event, 0)">Выключен</li>-->
                </ul>
            </li>

            <li class="general" (click)="setOpen(1, $event)" [class.subparam_open]="(open[1] || set[1]) && isMobile"><span>Срок аренды</span><div></div>
                <ul class = "subparameter" [@openMenu]="openMenu(1)">
                    <li (click)="click($event, 1)">Долгосрочная</li>
                    <li (click)="click($event, 1)">Краткосрочная</li>
                </ul>
            </li>

            <li class="general" (click)="setOpen(2, $event)" [class.subparam_open]="(open[2] || set[2]) && isMobile"><span>Тип объекта</span><div></div>
                <ul class = "subparameter" [@openMenu]="openMenu(2)">
                    <li (click)="click($event, 2)">Любой</li>
                    <li (click)="click($event, 2 , 'room')">Комната</li>
                    <li (click)="click($event, 2, 'apartment_small')">Малосемейка</li>
                    <li (click)="click($event, 2, 'apartment')">Квартира</li>
                    <li (click)="click($event, 2, 'house')">Дом, Коттедж</li>
                </ul>
            </li>

            <li class="general" (click)="setOpen(3, $event)" [class.subparam_open]="open[3] || set[3]"><span>Комнат</span><div></div>
                <ul class = "subparameter" [@openMenu]="openMenu(3)" >
                    <li (click)="click($event, 3)">Любая</li>
                    <li (click)="click($event, 3)">1 комната</li>
                    <li (click)="click($event, 3)">2 комнаты</li>
                    <li (click)="click($event, 3)">3 комнаты</li>
                    <li (click)="click($event, 3)">4 комнаты</li>
                    <li (click)="click($event, 3)">>5 комнат</li>
                </ul>
            </li>

            <li class="general" (click)="setOpen(4, $event)" [class.subparam_open]="open[4] || set[4]"><span>Цена</span><div></div>
                <ul class = "subparameter" [@openMenu]="openMenu(4)">
                    <li (click)="click($event, 4)">до 10 тыс. руб</li>
                    <li (click)="click($event, 4)">до 10 тыс. руб</li>
                    <li (click)="click($event, 4)">от 10 до 15 тыс. руб</li>
                    <li (click)="click($event, 4)">от 15 до 20 тыс. руб</li>
                    <li (click)="click($event, 4)">от 20 до 30 тыс. руб</li>
                    <li (click)="click($event, 4)">от 30 тыс. руб</li>
                </ul>
            </li>

            <li class="general" (click)="setOpen(5, $event)" [class.subparam_open]="open[5] || set[5]"><span>Район</span><div></div>
                <ul class = "subparameter" [@openMenu]="openMenu(5)">
                    <li (click)="click($event, 5)">Любой</li>
                    <li (click)="click($event, 5)">Железнодорожный</li>
                    <li (click)="click($event, 5)">Индустриальный</li>
                    <li (click)="click($event, 5)">Кировский</li>
                    <li (click)="click($event, 5)">Краснофлотский</li>
                    <li (click)="click($event, 5)">Центральный</li>
                </ul>
            </li>

            <div class="draw_button" (click)="draw($event)" [class.draw_button_active]="draw_map">Обвести</div>
            <button (click)="hide_map()">Показать</button>
        </ul>
      </div>

      <google-map [draw_allowed]='draw_map' (mouseup)='draw_end()'></google-map>
      <div class='hidden' [class.new_draw_button]="isMobile && inMap" (click)="draw($event)" [class.activate]="draw_map">Обвести</div>
      <div class='hidden' [class.cancel]="isMobile && inMap" (click)="showMenu()">Отмена</div>
      <div class="objects" >
            <realty-list [user] = user *ngIf="!inMap" [getList]="data" (inMap)="setOnMap($event)"></realty-list>
      <div>

  `,
  styleUrls: [ 'app/pages/find-menu.css' ],
  styles: [`
     google-map{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow-x: hidden;
     }

     realty-list{
         left: 100%;
         position: absolute;
         width: 100%;
         overflow-x: hidden;
     }

     .objects:after{
         overflow: hidden;
         height: 0;
     }

     .objects{
         position: absolute;
         margin-top: 100px;
         width: 100%;
     }

     .hidden{
         display:none;
     }

     .cancel{
         height: 60px;
         width: 400px;
         background-color: rgb(56, 120, 199);
         color: white;
         line-height: 60px;
         text-align: center;
         font-size: 25pt;
         display: inline-block;
         cursor: pointer;
         position: absolute;
         top: calc(100% - 100px);
         left: calc(50% - 200px);
     }

     .new_draw_button{
         height: 60px;
         width: 400px;
         background-color: rgb(56, 120, 199);
         color: white;
         line-height: 60px;
         text-align: center;
         font-size: 25pt;
         display: inline-block;
         cursor: pointer;
         position: absolute;
         top: calc(100% - 165px);
         left: calc(50% - 200px);
     }

     .activate{
         background-color: rgb(197, 1, 1);
     }
`]
})

export class OwnerPageComponent {
    open: boolean[] =[false,false,false,false,false,false];
    set: boolean[] =[false,false,false,false,false,false];
    draw_map: boolean = false;
    isMobile: boolean;
    hide_menu: boolean;
    inMap: boolean = true;
    user: User;
    data = { query: '', page: 0, typeCode: ''};
    constructor(){
            (<HTMLElement>document.getElementsByTagName('body').item(0)).style.setProperty("overflow-y", "hidden");
            this.onResize();
    }

    setOnMap(event){
        this.inMap = !event;
    }

    onResize(){
        if(window.innerWidth<965){
            this.isMobile = true;
            setTimeout(() => {
                var parent = <HTMLElement>document.getElementsByClassName("parameter").item(0);
                var child = parent.children[5];
                if(child.firstChild.textContent == "Район"){
                    child.firstChild.textContent = "По району";
                    parent.children[6].textContent = "По карте";

                }
            }, 5);
        }
        else {
            this.isMobile = false;
            setTimeout(() => {
                var parent = <HTMLElement>document.getElementsByClassName("parameter").item(0);
                var child = parent.children[5];
                if(child.firstChild.textContent == "По району"){
                    child.firstChild.textContent = "Район";
                    parent.children[6].textContent = "Обвести";
                }
            }, 5);
        }

    }
    draw(event){
        if(!this.isMobile){
              this.draw_map = !this.draw_map;
        } else if((<HTMLElement>event.currentTarget).classList.item(1) == 'new_draw_button'){
                this.draw_map = !this.draw_map;
        } else {
            this.hide_menu=true;
        }

    }
    click(event, val:number, type?: string){
        event.target.offsetParent.offsetParent.firstChild.childNodes.item(0).nodeValue = event.target.childNodes.item(0).nodeValue;
        this.set[val] = true;
        if(type){
            this.data.typeCode = type;
        }

        else this.data.typeCode = undefined;
    }
    setOpen(val:number, event){
        for(var i=0; i<this.open.length; i++)
            if(i != val)
                this.open[i] = false;
        if(val==0){
            if(event.target.className != 'email')
                this.open[val]=!this.open[val];
        } else
            this.open[val]=!this.open[val];


    }
    hide_map(){
        var map = <HTMLElement>document.getElementsByTagName("google-map").item(0);
        var search_panel = <HTMLElement>document.getElementsByClassName("search_panel").item(0);
        var objects = <HTMLElement>document.getElementsByClassName("objects").item(0);
        search_panel.style.setProperty('transform', 'translate(-100vw,0)');
        search_panel.style.setProperty('transition', 'all 0.5s ease-in-out');
        map.style.setProperty('transform', 'translate(-100%,0)');
        map.style.setProperty('transition', 'all 0.5s ease-in-out');
        objects.style.setProperty('overflow', 'visible');
        objects.style.setProperty('transform', 'translate(-100%,0)');
        objects.style.setProperty('transition', 'all 0.5s ease-in-out');
        objects.style.setProperty('height', 'inherit');
        document.body.style.setProperty('overflow-x', 'visible');
        (<HTMLElement>document.getElementsByTagName('body').item(0)).style.removeProperty("overflow-y");

        var arr = document.getElementsByClassName("general");
        for(var i=1; i<arr.length; ++i){
            if(this.set[i]){
                if(i == 3 || i == 4 )
                    this.data.query += arr.item(i).childNodes.item(0).textContent + " ";
                else if(i == 1)
                    this.data.query += arr.item(i).childNodes.item(0).textContent + " аренда ";
                else if (i == 5)
                    this.data.query += arr.item(i).childNodes.item(0).textContent + "  район ";
                }
        }
        //console.log(this.data.query);
        this.inMap = false;
    }

    hideMenu(){
        if (!this.hide_menu && this.isMobile){
            return true;
        } else if(this.hide_menu && this.isMobile){
            return false;
        } else  return null;
    }

    showMenu(){
        this.hide_menu= !this.hide_menu;
    }

    openMenu(val: number){
        if(!this.isMobile)
            return null;
        else return this.open[val];
    }

    draw_end(){
        if(this.isMobile && this.draw_map){
            let timeoutId = setTimeout(() => {
                this.hide_menu=false;
            }, 1000);
        }
    }

    interEmail(event){
        if(event.key == 'Enter'){
            if((<HTMLInputElement>event.currentTarget).value)
                event.target.offsetParent.offsetParent.firstChild.childNodes.item(0).nodeValue = (<HTMLInputElement>event.currentTarget).value;
            else event.target.offsetParent.offsetParent.firstChild.childNodes.item(0).nodeValue = "Рассылка";
            this.open[0]=!this.open[0];
        }
    }

    removeEmail(event){
        (<HTMLInputElement>document.getElementsByClassName('email').item(0)).value = "";
        (<HTMLSpanElement>event.currentTarget.parentElement.parentElement.getElementsByTagName('span').item(0)).textContent = "Рассылка";
    }
}
