import {  Component} from '@angular/core';
import { User } from './classes/user';
import {UserService} from './services/user.service';

@Component({
  selector: 'my-app',
  providers: [UserService],
  template: `
      <header>
        <div class="logo">
            <div>ЕЖЕНЕДЕЛЬНИК</div>
            <div class="logo1">НЕДВИЖИМОСТЬ</div>
            <div>ГРУППА КОМПАНИЙ ZAVRUS</div>
        </div>
        <div class='menu'>
          <ul><div (click)="isSmall=!isSmall" [class.active1]="chapter == 2 || chapter == 3 || chapter == 4"></div>
              <li routerLink="/main" routerLinkActive="active" [class.small_menu]="isSmall" (click)='setStyle()'>ГЛАВНАЯ</li>
              <li routerLink="/find"  routerLinkActive="active" [class.small_menu]="isSmall">ОБЪЕКТЫ</li>
              <li routerLink="/favourite" routerLinkActive="active" [class.small_menu]="isSmall" (click)='setStyle()'>ИЗБРАННОЕ</li>
              <li routerLink="/pay"  routerLinkActive="active" [class.small_menu]="isSmall">ОПЛАТА</li>
              <li routerLink="/inter" routerLinkActive="active" [class.small_menu]="isSmall" *ngIf="!auth.getAuthUser()">ВОЙТИ</li>
              <li (click)="unLog()"  [class.small_menu]="isSmall" *ngIf="auth.getAuthUser()">ВЫЙТИ</li>
          </ul>
        </div>
      </header>

      <div class="body">
          <router-outlet (activate)='onActivate($event)' (deactivate)='onDeactivate($event)'></router-outlet>
      </div>
  `,
  styles: [`
    header{
        position: absolute;
        background-color: rgba(255, 255, 255, 0);
        height: 70px;
        display: inline-flex;
        justify-content: space-between;
        z-index: 100;
        margin: 20px 30px 0 70px;
        width: calc(100vw - 100px);
    }

    .logo{
      display: inline-block;
      float:left;
      font-family: "Open Sans";
      margin-left: 30px;

    }
    .logo div:first-child{
        font-size: 12pt;
        color: #465678;
        margin-bottom: -5px;
    }
    .logo div:last-child{
        color: #465678;
        font-size: 8pt;
        text-align: right;
        margin-top: -5px;
    }
    .logo .logo1{
        font-size: 20pt;
        color: #750f0f;
    }
    .menu  {
        display: inline-flex;
        line-height: 35px;
        justify-content: flex-end;
    }

    .menu ul>div{
        display: none;
        height: 37px;
        align-items: center;
    }

    .menu ul>div>hr{
        width: 80%;
        margin: 4px auto;
    }
    .menu ul {
      display:initial;
      text-align: center;
    }
    .menu li {
      cursor: pointer;
      display:inline;
      text-align:center;
      font-size: 14pt;
      color: #465678;
      margin-left:10px;
    }

    .menu li:hover {
      color: #73819c;
    }
    .menu .active {
      //color: #9a7d67;
      border-bottom: 2px #73819c solid;
    }

    .menu .active:hover {
        color: #465678;
    }


    owner_page{
        position: relative;
        width: 100%;
        height: 100%;
        display: block;
    }

    @media screen and (max-width: 949px){
        header{
            margin: 20px 0 0 0px;
            width: calc(100% - 10px);
        }
    }

    @media screen and (max-width: 825px){
        .menu li {
            font-size: 12pt;
        }
    }

    @media screen and (max-width: 770px){
        header{
            margin-left: 30px;
            width: calc(100% - 40px);
        }

        .menu ul>div{
            display: flex;
            flex-direction: column;
            width: 60px;
            height: 55px;
            justify-content: center;
            background-image: url(src/menu_white.png);
            background-size: cover;
        }

        .menu ul>div.active1{
            background-image: url(src/menu.png);
        }

        .menu ul {
          width: 60px;
          padding-right: 30px;
          line-height: 55px;
          height: 55px;
          margin: auto;
      }

      .menu li {
          display: none;
          margin: 0;
      }

      .menu .small_menu{
          display: flex;
          background-color: white;
          height: 50px;
          line-height: 50px;
          justify-content: center;
          width: 150px;
          position: relative;
          right: 110px;
          top: -2px;
          box-shadow: -3px 8px 10px rgba(0, 0, 0, 0.49);
      }

      .menu .small_menu:hover{
          background-color: #dedcdc;
      }

      .menu  .active{
              background-color: rgb(241, 241, 241);
              border-bottom: 0;
      }

     }

     @media screen and (max-width: 630px){
         .menu ul>div>span{
             margin-left: 5px;
         }
     }
`]
})

export class AppComponent {
  chapter: number = 1;
  isSmall: boolean = false;
  //user: User;
  constructor(private auth: UserService){
      auth.newSession();
      //console.log(localStorage);
  }

  ngOnInit() {
      (<HTMLElement>document.getElementsByTagName("my-app").item(0)).className = "";
    /*this.auth._user.subscribe(
      (user) => {
        this.user = this.auth.getAuthUser();
      }
    );*/
  }

  onActivate(event){
     //console.log(this.user);
     //this.user = this.auth.getAuthUser();
  }

  onDeactivate(event){
      //console.log(event);
  }

  onChapter(val:any) {
    this.chapter = val;
    this.isSmall = false;
  }

  setStyle(){
      document.body.style.removeProperty('overflow-x');
  }

  unLog(){
      this.auth.setUser();
      this.auth.closeSession();
  }
}
