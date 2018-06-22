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
var Titles = (function () {
    function Titles() {
    }
    return Titles;
}());
exports.Titles = Titles;
var Rate = (function () {
    function Rate() {
    }
    return Rate;
}());
exports.Rate = Rate;
var ViewPanel = ViewPanel_1 = (function () {
    function ViewPanel(auth) {
        this.auth = auth;
        this.option = '1';
        this.menu_icon = [
            "src/icons/photer",
            "src/icons/map",
            "src/icons/360",
            "src/icons/near",
            "src/icons/statistic"
        ];
        this.rate = [
            { persent: 10, text: "Сообщества и безопасность", isRated: false },
            { persent: 25, text: "Развлечения и ночная жизнь", isRated: true },
            { persent: 50, text: "Парки, кинотеатры и отдых", isRated: false },
            { persent: 75, text: "Рестораны и шопинг", isRated: false },
            { persent: 90, text: "Школы и общественные услуги", isRated: false },
            { persent: 100, text: "Транспорт и путешествия", isRated: false },
        ];
        this.mainRate = this.countMainRate();
        this.select_icon = this.menu_icon[0];
        this.curren_photo = 0;
        this.fasilities = [
            { icon: "src/icons/TV.png", text: "Телевизор" },
            { icon: "src/icons/bed.png", text: "Спальное место" },
            { icon: "src/icons/microwaveoven.png", text: "СВЧ печь" },
            { icon: "src/icons/condition.png", text: "Кондиционер" },
            { icon: "src/icons/furniture.png", text: "Мебель" },
            { icon: "src/icons/refreger.png", text: "Холодильник" },
            { icon: "src/icons/wi-fi_disable.png", text: "Интернет" },
            { icon: "src/icons/washer.png", text: "Стиральная машина" },
        ];
    }
    Object.defineProperty(ViewPanel.prototype, "update", {
        set: function (tr) {
            this.onOption('1');
            this.curren_photo = 0;
            this.select_icon = this.menu_icon[0];
            this.realty_object = tr;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ViewPanel.prototype.countMainRate = function () {
        var temp = 0;
        for (var i = 0; i < this.rate.length; i++) {
            temp += this.rate[i].persent;
        }
        return Math.round(temp / this.rate.length * 100) / 100;
    };
    ViewPanel.prototype.chartDraw = function () {
        /*google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(draw);
        function draw(){
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Topping');
            data.addColumn('number', 'Slices', );
            data.addRows([
                    ['Квартир от 15-18 тыс:', 5 ],
                    ['Квартир от 18-21 тыс:', 4 ],
                    ['Квартир от 21-24 тыс:', 10 ],
                    ['Квартир от 24-27 тыс:', 5 ],
                    ['Квартир от 27-30 тыс:', 1]
                ]);

                // Set chart options
            var options = {
                    'backgroundColor': 'transparent',
                    'pieHole': 0.68,
                    'pieSliceText': 'none',
                    'legend': 'none',
                    'pieSliceBorderColor' : 'transparent',
                    'chartArea': {'width': '90%', 'height': '90%'},
                    'colors': ['#dc3912','#3366cc','#854fb0','#109618','#ff9900'],
                    'tooltip': { 'textStyle': { 'fontName': 'Open Sans', 'fontSize': 12 } }
                };
            var container = document.getElementById('chart_div');
            var chart = new google.visualization.PieChart(container);
            chart.draw(data, options);
        }*/
    };
    ViewPanel.prototype.onOption = function (val) {
        var _this = this;
        this.option = val;
        var icon = [].slice.call(this.menu_icon);
        var arr = [].slice.call(document.getElementsByClassName('map_menu').item(0).getElementsByTagName('li'));
        arr.forEach(function (item, i, arr) {
            if (i == +val - 1)
                item.style.setProperty('background-image', "url(\'" + icon[+val - 1] + "_active.png\')");
            else
                item.style.setProperty('background-image', "url(\'" + icon[i] + ".png\')");
        });
        if (this.option == '2') {
            this.onMap();
        }
        else if (this.option == '3') {
            ViewPanel_1.map = null;
            this.onPanaram();
        }
        else if (this.option == '4') {
            this.onInMap();
        }
        else if (this.option == '5') {
            var timeoutId = setTimeout(function () {
                _this.chartDraw();
            }, 100);
            ViewPanel_1.map = null;
        }
        else {
            ViewPanel_1.map = null;
        }
    };
    ViewPanel.prototype.inRate = function (event, i) {
        if (i == null) {
            var array = event.currentTarget.getElementsByClassName('rate_line');
            for (var i = 0; i < array.length; ++i) {
                if (this.rate[i].isRated) {
                    array.item(i).getElementsByTagName('div').item(0).style.setProperty('background-image', 'url(src/icons/star_rate.png)');
                    array.item(i).getElementsByTagName('div').item(1).style.setProperty('background-image', 'url(src/icons/star_active.png)');
                }
                else {
                    array.item(i).getElementsByTagName('div').item(1).style.setProperty('background-image', 'url()');
                    array.item(i).getElementsByTagName('div').item(0).style.setProperty('background-image', 'url(src/icons/star_rate_disabled.png)');
                }
            }
        }
        else if (!this.rate[i].isRated) {
            var from = event.target.getBoundingClientRect().left;
            var realx = event.clientX - from;
            var percent = Math.round(realx * 100 / 101);
            event.currentTarget.getElementsByTagName("div").item(0).style.setProperty('width', percent + '%');
            event.currentTarget.getElementsByTagName("div").item(0).style.setProperty('background-image', 'url(src/icons/star_active.png)');
        }
        else {
            event.currentTarget.getElementsByTagName("div").item(0).style.setProperty('background-image', 'url(src/icons/star_active.png)');
            event.currentTarget.getElementsByTagName("div").item(0).style.setProperty('width', this.rate[i].persent + '%');
        }
    };
    ViewPanel.prototype.estimate = function (event, i) {
        if (!this.rate[i].isRated) {
            var from = event.target.getBoundingClientRect().left;
            var realx = event.clientX - from;
            var percent = Math.round(realx * 100 / 101);
            this.rate[i].isRated = true;
            this.rate[i].persent = percent;
            this.inRate(event);
        }
    };
    ViewPanel.prototype.outRate = function (event, j) {
        if (j == null) {
            var array = event.currentTarget.getElementsByClassName('rate_line');
            for (var i = 0; i < array.length; ++i) {
                array.item(i).getElementsByTagName('div').item(1).style.setProperty('width', this.rate[i].persent + '%');
                array.item(i).getElementsByTagName('div').item(1).style.setProperty('background-image', 'url(src/icons/star_active.png)');
                array.item(i).getElementsByTagName('div').item(0).style.setProperty('background-image', 'url(src/icons/star_rate.png)');
            }
        }
        else if (!this.rate[j].isRated) {
            event.currentTarget.getElementsByTagName("div").item(0).style.setProperty('width', 0 + '%');
        }
    };
    ViewPanel.prototype.onLoading = function (event) {
        if (!event) {
        }
        else {
            if (event.currentTarget.naturalWidth > event.currentTarget.naturalHeight) {
                var parW = document.documentElement.clientWidth - 825;
                var parH = 500;
                if (parH / parW < 0.66 && event.currentTarget.naturalHeight / event.currentTarget.naturalWidth > 0.5) {
                    event.currentTarget.style.removeProperty('width', '100%');
                    event.currentTarget.style.setProperty('height', '100%');
                }
                else {
                    event.currentTarget.style.removeProperty('height', '100%');
                    event.currentTarget.style.setProperty('width', '100%');
                }
            }
            else {
                event.currentTarget.style.removeProperty('width', '100%');
                event.currentTarget.style.setProperty('height', '100%');
            }
        }
    };
    ViewPanel.prototype.photo = function (val) {
        if ((this.curren_photo + val) > -1 && (this.curren_photo + val) < this.realty_object.photos.length) {
            this.curren_photo = this.curren_photo + val;
        }
    };
    ViewPanel.prototype.onMap = function () {
        var _this = this;
        setTimeout(function () {
            ViewPanel_1.infoWindow = new google.maps.InfoWindow();
            var latlng = new google.maps.LatLng(_this.realty_object.lat, _this.realty_object.lon);
            var settings = {
                zoom: 16,
                center: latlng,
                mapTypeControl: true,
                mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU },
                navigationControl: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                streetViewControl: false,
            };
            var infowindow = new google.maps.InfoWindow();
            ViewPanel_1.map = new google.maps.Map(document.getElementsByClassName("map").item(0), settings);
            var companyMarker = new google.maps.Marker({
                position: latlng,
                map: ViewPanel_1.map,
                icon: 'src/icons/googleTarget_main.png'
            });
            ViewPanel_1.objectMarker = companyMarker;
            ////for (var i = 0; i < ViewPanel.markers.length; i++) {
            //    ViewPanel.markers[i].setMap(null);
            //}
        }, 100);
    };
    ViewPanel.prototype.onPanaram = function () {
        var _this = this;
        setTimeout(function () {
            var latlng = new google.maps.LatLng(_this.realty_object.lat, _this.realty_object.lon);
            var settings = {
                position: latlng,
            };
            var map = new google.maps.StreetViewPanorama(document.getElementsByClassName("panaram").item(0), settings);
        }, 200);
    };
    ViewPanel.prototype.onInMap = function () {
        if (!ViewPanel_1.map) {
            this.onMap();
        }
        setTimeout(this.f1, 100);
    };
    ViewPanel.prototype.f1 = function () {
        ViewPanel_1.map.setOptions({ mapTypeControl: false });
        ViewPanel_1.map.addListener('dragend', function (event) {
            var params = document.getElementsByName('params');
            for (var i = 0; i < params.length; i++) {
                if (params[i].checked) {
                    for (var p = 0; p < 8; p++) {
                        if (params[i].placeholder == Object.keys(ViewPanel_1.markers)[p]) {
                            ViewPanel_1.addMarkers1(params[i].value, params[i].placeholder);
                        }
                    }
                }
            }
        });
        ViewPanel_1.map.addListener('zoom_changed', function (event) {
            var params = document.getElementsByName('params');
            for (var i = 0; i < params.length; i++) {
                if (params[i].checked) {
                    for (var p = 0; p < 8; p++) {
                        if (params[i].placeholder == Object.keys(ViewPanel_1.markers)[p]) {
                            ViewPanel_1.addMarkers1(params[i].value, params[i].placeholder);
                        }
                    }
                }
            }
        });
        ViewPanel_1.map.addListener('click', function (event) {
            if (ViewPanel_1.onDirect) {
                var directionsService = new google.maps.DirectionsService();
                ViewPanel_1.directionMarker = event.latLng;
                if (ViewPanel_1.directionsDisplay_drive != null) {
                    ViewPanel_1.directionsDisplay_drive.setMap(null);
                    ViewPanel_1.directionsDisplay_drive = null;
                    ViewPanel_1.directionsDisplay_walk.setMap(null);
                    ViewPanel_1.directionsDisplay_walk = null;
                }
                var request = {
                    origin: new google.maps.LatLng(48.480015, 135.100237),
                    destination: ViewPanel_1.directionMarker,
                    travelMode: google.maps.TravelMode.WALKING
                };
                var request1 = {
                    origin: new google.maps.LatLng(48.480015, 135.100237),
                    destination: ViewPanel_1.directionMarker,
                    travelMode: google.maps.TravelMode.DRIVING
                };
                var walk_time;
                var walk_dir;
                ViewPanel_1.directionsDisplay_walk = new google.maps.DirectionsRenderer({ polylineOptions: { strokeColor: "#6fba33" } });
                ViewPanel_1.directionsDisplay_walk.setMap(ViewPanel_1.map);
                ViewPanel_1.directionsDisplay_drive = new google.maps.DirectionsRenderer({ polylineOptions: { strokeColor: "#6bb1f7" } });
                ViewPanel_1.directionsDisplay_drive.setMap(ViewPanel_1.map);
                directionsService.route(request, function (result, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        ViewPanel_1.directionsDisplay_walk.setDirections(result);
                        walk_dir = result.routes[0].legs[0].distance.text;
                        walk_time = result.routes[0].legs[0].duration.text;
                    }
                });
                setTimeout(function () {
                    var style = "width: 30px;height: 30px;background-size: 20px;background-repeat: no-repeat;border-radius: 50px;" +
                        "background-position: center; float: left;";
                    directionsService.route(request1, function (result, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            ViewPanel_1.directionsDisplay_drive.setDirections(result);
                            ViewPanel_1.infoWindow.setContent('<p>' + result.routes[0].legs[0].end_address + '</p>' +
                                "<div style='display: flex; flex-wrap: wrap; height: 70px;'>" +
                                "<div style='width: 100%; line-height: 30px;'>" +
                                "<div style='background-image: url(src/icons/walk.png); background-color: #93cb65; " + style + "'></div>" +
                                walk_dir + " (" + walk_time + ")</div>" +
                                "<div style='width: 100%; line-height: 30px;'>" +
                                "<div style='background-image: url(src/icons/car.png); background-color: #6bb1f7; " + style + "'></div>" +
                                result.routes[0].legs[0].distance.text + " (" + result.routes[0].legs[0].duration.text + ") </div>" +
                                "</div>");
                            ViewPanel_1.infoWindow.setOptions({ maxWidth: 200 });
                            ViewPanel_1.infoWindow.setPosition(result.routes[0].legs[0].end_location);
                            ViewPanel_1.infoWindow.open(ViewPanel_1.map);
                        }
                    });
                }, 300);
            }
        });
    };
    ViewPanel.prototype.addMarkers = function (elem, event) {
        if (event.target.checked) {
            ViewPanel_1.onParam = true;
            var request = {
                bounds: ViewPanel_1.map.getBounds(),
                keyword: event.target.value
            };
            if (!ViewPanel_1.service)
                ViewPanel_1.service = new google.maps.places.PlacesService(ViewPanel_1.map);
            ViewPanel_1.service.radarSearch(request, function (results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        var placeLoc = results[i].geometry.location;
                        ViewPanel_1.addMarker(new google.maps.Marker({
                            map: ViewPanel_1.map,
                            position: results[i].geometry.location,
                            icon: 'src/icons/googleTarget.png'
                        }), results[i], elem, ViewPanel_1.service);
                    }
                }
            });
        }
        else {
            ViewPanel_1.onParam = false;
            for (var i = 0; i < ViewPanel_1.markers[elem].length; i++) {
                ViewPanel_1.markers[elem][i].setMap(null);
            }
        }
    };
    ViewPanel.addMarker = function (elem, rez, arr, serv) {
        ViewPanel_1.markers[arr].push(elem);
        google.maps.event.addListener(elem, 'mouseover', function () {
            serv.getDetails(rez, function (result, status) {
                if (status !== google.maps.places.PlacesServiceStatus.OK) {
                    console.error(status);
                    return;
                }
                ViewPanel_1.infoWindow.setContent(result.name);
                ViewPanel_1.infoWindow.open(ViewPanel_1.map, elem);
            });
        });
    };
    ViewPanel.addMarkers1 = function (elem, name) {
        var request = {
            bounds: ViewPanel_1.map.getBounds(),
            //radius: '500',
            keyword: elem
        };
        ViewPanel_1.service.radarSearch(request, callback);
        function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK && ViewPanel_1.onParam) {
                for (var i = 0; i < results.length; i++) {
                    var isTo = -1;
                    for (var j = 0; j < ViewPanel_1.markers[name].length; ++j) {
                        if (results[i].geometry.location.equals(ViewPanel_1.markers[name][j].getPosition())) {
                            if (!ViewPanel_1.markers[name][j].getMap())
                                ViewPanel_1.markers[name][j].setMap(ViewPanel_1.map);
                            isTo = j;
                            break;
                        }
                    }
                    if (isTo == -1) {
                        ViewPanel_1.addMarker(new google.maps.Marker({
                            map: ViewPanel_1.map,
                            position: results[i].geometry.location,
                            icon: 'src/icons/googleTarget.png'
                        }), results[i], name, ViewPanel_1.service);
                    }
                }
                var is = [];
                for (var i = 0; i < results.length; i++) {
                    for (var j = 0; j < ViewPanel_1.markers[name].length; ++j) {
                        if (results[i].geometry.location.equals(ViewPanel_1.markers[name][j].getPosition())) {
                            if (is.indexOf(j) == -1)
                                is.push(j);
                            break;
                        }
                    }
                }
                for (var i = 0; i < ViewPanel_1.markers[name].length; ++i) {
                    var tr = -1;
                    for (var j = 0; j < is.length; ++j) {
                        if (i == is[j]) {
                            tr = 0;
                            break;
                        }
                    }
                    if (tr == -1) {
                        ViewPanel_1.markers[name][i].setMap(null);
                    }
                }
            }
        }
    };
    ViewPanel.prototype.addDirection = function (event) {
        if (event.target.checked) {
            ViewPanel_1.onDirect = true;
        }
        else {
            ViewPanel_1.onDirect = false;
            ViewPanel_1.directionsDisplay_walk.setMap(null);
            ViewPanel_1.directionsDisplay_drive.setMap(null);
            ViewPanel_1.infoWindow.close();
        }
    };
    ViewPanel.prototype.hide_object = function (event) {
        var panel = event.currentTarget.parentElement.parentElement;
        console.log(panel);
        panel.parentElement.parentElement.appendChild(panel);
        var elem = event.currentTarget.parentElement.parentElement.parentElement.getElementsByClassName('hide').item(0);
        if (elem) {
            panel.parentElement.parentElement.appendChild(elem);
        }
    };
    return ViewPanel;
}());
ViewPanel.markers = { 'School': [], 'Children': [], 'Hospital': [], 'Bars': [], 'Parks': [], 'Sport': [], 'Helth': [], 'Shops': [] };
ViewPanel.onDirect = false;
ViewPanel.onParam = false;
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ViewPanel.prototype, "update", null);
ViewPanel = ViewPanel_1 = __decorate([
    core_1.Component({
        inputs: [
            "user"
        ],
        selector: 'view-panel',
        template: "\n    <div class=\"left\">\n        <div class=\"photo\" >\n            <div *ngIf=\"option == 1\">\n                <div class=\"preview\" (click)=\"photo(-1)\"></div>\n                <img class='blur' src=\"{{realty_object.photos[curren_photo]}}\" (load)=\"onLoading()\">\n                <img class=\"img_cont\" src=\"{{realty_object.photos[curren_photo]}}\" (load)=\"onLoading($event)\">\n                <div class=\"next\" (click)=\"photo(1)\" ></div>\n            </div>\n            <div class=\"map\" *ngIf=\"option == 2 || option == 4 || option == 3\"> </div>\n            <div class='panaram' [class.disable]=\"option != 3\" ></div>\n            <div class='find_options' *ngIf=\"option == 4\">\n                <label><input type=\"checkbox\" name=\"params\" placeholder=\"School\" value=\"\u0428\u043A\u043E\u043B\u044B\" (click)=\"addMarkers('School', $event)\"/>\u0428\u043A\u043E\u043B\u044B</label>\n                <label><input type=\"checkbox\" name=\"params\" placeholder=\"Children\" value=\"\u0414\u0435\u0442\u0441\u043A\u0438\u0435 \u0441\u0430\u0434\u044B\" (click)=\"addMarkers('Children', $event)\"/>\u0414\u0435\u0442\u0441\u043A\u0438\u0435 \u0441\u0430\u0434\u044B</label>\n                <label><input type=\"checkbox\" name=\"params\" placeholder=\"Hospital\" value=\"\u041F\u043E\u043B\u0438\u043A\u043B\u0438\u043D\u0438\u043A\u0438\" (click)=\"addMarkers('Hospital', $event)\"/>\u041F\u043E\u043B\u0438\u043A\u043B\u0438\u043D\u0438\u043A\u0438</label>\n                <label><input type=\"checkbox\" name=\"params\" placeholder=\"Bars\" value=\"\u0420\u0435\u0441\u0442\u043E\u0440\u0430\u043D\u044B \u0411\u0430\u0440\u044B\" (click)=\"addMarkers('Bars', $event)\"/>\u0420\u0435\u0441\u0442\u043E\u0440\u0430\u043D\u044B/\u0411\u0430\u0440\u044B</label>\n                <label><input type=\"checkbox\" name=\"params\" placeholder=\"Helth\" value=\"\u041E\u0437\u0434\u043E\u0440\u043E\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0446\u0435\u043D\u0442\u0440\u044B\" (click)=\"addMarkers('Helth', $event)\"/>\u041E\u0437\u0434\u043E\u0440\u043E\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0446\u0435\u043D\u0442\u0440\u044B</label>\n                <label><input type=\"checkbox\" name=\"params\" placeholder=\"Parks\" value=\"\u041F\u0430\u0440\u043A\u0438 \u043E\u0442\u0434\u044B\u0445\" (click)=\"addMarkers('Parks', $event)\"/>\u041F\u0430\u0440\u043A\u0438/\u043E\u0442\u0434\u044B\u0445</label>\n                <label><input type=\"checkbox\" name=\"params\" placeholder=\"Sport\" value=\"\u0421\u043F\u043E\u0440\u0442\u0437\u0430\u043B\u044B\" (click)=\"addMarkers('Sport', $event)\"/>\u0421\u043F\u043E\u0440\u0442\u0437\u0430\u043B\u044B</label>\n                <label><input type=\"checkbox\" name=\"params\" placeholder=\"Shops\" value=\"\u041C\u0430\u0433\u0430\u0437\u0438\u043D\u044B\" (click)=\"addMarkers('Shops', $event)\"/>\u041C\u0430\u0433\u0430\u0437\u0438\u043D\u044B</label>\n                <label><input type=\"checkbox\" name=\"direct\" (click)=\"addDirection($event)\"/>\u041C\u0430\u0440\u0448\u0440\u0443\u0442\u044B<label>\n                                        \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043C\u0435\u0441\u0442\u043E \u043D\u0430 \u043A\u0430\u0440\u0442\u0435</label></label>\n            </div>\n            <div class='statistic' *ngIf='option == 5'>\n\n                <div>\n                    <div>\n                        <div>\u041E\u0411\u0429\u0410\u042F \u041E\u0426\u0415\u041D\u041A\u0410:</div>\n                        <div class=\"rate_line\" >\n                            <div><div [ngStyle]=\"{'width': mainRate+'%'}\"></div></div>\n                            <div>\u0412\u044B\u0448\u0435 \u0441\u0440\u0435\u0434\u043D\u0435\u0433\u043E - {{mainRate}}%</div>\n                        </div>\n                    </div>\n                    <div>\n                        <div>\u0426\u0415\u041D\u042B \u0412 \u041B\u041E\u041A\u0410\u0426\u0418\u0418:</div>\n                        <div><span>\u041C\u0418\u041D. &nbsp;\u0446\u0435\u043D\u0430</span><span>23000 &#8381;</span></div>\n                        <div><span>\u041C\u0410\u041A\u0421. \u0446\u0435\u043D\u0430</span><span>38000 &#8381;</span></div>\n                    </div>\n                </div>\n                <hr>\n                <div on-mouseenter='inRate($event)' on-mouseleave='outRate($event)'>\n                    <div>\u041E\u0426\u0415\u041D\u041A\u0410 \u041A\u0410\u0422\u0415\u0413\u041E\u0420\u0418\u0419:</div>\n                    <div class=\"rate_line\" *ngFor=\"let rat of rate; let i = index\">\n                            <div on-mousemove ='inRate($event, i)' on-mouseout='outRate($event, i)' on-click='estimate($event,i)'><div [ngStyle]=\"{'width': rat.persent+'%'}\"></div></div>\n                        <div>{{rat.text}}</div>\n                    </div>\n                    <span>\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435, \u0432\u0430\u0448 \u0433\u043E\u043B\u043E\u0441 \u0431\u0443\u0434\u0435\u0442 \u0443\u0447\u0442\u0435\u043D \u0442\u043E\u043B\u044C\u043A\u043E \u043E\u0434\u0438\u043D \u0440\u0430\u0437.</span>\n                </div>\n                <div>\n                        <div class='circle' id='chart_div'></div>\n                        <div> 30500 &#8381;</div><div>\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u0446\u0435\u043D\u0430</div>\n                        <div>\n                            <div><div style='background-color: #dc3912'></div> \u043E\u0442 15000 \u0434\u043E 18000 \u0440\u0443\u0431</div>\n                            <div><div style='background-color: #3366cc'></div> \u043E\u0442 18000 \u0434\u043E 21000 \u0440\u0443\u0431</div>\n                            <div><div style='background-color: #854fb0'></div> \u043E\u0442 21000 \u0434\u043E 24000 \u0440\u0443\u0431</div>\n                            <div><div style='background-color: #109618'></div> \u043E\u0442 24000 \u0434\u043E 27000 \u0440\u0443\u0431</div>\n                            <div><div style='background-color: #ff9900'></div> \u043E\u0442 27000 \u0434\u043E 30000 \u0440\u0443\u0431</div>\n                        </div>\n                </div>\n            </div>\n        </div>\n        <ul class= 'map_menu'>\n            <li (click)=\"onOption('1')\" [class.active]=\"option == 1\" style='background-image: url(src/icons/photer_active.png)'></li><hr>\n            <li (click)=\"onOption('2')\" [class.active]=\"option == 2\" style='background-image: url(src/icons/map.png)'></li><hr>\n            <li (click)=\"onOption('3')\" [class.active]=\"option == 3\" style='background-image: url(src/icons/360.png)'></li><hr>\n            <li (click)=\"onOption('4')\" [class.active]=\"option == 4\" style='background-image: url(src/icons/near.png)'></li><hr>\n            <li (click)=\"onOption('5')\" [class.active]=\"option == 5\" style='background-image: url(src/icons/statistic.png)'></li><hr>\n            <div *ngIf=\"option == 1\">\u0424\u043E\u0442\u043E {{curren_photo+1}}/{{realty_object.photos.length}}</div>\n        </ul>\n    </div>\n    <div class = 'right'>\n        <div class='middle'>\n            <span>{{realty_object.realty_type}}</span>\n            <span>{{realty_object.address}}</span>\n            <span>{{realty_object.district}}</span>\n            <div class=\"describe\">\n                <div><span>\u041A\u043E\u043C\u043D\u0430\u0442</span><span> {{realty_object.rooms}}</span></div>\n                <div><span>\u042D\u0442\u0430\u0436</span><span> {{realty_object.floor}} \u0438\u0437 {{realty_object.floors}}</span></div>\n                <div><span>\u0411\u0430\u043B\u043A\u043E\u043D/\u043B\u043E\u0434\u0436\u0438\u044F</span><span> {{realty_object.balcony}}</span></div>\n                <div><span>\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435</span><span> {{realty_object.condition}}</span></div>\n                <div><span>\u041F\u043B\u043E\u0449\u0430\u0434\u044C</span><span> {{realty_object.squere}}</span></div>\n                <div><span>\u041D\u0430\u0441\u0435\u043B\u0435\u043D\u043D\u044B\u0439 \u043F\u0443\u043D\u043A\u0442</span><span> {{realty_object.locale}}</span></div>\n            </div>\n            <div class=\"desc\">{{realty_object.describe}}</div>\n            <div><span>\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E</span><span> {{realty_object.date}}</span></div>\n        </div>\n        <div class=\"price_div\">\n            <div>\n                <div class='price'>{{realty_object.price}} 000 &#8381;</div>\n                <div class = \"terms\" style='background-image: url(src/icons/lamp.png)'></div>\n                <div class = \"terms\" style='background-image: url(src/icons/counter.png)'></div>\n                <div class = \"terms\" style='background-image: url(src/icons/comun_paid.png)'></div>\n                <div class = \"terms\" style='background-image: url(src/icons/internet.png)'></div>\n                <div class = \"terms\" style='background-image: url(src/icons/deposit.png)'></div>\n            </div>\n            <div class=\"facilities\">\n                <div class=\"facil\" *ngFor=\"let fac of fasilities\">\n                    <div style='background-image: url(src/icons/checkbox.png)'></div>\n                        <span>{{fac.text}}</span>\n                    </div>\n            </div>\n\n\n        </div>\n        <hr>\n        <div class='open'><div></div>\n            <div *ngIf=\"auth.user && auth.user.hasTime()\"><div *ngFor=\"let ph of realty_object.phones\" > {{ph}}</div></div>\n        </div>\n\n        <div class=\"close\" (click)= \"hide_object($event)\"></div>\n    </div>\n\n\n  ",
        styleUrls: ['app/pages/view-panel.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], ViewPanel);
exports.ViewPanel = ViewPanel;
var ViewPanel_1;
//# sourceMappingURL=view-panel.component.js.map