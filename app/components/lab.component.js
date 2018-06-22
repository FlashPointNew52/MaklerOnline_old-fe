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
    }
    PayPage.prototype.ngOnInit = function () {
    };
    return PayPage;
}());
PayPage = __decorate([
    core_1.Component({
        selector: 'lab-page',
        template: "\n  <div class= \"lab-page\">\n\n</div>\n\n  ",
        styleUrls: ['app/pages/inter-page.css'],
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, router_1.ActivatedRoute, router_1.Router])
], PayPage);
exports.PayPage = PayPage;
//# sourceMappingURL=lab.component.js.map