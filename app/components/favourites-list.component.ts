import { Component, OnInit }  from '@angular/core';
import { User } from '../classes/user';
import {  Realty} from '../classes/realty';
import { RealtyListService } from '../services/realty_list.service';
import {UserService} from '../services/user.service';

@Component({
    providers: [RealtyListService],
    selector: 'favourites-list',
    template: `
  <div class="favourites-list">
        <view-panel [update] = "realty_list_service.FavRealtes[selectedRealty]" *ngIf='isClick && auth.user' [user] = auth.user></view-panel>

        <div class = "panel">
            <div>Избранное ({{ this.realty_list_service.FavRealtes?.length || 0}})</div>
        </div>
        <div class = "position" *ngFor="let temp of this.realty_list_service.FavRealtes; let i = index" >
                <hr >
                <realty-tile [is_Fav]='true' (click)="show_view_panel($event, i)" [realty_object]="temp" [user]= auth.user *ngIf="auth.user"></realty-tile>
        </div>

  `,
  styles: [`
      .favourites-list{
          margin-top: 120px;
          width: 100%;
          display: block;
          min-width: 630px;
      }
      view-panel{
          display: none;
      }
    .panel{
        height: 25px;
        width: 210px;
        margin: 30px 10% 0px auto;
        justify-content: space-between;
        font-family: "Roboto";
    }
    .panel div:first-child{
        font-size: 16pt;
        color: #465678;
    }

    .position > view-panel{
        display: flex;
        justify-content: flex-end;
        width: 100vw;
        height: 500px;
        background-color: rgb(242, 242, 242);
        margin: 20px 0 0 0;
        min-width: 630px;
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
    .list{
        display: block;
    }

    hr{
        width: 75vw;
        border-color: rgba(245, 245, 245, 0.52);
    }

    realty-tile{
        display: flex;
        width: 75%;
        margin-left: auto;
        margin-right: auto;
        height: 157px;
        flex-wrap: wrap;
        flex-direction: column;
        align-content: flex-start;
        position: relative;
        min-width: 630px;
    }

    realty-tile:hover{
        background-color: rgba(192, 192, 192, 0.17);
    }

    @media screen and (max-width: 1340px) {
        .position > view-panel{
            height: 1000px;
            flex-wrap: wrap;
        }
    }

    @media screen and (max-width: 1000px) {
        hr{
            width: 80vw;
        }

        realty-tile{
            width: 80%;
        }

    }

    @media screen and (max-width: 920px) {
        hr{
            width: 90vw;
        }

        realty-tile{
            width: 90%;
        }

    }

    @media screen and (max-width: 770px) {
        .position > view-panel {
            height: 870px;
        }

    }

    @media screen and (max-width: 710px) {
        hr{
            width: 97vw;
        }

        realty-tile{
            width: 97%;
        }

    }

`]
})

export class FavouritesListComponent implements OnInit{
    realtes: Realty[];
    selectedRealty;
    isClick=false;
    user: User;
    constructor(private realty_list_service: RealtyListService, private auth: UserService){}

    ngOnInit() {
      this.auth._user.subscribe(
        (user) => {
          this.user = this.auth.getAuthUser();
          this.realty_list_service.FavRealtes = [];
          this.getList();
        }
      );

    }

    getList() {
        if(this.auth.user)
            if(this.auth.user.favourite)
                this.realty_list_service.getFavouriteList(this.auth.user.favourite);
    }

    show_view_panel(event, i){
        this.selectedRealty = i;
        this.isClick=true;
        setTimeout(() => {
            var panel = document.getElementsByTagName('view-panel').item(0);
            var re = document.getElementsByTagName('realty-tile').item(i);
            re.parentElement.appendChild(panel);
        },30);
    }
 }
