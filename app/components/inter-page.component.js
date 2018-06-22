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
var router_1 = require("@angular/router");
var InterPage = (function () {
    function InterPage(auth, route, router) {
        var _this = this;
        this.auth = auth;
        this.route = route;
        this.router = router;
        this.isInput = true;
        this.isReg = false;
        var path1 = router.url.split("#")[1];
        if (path1) {
            console.log(path1);
            var params = path1.split("&");
            var x_1 = [];
            for (var i = 0; i < params.length; ++i) {
                var tar = params[i].split("=");
                x_1.push([tar[0], tar[1]]);
            }
            if (x_1[0][0] != "error") {
                setTimeout(function () {
                    auth.vkUser(x_1);
                    _this.auth._user.subscribe(function (user) {
                        if (user) {
                            if (_this.auth.user.countTime()) {
                                _this.router.navigate(['/find']);
                            }
                            else {
                                _this.router.navigate(['/pay']);
                            }
                        }
                    });
                }, 250);
            }
        }
    }
    InterPage.prototype.ngOnInit = function () {
    };
    InterPage.prototype.inpReg = function (val) {
        if (val == 0) {
            this.isInput = true;
            this.isReg = false;
        }
        else {
            this.isInput = false;
            this.isReg = true;
        }
    };
    InterPage.prototype.input = function () {
        var _this = this;
        this.auth.getUser(document.getElementById("mail").getElementsByTagName('input').item(0).value, document.getElementById("pass").getElementsByTagName('input').item(0).value);
        this.auth._user.subscribe(function (user) {
            if (user) {
                alert("Вы успешно вошли в систему!");
                if (_this.auth.user.countTime()) {
                    _this.router.navigate(['/find']);
                }
                else {
                    _this.router.navigate(['/pay']);
                }
            }
        }, function (err) {
            if (err == "Not find email") {
                alert("Неверный email или пароль!");
            }
        });
    };
    InterPage.prototype.ngOnChanges = function () {
    };
    InterPage.prototype.soc_aut = function (type, event) {
        this.auth.getSocUser(type);
    };
    InterPage.prototype.registr = function () {
        var _this = this;
        this.auth.addUser(document.getElementById("mail").getElementsByTagName("input").item(0).value).subscribe(function (data) {
            if (data.result == "OK") {
                alert("Регистрация прошла успешно. На указанный вами e-mail отправлен пароль для входа в систему.");
                _this.inpReg(0);
            }
            else
                alert("Указанные вами данные уже зарегестрированы в системе!");
        }, function (error) {
        });
    };
    InterPage.prototype.forgot = function () {
        if (document.getElementById("mail").getElementsByTagName("input").item(0).value)
            this.auth.clearPassword(document.getElementById("mail").getElementsByTagName("input").item(0).value);
        else
            alert("Email не указан");
    };
    return InterPage;
}());
InterPage = __decorate([
    core_1.Component({
        selector: 'inter-page',
        template: "\n    <div class= \"inter-page\">\n    <div class = 'line1'>\n        <div >\n            <div><span [class.active] = \"isInput\" (click)=\"inpReg(0)\">\u0412\u0445\u043E\u0434</span><hr><span [class.active] = \"isReg\" (click)=\"inpReg(1)\">\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F</span></div>\n            <div id=\"soc\" *ngIf=\"!isPay\"><span *ngIf=\"isInput\">\u0412\u043E\u0439\u0442\u0438 \u0447\u0435\u0440\u0435\u0437:</span><span *ngIf=\"isReg\">\u0412\u043E\u0439\u0442\u0438 \u0447\u0435\u0440\u0435\u0437:</span>\n                <div style='background-image: url(src/google-dis.png)' (click)=\"soc_aut('google', $event)\"></div>\n                <div style='background-image: url(src/facebook-dis.png)'></div>\n                <div style='background-image: url(src/twitter-dis.png)'></div>\n                <div style='background-image: url(src/VK-dis.png)' (click)=\"soc_aut('vk', $event)\"></div>\n                <div style='background-image: url(src/ok-dis.png)'></div>\n            </div>\n            <div  id='mail' ><span>\u0412\u0430\u0448 Email:</span><input type=\"email\" ></div>\n            <div  id='pass' *ngIf=\"isInput\"><span>\u041A\u043E\u0434 \u0434\u043E\u0441\u0442\u0443\u043F\u0430:</span><input type=\"password\"> </div>\n            <div class=\"button1\" *ngIf=\"isInput\" (click)=\"forgot()\">\u0417\u0430\u0431\u044B\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C?</div>\n            <div class=\"button\" *ngIf=\"isInput\" (click)=\"input()\">\u0414\u0430\u043B\u0435\u0435</div> <div class=\"button\" *ngIf=\"isReg\" (click)=\"registr()\">\u0414\u0430\u043B\u0435\u0435</div>\n        </div>\n    </div>\n    </div>\n\n  ",
        styleUrls: ['app/pages/inter-page.css'],
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, router_1.ActivatedRoute, router_1.Router])
], InterPage);
exports.InterPage = InterPage;
//# sourceMappingURL=inter-page.component.js.map