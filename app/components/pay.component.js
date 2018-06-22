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
var PayPage = (function () {
    function PayPage(auth, route, router) {
        this.auth = auth;
        this.route = route;
        this.router = router;
        this.isInput = true;
        this.isReg = false;
    }
    PayPage.prototype.payment = function (summ) {
        if (this.auth.user) {
            this.auth.pay(summ);
        }
        else
            this.router.navigate(['/inter']);
    };
    PayPage.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            var params = _this.router.url.split("?")[1].split("&");
            if (params) {
                var x = [];
                for (var i = 0; i < params.length; ++i) {
                    var tar = params[i].split("=");
                    x.push([tar[0], tar[1]]);
                }
                if (x[0][0] == "isPaid") {
                    if (x[0][1] == "true")
                        alert("Ваш платеж успешно зачислен");
                    else if (x[0][1] == "false")
                        alert("Платеж не был осуществлен");
                }
            }
        }, 1500);
    };
    PayPage.prototype.soc_aut = function (type, event) {
        if (event.target.parentElement.getAttribute('disabled') == "false") {
        }
    };
    return PayPage;
}());
PayPage = __decorate([
    core_1.Component({
        selector: 'pay-page',
        template: "\n  <div class= \"inter-page\">\n    <div class='line'>\n        <div id='pay'><span>\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0430\u0440\u0438\u0444:</span>\n                <div (click)=\"payment(50)\"><div>1 \u0434\u0435\u043D\u044C</div>50</div>\n                <div (click)=\"payment(150)\"><div>3 \u0434\u043D\u044F</div>150</div>\n                <div (click)=\"payment(350)\"><div>1 \u043D\u0435\u0434\u0435\u043B\u044F</div>350</div>\n                <div (click)=\"payment(1500)\"><div>1 \u043C\u0435\u0441\u044F\u0446</div>1500</div>\n        </div>\n        <div >\u0414\u043B\u044F \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0430 \u0432 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0438\u043D\u0433\u043E\u0432\u044B\u0439 \u0446\u0435\u043D\u0442\u0440, \"\u0412\u0441\u043F\u043B\u044B\u0432\u0430\u044E\u0449\u0435\u0435 \u043E\u043A\u043D\u043E\" \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u0440\u0430\u0437\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D\u043E.\n\u0415\u0441\u043B\u0438 \u043F\u043E\u0441\u043B\u0435 \u0432\u044B\u0431\u043E\u0440\u0430 \u0442\u0430\u0440\u0438\u0444\u0430 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0434\u0438\u0442, \u0412\u0430\u043C \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0432\u043E\u0439\u0442\u0438 \u0432 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430 \u0438 \u0440\u0430\u0437\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C \"\u0412\u0441\u043F\u043B\u044B\u0432\u0430\u044E\u0449\u0435\u0435 \u043E\u043A\u043D\u043E\", \u0438\n\u043E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443.\n        </div>\n        <div><span>\u041E\u0441\u0442\u0430\u043B\u043E\u0441\u044C:</span>\n            <div>{{auth.getAuthUser()?.left_time?.days || \"00\"}} \u0434\u043D\u0435\u0439</div>\n            <div>{{auth.getAuthUser()?.left_time?.getTime() || \"00:00:00\"}}</div>\n        </div>\n    </div>\n</div>\n\n  ",
        styleUrls: ['app/pages/inter-page.css'],
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, router_1.ActivatedRoute, router_1.Router])
], PayPage);
exports.PayPage = PayPage;
//# sourceMappingURL=pay.component.js.map