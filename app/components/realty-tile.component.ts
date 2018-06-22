import { Component, Input }  from '@angular/core';
import {  Realty} from '../classes/realty';
import { User } from '../classes/user';
import {UserService} from '../services/user.service';
import { RealtyListService } from '../services/realty_list.service';

@Component({
  inputs: [
      'is_Fav',
      'realty_object',
      'user'
    ],
  selector: 'realty-tile',
  template: `
      <span class= "realty_type" [class.realty_type_fav]="is_Fav">{{realty_object.realty_type}}</span>
      <span class= "address" [class.address_fav]="is_Fav"> {{realty_object.address}}</span>
      <span *ngIf="is_Fav" class= "district"> {{realty_object.district}}</span>
      <div class="img_frame" [class.landskape_img_frame]="is_Fav" [ngStyle]="{'background-image': 'url(' + realty_object.photos[0] + ')'}">
            <!--<img src={{realty_object.photos[0]}}>-->
      </div>
      <div class ="discribe" [class.landskape_discribe]="is_Fav" >
            <span class ="price"> {{realty_object.price}} 000 &#8381;</span>
            <span class="room"> Комнат: {{realty_object.rooms}}</span>
            <span class="floor"> Этаж: {{realty_object.floor}} из {{realty_object.floors}}</span>
            <span class="date"> Добавлено {{realty_object.date}}</span>
            <div class="button" *ngIf="!is_Fav" [class.button_active]="inFavList()" (click)="toFavourite($event)"></div>
      </div>
      <div class = "phone" *ngIf="is_Fav">
        <div *ngIf='auth.user && auth.user.hasTime()'><div *ngFor='let ph of realty_object.phones'>{{ph}}</div></div>
      </div>
      <div class = "remove" *ngIf="is_Fav" (click)="removeFavourite()"></div>

  `,
  styles: [`
      span{
          display: block;
          margin-left: 10px;
          color: black;
          width: 240px;
      }
     .realty_type{
         font-size: 10pt;
         color: #6f6f6d;
         font-family: "open sans", sans-serif;
         font-weight: 200;
         order: 2;
      }
     .address{
         font-size: 12pt;
         color: rgba(0, 0, 0, 0.64);
         margin-bottom: 5px;
         display: block;
         order: 3;
      }
      .type {
          height: 50px;
          width: 350px;
          font-size: 24pt;
          font-width: bold;
          text-align: center;
          line-height: 50px;
          font-weight: bold;
      }
      .img_frame {
          display: block;
          position: relative;
          height: 157px;
          width: 197px;
          background-color: #EEE;
          overflow: hidden;
          order: 4;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
      }

      .discribe {
          position: relative;
          height: 89px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          order: 5;
      }

      .discribe .price {
          font-size: 13pt;
          color: #2b3e64;
      }

      .img_frame img{
          position:absolute;
          max-height:100%;
      }

      .button{
          position: absolute;
          height: 25px;
          top: 40px;
          left: 165px;
          width: 25px;
          background-image: url(src/icons/star_rate_disabled.png);
          background-size: cover;
      }

      .button:hover{
          box-shadow: 0 0 3px black;
          transition: 0.4s;
      }

      .button:not(:hover){
          transition: 0.4s;
      }

      .button_active{
          background-image: url(src/icons/star_active.png);
      }

      .floor{
          font-size: calc(12pt - 3px);
          color: rgba(0, 0, 0, 0.61);
      }

      .room{
          font-size: calc(12pt - 1px);
          color: rgba(0, 0, 0, 0.64);
      }

      .date{
          font-size: calc(9pt - 1px);
          color: rgba(160, 160, 159, 0.8);
          font-weight: 700;
      }

      .more{
          font-size: 16pt;
        line-height: 30px;
        text-align:center;
        height: 30px;
        width: 150px;
        margin-left: 100px;
        border: 2px solid grey;
        border-radius: 2px;
    }
    .more:hover{
        background-color: #369;
        transition: 0.2s;
        color: white;
    }
    .more:not(:hover) {
        transition: 0.2s;
    }

    .landskape_discribe {
        margin-left: 30px;
        height: 100px;
    }


  .phone{
      font-size: 14pt;
      width: 250px;
      text-align: center;
      order: 6;
      color: #283b62;
      height: 90px;
      margin: auto 0 auto calc(100% - 797px);
  }

  .phone>div{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 70px;
      margin-left: 70px;
  }

  .phone>div>div{
      height: 30px;

  }

  .phone:before{
      content: " ";
      background-image: url(src/phone.png);
      width: 45px;
      height: 45px;
      background-size: cover;
      margin: 15px 0 10px auto;
      display: block;
      float: left;
  }

  .remove{
      background-image: url(src/cross.png);
      width: 40px;
      background-size: cover;
      height: 40px;
      position: absolute;
      left: calc(100% - 60px);
      top: 0;
      order: 7;
  }

  .remove:hover{
      background-image: url(src/cross_hover.png);
  }

  .landskape_img_frame{
      order:1;
          margin-left: 20px;
  }

  .realty_type_fav{
      font-size: 11pt;
      color: #77776d;
      font-variant: normal;
      text-transform: lowercase;
      height: 15px;
      line-height: 15px;
      margin-left: 30px;
  }

  .address_fav{
      display: block;
      font-size: 18pt;
      color: rgb(40, 59, 98);
      font-variant: small-caps;
      line-height: 20px;
      height: 20px;
      margin-left: 30px;
  }

  .district{
      order: 3;
      font-size: 9pt;
      color: #757575;
      text-transform: uppercase;
    font-weight: 500;
    margin-top: -3px;
    margin-left: 30px;
  }

  .landskape_discribe span{
      display: block;
      font-size: 12pt;
      margin: 0;
  }

  .landskape_discribe .floor{
      text-align: left;
  }

  .landskape_discribe .room{
      text-align:left;
      display: block;
      float:none;
  }
  .landskape_discribe .price{
      text-align: left;
      margin-bottom: 5px;
      margin-top: 5px;
      font-size: 16pt;
  }

  .landskape_discribe .date{
      font-size: 10pt;
  }

  @media screen and (max-width: 1040px) {
      .address_fav{
          font-size: 16pt;
          margin-bottom: 0;
      }
      .district{
            margin-top: 0px;
            font-size: 8pt;
      }

      .landskape_discribe .price {
          margin-bottom: 10px;
          margin-top: 10px;
      }

      .realty_type_fav{
          font-size: 9pt;
      }

      .landskape_discribe span {
          font-size: 10pt;
      }

      .landskape_discribe .date {
          font-weight: 200;
      }

      .phone {
          font-size: 14pt;
          width: 230px;
          text-align: center;
          order: 6;
          color: #283b62;
          height: 90px;
          margin: auto 0 auto calc(100% - 767px);
      }
  }
  @media screen and (max-width: 1000px) {
      .landskape_discribe {
          margin-left: 10px;
      }

      .address_fav, .realty_type_fav, .district{
          margin-left: 10px;
      }
  }

  @media screen and (max-width: 920px) {
      .phone {
          font-size: 12pt;
          width: 200px;
          margin: auto 0 auto calc(100% - 737px);
      }
  }

  @media screen and (max-width: 790px) {
      .phone {
          margin: auto 0 auto calc(100% - 670px);
      }
      .landskape_img_frame{
          width: 147px;
      }
  }

  @media screen and (max-width: 710px) {
      .landskape_img_frame{
          margin-left: 5px;
      }
      .phone {
          margin: auto 0 auto calc(100% - 630px);
      }
      .remove{
          left: calc(100% - 40px);
      }

      .landskape_discribe {
          margin-left: 15px;
      }

      .address_fav, .realty_type_fav, .district{
          margin-left: 15px;
      }
  }

`]
})

export class RealtyTileComponent {
    is_Fav=false;
    realty_object: Realty;
    user: User;
    //@Input realty_object: Realty;

    constructor(private auth: UserService, private realty_list_service: RealtyListService){

    }

    inFavList(){
        if(this.user){

            for(var i=0; i<this.user.favourite.length; ++i){
                if(this.realty_object.id == this.user.favourite[i]){
                    return true;
                }
            }
            return false;
        }
        else return false;
    }

    getNewStyle(){
        if(!this.is_Fav){
            return "background-color: red";
        } else
            return "";
        }
    toFavourite(event){
        if((<HTMLElement>event.currentTarget).className.includes("button_active"))
            this.auth.editFavList(this.realty_object.id, false);
        else{

            this.realty_list_service.FavRealtes.push(this.realty_object);
            console.log(this.realty_list_service.FavRealtes.indexOf(this.realty_object));
            this.auth.editFavList(this.realty_object.id, true);
        }
    }
    removeFavourite(){
        var index = this.realty_list_service.FavRealtes.indexOf(this.realty_object, 0);
        if (index > -1) {
            this.realty_list_service.FavRealtes.splice(index, 1);
        }
        this.auth.editFavList(this.realty_object.id, false);
    }
 }
