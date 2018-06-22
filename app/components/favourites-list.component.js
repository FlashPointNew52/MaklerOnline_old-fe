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
var realty_list_service_1 = require("../services/realty_list.service");
var user_service_1 = require("../services/user.service");
var FavouritesListComponent = (function () {
    function FavouritesListComponent(realty_list_service, auth) {
        this.realty_list_service = realty_list_service;
        this.auth = auth;
        this.isClick = false;
    }
    FavouritesListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.auth._user.subscribe(function (user) {
            _this.user = _this.auth.getAuthUser();
            _this.realty_list_service.FavRealtes = [];
            _this.getList();
        });
    };
    FavouritesListComponent.prototype.getList = function () {
        if (this.auth.user)
            if (this.auth.user.favourite)
                this.realty_list_service.getFavouriteList(this.auth.user.favourite);
    };
    FavouritesListComponent.prototype.show_view_panel = function (event, i) {
        this.selectedRealty = i;
        this.isClick = true;
        setTimeout(function () {
            var panel = document.getElementsByTagName('view-panel').item(0);
            var re = document.getElementsByTagName('realty-tile').item(i);
            re.parentElement.appendChild(panel);
        }, 30);
    };
    return FavouritesListComponent;
}());
FavouritesListComponent = __decorate([
    core_1.Component({
        providers: [realty_list_service_1.RealtyListService],
        selector: 'favourites-list',
        template: "\n  <div class=\"favourites-list\">\n        <view-panel [update] = \"realty_list_service.FavRealtes[selectedRealty]\" *ngIf='isClick && auth.user' [user] = auth.user></view-panel>\n\n        <div class = \"panel\">\n            <div>\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435 ({{ this.realty_list_service.FavRealtes?.length || 0}})</div>\n        </div>\n        <div class = \"position\" *ngFor=\"let temp of this.realty_list_service.FavRealtes; let i = index\" >\n                <hr >\n                <realty-tile [is_Fav]='true' (click)=\"show_view_panel($event, i)\" [realty_object]=\"temp\" [user]= auth.user *ngIf=\"auth.user\"></realty-tile>\n        </div>\n\n  ",
        styles: ["\n      .favourites-list{\n          margin-top: 120px;\n          width: 100%;\n          display: block;\n          min-width: 630px;\n      }\n      view-panel{\n          display: none;\n      }\n    .panel{\n        height: 25px;\n        width: 210px;\n        margin: 30px 10% 0px auto;\n        justify-content: space-between;\n        font-family: \"Roboto\";\n    }\n    .panel div:first-child{\n        font-size: 16pt;\n        color: #465678;\n    }\n\n    .position > view-panel{\n        display: flex;\n        justify-content: flex-end;\n        width: 100vw;\n        height: 500px;\n        background-color: rgb(242, 242, 242);\n        margin: 20px 0 0 0;\n        min-width: 630px;\n    }\n\n    .arrow_back{\n        background-image: url(src/Arrow_back.png);\n        background-size: cover;\n        position: absolute;\n        width: 75px;\n        height: 75px;\n        margin-left: 25px;\n    }\n    .arrow_back:hover{\n        background-image: url(src/Arrow_back_hover.png);\n    }\n    .list{\n        display: block;\n    }\n\n    hr{\n        width: 75vw;\n        border-color: rgba(245, 245, 245, 0.52);\n    }\n\n    realty-tile{\n        display: flex;\n        width: 75%;\n        margin-left: auto;\n        margin-right: auto;\n        height: 157px;\n        flex-wrap: wrap;\n        flex-direction: column;\n        align-content: flex-start;\n        position: relative;\n        min-width: 630px;\n    }\n\n    realty-tile:hover{\n        background-color: rgba(192, 192, 192, 0.17);\n    }\n\n    @media screen and (max-width: 1340px) {\n        .position > view-panel{\n            height: 1000px;\n            flex-wrap: wrap;\n        }\n    }\n\n    @media screen and (max-width: 1000px) {\n        hr{\n            width: 80vw;\n        }\n\n        realty-tile{\n            width: 80%;\n        }\n\n    }\n\n    @media screen and (max-width: 920px) {\n        hr{\n            width: 90vw;\n        }\n\n        realty-tile{\n            width: 90%;\n        }\n\n    }\n\n    @media screen and (max-width: 770px) {\n        .position > view-panel {\n            height: 870px;\n        }\n\n    }\n\n    @media screen and (max-width: 710px) {\n        hr{\n            width: 97vw;\n        }\n\n        realty-tile{\n            width: 97%;\n        }\n\n    }\n\n"]
    }),
    __metadata("design:paramtypes", [realty_list_service_1.RealtyListService, user_service_1.UserService])
], FavouritesListComponent);
exports.FavouritesListComponent = FavouritesListComponent;
//# sourceMappingURL=favourites-list.component.js.map