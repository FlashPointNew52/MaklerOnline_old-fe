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
var OwnerPageComponent = (function () {
    function OwnerPageComponent() {
        this.open = [false, false, false, false, false, false];
        this.set = [false, false, false, false, false, false];
        this.draw_map = false;
        this.inMap = true;
        this.data = { query: '', page: 0, typeCode: '' };
        document.getElementsByTagName('body').item(0).style.setProperty("overflow-y", "hidden");
        this.onResize();
    }
    OwnerPageComponent.prototype.setOnMap = function (event) {
        this.inMap = !event;
    };
    OwnerPageComponent.prototype.onResize = function () {
        if (window.innerWidth < 965) {
            this.isMobile = true;
            setTimeout(function () {
                var parent = document.getElementsByClassName("parameter").item(0);
                var child = parent.children[5];
                if (child.firstChild.textContent == "Район") {
                    child.firstChild.textContent = "По району";
                    parent.children[6].textContent = "По карте";
                }
            }, 5);
        }
        else {
            this.isMobile = false;
            setTimeout(function () {
                var parent = document.getElementsByClassName("parameter").item(0);
                var child = parent.children[5];
                if (child.firstChild.textContent == "По району") {
                    child.firstChild.textContent = "Район";
                    parent.children[6].textContent = "Обвести";
                }
            }, 5);
        }
    };
    OwnerPageComponent.prototype.draw = function (event) {
        if (!this.isMobile) {
            this.draw_map = !this.draw_map;
        }
        else if (event.currentTarget.classList.item(1) == 'new_draw_button') {
            this.draw_map = !this.draw_map;
        }
        else {
            this.hide_menu = true;
        }
    };
    OwnerPageComponent.prototype.click = function (event, val, type) {
        event.target.offsetParent.offsetParent.firstChild.childNodes.item(0).nodeValue = event.target.childNodes.item(0).nodeValue;
        this.set[val] = true;
        if (type) {
            this.data.typeCode = type;
        }
        else
            this.data.typeCode = undefined;
    };
    OwnerPageComponent.prototype.setOpen = function (val, event) {
        for (var i = 0; i < this.open.length; i++)
            if (i != val)
                this.open[i] = false;
        if (val == 0) {
            if (event.target.className != 'email')
                this.open[val] = !this.open[val];
        }
        else
            this.open[val] = !this.open[val];
    };
    OwnerPageComponent.prototype.hide_map = function () {
        var map = document.getElementsByTagName("google-map").item(0);
        var search_panel = document.getElementsByClassName("search_panel").item(0);
        var objects = document.getElementsByClassName("objects").item(0);
        search_panel.style.setProperty('transform', 'translate(-100vw,0)');
        search_panel.style.setProperty('transition', 'all 0.5s ease-in-out');
        map.style.setProperty('transform', 'translate(-100%,0)');
        map.style.setProperty('transition', 'all 0.5s ease-in-out');
        objects.style.setProperty('overflow', 'visible');
        objects.style.setProperty('transform', 'translate(-100%,0)');
        objects.style.setProperty('transition', 'all 0.5s ease-in-out');
        objects.style.setProperty('height', 'inherit');
        document.body.style.setProperty('overflow-x', 'visible');
        document.getElementsByTagName('body').item(0).style.removeProperty("overflow-y");
        var arr = document.getElementsByClassName("general");
        for (var i = 1; i < arr.length; ++i) {
            if (this.set[i]) {
                if (i == 3 || i == 4)
                    this.data.query += arr.item(i).childNodes.item(0).textContent + " ";
                else if (i == 1)
                    this.data.query += arr.item(i).childNodes.item(0).textContent + " аренда ";
                else if (i == 5)
                    this.data.query += arr.item(i).childNodes.item(0).textContent + "  район ";
            }
        }
        //console.log(this.data.query);
        this.inMap = false;
    };
    OwnerPageComponent.prototype.hideMenu = function () {
        if (!this.hide_menu && this.isMobile) {
            return true;
        }
        else if (this.hide_menu && this.isMobile) {
            return false;
        }
        else
            return null;
    };
    OwnerPageComponent.prototype.showMenu = function () {
        this.hide_menu = !this.hide_menu;
    };
    OwnerPageComponent.prototype.openMenu = function (val) {
        if (!this.isMobile)
            return null;
        else
            return this.open[val];
    };
    OwnerPageComponent.prototype.draw_end = function () {
        var _this = this;
        if (this.isMobile && this.draw_map) {
            var timeoutId = setTimeout(function () {
                _this.hide_menu = false;
            }, 1000);
        }
    };
    OwnerPageComponent.prototype.interEmail = function (event) {
        if (event.key == 'Enter') {
            if (event.currentTarget.value)
                event.target.offsetParent.offsetParent.firstChild.childNodes.item(0).nodeValue = event.currentTarget.value;
            else
                event.target.offsetParent.offsetParent.firstChild.childNodes.item(0).nodeValue = "Рассылка";
            this.open[0] = !this.open[0];
        }
    };
    OwnerPageComponent.prototype.removeEmail = function (event) {
        document.getElementsByClassName('email').item(0).value = "";
        event.currentTarget.parentElement.parentElement.getElementsByTagName('span').item(0).textContent = "Рассылка";
    };
    return OwnerPageComponent;
}());
OwnerPageComponent = __decorate([
    core_1.Component({
        inputs: [
            "user"
        ],
        providers: [realty_list_service_1.RealtyListService],
        animations: [
            core_1.trigger('openMenu', [
                core_1.state('true', core_1.style({ height: core_1.AUTO_STYLE })),
                core_1.state('false, void', core_1.style({ height: '0px' })),
                core_1.transition('* <=> *', core_1.animate(250))
            ]),
            core_1.trigger('hideMenu', [
                core_1.state('true', core_1.style({ width: '100%' })),
                core_1.state('false', core_1.style({ width: '0px' })),
                core_1.transition('* <=> *', core_1.animate(100))
            ])
        ],
        selector: 'owner-page',
        template: "\n      <div class = \"search_panel\" (window:resize)=\"onResize()\">\n        <ul class = \"parameter\" [@hideMenu]=\"hideMenu()\">\n            <li class=\"general\" id=\"helper\" (click)=\"setOpen(0, $event)\" [class.subparam_open]=\"(open[0] || set[0]) && isMobile\"><span>\u0420\u0430\u0441\u0441\u044B\u043B\u043A\u0430</span><div></div>\n                <ul  class = \"subparameter\" [@openMenu]=\"openMenu(0)\" >\n                    <span>\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0432\u043E\u0439 e-mail \u0438</span>\n                    <span>\u043F\u043E\u043B\u0443\u0447\u0430\u0439\u0442\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u043D\u0430 \u043F\u043E\u0447\u0442\u0443</span>\n                    <div>Email </div><input class = 'email' type='email' (keydown) = \"interEmail($event)\"><div (click)=\"removeEmail($event)\"></div>\n                    <span>\u0412\u0441\u0435\u0433\u0434\u0430 \u0432 \u043A\u0443\u0440\u0441\u0435 \u0432\u0441\u0435\u0433\u043E \u043D\u043E\u0432\u043E\u0433\u043E</span>\n                    <!--<li (click)=\"click($event, 0)\">\u0412\u043A\u043B\u044E\u0447\u0435\u043D</li><hr>\n                    <li (click)=\"click($event, 0)\">\u0412\u044B\u043A\u043B\u044E\u0447\u0435\u043D</li>-->\n                </ul>\n            </li>\n\n            <li class=\"general\" (click)=\"setOpen(1, $event)\" [class.subparam_open]=\"(open[1] || set[1]) && isMobile\"><span>\u0421\u0440\u043E\u043A \u0430\u0440\u0435\u043D\u0434\u044B</span><div></div>\n                <ul class = \"subparameter\" [@openMenu]=\"openMenu(1)\">\n                    <li (click)=\"click($event, 1)\">\u0414\u043E\u043B\u0433\u043E\u0441\u0440\u043E\u0447\u043D\u0430\u044F</li>\n                    <li (click)=\"click($event, 1)\">\u041A\u0440\u0430\u0442\u043A\u043E\u0441\u0440\u043E\u0447\u043D\u0430\u044F</li>\n                </ul>\n            </li>\n\n            <li class=\"general\" (click)=\"setOpen(2, $event)\" [class.subparam_open]=\"(open[2] || set[2]) && isMobile\"><span>\u0422\u0438\u043F \u043E\u0431\u044A\u0435\u043A\u0442\u0430</span><div></div>\n                <ul class = \"subparameter\" [@openMenu]=\"openMenu(2)\">\n                    <li (click)=\"click($event, 2)\">\u041B\u044E\u0431\u043E\u0439</li>\n                    <li (click)=\"click($event, 2 , 'room')\">\u041A\u043E\u043C\u043D\u0430\u0442\u0430</li>\n                    <li (click)=\"click($event, 2, 'apartment_small')\">\u041C\u0430\u043B\u043E\u0441\u0435\u043C\u0435\u0439\u043A\u0430</li>\n                    <li (click)=\"click($event, 2, 'apartment')\">\u041A\u0432\u0430\u0440\u0442\u0438\u0440\u0430</li>\n                    <li (click)=\"click($event, 2, 'house')\">\u0414\u043E\u043C, \u041A\u043E\u0442\u0442\u0435\u0434\u0436</li>\n                </ul>\n            </li>\n\n            <li class=\"general\" (click)=\"setOpen(3, $event)\" [class.subparam_open]=\"open[3] || set[3]\"><span>\u041A\u043E\u043C\u043D\u0430\u0442</span><div></div>\n                <ul class = \"subparameter\" [@openMenu]=\"openMenu(3)\" >\n                    <li (click)=\"click($event, 3)\">\u041B\u044E\u0431\u0430\u044F</li>\n                    <li (click)=\"click($event, 3)\">1 \u043A\u043E\u043C\u043D\u0430\u0442\u0430</li>\n                    <li (click)=\"click($event, 3)\">2 \u043A\u043E\u043C\u043D\u0430\u0442\u044B</li>\n                    <li (click)=\"click($event, 3)\">3 \u043A\u043E\u043C\u043D\u0430\u0442\u044B</li>\n                    <li (click)=\"click($event, 3)\">4 \u043A\u043E\u043C\u043D\u0430\u0442\u044B</li>\n                    <li (click)=\"click($event, 3)\">>5 \u043A\u043E\u043C\u043D\u0430\u0442</li>\n                </ul>\n            </li>\n\n            <li class=\"general\" (click)=\"setOpen(4, $event)\" [class.subparam_open]=\"open[4] || set[4]\"><span>\u0426\u0435\u043D\u0430</span><div></div>\n                <ul class = \"subparameter\" [@openMenu]=\"openMenu(4)\">\n                    <li (click)=\"click($event, 4)\">\u0434\u043E 10 \u0442\u044B\u0441. \u0440\u0443\u0431</li>\n                    <li (click)=\"click($event, 4)\">\u0434\u043E 10 \u0442\u044B\u0441. \u0440\u0443\u0431</li>\n                    <li (click)=\"click($event, 4)\">\u043E\u0442 10 \u0434\u043E 15 \u0442\u044B\u0441. \u0440\u0443\u0431</li>\n                    <li (click)=\"click($event, 4)\">\u043E\u0442 15 \u0434\u043E 20 \u0442\u044B\u0441. \u0440\u0443\u0431</li>\n                    <li (click)=\"click($event, 4)\">\u043E\u0442 20 \u0434\u043E 30 \u0442\u044B\u0441. \u0440\u0443\u0431</li>\n                    <li (click)=\"click($event, 4)\">\u043E\u0442 30 \u0442\u044B\u0441. \u0440\u0443\u0431</li>\n                </ul>\n            </li>\n\n            <li class=\"general\" (click)=\"setOpen(5, $event)\" [class.subparam_open]=\"open[5] || set[5]\"><span>\u0420\u0430\u0439\u043E\u043D</span><div></div>\n                <ul class = \"subparameter\" [@openMenu]=\"openMenu(5)\">\n                    <li (click)=\"click($event, 5)\">\u041B\u044E\u0431\u043E\u0439</li>\n                    <li (click)=\"click($event, 5)\">\u0416\u0435\u043B\u0435\u0437\u043D\u043E\u0434\u043E\u0440\u043E\u0436\u043D\u044B\u0439</li>\n                    <li (click)=\"click($event, 5)\">\u0418\u043D\u0434\u0443\u0441\u0442\u0440\u0438\u0430\u043B\u044C\u043D\u044B\u0439</li>\n                    <li (click)=\"click($event, 5)\">\u041A\u0438\u0440\u043E\u0432\u0441\u043A\u0438\u0439</li>\n                    <li (click)=\"click($event, 5)\">\u041A\u0440\u0430\u0441\u043D\u043E\u0444\u043B\u043E\u0442\u0441\u043A\u0438\u0439</li>\n                    <li (click)=\"click($event, 5)\">\u0426\u0435\u043D\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0439</li>\n                </ul>\n            </li>\n\n            <div class=\"draw_button\" (click)=\"draw($event)\" [class.draw_button_active]=\"draw_map\">\u041E\u0431\u0432\u0435\u0441\u0442\u0438</div>\n            <button (click)=\"hide_map()\">\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C</button>\n        </ul>\n      </div>\n\n      <google-map [draw_allowed]='draw_map' (mouseup)='draw_end()'></google-map>\n      <div class='hidden' [class.new_draw_button]=\"isMobile && inMap\" (click)=\"draw($event)\" [class.activate]=\"draw_map\">\u041E\u0431\u0432\u0435\u0441\u0442\u0438</div>\n      <div class='hidden' [class.cancel]=\"isMobile && inMap\" (click)=\"showMenu()\">\u041E\u0442\u043C\u0435\u043D\u0430</div>\n      <div class=\"objects\" >\n            <realty-list [user] = user *ngIf=\"!inMap\" [getList]=\"data\" (inMap)=\"setOnMap($event)\"></realty-list>\n      <div>\n\n  ",
        styleUrls: ['app/pages/find-menu.css'],
        styles: ["\n     google-map{\n          position: absolute;\n          top: 0;\n          left: 0;\n          width: 100%;\n          height: 100%;\n          overflow-x: hidden;\n     }\n\n     realty-list{\n         left: 100%;\n         position: absolute;\n         width: 100%;\n         overflow-x: hidden;\n     }\n\n     .objects:after{\n         overflow: hidden;\n         height: 0;\n     }\n\n     .objects{\n         position: absolute;\n         margin-top: 100px;\n         width: 100%;\n     }\n\n     .hidden{\n         display:none;\n     }\n\n     .cancel{\n         height: 60px;\n         width: 400px;\n         background-color: rgb(56, 120, 199);\n         color: white;\n         line-height: 60px;\n         text-align: center;\n         font-size: 25pt;\n         display: inline-block;\n         cursor: pointer;\n         position: absolute;\n         top: calc(100% - 100px);\n         left: calc(50% - 200px);\n     }\n\n     .new_draw_button{\n         height: 60px;\n         width: 400px;\n         background-color: rgb(56, 120, 199);\n         color: white;\n         line-height: 60px;\n         text-align: center;\n         font-size: 25pt;\n         display: inline-block;\n         cursor: pointer;\n         position: absolute;\n         top: calc(100% - 165px);\n         left: calc(50% - 200px);\n     }\n\n     .activate{\n         background-color: rgb(197, 1, 1);\n     }\n"]
    }),
    __metadata("design:paramtypes", [])
], OwnerPageComponent);
exports.OwnerPageComponent = OwnerPageComponent;
//# sourceMappingURL=owner-page.component.js.map