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
var user_service_1 = require("../services/user.service");
var realty_list_service_1 = require("../services/realty_list.service");
var RealtyTileComponent = (function () {
    //@Input realty_object: Realty;
    function RealtyTileComponent(auth, realty_list_service) {
        this.auth = auth;
        this.realty_list_service = realty_list_service;
        this.is_Fav = false;
    }
    RealtyTileComponent.prototype.inFavList = function () {
        if (this.user) {
            for (var i = 0; i < this.user.favourite.length; ++i) {
                if (this.realty_object.id == this.user.favourite[i]) {
                    return true;
                }
            }
            return false;
        }
        else
            return false;
    };
    RealtyTileComponent.prototype.getNewStyle = function () {
        if (!this.is_Fav) {
            return "background-color: red";
        }
        else
            return "";
    };
    RealtyTileComponent.prototype.toFavourite = function (event) {
        if (event.currentTarget.className.includes("button_active"))
            this.auth.editFavList(this.realty_object.id, false);
        else {
            this.realty_list_service.FavRealtes.push(this.realty_object);
            console.log(this.realty_list_service.FavRealtes.indexOf(this.realty_object));
            this.auth.editFavList(this.realty_object.id, true);
        }
    };
    RealtyTileComponent.prototype.removeFavourite = function () {
        var index = this.realty_list_service.FavRealtes.indexOf(this.realty_object, 0);
        if (index > -1) {
            this.realty_list_service.FavRealtes.splice(index, 1);
        }
        this.auth.editFavList(this.realty_object.id, false);
    };
    return RealtyTileComponent;
}());
RealtyTileComponent = __decorate([
    core_1.Component({
        inputs: [
            'is_Fav',
            'realty_object',
            'user'
        ],
        selector: 'realty-tile',
        template: "\n      <span class= \"realty_type\" [class.realty_type_fav]=\"is_Fav\">{{realty_object.realty_type}}</span>\n      <span class= \"address\" [class.address_fav]=\"is_Fav\"> {{realty_object.address}}</span>\n      <span *ngIf=\"is_Fav\" class= \"district\"> {{realty_object.district}}</span>\n      <div class=\"img_frame\" [class.landskape_img_frame]=\"is_Fav\" [ngStyle]=\"{'background-image': 'url(' + realty_object.photos[0] + ')'}\">\n            <!--<img src={{realty_object.photos[0]}}>-->\n      </div>\n      <div class =\"discribe\" [class.landskape_discribe]=\"is_Fav\" >\n            <span class =\"price\"> {{realty_object.price}} 000 &#8381;</span>\n            <span class=\"room\"> \u041A\u043E\u043C\u043D\u0430\u0442: {{realty_object.rooms}}</span>\n            <span class=\"floor\"> \u042D\u0442\u0430\u0436: {{realty_object.floor}} \u0438\u0437 {{realty_object.floors}}</span>\n            <span class=\"date\"> \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E {{realty_object.date}}</span>\n            <div class=\"button\" *ngIf=\"!is_Fav\" [class.button_active]=\"inFavList()\" (click)=\"toFavourite($event)\"></div>\n      </div>\n      <div class = \"phone\" *ngIf=\"is_Fav\">\n        <div *ngIf='auth.user && auth.user.hasTime()'><div *ngFor='let ph of realty_object.phones'>{{ph}}</div></div>\n      </div>\n      <div class = \"remove\" *ngIf=\"is_Fav\" (click)=\"removeFavourite()\"></div>\n\n  ",
        styles: ["\n      span{\n          display: block;\n          margin-left: 10px;\n          color: black;\n          width: 240px;\n      }\n     .realty_type{\n         font-size: 10pt;\n         color: #6f6f6d;\n         font-family: \"open sans\", sans-serif;\n         font-weight: 200;\n         order: 2;\n      }\n     .address{\n         font-size: 12pt;\n         color: rgba(0, 0, 0, 0.64);\n         margin-bottom: 5px;\n         display: block;\n         order: 3;\n      }\n      .type {\n          height: 50px;\n          width: 350px;\n          font-size: 24pt;\n          font-width: bold;\n          text-align: center;\n          line-height: 50px;\n          font-weight: bold;\n      }\n      .img_frame {\n          display: block;\n          position: relative;\n          height: 157px;\n          width: 197px;\n          background-color: #EEE;\n          overflow: hidden;\n          order: 4;\n          background-size: cover;\n          background-repeat: no-repeat;\n          background-position: center;\n      }\n\n      .discribe {\n          position: relative;\n          height: 89px;\n          display: flex;\n          flex-direction: column;\n          justify-content: center;\n          order: 5;\n      }\n\n      .discribe .price {\n          font-size: 13pt;\n          color: #2b3e64;\n      }\n\n      .img_frame img{\n          position:absolute;\n          max-height:100%;\n      }\n\n      .button{\n          position: absolute;\n          height: 25px;\n          top: 40px;\n          left: 165px;\n          width: 25px;\n          background-image: url(src/icons/star_rate_disabled.png);\n          background-size: cover;\n      }\n\n      .button:hover{\n          box-shadow: 0 0 3px black;\n          transition: 0.4s;\n      }\n\n      .button:not(:hover){\n          transition: 0.4s;\n      }\n\n      .button_active{\n          background-image: url(src/icons/star_active.png);\n      }\n\n      .floor{\n          font-size: calc(12pt - 3px);\n          color: rgba(0, 0, 0, 0.61);\n      }\n\n      .room{\n          font-size: calc(12pt - 1px);\n          color: rgba(0, 0, 0, 0.64);\n      }\n\n      .date{\n          font-size: calc(9pt - 1px);\n          color: rgba(160, 160, 159, 0.8);\n          font-weight: 700;\n      }\n\n      .more{\n          font-size: 16pt;\n        line-height: 30px;\n        text-align:center;\n        height: 30px;\n        width: 150px;\n        margin-left: 100px;\n        border: 2px solid grey;\n        border-radius: 2px;\n    }\n    .more:hover{\n        background-color: #369;\n        transition: 0.2s;\n        color: white;\n    }\n    .more:not(:hover) {\n        transition: 0.2s;\n    }\n\n    .landskape_discribe {\n        margin-left: 30px;\n        height: 100px;\n    }\n\n\n  .phone{\n      font-size: 14pt;\n      width: 250px;\n      text-align: center;\n      order: 6;\n      color: #283b62;\n      height: 90px;\n      margin: auto 0 auto calc(100% - 797px);\n  }\n\n  .phone>div{\n      display: flex;\n      justify-content: flex-start;\n      align-items: center;\n      height: 70px;\n      margin-left: 70px;\n  }\n\n  .phone>div>div{\n      height: 30px;\n\n  }\n\n  .phone:before{\n      content: \" \";\n      background-image: url(src/phone.png);\n      width: 45px;\n      height: 45px;\n      background-size: cover;\n      margin: 15px 0 10px auto;\n      display: block;\n      float: left;\n  }\n\n  .remove{\n      background-image: url(src/cross.png);\n      width: 40px;\n      background-size: cover;\n      height: 40px;\n      position: absolute;\n      left: calc(100% - 60px);\n      top: 0;\n      order: 7;\n  }\n\n  .remove:hover{\n      background-image: url(src/cross_hover.png);\n  }\n\n  .landskape_img_frame{\n      order:1;\n          margin-left: 20px;\n  }\n\n  .realty_type_fav{\n      font-size: 11pt;\n      color: #77776d;\n      font-variant: normal;\n      text-transform: lowercase;\n      height: 15px;\n      line-height: 15px;\n      margin-left: 30px;\n  }\n\n  .address_fav{\n      display: block;\n      font-size: 18pt;\n      color: rgb(40, 59, 98);\n      font-variant: small-caps;\n      line-height: 20px;\n      height: 20px;\n      margin-left: 30px;\n  }\n\n  .district{\n      order: 3;\n      font-size: 9pt;\n      color: #757575;\n      text-transform: uppercase;\n    font-weight: 500;\n    margin-top: -3px;\n    margin-left: 30px;\n  }\n\n  .landskape_discribe span{\n      display: block;\n      font-size: 12pt;\n      margin: 0;\n  }\n\n  .landskape_discribe .floor{\n      text-align: left;\n  }\n\n  .landskape_discribe .room{\n      text-align:left;\n      display: block;\n      float:none;\n  }\n  .landskape_discribe .price{\n      text-align: left;\n      margin-bottom: 5px;\n      margin-top: 5px;\n      font-size: 16pt;\n  }\n\n  .landskape_discribe .date{\n      font-size: 10pt;\n  }\n\n  @media screen and (max-width: 1040px) {\n      .address_fav{\n          font-size: 16pt;\n          margin-bottom: 0;\n      }\n      .district{\n            margin-top: 0px;\n            font-size: 8pt;\n      }\n\n      .landskape_discribe .price {\n          margin-bottom: 10px;\n          margin-top: 10px;\n      }\n\n      .realty_type_fav{\n          font-size: 9pt;\n      }\n\n      .landskape_discribe span {\n          font-size: 10pt;\n      }\n\n      .landskape_discribe .date {\n          font-weight: 200;\n      }\n\n      .phone {\n          font-size: 14pt;\n          width: 230px;\n          text-align: center;\n          order: 6;\n          color: #283b62;\n          height: 90px;\n          margin: auto 0 auto calc(100% - 767px);\n      }\n  }\n  @media screen and (max-width: 1000px) {\n      .landskape_discribe {\n          margin-left: 10px;\n      }\n\n      .address_fav, .realty_type_fav, .district{\n          margin-left: 10px;\n      }\n  }\n\n  @media screen and (max-width: 920px) {\n      .phone {\n          font-size: 12pt;\n          width: 200px;\n          margin: auto 0 auto calc(100% - 737px);\n      }\n  }\n\n  @media screen and (max-width: 790px) {\n      .phone {\n          margin: auto 0 auto calc(100% - 670px);\n      }\n      .landskape_img_frame{\n          width: 147px;\n      }\n  }\n\n  @media screen and (max-width: 710px) {\n      .landskape_img_frame{\n          margin-left: 5px;\n      }\n      .phone {\n          margin: auto 0 auto calc(100% - 630px);\n      }\n      .remove{\n          left: calc(100% - 40px);\n      }\n\n      .landskape_discribe {\n          margin-left: 15px;\n      }\n\n      .address_fav, .realty_type_fav, .district{\n          margin-left: 15px;\n      }\n  }\n\n"]
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, realty_list_service_1.RealtyListService])
], RealtyTileComponent);
exports.RealtyTileComponent = RealtyTileComponent;
//# sourceMappingURL=realty-tile.component.js.map