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
var core_2 = require("@angular/core");
var concavehull_1 = require("../classes/concavehull");
var GoogleMapComponent = (function () {
    function GoogleMapComponent(_elem) {
        this._elem = _elem;
        this.latitude = 48.5;
        this.longitude = 135.15;
        this.zoom = 12;
        this.id = Math.round(Math.random() * 1000);
        this.draw_allowed = true;
        this.is_drawing = false;
        this.drawFinished = new core_2.EventEmitter();
    }
    GoogleMapComponent.prototype.ngOnInit = function () {
        this.container = this._elem.nativeElement.querySelector('.map-wrapper');
        var opts = {
            center: new google.maps.LatLng(this.latitude, this.longitude),
            zoom: this.zoom,
            disableDefaultUI: true
        };
        this.map = new google.maps.Map(this.container, opts);
        this.initDrawer();
    };
    GoogleMapComponent.prototype.ngOnChanges = function (changes) {
        if (!this.map)
            return;
        for (var p_name in changes) {
            var prop = changes[p_name];
            switch (p_name) {
                case 'latitude':
                case 'longitude':
                    this.map.panTo(new google.maps.LatLng(this.latitude, this.longitude));
                    break;
                case 'draw_allowed':
                    if (!this.draw_allowed) {
                        this.polygone.setMap(null);
                    }
                case 'polygone_points':
                    if (this.polygone_points) {
                        this.polygone = new google.maps.Polygon({
                            paths: this.polygone_points,
                            strokeColor: "#062141",
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: "#062141",
                            fillOpacity: 0.35,
                            editable: false,
                            geodesic: false,
                            map: this.map,
                        });
                    }
                    else {
                        this.polygone = new google.maps.Polygon();
                    }
                    break;
            }
        }
    };
    GoogleMapComponent.prototype.ngAfterViewChecked = function () {
        if (this.container.clientWidth != this.p_w) {
            this.p_w = this.container.clientWidth;
            google.maps.event.trigger(this.map, 'resize');
        }
    };
    GoogleMapComponent.prototype.initDrawer = function () {
        var fp;
        var lp;
        var _this = this;
        google.maps.event.addListener(this.map, 'mousemove', function (e) {
            if (_this.is_drawing == true) {
                _this.polyline.getPath().push(e.latLng);
            }
        });
        google.maps.event.addListener(this.map, 'mousedown', function (e) {
            if (_this.draw_allowed) {
                _this.map.setOptions({ draggable: false });
                _this.is_drawing = true;
                fp = e.latLng;
                if (_this.polyline) {
                    _this.polyline.setMap(null);
                }
                console.log(fp, lp);
                _this.polyline = new google.maps.Polyline({
                    clickable: false,
                    strokeColor: "#c50101",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    map: _this.map
                });
            }
        });
        google.maps.event.addListener(this.map, 'mouseup', function (e) {
            _this.is_drawing = false;
            _this.map.setOptions({ draggable: true });
            if (_this.draw_allowed) {
                _this.draw_allowed = false;
                var pa = [];
                _this.polyline.getPath().forEach(function forEach(ll) {
                    pa.push({ lat: ll.lat(), lng: ll.lng() });
                });
                lp = e.latLng;
                var dist = Math.sqrt(Math.pow(fp.lat() - lp.lat(), 2) + Math.pow(fp.lng() - lp.lng(), 2));
                if (dist > 0.04) {
                    var k1 = (lp.lat() - fp.lat()) / (lp.lng() - fp.lng());
                    var c = -k1 * fp.lng() + fp.lat();
                    for (var i = fp.lng(); i < lp.lng(); i += (lp.lng() - fp.lng()) / 10) {
                        pa.unshift({ lat: k1 * i + c, lng: i });
                    }
                }
                var ch = new concavehull_1.ConcaveHull(pa, 5000).getLatLngs();
                console.log(ch);
                _this.polygone = new google.maps.Polygon({
                    paths: ch,
                    strokeColor: "#c50101",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#c77c7c",
                    fillOpacity: 0.35,
                    editable: true,
                    geodesic: false,
                    map: _this.map,
                });
                _this.drawFinished.emit(ch);
                _this.polyline.setMap(null);
            }
        });
    };
    return GoogleMapComponent;
}());
__decorate([
    core_2.Output(),
    __metadata("design:type", core_2.EventEmitter)
], GoogleMapComponent.prototype, "drawFinished", void 0);
GoogleMapComponent = __decorate([
    core_1.Component({
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        selector: 'google-map',
        inputs: [
            'latitude',
            'longitude',
            'zoom',
            'draw_allowed',
            'polygone_points'
        ],
        template: "\n  <div class=\"map-wrapper\">\n      <ng-content></ng-content>\n  </div>\n  ",
        styles: ["\n    .map-wrapper {\n      position: absolute;\n\n      height: 100vh;\n      width: calc(103% + 15px);\n    }\n    "]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], GoogleMapComponent);
exports.GoogleMapComponent = GoogleMapComponent;
var GoogleMapMarkerComponent = (function () {
    function GoogleMapMarkerComponent(parent) {
        this.latitude = 0;
        this.longitude = 0;
        this.info_str = '';
        this.icon_id = 0;
        this.is_selected = false;
        this.click = new core_2.EventEmitter();
        this.map = parent.map;
    }
    GoogleMapMarkerComponent.prototype.ngOnInit = function () {
        var ico = null;
        var icons = [
            { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', },
            { url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png', },
            { url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png', },
        ];
        if (this.icon_id > 0 && this.icon_id < icons.length) {
            ico = icons[this.icon_id - 1];
        }
        this.marker = new google.maps.Marker({
            map: this.map,
            position: new google.maps.LatLng(this.latitude, this.longitude),
            title: '',
            icon: ico,
            animation: google.maps.Animation.DROP
        });
        this.infowindow = new google.maps.InfoWindow({
            content: '<div>' + this.info_str + '</div>'
        });
        var _this = this;
        this.marker.addListener('click', function () {
            _this.click.emit(_this);
        });
    };
    GoogleMapMarkerComponent.prototype.ngOnChanges = function () {
        if (this.marker) {
            if (this.is_selected) {
                this.marker.setAnimation(google.maps.Animation.BOUNCE);
                this.infowindow.open(this.map, this.marker);
            }
            else {
                this.marker.setAnimation(null);
                this.infowindow.close();
            }
        }
    };
    return GoogleMapMarkerComponent;
}());
__decorate([
    core_2.Output(),
    __metadata("design:type", core_2.EventEmitter)
], GoogleMapMarkerComponent.prototype, "click", void 0);
GoogleMapMarkerComponent = __decorate([
    core_1.Component({
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        selector: 'google-map-marker',
        inputs: ['latitude', 'longitude', 'info_str', 'icon_id', 'is_selected'],
        template: "",
        styles: [""]
    }),
    __metadata("design:paramtypes", [GoogleMapComponent])
], GoogleMapMarkerComponent);
exports.GoogleMapMarkerComponent = GoogleMapMarkerComponent;
//# sourceMappingURL=google-map.component.js.map