import {
  Component,
  ChangeDetectionStrategy,
  Renderer,
  ElementRef,
  SimpleChange
} from '@angular/core';

import {Output, EventEmitter} from '@angular/core';

import {ConcaveHull} from '../classes/concavehull';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'google-map',
  inputs: [
    'latitude',
    'longitude',
    'zoom',
    'draw_allowed',
    'polygone_points'
  ],
  template: `
  <div class="map-wrapper">
      <ng-content></ng-content>
  </div>
  `,
  styles: [`
    .map-wrapper {
      position: absolute;

      height: 100vh;
      width: calc(103% + 15px);
    }
    `]
  })

  export class GoogleMapComponent {
    container: HTMLElement;
    map: google.maps.Map;

    latitude: number = 48.5;
    longitude: number = 135.15;
    zoom: number = 12;

    id: number = Math.round(Math.random() * 1000);
    p_w: number;
    p_h: number;

    draw_allowed: boolean = true;
    is_drawing: boolean = false;
    polyline: google.maps.Polyline;
    polygone_points: any[];
    polygone: google.maps.Polygon;

    @Output() drawFinished: EventEmitter<any> = new EventEmitter();


    constructor(private _elem: ElementRef) {}

    ngOnInit() {
      this.container = this._elem.nativeElement.querySelector('.map-wrapper');

      var opts: google.maps.MapOptions = {
        center: new google.maps.LatLng(this.latitude, this.longitude),
        zoom: this.zoom,
        disableDefaultUI: true
      };
      this.map = new google.maps.Map(this.container, opts);
      this.initDrawer();
    }

    ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
      if (!this.map) return;
      for (let p_name in changes) {
        let prop = changes[p_name];
        switch(p_name) {
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
            } else {
              this.polygone = new google.maps.Polygon();
            }
            break;
        }
      }
    }

    ngAfterViewChecked() {
      if (this.container.clientWidth != this.p_w) {
        this.p_w = this.container.clientWidth;
        google.maps.event.trigger(this.map, 'resize');
      }
    }

    initDrawer() {
      var fp;
      var lp;
      var _this = this;
      google.maps.event.addListener(this.map, 'mousemove', function (e) {
        if(_this.is_drawing == true) {
            _this.polyline.getPath().push(e.latLng);
        }
      });

      google.maps.event.addListener(this.map, 'mousedown', function (e) {
        if (_this.draw_allowed) {
          _this.map.setOptions({draggable: false});
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
        _this.map.setOptions({draggable: true});

        if (_this.draw_allowed) {
          _this.draw_allowed = false;

          var pa = [];
          _this.polyline.getPath().forEach(function forEach(ll) {
            pa.push({lat: ll.lat(), lng: ll.lng()});
          });
          lp = e.latLng;
          var dist = Math.sqrt(Math.pow(fp.lat()-lp.lat(),2)+Math.pow(fp.lng()-lp.lng(),2));
          if(dist>0.04){
              var k1 = (lp.lat()-fp.lat())/(lp.lng()-fp.lng());
              var c = -k1*fp.lng()+fp.lat();
              for(var i = fp.lng(); i < lp.lng(); i+= (lp.lng()-fp.lng())/10){
                  pa.unshift({lat: k1*i+c, lng: i});
              }

          }
          var ch = new ConcaveHull(pa, 5000).getLatLngs();
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
    }
  }


  @Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'google-map-marker',
    inputs: ['latitude', 'longitude', 'info_str', 'icon_id', 'is_selected'],
    template: ``,
    styles: [``]
  })

  export class GoogleMapMarkerComponent {
    map: google.maps.Map;
    marker: google.maps.Marker;
    infowindow: google.maps.InfoWindow;

    latitude: number = 0;
    longitude: number = 0;
    info_str: string = '';
    icon_id: number = 0;
    is_selected: boolean = false;

    @Output() click: EventEmitter<any> = new EventEmitter();

    constructor(parent: GoogleMapComponent) { this.map = parent.map; }

    ngOnInit() {
      var ico: google.maps.Icon = null;
      var icons: google.maps.Icon[] = [
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
      this.marker.addListener('click', function() {
        _this.click.emit(_this);
      });
    }

    ngOnChanges() {
      if (this.marker) {
        if (this.is_selected) {
          this.marker.setAnimation(google.maps.Animation.BOUNCE);
          this.infowindow.open(this.map, this.marker);
        } else {
          this.marker.setAnimation(null);
          this.infowindow.close();
        }
      }
    }
  }
