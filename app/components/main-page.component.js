"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var Titles = (function () {
    function Titles() {
    }
    return Titles;
}());
exports.Titles = Titles;
var Review = (function () {
    function Review() {
    }
    return Review;
}());
exports.Review = Review;
var Adds = (function () {
    function Adds() {
    }
    return Adds;
}());
exports.Adds = Adds;
window.addEventListener("orientationchange", function () {
    if (document.documentElement.clientWidth > 600) {
        if (MainPageComponent.char.length == 2)
            MainPageComponent.char = '0';
        else
            MainPageComponent.char = '00';
    }
}, false);
function getPersent() {
    if (document.documentElement.clientWidth < 600)
        return "" + (document.documentElement.clientWidth * 0.45) + "px";
    else
        return "35%";
}
var MainPageComponent = MainPageComponent_1 = (function () {
    function MainPageComponent() {
        this.isVisible = false;
        this.titles = [
            { icon: "src/icon_ok.png", text: "Никаких\xA0посредников. Никаких\xA0сложностей. Только\xA0недвижимость." },
            { icon: "src/sofa.png", text: "Занимайтесь своими делами, пока Ваш помощник занимается вашими. " },
            { icon: "src/list.png", text: "Самая большая база недвижимости. Нет\xA0смысла искать - Все уже здесь. " },
            { icon: "src/price2.png", text: "Простой и безопасный способ оплаты. " }
        ];
        this.dates = [
            { count: 89, text: "Объектов недвижимости поступило сегодня" },
            { count: 1538, text: "Объектов выставлено за прошедшую неделю" },
            { count: 101, text: "Заявок обработано" }
        ];
        this.reviews = [
            { photo: "src/Parfenova.jpg", job: "Специалист банковского дела", name: "Юлия Парфенова", state: MainPageComponent_1.char,
                text: "...Уже много знакомых и знакомые моих знакомых нашли через вас то, что искали!)))" },
            { photo: "src/Karol.jpg", job: "Ветеринар", name: "Григорий Кароль", state: '1',
                text: "От души! Приехал позвонил, заехал)))" },
            { photo: "src/Curnosov.jpg", job: "DJ - звукооператор", name: "Дмитрий Курносов", state: '2',
                text: "\u041E\u0442\u043B\u0438\u0447\u043D\u044B\u0439 \u0441\u0430\u0439\u0442, \u0445\u043E\u0442\u044C \u0435\u0449\u0435 \u0438 \u043D\u0435 \u0441\u043D\u044F\u043B \u043A\u0432\u0430\u0440\u0442\u0438\u0440\u0443, \u043D\u043E \u0432\u0441\u0435 \u0436\u0435... \u043E\u0431\u0437\u0432\u043E\u043D\u0438\u043B \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0439, \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u0438\u043B\u0441\u044F \u043D\u0430 \u0432\u0441\u0442\u0440\u0435\u0447\u0438,\n            \u0434\u0430\u0436\u0435 \u043D\u0435 \u0441\u043F\u0440\u043E\u0441\u0438\u043B\u0438 :\"\u0410 \u0432\u0430\u0441 \u043A\u0430\u043A\u0430\u044F \u043A\u0432\u0430\u0440\u0442\u0438\u0440\u0430 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0443\u0435\u0442?\". \u0423\u0440\u0430!!! \u041D\u0430\u043A\u043E\u043D\u0435\u0446 \u0442\u043E, \u043F\u043E\u044F\u0432\u0438\u043B\u0441\u044F \u0442\u0430\u043A\u043E\u0439 \u0441\u0430\u0439\u0442...\u0443 \u043C\u0435\u043D\u044F \u044D\u043C\u043E\u0446\u0438\u044F))\n            \u0411\u0443\u0434\u0443 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u043E\u0432\u0430\u0442\u044C)."
            }
        ];
    }
    MainPageComponent.prototype.nextReview = function (val) {
        var second = document.getElementsByClassName("review").item(1);
        var third = document.getElementsByClassName("review").item(2);
        var position = 0;
        if (!val) {
            for (var _i = 0, _a = this.reviews; _i < _a.length; _i++) {
                var rev = _a[_i];
                var stat = +rev.state;
                if (stat - 1 < 0)
                    rev.state = '2';
                else if ((stat - 1) == 0) {
                    rev.state = MainPageComponent_1.char;
                }
                else
                    rev.state = '' + (stat - 1);
            }
        }
        else {
            for (var _b = 0, _c = this.reviews; _b < _c.length; _b++) {
                var rev = _c[_b];
                var stat = +rev.state;
                if (stat + 1 > 2)
                    rev.state = MainPageComponent_1.char;
                else
                    rev.state = '' + (stat + 1);
            }
        }
    };
    return MainPageComponent;
}());
MainPageComponent.char = "00";
MainPageComponent = MainPageComponent_1 = __decorate([
    core_1.Component({
        animations: [
            core_1.trigger('isVisibleChanged', [
                core_1.state('2', core_1.style({ right: '100vw' })),
                core_1.state('00', core_1.style({ right: 'calc(50vw - ' + (document.documentElement.clientWidth * 0.45) + 'px)' })),
                core_1.state('0', core_1.style({ right: 'calc(50vw - 35%)' })),
                core_1.state('1', core_1.style({ right: '-100vw' })),
                core_1.transition('0 <=> 2', core_1.animate('500ms')),
                core_1.transition('00 <=> 2', core_1.animate('500ms')),
                core_1.transition('1 <=> 0', core_1.animate('500ms')),
                core_1.transition('1 <=> 00', core_1.animate('500ms')),
                core_1.transition('2 <=> 1', core_1.animate('0ms')),
            ])
        ],
        selector: 'main-page',
        templateUrl: 'app/pages/main-page.html',
        styleUrls: ['app/pages/main-page.css']
    })
], MainPageComponent);
exports.MainPageComponent = MainPageComponent;
var MainPageComponent_1;
//# sourceMappingURL=main-page.component.js.map