import { Component, OnInit, Input , Output, EventEmitter}  from '@angular/core';
import { RealtyListService } from '../services/realty_list.service';
import {  Realty} from '../classes/realty';
import {  RealtyTileComponent} from './realty-tile.component';
import { User } from '../classes/user';

@Component({
    inputs:[
        "user",
        "query",
    ],

  selector: 'realty-list',
  template: `
        <view-panel [update] = "realty[selectedRealty]" *ngIf='isClick' [user] = user ></view-panel>
        <div class='hide'></div>

        <div class='container'>
            <div>
                <span class = "arrow_back1" (click)= "back_to_map()">Изменить параметры поиска</span>
                <div class = "sort" (focus)="loader()">
                    <span>Сортировать по: </span><span (mouseover)="show_sort($event)">{{sortText}}</span>
                    <div (mouseleave)="hide_sort($event)">
                        <div (click)="newSort('Новизне', $event, 0)" [class.sort_select]="selSort[0]">Самые новые</div>
                        <div (click)="newSort('Рейтинг', $event, 1)" [class.sort_select]="selSort[1]">Рейтинг</div>
                        <div (click)="newSort('Цена: от низкой к высокой', $event, 2)" [class.sort_select]="selSort[2]">Цена: от низкой к высокой</div>
                        <div (click)="newSort('Цена: от высокой к низкой', $event, 3)" [class.sort_select]="selSort[3]">Цена: от высокой к низкой</div>
                    </div>
                </div>
            </div>
            <div *ngIf="realty_list_service.FindRealtes.length > 0">
                <realty-tile *ngFor="let temp of realty_list_service.FindRealtes; let i = index" (click)="showDescribe($event, i)" [realty_object]="temp" [user] = user></realty-tile>
            </div>
            <div *ngIf="realty_list_service.FindRealtes.length == 0" class="not_find">Объекты по вашему запросу не найдены.<br>Измените параметры поиска
            </div>
        </div>
  `,
  styles: [`
      .not_find{
          margin-top: 100px;
          color: #1e3054;
          font-size: 18pt;
          text-align: center;
      }
      .container>div:first-of-type{
          position: absolute;
          width: 100%;
          top: -15px;
      }

      .container>div:first-of-type>span{
          color: #9d9d9d;
          font-size: 11pt;
          height: 20px;
          float: left;
          cursor: pointer;
      }

      .container>div:first-of-type>span:hover{
          color: #243659;
      }

      .subscription{
          background-color:rgb(242, 242, 242);
          height: 294px;
          width: 414px;
          color: #369;
          margin: 20px 20px 0 0;
      }

      .subscription:hover{
          box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.49);
          background-color: rgb(237, 109, 17);
      }

      .subscription:hover>div{
          color: white;
      }

      .subscription>div{
          display: flex;
          flex-direction: column;
          height: 294px;
          width: 414px;
          color: #606060;
          font-size: 12pt;
          justify-content: center;
          align-items: center;
      }

      .subscription>div>span:nth-of-type(2){
          font-size: 16pt;
          color: #777777;
          font-weight: lighter;
      }

      .subscription:hover>div>span:nth-of-type(2){
          color: white;
      }

      .subscription>div>span:nth-of-type(3){
              margin-top: 10px;
      }

      .subscription>div>div{
          height: 80px;
          width: 80px;
          background-color: #b0b0af;
          border-radius: 50px;
          margin: 20px;
          background-image: url(src/letter.png);
          background-size: 80px 50px;
          background-position: center;
          background-repeat: no-repeat;
      }

      .subscription:hover>div>div{
          background-color: transparent;
          border: 2px solid white;
      }

      .sort{
          height: 20px;
          width: 340px;
          margin-left: auto;
      }

      .sort>span{
          color: rgb(153, 153, 153);
          font-weight: 200;
          font-size: 11pt;
      }

      .sort>span:last-of-type{
          color: #1E3054;
          cursor: pointer;
      }

      .sort>span:last-of-type:hover{
          color: rgb(87, 87, 87);
      }

      .sort>div{
          display: none;
          flex-direction: column;
          height: 122px;
          position: absolute;
          background-color: white;
          justify-content: space-around;
          align-items: flex-start;
          z-index: 99;
          border: 1px solid silver;
          margin-top: 10px;
          font-size: 11pt;
          width: 240px;
          color: #1E3054;
          box-shadow: -3px 8px 10px rgba(0, 0, 0, 0.49);
          padding-bottom: 3px;
      }

      .sort>div:before{
          content: " ";
          height: 12px;
          width: 20px;
          display: block;
          position: absolute;
          top: -12px;
          left: 155px;
          background-image: url(src/arr.png);
          background-size: cover;
      }

      .sort>div>div{
          height: 30px;
          width: 200px;
          line-height: 30px;
          cursor: pointer;
          padding: 0 20px;
          margin: -3px 0;
      }

      .sort hr{
          margin: 0 20;
          width: 200;
          color: silver;
          border: 0;
          border-bottom: 1px solid rgba(128, 128, 128, 0.07);
      }

      .sort>div>div:hover{
          background-color: #dedcdc;
      }

      view-panel{
          display: none;
      }

     .container > .hide{
          width: 100vw;
          height: 500px;
          margin: 20px 0 0 0;
          min-width: 630px;
      }

      .container{
          display: flex;
          margin: 40px auto 0 auto;
          flex-flow: row wrap;
          justify-content: center;
          max-width: 1302px;
          min-width: 630px;
          min-height: 100vw;
          position: relative;
      }

      .container realty-tile{
          background-color:rgb(242, 242, 242);;
          display:inline-block;
          height: 294px;
          width: 197px;
          color: #369;
          margin: 20px 20px 0 0;
      }

      .container realty-tile:hover{
          box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.49);
      }

      .arrow_back{
          background-image: url(src/Arrow_back.png);
          background-size: cover;
          position: absolute;
          width: 75px;
          height: 75px;
          margin-left: 25px;
      }

      .arrow_back:hover{
          background-image: url(src/Arrow_back_hover.png);
      }

      .container > view-panel{
          display: flex;
          justify-content: flex-end;
          position: absolute;
          width: 100vw;
          height: 500px;
          background-color: rgb(242, 242, 242);
          margin: 0;
          min-width: 630px;
      }

      .sort_select{
          background-color: rgb(241, 241, 241);

      }

      @media screen and (max-width: 1340px) {
          .container > view-panel{
              height: 1000px;
              flex-wrap: wrap;
          }

          .container > .hide{
              height: 1000px;
          }
      }

      @media screen and (max-width: 1303px) {
          .sort{
              margin-right: 100px;
          }
      }

      @media screen and (max-width: 1145px) {
          .sort{
              margin-right: 25px;
          }
      }

      @media screen and (max-width: 1090px) {
          .sort{
              margin-right: 105px;
          }
      }

      @media screen and (max-width: 1025px) {
          .sort{
              margin-right: 80px;
          }
      }

      @media screen and (max-width: 975px) {
          .sort{
              margin-right: 50px;
          }
      }

      @media screen and (max-width: 810px) {
          .sort{
              margin-right: 80px;
          }
      }

      @media screen and (max-width: 780px) {
          .sort{
              margin-right: 65px;
          }
      }

      @media screen and (max-width: 730px) {
          .sort{
              margin-right: 40px;
          }
      }

      @media screen and (max-width: 650px) {
          .sort{
              margin-right: 60px;
          }
      }

      @media screen and (max-width: 770px) {
          .container > view-panel, .container > .hide {
              height: 870px;
          }
      }
`]
})

export class RealtyListComponent implements OnInit{
  sortText = "Новизне";
  selSort: boolean[] = [true, false, false, false];
  realty:Realty[];
  selectedRealty;
  isClick=false;
  isClicks=false;
  notFind: boolean = false;

  constructor(private realty_list_service: RealtyListService){

  }

  ngOnInit() {
    //this.getList(this.qu);
  }
  @Output() inMap = new EventEmitter();

  @Input()
  public set getList(data: any){
    this.realty_list_service.getList(data.query, data.page, data.typeCode);
  };

  back_to_map(){
      this.inMap.emit(false);
      var map = <HTMLElement>document.getElementsByTagName("google-map").item(0);
      var search_panel = <HTMLElement>document.getElementsByClassName("search_panel").item(0);
      var objects = <HTMLElement>document.getElementsByClassName("objects").item(0).firstElementChild;
      search_panel.style.setProperty('transform', 'translate(0vw,0)');
      search_panel.style.setProperty('transition', 'all 0.1s ease-in-out');
      map.style.setProperty('transform', 'translate(0vw,0)');
      map.style.setProperty('transition', 'all 0.1s ease-in-out');
      objects.style.setProperty('overflow', 'hidden');
      objects.style.setProperty('height', '0');
      objects.style.setProperty('transform', 'translate(0vw,0)');
      objects.style.setProperty('transition', 'all 0.1s ease-in-out');
  }

  showDescribe(event, temp){
      this.selectedRealty = temp;
      this.isClick = true;
      var container = document.getElementsByClassName("container").item(0);
      var column = parseInt(''+container.clientWidth/215);
      var tilePos=Array.prototype.indexOf.call(container.getElementsByTagName("realty-tile"), event.currentTarget);
      var columnPos=parseInt(''+tilePos/column)+1;
      var hide = document.getElementsByClassName("hide").item(0);
      var newItem = <HTMLElement>document.getElementsByTagName("view-panel").item(0);
      if(!newItem){
          setTimeout(() => {
              this.showDescribe(event, temp);
          }, 100);
      }
      else{
        var row = parseInt(''+tilePos/column)+1;
        var children = container.getElementsByTagName("realty-tile").length;
        if(children < column){
            container.insertBefore(hide,container.getElementsByTagName("realty-tile")[children*columnPos]);
            container.insertBefore(newItem,container.getElementsByTagName("realty-tile")[children*columnPos]);
        } else{
            container.insertBefore(hide,container.getElementsByTagName("realty-tile")[column*columnPos]);
            container.insertBefore(newItem,container.getElementsByTagName("realty-tile")[column*columnPos]);
        }
        newItem.style.setProperty('top', ''+(316*row+20)+'px');
        var scr = newItem.getBoundingClientRect().top;

        let int = setInterval(() => {
                if(scr > 200){
                    window.scrollBy(0,10);
                    scr -= 10;
                } else if( scr < 160){
                    window.scrollBy(0,-10);
                    scr += 10;
                }
                else{
                    clearInterval(int);
                }
            }, 5);
    }
  }

  show_sort(event){
      event.currentTarget.parentElement.getElementsByTagName('div').item(0).style.setProperty('display', "flex");
  }

  hide_sort(event){
      event.currentTarget.style.removeProperty('display');
  }

  newSort(val:string, event, int: number){
      this.sortText = val;
      event.currentTarget.parentElement.style.removeProperty('display');
      for(var i =0; i<this.selSort.length; i++)
        if(i != int)
            this.selSort[i] = false;
      this.selSort[int] = true;
  }
 }
