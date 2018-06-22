"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var user_service_1 = require("./services/user.service");
var AppComponent = (function () {
    //user: User;
    function AppComponent(auth) {
        this.auth = auth;
        this.chapter = 1;
        this.isSmall = false;
        auth.newSession();
        //console.log(localStorage);
    }
    AppComponent.prototype.ngOnInit = function () {
        document.getElementsByTagName("my-app").item(0).className = "";
        /*this.auth._user.subscribe(
          (user) => {
            this.user = this.auth.getAuthUser();
          }
        );*/
    };
    AppComponent.prototype.onActivate = function (event) {
        //console.log(this.user);
        //this.user = this.auth.getAuthUser();
    };
    AppComponent.prototype.onDeactivate = function (event) {
        //console.log(event);
    };
    AppComponent.prototype.onChapter = function (val) {
        this.chapter = val;
        this.isSmall = false;
    };
    AppComponent.prototype.setStyle = function () {
        document.body.style.removeProperty('overflow-x');
    };
    AppComponent.prototype.unLog = function () {
        this.auth.setUser();
        this.auth.closeSession();
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        providers: [user_service_1.UserService],
        template: "\n      <header>\n        <div class=\"logo\">\n            <div>\u0415\u0416\u0415\u041D\u0415\u0414\u0415\u041B\u042C\u041D\u0418\u041A</div>\n            <div class=\"logo1\">\u041D\u0415\u0414\u0412\u0418\u0416\u0418\u041C\u041E\u0421\u0422\u042C</div>\n            <div>\u0413\u0420\u0423\u041F\u041F\u0410 \u041A\u041E\u041C\u041F\u0410\u041D\u0418\u0419 ZAVRUS</div>\n        </div>\n        <div class='menu'>\n          <ul><div (click)=\"isSmall=!isSmall\" [class.active1]=\"chapter == 2 || chapter == 3 || chapter == 4\"></div>\n              <li routerLink=\"/main\" routerLinkActive=\"active\" [class.small_menu]=\"isSmall\" (click)='setStyle()'>\u0413\u041B\u0410\u0412\u041D\u0410\u042F</li>\n              <li routerLink=\"/find\"  routerLinkActive=\"active\" [class.small_menu]=\"isSmall\">\u041E\u0411\u042A\u0415\u041A\u0422\u042B</li>\n              <li routerLink=\"/favourite\" routerLinkActive=\"active\" [class.small_menu]=\"isSmall\" (click)='setStyle()'>\u0418\u0417\u0411\u0420\u0410\u041D\u041D\u041E\u0415</li>\n              <li routerLink=\"/pay\"  routerLinkActive=\"active\" [class.small_menu]=\"isSmall\">\u041E\u041F\u041B\u0410\u0422\u0410</li>\n              <li routerLink=\"/inter\" routerLinkActive=\"active\" [class.small_menu]=\"isSmall\" *ngIf=\"!auth.getAuthUser()\">\u0412\u041E\u0419\u0422\u0418</li>\n              <li (click)=\"unLog()\"  [class.small_menu]=\"isSmall\" *ngIf=\"auth.getAuthUser()\">\u0412\u042B\u0419\u0422\u0418</li>\n          </ul>\n        </div>\n      </header>\n\n      <div class=\"body\">\n          <router-outlet (activate)='onActivate($event)' (deactivate)='onDeactivate($event)'></router-outlet>\n      </div>\n  ",
        styles: ["\n    header{\n        position: absolute;\n        background-color: rgba(255, 255, 255, 0);\n        height: 70px;\n        display: inline-flex;\n        justify-content: space-between;\n        z-index: 100;\n        margin: 20px 30px 0 70px;\n        width: calc(100vw - 100px);\n    }\n\n    .logo{\n      display: inline-block;\n      float:left;\n      font-family: \"Open Sans\";\n      margin-left: 30px;\n\n    }\n    .logo div:first-child{\n        font-size: 12pt;\n        color: #465678;\n        margin-bottom: -5px;\n    }\n    .logo div:last-child{\n        color: #465678;\n        font-size: 8pt;\n        text-align: right;\n        margin-top: -5px;\n    }\n    .logo .logo1{\n        font-size: 20pt;\n        color: #750f0f;\n    }\n    .menu  {\n        display: inline-flex;\n        line-height: 35px;\n        justify-content: flex-end;\n    }\n\n    .menu ul>div{\n        display: none;\n        height: 37px;\n        align-items: center;\n    }\n\n    .menu ul>div>hr{\n        width: 80%;\n        margin: 4px auto;\n    }\n    .menu ul {\n      display:initial;\n      text-align: center;\n    }\n    .menu li {\n      cursor: pointer;\n      display:inline;\n      text-align:center;\n      font-size: 14pt;\n      color: #465678;\n      margin-left:10px;\n    }\n\n    .menu li:hover {\n      color: #73819c;\n    }\n    .menu .active {\n      //color: #9a7d67;\n      border-bottom: 2px #73819c solid;\n    }\n\n    .menu .active:hover {\n        color: #465678;\n    }\n\n\n    owner_page{\n        position: relative;\n        width: 100%;\n        height: 100%;\n        display: block;\n    }\n\n    @media screen and (max-width: 949px){\n        header{\n            margin: 20px 0 0 0px;\n            width: calc(100% - 10px);\n        }\n    }\n\n    @media screen and (max-width: 825px){\n        .menu li {\n            font-size: 12pt;\n        }\n    }\n\n    @media screen and (max-width: 770px){\n        header{\n            margin-left: 30px;\n            width: calc(100% - 40px);\n        }\n\n        .menu ul>div{\n            display: flex;\n            flex-direction: column;\n            width: 60px;\n            height: 55px;\n            justify-content: center;\n            background-image: url(src/menu_white.png);\n            background-size: cover;\n        }\n\n        .menu ul>div.active1{\n            background-image: url(src/menu.png);\n        }\n\n        .menu ul {\n          width: 60px;\n          padding-right: 30px;\n          line-height: 55px;\n          height: 55px;\n          margin: auto;\n      }\n\n      .menu li {\n          display: none;\n          margin: 0;\n      }\n\n      .menu .small_menu{\n          display: flex;\n          background-color: white;\n          height: 50px;\n          line-height: 50px;\n          justify-content: center;\n          width: 150px;\n          position: relative;\n          right: 110px;\n          top: -2px;\n          box-shadow: -3px 8px 10px rgba(0, 0, 0, 0.49);\n      }\n\n      .menu .small_menu:hover{\n          background-color: #dedcdc;\n      }\n\n      .menu  .active{\n              background-color: rgb(241, 241, 241);\n              border-bottom: 0;\n      }\n\n     }\n\n     @media screen and (max-width: 630px){\n         .menu ul>div>span{\n             margin-left: 5px;\n         }\n     }\n"]
    }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map