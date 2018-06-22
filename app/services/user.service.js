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
var http_1 = require("@angular/http");
var user_1 = require("../classes/user");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
require("rxjs/Rx");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this._user = new BehaviorSubject_1.BehaviorSubject(undefined);
        this.baseUrl = "http://dev.zavrus.com";
    }
    UserService.prototype.getAuthUser = function () {
        return this.user;
    };
    UserService.prototype.getUser = function (email, password) {
        var _this = this;
        var options = new http_1.URLSearchParams();
        options.append('mail', email);
        options.append('pass', password);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var isGet;
        this.http.post(this.baseUrl + "/getUser", options.toString(), {
            headers: headers
        }).map(function (response) { return response.json(); }).subscribe(function (data) {
            console.log(data);
            if (data.result == "OK") {
                localStorage.setItem("session", data.session);
                _this.user = new user_1.User(data.id, data.name, data.time, [], data.favourite);
                _this.user.countTime();
                _this._user.next(_this.user);
            }
            else {
                _this._user.error("Not find email");
                _this._user = new BehaviorSubject_1.BehaviorSubject(undefined);
            }
        }, function (error) {
            console.log('Could not load todos.');
        });
    };
    UserService.prototype.setUser = function (user) {
        if (user) {
            this.user = user;
        }
        else {
            this.user = undefined;
        }
        this._user.next(this.user);
    };
    UserService.prototype.getSocUser = function (type) {
        if (type == "vk") {
            var form = document.createElement("form");
            document.body.appendChild(form);
            form.method = "GET";
            form.action = "https://oauth.vk.com/authorize";
            var inputs = [document.createElement("INPUT"),
                document.createElement("INPUT"),
                document.createElement("INPUT"),
                document.createElement("INPUT"),
                document.createElement("INPUT"),
                document.createElement("INPUT"),
                document.createElement("INPUT")];
            inputs[0].name = 'client_id';
            inputs[0].value = 5784298;
            inputs[1].name = 'display';
            inputs[1].value = "page";
            inputs[2].name = 'redirect_uri';
            inputs[2].value = "http://xn--b1adacaabaehsdbwnyeec1a7dwa0toa.xn--p1ai/#/inter";
            inputs[3].name = 'scope';
            inputs[3].value = "email";
            inputs[4].name = 'response_type';
            inputs[4].value = "token";
            inputs[5].name = 'v';
            inputs[5].value = 5.62;
            inputs[6].name = 'state';
            inputs[6].value = 123456;
            for (var i = 0; i < 7; ++i) {
                inputs[i].type = 'hidden';
                form.appendChild(inputs[i]);
            }
            form.submit();
        }
        return;
    };
    UserService.prototype.addUser = function (mail) {
        var options = new http_1.URLSearchParams();
        options.append('mail', mail);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(this.baseUrl + "/newUser", options.toString(), {
            headers: headers
        }).map(function (response) { return response.json(); });
    };
    UserService.prototype.newSession = function () {
        var _this = this;
        var options = new http_1.URLSearchParams();
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        if (localStorage.getItem("session")) {
            options.append("session", localStorage.getItem("session"));
            this.http.post(this.baseUrl + "/getSession", options.toString(), {
                headers: headers
            }).map(function (response) { return response.json(); }).subscribe(function (data) {
                //console.log(data);
                if (data.result == "Ok") {
                    _this.user = new user_1.User(data.id, data.name, data.time, [], data.favourite);
                    _this.user.countTime();
                    _this._user.next(_this.user);
                }
                else {
                    localStorage.removeItem('session');
                }
            }, function (error) {
                console.log('Could not load todos.');
            });
        }
    };
    UserService.prototype.clearPassword = function (email) {
        var options = new http_1.URLSearchParams();
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        options.append("email", email);
        this.http.post(this.baseUrl + "/updatePassword", options.toString(), {
            headers: headers
        }).map(function (response) { return response.json(); }).subscribe(function (data) {
            if (data.result == "OK") {
                alert("На указанный вами Email был отправлен новый пароль");
            }
            else if (data.Rison == "Not find user") {
                alert("Пользователь с таким Email не существует");
            }
            else
                alert("Ошибка: " + data.Reason);
        }, function (error) {
            console.log('Could not load todos.');
        });
    };
    UserService.prototype.closeSession = function () {
        var options = new http_1.URLSearchParams();
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        options.append("session", localStorage.getItem("session"));
        this.http.post(this.baseUrl + "/closeSession", options.toString(), {
            headers: headers
        }).map(function (response) { return response.json(); }).subscribe(function (data) {
            if (data.result == "Ok") {
                localStorage.removeItem('session');
            }
            else {
            }
        }, function (error) {
            console.log('Could not load todos.');
        });
    };
    UserService.prototype.pay = function (summ) {
        var options = new http_1.URLSearchParams();
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        options.append("userId", "" + this.user.id);
        options.append("summ", "" + summ);
        this.http.post(this.baseUrl + "/prePay", options.toString(), {
            headers: headers
        }).map(function (response) { return response.json(); }).subscribe(function (data) {
            var form = document.createElement("form");
            document.body.appendChild(form);
            form.method = "POST";
            form.action = "https://wl.walletone.com/checkout/checkout/Index";
            //form.target = "_blank";
            var inputs = [document.createElement("INPUT"),
                document.createElement("INPUT"),
                document.createElement("INPUT"),
                document.createElement("INPUT"),
                document.createElement("INPUT"),
                document.createElement("INPUT"),
                document.createElement("INPUT"),
                document.createElement("INPUT")];
            inputs[0].name = 'WMI_MERCHANT_ID';
            inputs[0].value = data.WMI_MERCHANT_ID;
            inputs[1].name = 'WMI_PAYMENT_NO';
            inputs[1].value = data.WMI_PAYMENT_NO;
            inputs[2].name = 'WMI_PAYMENT_AMOUNT';
            inputs[2].value = data.WMI_PAYMENT_AMOUNT;
            inputs[3].name = 'WMI_CURRENCY_ID';
            inputs[3].value = data.WMI_CURRENCY_ID;
            inputs[4].name = 'WMI_DESCRIPTION';
            inputs[4].value = "Оплата доступа на ЕженедельникНедвижимость.рф";
            inputs[5].name = 'WMI_SUCCESS_URL';
            inputs[5].value = data.WMI_SUCCESS_URL;
            inputs[6].name = 'WMI_FAIL_URL';
            inputs[6].value = data.WMI_FAIL_URL;
            inputs[7].name = 'WMI_SIGNATURE';
            inputs[7].value = data.WMI_SIGNATURE;
            for (var i = 0; i < 8; ++i) {
                inputs[i].type = 'hidden';
                form.appendChild(inputs[i]);
            }
            form.submit();
        }, function (error) {
            console.error(error);
        });
    };
    UserService.prototype.editFavList = function (id, add) {
        var _this = this;
        if (this.user) {
            var options = new http_1.URLSearchParams();
            options.append('userId', this.user.id.toString());
            options.append('reltyId', id.toString());
            options.append('isAdd', add.toString());
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            var isGet = void 0;
            this.http.post(this.baseUrl + "/editFavList", options.toString(), {
                headers: headers
            }).map(function (response) { return response.json(); }).subscribe(function (data) {
                if (data.result == "OK") {
                    //localStorage.setItem("session", data.session);
                    _this.user.favourite = data.newList;
                }
                else {
                }
            }, function (error) {
                console.log('Could not load todos.');
            });
        }
    };
    UserService.prototype.vkUser = function (params) {
        var _this = this;
        var options = new http_1.URLSearchParams();
        options.append('userId', params[2][1]);
        this.http.get(this.baseUrl + "/vkUser?" + options.toString())
            .map(function (response) { return response.json(); }).subscribe(function (data) {
            console.log(data);
            if (data.result == "OK") {
                if (data.isNew)
                    alert("Вы успешно зарегистрировались в системе");
                localStorage.setItem("session", data.session);
                _this.user = new user_1.User(data.id, data.name, data.time, [], data.favourite);
                _this.user.countTime();
                _this._user.next(_this.user);
            }
            else {
            }
        }, function (error) {
            console.log('Could not load todos.');
        });
    };
    UserService.prototype.extractData_get = function (res) {
        var body = res.json();
        var user;
        if (body.result == "OK") {
            return user = new user_1.User(body.id, body.name, body.time, [], body.favourite);
        }
        else {
            return user = undefined;
        }
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map