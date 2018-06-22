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
var RealtyListComponent = (function () {
    function RealtyListComponent(realty_list_service) {
        this.realty_list_service = realty_list_service;
        this.sortText = "Новизне";
        this.selSort = [true, false, false, false];
        this.isClick = false;
        this.isClicks = false;
        this.notFind = false;
        this.inMap = new core_1.EventEmitter();
    }
    RealtyListComponent.prototype.ngOnInit = function () {
        //this.getList(this.qu);
    };
    Object.defineProperty(RealtyListComponent.prototype, "getList", {
        set: function (data) {
            this.realty_list_service.getList(data.query, data.page, data.typeCode);
        },
        enumerable: true,
        configurable: true
    });
    ;
    RealtyListComponent.prototype.back_to_map = function () {
        this.inMap.emit(false);
        var map = document.getElementsByTagName("google-map").item(0);
        var search_panel = document.getElementsByClassName("search_panel").item(0);
        var objects = document.getElementsByClassName("objects").item(0).firstElementChild;
        search_panel.style.setProperty('transform', 'translate(0vw,0)');
        search_panel.style.setProperty('transition', 'all 0.1s ease-in-out');
        map.style.setProperty('transform', 'translate(0vw,0)');
        map.style.setProperty('transition', 'all 0.1s ease-in-out');
        objects.style.setProperty('overflow', 'hidden');
        objects.style.setProperty('height', '0');
        objects.style.setProperty('transform', 'translate(0vw,0)');
        objects.style.setProperty('transition', 'all 0.1s ease-in-out');
    };
    RealtyListComponent.prototype.showDescribe = function (event, temp) {
        var _this = this;
        this.selectedRealty = temp;
        this.isClick = true;
        var container = document.getElementsByClassName("container").item(0);
        var column = parseInt('' + container.clientWidth / 215);
        var tilePos = Array.prototype.indexOf.call(container.getElementsByTagName("realty-tile"), event.currentTarget);
        var columnPos = parseInt('' + tilePos / column) + 1;
        var hide = document.getElementsByClassName("hide").item(0);
        var newItem = document.getElementsByTagName("view-panel").item(0);
        if (!newItem) {
            setTimeout(function () {
                _this.showDescribe(event, temp);
            }, 100);
        }
        else {
            var row = parseInt('' + tilePos / column) + 1;
            var children = container.getElementsByTagName("realty-tile").length;
            if (children < column) {
                container.insertBefore(hide, container.getElementsByTagName("realty-tile")[children * columnPos]);
                container.insertBefore(newItem, container.getElementsByTagName("realty-tile")[children * columnPos]);
            }
            else {
                container.insertBefore(hide, container.getElementsByTagName("realty-tile")[column * columnPos]);
                container.insertBefore(newItem, container.getElementsByTagName("realty-tile")[column * columnPos]);
            }
            newItem.style.setProperty('top', '' + (316 * row + 20) + 'px');
            var scr = newItem.getBoundingClientRect().top;
            var int_1 = setInterval(function () {
                if (scr > 200) {
                    window.scrollBy(0, 10);
                    scr -= 10;
                }
                else if (scr < 160) {
                    window.scrollBy(0, -10);
                    scr += 10;
                }
                else {
                    clearInterval(int_1);
                }
            }, 5);
        }
    };
    RealtyListComponent.prototype.show_sort = function (event) {
        event.currentTarget.parentElement.getElementsByTagName('div').item(0).style.setProperty('display', "flex");
    };
    RealtyListComponent.prototype.hide_sort = function (event) {
        event.currentTarget.style.removeProperty('display');
    };
    RealtyListComponent.prototype.newSort = function (val, event, int) {
        this.sortText = val;
        event.currentTarget.parentElement.style.removeProperty('display');
        for (var i = 0; i < this.selSort.length; i++)
            if (i != int)
                this.selSort[i] = false;
        this.selSort[int] = true;
    };
    return RealtyListComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], RealtyListComponent.prototype, "inMap", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], RealtyListComponent.prototype, "getList", null);
RealtyListComponent = __decorate([
    core_1.Component({
        inputs: [
            "user",
            "query",
        ],
        selector: 'realty-list',
        template: "\n        <view-panel [update] = \"realty[selectedRealty]\" *ngIf='isClick' [user] = user ></view-panel>\n        <div class='hide'></div>\n\n        <div class='container'>\n            <div>\n                <span class = \"arrow_back1\" (click)= \"back_to_map()\">\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u043F\u043E\u0438\u0441\u043A\u0430</span>\n                <div class = \"sort\" (focus)=\"loader()\">\n                    <span>\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E: </span><span (mouseover)=\"show_sort($event)\">{{sortText}}</span>\n                    <div (mouseleave)=\"hide_sort($event)\">\n                        <div (click)=\"newSort('\u041D\u043E\u0432\u0438\u0437\u043D\u0435', $event, 0)\" [class.sort_select]=\"selSort[0]\">\u041D\u043E\u0432\u0438\u0437\u043D\u0435</div>\n                        <div (click)=\"newSort('\u0420\u0435\u0439\u0442\u0438\u043D\u0433', $event, 1)\" [class.sort_select]=\"selSort[1]\">\u0420\u0435\u0439\u0442\u0438\u043D\u0433</div>\n                        <div (click)=\"newSort('\u0426\u0435\u043D\u0430: \u043E\u0442 \u043D\u0438\u0437\u043A\u043E\u0439 \u043A \u0432\u044B\u0441\u043E\u043A\u043E\u0439', $event, 2)\" [class.sort_select]=\"selSort[2]\">\u0426\u0435\u043D\u0430: \u043E\u0442 \u043D\u0438\u0437\u043A\u043E\u0439 \u043A \u0432\u044B\u0441\u043E\u043A\u043E\u0439</div>\n                        <div (click)=\"newSort('\u0426\u0435\u043D\u0430: \u043E\u0442 \u0432\u044B\u0441\u043E\u043A\u043E\u0439 \u043A \u043D\u0438\u0437\u043A\u043E\u0439', $event, 3)\" [class.sort_select]=\"selSort[3]\">\u0426\u0435\u043D\u0430: \u043E\u0442 \u0432\u044B\u0441\u043E\u043A\u043E\u0439 \u043A \u043D\u0438\u0437\u043A\u043E\u0439</div>\n                    </div>\n                </div>\n            </div>\n            <div *ngIf=\"realty_list_service.FindRealtes.length > 0\">\n                <realty-tile *ngFor=\"let temp of realty_list_service.FindRealtes; let i = index\" (click)=\"showDescribe($event, i)\" [realty_object]=\"temp\" [user] = user></realty-tile>\n            </div>\n            <div *ngIf=\"realty_list_service.FindRealtes.length == 0\" class=\"not_find\">\u041E\u0431\u044A\u0435\u043A\u0442\u044B \u043F\u043E \u0432\u0430\u0448\u0435\u043C\u0443 \u0437\u0430\u043F\u0440\u043E\u0441\u0443 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B.<br>\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u0435 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u043F\u043E\u0438\u0441\u043A\u0430\n            </div>\n        </div>\n  ",
        styles: ["\n      .not_find{\n          margin-top: 100px;\n          color: #1e3054;\n          font-size: 18pt;\n          text-align: center;\n      }\n      .container>div:first-of-type{\n          position: absolute;\n          width: 100%;\n          top: -15px;\n      }\n\n      .container>div:first-of-type>span{\n          color: #9d9d9d;\n          font-size: 11pt;\n          height: 20px;\n          float: left;\n          cursor: pointer;\n      }\n\n      .container>div:first-of-type>span:hover{\n          color: #243659;\n      }\n\n      .subscription{\n          background-color:rgb(242, 242, 242);\n          height: 294px;\n          width: 414px;\n          color: #369;\n          margin: 20px 20px 0 0;\n      }\n\n      .subscription:hover{\n          box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.49);\n          background-color: rgb(237, 109, 17);\n      }\n\n      .subscription:hover>div{\n          color: white;\n      }\n\n      .subscription>div{\n          display: flex;\n          flex-direction: column;\n          height: 294px;\n          width: 414px;\n          color: #606060;\n          font-size: 12pt;\n          justify-content: center;\n          align-items: center;\n      }\n\n      .subscription>div>span:nth-of-type(2){\n          font-size: 16pt;\n          color: #777777;\n          font-weight: lighter;\n      }\n\n      .subscription:hover>div>span:nth-of-type(2){\n          color: white;\n      }\n\n      .subscription>div>span:nth-of-type(3){\n              margin-top: 10px;\n      }\n\n      .subscription>div>div{\n          height: 80px;\n          width: 80px;\n          background-color: #b0b0af;\n          border-radius: 50px;\n          margin: 20px;\n          background-image: url(src/letter.png);\n          background-size: 80px 50px;\n          background-position: center;\n          background-repeat: no-repeat;\n      }\n\n      .subscription:hover>div>div{\n          background-color: transparent;\n          border: 2px solid white;\n      }\n\n      .sort{\n          height: 20px;\n          width: 340px;\n          margin-left: auto;\n      }\n\n      .sort>span{\n          color: rgb(153, 153, 153);\n          font-weight: 200;\n          font-size: 11pt;\n      }\n\n      .sort>span:last-of-type{\n          color: #1E3054;\n          cursor: pointer;\n      }\n\n      .sort>span:last-of-type:hover{\n          color: rgb(87, 87, 87);\n      }\n\n      .sort>div{\n          display: none;\n          flex-direction: column;\n          height: 122px;\n          position: absolute;\n          background-color: white;\n          justify-content: space-around;\n          align-items: flex-start;\n          z-index: 99;\n          border: 1px solid silver;\n          margin-top: 10px;\n          font-size: 11pt;\n          width: 240px;\n          color: #1E3054;\n          box-shadow: -3px 8px 10px rgba(0, 0, 0, 0.49);\n          padding-bottom: 3px;\n      }\n\n      .sort>div:before{\n          content: \" \";\n          height: 12px;\n          width: 20px;\n          display: block;\n          position: absolute;\n          top: -12px;\n          left: 155px;\n          background-image: url(src/arr.png);\n          background-size: cover;\n      }\n\n      .sort>div>div{\n          height: 30px;\n          width: 200px;\n          line-height: 30px;\n          cursor: pointer;\n          padding: 0 20px;\n          margin: -3px 0;\n      }\n\n      .sort hr{\n          margin: 0 20;\n          width: 200;\n          color: silver;\n          border: 0;\n          border-bottom: 1px solid rgba(128, 128, 128, 0.07);\n      }\n\n      .sort>div>div:hover{\n          background-color: #dedcdc;\n      }\n\n      view-panel{\n          display: none;\n      }\n\n     .container > .hide{\n          width: 100vw;\n          height: 500px;\n          margin: 20px 0 0 0;\n          min-width: 630px;\n      }\n\n      .container{\n          display: flex;\n          margin: 40px auto 0 auto;\n          flex-flow: row wrap;\n          justify-content: center;\n          max-width: 1302px;\n          min-width: 630px;\n          min-height: 100vw;\n          position: relative;\n      }\n\n      .container realty-tile{\n          background-color:rgb(242, 242, 242);;\n          display:inline-block;\n          height: 294px;\n          width: 197px;\n          color: #369;\n          margin: 20px 20px 0 0;\n      }\n\n      .container realty-tile:hover{\n          box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.49);\n      }\n\n      .arrow_back{\n          background-image: url(src/Arrow_back.png);\n          background-size: cover;\n          position: absolute;\n          width: 75px;\n          height: 75px;\n          margin-left: 25px;\n      }\n\n      .arrow_back:hover{\n          background-image: url(src/Arrow_back_hover.png);\n      }\n\n      .container > view-panel{\n          display: flex;\n          justify-content: flex-end;\n          position: absolute;\n          width: 100vw;\n          height: 500px;\n          background-color: rgb(242, 242, 242);\n          margin: 0;\n          min-width: 630px;\n      }\n\n      .sort_select{\n          background-color: rgb(241, 241, 241);\n\n      }\n\n      @media screen and (max-width: 1340px) {\n          .container > view-panel{\n              height: 1000px;\n              flex-wrap: wrap;\n          }\n\n          .container > .hide{\n              height: 1000px;\n          }\n      }\n\n      @media screen and (max-width: 1303px) {\n          .sort{\n              margin-right: 100px;\n          }\n      }\n\n      @media screen and (max-width: 1145px) {\n          .sort{\n              margin-right: 25px;\n          }\n      }\n\n      @media screen and (max-width: 1090px) {\n          .sort{\n              margin-right: 105px;\n          }\n      }\n\n      @media screen and (max-width: 1025px) {\n          .sort{\n              margin-right: 80px;\n          }\n      }\n\n      @media screen and (max-width: 975px) {\n          .sort{\n              margin-right: 50px;\n          }\n      }\n\n      @media screen and (max-width: 810px) {\n          .sort{\n              margin-right: 80px;\n          }\n      }\n\n      @media screen and (max-width: 780px) {\n          .sort{\n              margin-right: 65px;\n          }\n      }\n\n      @media screen and (max-width: 730px) {\n          .sort{\n              margin-right: 40px;\n          }\n      }\n\n      @media screen and (max-width: 650px) {\n          .sort{\n              margin-right: 60px;\n          }\n      }\n\n      @media screen and (max-width: 770px) {\n          .container > view-panel, .container > .hide {\n              height: 870px;\n          }\n      }\n"]
    }),
    __metadata("design:paramtypes", [realty_list_service_1.RealtyListService])
], RealtyListComponent);
exports.RealtyListComponent = RealtyListComponent;
//# sourceMappingURL=realty-list.component.js.map