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
var LabPage = (function () {
    function LabPage() {
        this.fenotip = [];
        this.firstPopul = [];
        this.otborPopul = [];
        this.crossPopul = [];
        this.mutantPopul = [];
        this.rezultPopul = [];
    }
    LabPage.prototype.new = function () {
        this.firstPopul = [].concat(this.rezultPopul);
        this.otborPopul = [];
        this.crossPopul = [];
        this.mutantPopul = [];
        this.rezultPopul = [];
    };
    LabPage.prototype.ngOnInit = function () {
        for (var i = 0; i < 5; i++) {
            var val = (Math.floor(Math.random() * (15 - 0 + 1)) + 0).toString(2);
            val = "0000" + val;
            this.fenotip.push(val.substr(-4, 4));
        }
        for (var i = 0; i < 10; i++) {
            var val = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
            var val1 = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
            while (val == val1)
                val1 = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
            this.firstPopul.push({ osob: this.fenotip[val] + this.fenotip[val1], fitnes: 0 });
        }
    };
    LabPage.prototype.fitnes = function () {
        for (var i = 0; i < this.firstPopul.length; i++) {
            this.firstPopul[i].fitnes = this.fitnes_function(this.firstPopul[i].osob, this.firstPopul.length);
        }
    };
    LabPage.prototype.cross = function () {
        this.crossPopul = [];
        for (var i = 0; i < this.otborPopul.length; i += 2) {
            if (i + 1 != this.otborPopul.lenght)
                this.crossPopul = this.crossPopul.concat(this.cross_function(this.otborPopul[i], this.otborPopul[i + 1]));
        }
    };
    LabPage.prototype.getRezult = function () {
        this.rezultPopul = [].concat(this.mutantPopul);
        this.rezultPopul = this.rezultPopul.concat(this.otborPopul);
    };
    LabPage.prototype.fitnes_function = function (str, num) {
        var val = 0;
        for (var i = 0; i < str.length; ++i)
            val += parseInt(str.charAt(i));
        return Math.round(val / num * 1000) / 1000;
    };
    LabPage.prototype.otbor = function (popul) {
        var otborRezult = [];
        for (var i = 0; i < popul.length; i++) {
            var count = Math.floor(Math.random() * (popul.length - 2 - 2)) + 2;
            var indexes = [];
            for (var j = 0; j < count; j++) {
                var num = Math.floor(Math.random() * (popul.length - 0)) + 0;
                while (indexes.indexOf(num) > -1) {
                    num = Math.floor(Math.random() * (popul.length - 0)) + 0;
                }
                indexes.push(num);
            }
            var tempPopul = [];
            for (var _i = 0, indexes_1 = indexes; _i < indexes_1.length; _i++) {
                var ind = indexes_1[_i];
                tempPopul.push(popul[ind]);
            }
            tempPopul.sort(function (a, b) { return a.fitnes - b.fitnes; });
            var t = tempPopul.pop();
            otborRezult.push(t);
        }
        return otborRezult;
    };
    LabPage.prototype.cross_function = function (osob1, osob2) {
        var child1 = "";
        var child2 = "";
        var retArr = [];
        for (var i = 0; i < osob1.osob.length; ++i) {
            var ind = Math.floor(Math.random() * (2 - 0)) + 0;
            if (ind == 0) {
                child1 += osob1.osob.charAt(i);
                child2 += osob2.osob.charAt(i);
            }
            else {
                child1 += osob2.osob.charAt(i);
                child2 += osob1.osob.charAt(i);
            }
        }
        retArr.push({ osob: child1, fitnes: 0 });
        retArr.push({ osob: child2, fitnes: 0 });
        return retArr;
    };
    LabPage.prototype.mutation = function (pers, count) {
        var retArr = [];
        for (var i = 0; i < this.firstPopul.length; ++i) {
            var randomPercent = Math.floor(Math.random() * (100 - 0)) + 0;
            if (randomPercent <= pers) {
                var randpos = Math.floor(Math.random() * (9 - count - 0)) + 0;
                var subs = this.firstPopul[i].osob.substr(randpos, count);
                console.log(randpos);
                randpos = Math.floor(Math.random() * (this.firstPopul[i].osob.length - 0)) + 0;
                var temp = this.firstPopul[i].osob.substr(0, randpos) + this.firstPopul[i].osob.substr(randpos + count);
                temp += temp;
                console.log(this.firstPopul[i].osob, randpos, temp.substr(0, randpos), subs, temp.substr(randpos));
                retArr.push({ osob: (temp.substr(0, randpos - count) + subs + temp.substr(randpos)).substr(0, 8), fitnes: 0 });
            }
        }
        return retArr;
    };
    return LabPage;
}());
LabPage = __decorate([
    core_1.Component({
        selector: 'lab-page',
        template: "\n  <div class= \"lab-page\" style=\"margin-top: 100px;\">\n        <div (click)=\"fitnes()\" class=\"button\">\u041E\u0446\u0435\u043D\u0438\u0442\u044C</div>\n        <div (click)=\"otborPopul = [].concat(otbor(firstPopul));\" class=\"button\">\u041E\u0442\u043E\u0431\u0440\u0430\u0442\u044C</div>\n        <div (click)=\"cross()\" class=\"button\">\u0421\u043A\u0440\u0435\u0441\u0442\u0438\u0442\u044C</div>\n        <div (click)=\"mutantPopul = mutation(25, 3);\" class=\"button\">\u041C\u0443\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C</div>\n        <div (click)=\"getRezult()\" class=\"button\">\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442</div>\n        <div (click)=\"new()\" class=\"button\">\u041D\u043E\u0432\u043E\u0435 \u043F\u043E\u043A\u043E\u043B\u0435\u043D\u0438\u0435</div>\n<div>\n        <table style='float:left; margin-right: 20px;'>\n            <tr *ngFor=\"let fen of fenotip; let i=index\">\n                <td style=\"border: 1px solid;\">\u0424\u0435\u043D\u043E\u0442\u0438\u043F {{i+1}}</td>\n                <td style=\"border: 1px solid;\">{{fen}}</td>\n            </tr>\n        </table>\n        <table style='float:left; margin-right: 20px;'>\n            <tr>\n                <td style=\"border: 1px solid;\" colspan = \"3\">\u041F\u0440\u0438\u0441\u043F\u043E\u0441\u043E\u0431\u043B\u0435\u043D\u0438\u0435</td>\n            </tr>\n            <tr *ngFor=\"let pop of firstPopul; let i=index\">\n                <td style=\"border: 1px solid;\">\u041E\u0441\u043E\u0431\u044C {{i+1}}</td>\n                <td style=\"border: 1px solid;\">{{pop.osob}}</td>\n                <td style=\"border: 1px solid;\">{{pop.fitnes}}</td>\n            </tr>\n        </table>\n        <table style='float:left; margin-right: 20px;'>\n            <tr>\n                <td style=\"border: 1px solid;\" colspan = \"3\">\u041E\u0442\u0431\u043E\u0440 (\u0442\u0443\u0440\u043D\u0438\u0440\u043D\u044B\u0439)</td>\n            </tr>\n            <tr *ngFor=\"let pop of otborPopul; let i=index\">\n                <td style=\"border: 1px solid;\">\u041E\u0441\u043E\u0431\u044C {{i+1}}</td>\n                <td style=\"border: 1px solid;\">{{pop.osob}}</td>\n                <td style=\"border: 1px solid;\">{{pop.fitnes}}</td>\n            </tr>\n        </table>\n        <table style='float:left; margin-right: 20px;'>\n            <tr>\n                <td style=\"border: 1px solid;\" colspan = \"3\">\u0421\u043A\u0440\u0435\u0449\u0438\u0432\u0430\u043D\u0438\u0435(\u0440\u0430\u0432\u043D. \u043A\u0440\u043E\u0441\u0441\u043E\u0432\u0435\u0440)</td>\n            </tr>\n            <tr *ngFor=\"let pop of crossPopul; let i=index\">\n                <td style=\"border: 1px solid;\">\u041E\u0441\u043E\u0431\u044C {{i+1}}</td>\n                <td style=\"border: 1px solid;\">{{pop.osob}}</td>\n            </tr>\n        </table>\n\n        <table style='float:left; margin-right: 20px;'>\n            <tr>\n                <td style=\"border: 1px solid;\" colspan = \"3\">\u041C\u0443\u0442\u0430\u0446\u0438\u044F (\u0442\u0440\u0430\u043D\u0441\u043B {{25}}%)</td>\n            </tr>\n            <tr *ngFor=\"let pop of mutantPopul; let i=index\">\n                <td style=\"border: 1px solid;\">\u041E\u0441\u043E\u0431\u044C {{i+1}}</td>\n                <td style=\"border: 1px solid;\">{{pop.osob}}</td>\n            </tr>\n        </table>\n\n        <table style='float:left'>\n            <tr>\n                <td style=\"border: 1px solid;\" colspan = \"3\">\u0418\u0442\u043E\u0433 \u043F\u043E\u043A\u043E\u043B\u0435\u043D\u0438\u044F</td>\n            </tr>\n            <tr *ngFor=\"let pop of rezultPopul; let i=index\">\n                <td style=\"border: 1px solid;\">\u041E\u0441\u043E\u0431\u044C {{i+1}}</td>\n                <td style=\"border: 1px solid;\">{{pop.osob}}</td>\n            </tr>\n        </table>\n</div>\n  </div>\n\n  ",
        styles: ["\n    .button{\n        float: left;\n        border-style: outset;\n        margin: 0 10px;\n        padding: 0 10px;\n    }\n    div{\n        float: left;\n        margin: 30px 0 0 8px;\n    }\n"]
    }),
    __metadata("design:paramtypes", [])
], LabPage);
exports.LabPage = LabPage;
//# sourceMappingURL=lab-page.component.js.map