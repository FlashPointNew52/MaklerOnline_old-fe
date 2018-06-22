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
var realty_1 = require("../classes/realty");
var Observable_1 = require("rxjs/Observable");
var user_service_1 = require("../services/user.service");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
var RealtyListService = (function () {
    function RealtyListService(http, autr) {
        this.http = http;
        this.autr = autr;
        this.Url = "http://import.rplusmgmt.com:19050/api/offer/search";
        this.UrlGet = "http://192.168.5.81:4567/api/v1/offer/get/";
        this.FavRealtes = [];
        this.FindRealtes = [];
    }
    RealtyListService.prototype.getList = function (query, page, typeCode) {
        var _this = this;
        if (query == '') {
            if (typeCode == '') {
                //console.log("Q1: "+this.Url+"?page="+page+"&per_page=10&api_key=18l8lIwH9r0D3777OR3E0W1t4Pu1r8oY");
                this.http.get(this.Url + "?query=&offer_type=rent&page=" + page + "&per_page=10").map(function (response) { return response.json(); })
                    .subscribe(function (data) { _this.extractData(data); }, function (error) { console.log("fff"); });
            }
            else {
                //console.log(this.Url+"?page="+page+"&per_page=10&filter={typeCode=\""+typeCode+"\"}");
                this.http.get(this.Url + "?page=" + page + "&per_page=10&api_key=18l8lIwH9r0D3777OR3E0W1t4Pu1r8oY&search_query=\"Квартира\"&filter={typeCode=\"" + typeCode + "\"}")
                    .map(function (response) { return response.json(); }).subscribe(function (data) { _this.extractData(data); });
            }
        }
        else {
            if (typeCode == '')
                this.http.get(this.Url + "?page=" + page + "&per_page=10&api_key=18l8lIwH9r0D3777OR3E0W1t4Pu1r8oY&search_query=\"" + query + "\"")
                    .map(function (response) { return response.json(); }).subscribe(function (data) { _this.extractData(data); });
            else
                this.http.get(this.Url + "?page=" + page + "&per_page=10&api_key=18l8lIwH9r0D3777OR3E0W1t4Pu1r8oY&search_query=\"" + query + "\"&filter={typeCode=\"" + typeCode + "\"}")
                    .map(function (response) { return response.json(); }).subscribe(function (data) { _this.extractData(data); });
        }
    };
    RealtyListService.prototype.getFavouriteList = function (idList) {
        var _this = this;
        var _loop_1 = function (i) {
            this_1.http.get(this_1.UrlGet + idList[i]).map(function (response) { return response.json(); }).subscribe(function (data) {
                if (data.response == "ok") {
                    var relt = new realty_1.Realty(data.result.id, data.result.typeCode || "не указано", data.result.locality || "не указано", data.result.address || "не указано", data.result.houseNum || "", data.result.district || "не указано", data.result.locationLat || undefined, data.result.locationLon || undefined, data.result.roomsCount || "не указано", data.result.ownerPrice || "не указано", data.result.floor || "-", data.result.floorsCount || "-", data.result.squareTotal || "не указано", data.result.conditionId || 0, data.result.balconyId || 0, data.result.description || "описание отсутствует", data.result.addDate || "не указано", data.result.photoUrl, (data.result.person) ? data.result.person.phones : []);
                    var have = false;
                    for (var i_1 = 0; i_1 < _this.FavRealtes.length; i_1++) {
                        if (_this.FavRealtes[i_1].id == relt.id)
                            have = true;
                    }
                    if (!have)
                        _this.FavRealtes.push(relt);
                }
                else {
                    _this.autr.editFavList(idList[i], false);
                }
            });
        };
        var this_1 = this;
        for (var i = 0; i < idList.length; ++i) {
            _loop_1(i);
        }
    };
    RealtyListService.prototype.extractData = function (data) {
        //console.log(data.result);
        if (data.response == "ok") {
            for (var i = 0; i < data.result.length; ++i) {
                this.FindRealtes.push(new realty_1.Realty(data.result[i].id, data.result[i].typeCode || "не указано", data.result[i].locality || "не указано", data.result[i].address || "не указано", data.result[i].houseNum || "", data.result[i].district || "не указано", data.result[i].locationLat, data.result[i].locationLon, data.result[i].roomsCount || "не указано", data.result[i].ownerPrice || "не указано", data.result[i].floor || "-", data.result[i].floorsCount || "-", data.result[i].squareTotal || "не указано", data.result[i].conditionId || 0, data.result[i].balconyId || 0, data.result[i].description || "описание отсутствует", data.result[i].addDate || "не указано", data.result[i].photoUrl || [], (data.result[i].person) ? data.result[i].person.phones : []));
            }
        }
        else { }
        ;
    };
    RealtyListService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw("");
    };
    return RealtyListService;
}());
RealtyListService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, user_service_1.UserService])
], RealtyListService);
exports.RealtyListService = RealtyListService;
//# sourceMappingURL=realty_list.service.js.map