import { Component, Input } from '@angular/core';
import {  Realty} from '../classes/realty';
import { User } from '../classes/user';
import {UserService} from '../services/user.service';

export class Titles {
  icon: string;
  text: string;
}

export class Rate {
  persent: number;
  text: string;
  isRated: boolean;
}

interface StringToArray {
    [K: string]: Array<Object>;
}

@Component({
  inputs: [
      "user"
    ],
  selector: 'view-panel',
  template: `
    <div class="left">
        <div class="photo" >
            <div *ngIf="option == 1">
                <div class="preview" (click)="photo(-1)"></div>
                <img class='blur' src="{{realty_object.photos[curren_photo]}}" (load)="onLoading()">
                <img class="img_cont" src="{{realty_object.photos[curren_photo]}}" (load)="onLoading($event)">
                <div class="next" (click)="photo(1)" ></div>
            </div>
            <div class="map" *ngIf="option == 2 || option == 4 || option == 3"> </div>
            <div class='panaram' [class.disable]="option != 3" ></div>
            <div class='find_options' *ngIf="option == 4">
                <label><input type="checkbox" name="params" placeholder="School" value="Школы" (click)="addMarkers('School', $event)"/>Школы</label>
                <label><input type="checkbox" name="params" placeholder="Children" value="Детские сады" (click)="addMarkers('Children', $event)"/>Детские сады</label>
                <label><input type="checkbox" name="params" placeholder="Hospital" value="Поликлиники" (click)="addMarkers('Hospital', $event)"/>Поликлиники</label>
                <label><input type="checkbox" name="params" placeholder="Bars" value="Рестораны Бары" (click)="addMarkers('Bars', $event)"/>Рестораны/Бары</label>
                <label><input type="checkbox" name="params" placeholder="Helth" value="Оздоровительные центры" (click)="addMarkers('Helth', $event)"/>Оздоровительные центры</label>
                <label><input type="checkbox" name="params" placeholder="Parks" value="Парки отдых" (click)="addMarkers('Parks', $event)"/>Парки/отдых</label>
                <label><input type="checkbox" name="params" placeholder="Sport" value="Спортзалы" (click)="addMarkers('Sport', $event)"/>Спортзалы</label>
                <label><input type="checkbox" name="params" placeholder="Shops" value="Магазины" (click)="addMarkers('Shops', $event)"/>Магазины</label>
                <label><input type="checkbox" name="direct" (click)="addDirection($event)"/>Маршруты<label>
                                        Выберите место на карте</label></label>
            </div>
            <div class='statistic' *ngIf='option == 5'>

                <div>
                    <div>
                        <div>ОБЩАЯ ОЦЕНКА:</div>
                        <div class="rate_line" >
                            <div><div [ngStyle]="{'width': mainRate+'%'}"></div></div>
                            <div>Выше среднего - {{mainRate}}%</div>
                        </div>
                    </div>
                    <div>
                        <div>ЦЕНЫ В ЛОКАЦИИ:</div>
                        <div><span>МИН. &nbsp;цена</span><span>23000 &#8381;</span></div>
                        <div><span>МАКС. цена</span><span>38000 &#8381;</span></div>
                    </div>
                </div>
                <hr>
                <div on-mouseenter='inRate($event)' on-mouseleave='outRate($event)'>
                    <div>ОЦЕНКА КАТЕГОРИЙ:</div>
                    <div class="rate_line" *ngFor="let rat of rate; let i = index">
                            <div on-mousemove ='inRate($event, i)' on-mouseout='outRate($event, i)' on-click='estimate($event,i)'><div [ngStyle]="{'width': rat.persent+'%'}"></div></div>
                        <div>{{rat.text}}</div>
                    </div>
                    <span>Внимание, ваш голос будет учтен только один раз.</span>
                </div>
                <div>
                        <div class='circle' id='chart_div'></div>
                        <div> 30500 &#8381;</div><div>Средняя цена</div>
                        <div>
                            <div><div style='background-color: #dc3912'></div> от 15000 до 18000 руб</div>
                            <div><div style='background-color: #3366cc'></div> от 18000 до 21000 руб</div>
                            <div><div style='background-color: #854fb0'></div> от 21000 до 24000 руб</div>
                            <div><div style='background-color: #109618'></div> от 24000 до 27000 руб</div>
                            <div><div style='background-color: #ff9900'></div> от 27000 до 30000 руб</div>
                        </div>
                </div>
            </div>
        </div>
        <ul class= 'map_menu'>
            <li (click)="onOption('1')" [class.active]="option == 1" style='background-image: url(src/icons/photer_active.png)'></li><hr>
            <li (click)="onOption('2')" [class.active]="option == 2" style='background-image: url(src/icons/map.png)'></li><hr>
            <li (click)="onOption('3')" [class.active]="option == 3" style='background-image: url(src/icons/360.png)'></li><hr>
            <li (click)="onOption('4')" [class.active]="option == 4" style='background-image: url(src/icons/near.png)'></li><hr>
            <li (click)="onOption('5')" [class.active]="option == 5" style='background-image: url(src/icons/statistic.png)'></li><hr>
            <div *ngIf="option == 1">Фото {{curren_photo+1}}/{{realty_object.photos.length}}</div>
        </ul>
    </div>
    <div class = 'right'>
        <div class='middle'>
            <span>{{realty_object.realty_type}}</span>
            <span>{{realty_object.address}}</span>
            <span>{{realty_object.district}}</span>
            <div class="describe">
                <div><span>Комнат</span><span> {{realty_object.rooms}}</span></div>
                <div><span>Этаж</span><span> {{realty_object.floor}} из {{realty_object.floors}}</span></div>
                <div><span>Балкон/лоджия</span><span> {{realty_object.balcony}}</span></div>
                <div><span>Состояние</span><span> {{realty_object.condition}}</span></div>
                <div><span>Площадь</span><span> {{realty_object.squere}}</span></div>
                <div><span>Населенный пункт</span><span> {{realty_object.locale}}</span></div>
            </div>
            <div class="desc">{{realty_object.describe}}</div>
            <div><span>Добавлено</span><span> {{realty_object.date}}</span></div>
        </div>
        <div class="price_div">
            <div>
                <div class='price'>{{realty_object.price}} 000 &#8381;</div>
                <div class = "terms" style='background-image: url(src/icons/lamp.png)'></div>
                <div class = "terms" style='background-image: url(src/icons/counter.png)'></div>
                <div class = "terms" style='background-image: url(src/icons/comun_paid.png)'></div>
                <div class = "terms" style='background-image: url(src/icons/internet.png)'></div>
                <div class = "terms" style='background-image: url(src/icons/deposit.png)'></div>
            </div>
            <div class="facilities">
                <div class="facil" *ngFor="let fac of fasilities">
                    <div style='background-image: url(src/icons/checkbox.png)'></div>
                        <span>{{fac.text}}</span>
                    </div>
            </div>


        </div>
        <hr>
        <div class='open'><div></div>
            <div *ngIf="auth.user && auth.user.hasTime()"><div *ngFor="let ph of realty_object.phones" > {{ph}}</div></div>
        </div>

        <div class="close" (click)= "hide_object($event)"></div>
    </div>


  `,
  styleUrls: [ 'app/pages/view-panel.css' ]
})

export class ViewPanel {
        user: User;
        option = '1';
        realty_object;
        menu_icon: string[]=[
            "src/icons/photer",
            "src/icons/map",
            "src/icons/360",
            "src/icons/near",
            "src/icons/statistic"
        ];
        rate: Rate[]=[
            {persent: 10, text: "Сообщества и безопасность", isRated: false},
            {persent: 25, text: "Развлечения и ночная жизнь", isRated: true},
            {persent: 50, text: "Парки, кинотеатры и отдых", isRated: false},
            {persent: 75, text: "Рестораны и шопинг", isRated: false},
            {persent: 90, text: "Школы и общественные услуги", isRated: false},
            {persent: 100, text: "Транспорт и путешествия", isRated: false},
        ];
        mainRate=this.countMainRate();
        select_icon: string = this.menu_icon[0];
        curren_photo=0;
        fasilities: Titles[] =[
            {icon:"src/icons/TV.png", text:"Телевизор"},
            {icon:"src/icons/bed.png", text:"Спальное место"},
            {icon:"src/icons/microwaveoven.png", text:"СВЧ печь"},
            {icon:"src/icons/condition.png", text:"Кондиционер"},

            {icon:"src/icons/furniture.png", text:"Мебель"},
            {icon:"src/icons/refreger.png", text:"Холодильник"},
            {icon:"src/icons/wi-fi_disable.png", text:"Интернет"},
            {icon:"src/icons/washer.png", text:"Стиральная машина"},
        ];

        constructor(private auth: UserService){}

        @Input()
        public set update(tr: any){
            this.onOption('1');
            this.curren_photo = 0;
            this.select_icon = this.menu_icon[0];
            this.realty_object = tr;
        };

        countMainRate(){
            var temp=0;
            for(var i=0; i<this.rate.length; i++){
                temp+=this.rate[i].persent;
            }
            return Math.round(temp/this.rate.length*100)/100;
        }

        chartDraw(){
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
        }


        onOption(val:string) {
            this.option = val;
            var icon = [].slice.call(this.menu_icon);
            var arr = [].slice.call((<HTMLElement>document.getElementsByClassName('map_menu').item(0)).getElementsByTagName('li'));
            arr.forEach(function(item, i, arr) {
                if(i==+val-1)
                    item.style.setProperty('background-image',"url(\'"+icon[+val-1]+"_active.png\')");
                else item.style.setProperty('background-image',"url(\'"+icon[i]+".png\')");
            });
            if(this.option=='2'){
                this.onMap();
            } else if(this.option=='3'){
                ViewPanel.map=null;
                this.onPanaram();
            } else if(this.option=='4'){
                this.onInMap();
            } else if(this.option=='5'){
                let timeoutId = setTimeout(() => {
                    this.chartDraw();
                }, 100);
                ViewPanel.map=null;
            } else {
                ViewPanel.map=null;
            }
        }

        inRate(event, i?: number){
            if(i == null){
                var array = <HTMLCollection>event.currentTarget.getElementsByClassName('rate_line');
                for(var i=0; i<array.length; ++i){
                    if(this.rate[i].isRated){
                        array.item(i).getElementsByTagName('div').item(0).style.setProperty('background-image', 'url(src/icons/star_rate.png)');
                        array.item(i).getElementsByTagName('div').item(1).style.setProperty('background-image', 'url(src/icons/star_active.png)');
                    }else{
                        array.item(i).getElementsByTagName('div').item(1).style.setProperty('background-image', 'url()');
                        array.item(i).getElementsByTagName('div').item(0).style.setProperty('background-image', 'url(src/icons/star_rate_disabled.png)');
                    }
                }
            } else if(!this.rate[i].isRated){
                var from = (<ClientRect>event.target.getBoundingClientRect()).left;
                var realx=(<MouseEvent>event).clientX-from;
                var percent=Math.round(realx*100/101);
                (<HTMLDivElement>event.currentTarget.getElementsByTagName("div").item(0)).style.setProperty('width', percent+'%');
                (<HTMLDivElement>event.currentTarget.getElementsByTagName("div").item(0)).style.setProperty('background-image', 'url(src/icons/star_active.png)');
            }else{
                (<HTMLDivElement>event.currentTarget.getElementsByTagName("div").item(0)).style.setProperty('background-image', 'url(src/icons/star_active.png)');
                (<HTMLDivElement>event.currentTarget.getElementsByTagName("div").item(0)).style.setProperty('width', this.rate[i].persent+'%');
            }
        }
        estimate(event, i){
            if(!this.rate[i].isRated){
                var from = (<ClientRect>event.target.getBoundingClientRect()).left;
                var realx = (<MouseEvent>event).clientX-from;
                var percent = Math.round(realx*100/101);
                this.rate[i].isRated = true;
                this.rate[i].persent = percent;
                this.inRate(event);
            }

        }
        outRate(event, j){
            if(j == null){
                var array = <HTMLCollection>event.currentTarget.getElementsByClassName('rate_line');
                for(var i=0; i<array.length; ++i){
                    array.item(i).getElementsByTagName('div').item(1).style.setProperty('width', this.rate[i].persent+'%');
                    array.item(i).getElementsByTagName('div').item(1).style.setProperty('background-image', 'url(src/icons/star_active.png)');
                    array.item(i).getElementsByTagName('div').item(0).style.setProperty('background-image', 'url(src/icons/star_rate.png)');
                }
            } else if(!this.rate[j].isRated){
                    (<HTMLDivElement>event.currentTarget.getElementsByTagName("div").item(0)).style.setProperty('width', 0+'%');
            }

        }

        onLoading(event) {
            if(!event){
            } else{
                if(event.currentTarget.naturalWidth > event.currentTarget.naturalHeight){
                    var parW=document.documentElement.clientWidth-825;
                    var parH=500;
                    if(parH/parW<0.66 && event.currentTarget.naturalHeight/event.currentTarget.naturalWidth>0.5){
                        event.currentTarget.style.removeProperty('width', '100%');
                        event.currentTarget.style.setProperty('height', '100%');
                    } else{
                        event.currentTarget.style.removeProperty('height', '100%');
                        event.currentTarget.style.setProperty('width', '100%');
                    }
                } else{
                    event.currentTarget.style.removeProperty('width', '100%');
                    event.currentTarget.style.setProperty('height', '100%');
                }

            }
        }

        photo(val: number){
            if((this.curren_photo+val) > -1 && (this.curren_photo+val) < this.realty_object.photos.length){
                this.curren_photo = this.curren_photo + val;
            }
        }

        static map: any;
        static objectMarker: any;
        static directionMarker: any;
        static markers: StringToArray = { 'School':[],'Children':[],'Hospital':[],'Bars':[],'Parks':[],'Sport':[],'Helth':[],'Shops':[]};
        static infoWindow: any;
        static directionsDisplay_walk;
        static directionsDisplay_drive;
        static onDirect: boolean = false;
        static onParam: boolean = false;
        static service: google.maps.places.PlacesService;

        onMap() {
            setTimeout(() =>  {
                ViewPanel.infoWindow = new google.maps.InfoWindow();
                var latlng = new google.maps.LatLng(this.realty_object.lat, this.realty_object.lon);
                var settings = {
                    zoom: 16,
                    center: latlng,
                    mapTypeControl: true,
                    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
                    navigationControl: true,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    streetViewControl: false,
                }
                var infowindow = new google.maps.InfoWindow();
                ViewPanel.map = new google.maps.Map(<HTMLElement>document.getElementsByClassName("map").item(0), settings);
                var companyMarker = new google.maps.Marker({
                    position: latlng,
                    map: ViewPanel.map,
                    icon: 'src/icons/googleTarget_main.png'
                });
                ViewPanel.objectMarker=companyMarker;
                ////for (var i = 0; i < ViewPanel.markers.length; i++) {
                //    ViewPanel.markers[i].setMap(null);
                //}
            }, 100);
        }

        onPanaram() {
           setTimeout(() =>{
               var latlng = new google.maps.LatLng(this.realty_object.lat, this.realty_object.lon);
               var settings = {
                   position: latlng,
               }

               var map = new google.maps.StreetViewPanorama(<HTMLElement>document.getElementsByClassName("panaram").item(0), settings);

           }, 200);

       }

        onInMap(){
           if(!ViewPanel.map){
               this.onMap();
           }
           setTimeout(this.f1, 100);
       }

        f1(){
           (<google.maps.Map>ViewPanel.map).setOptions({mapTypeControl: false});
           ViewPanel.map.addListener('dragend', (event) => {
               var params = document.getElementsByName('params');
               for(var i=0; i<params.length; i++){
                    if ((<HTMLInputElement>params[i]).checked) {
                        for(var p=0; p<8; p++){
                            if((<HTMLInputElement>params[i]).placeholder==Object.keys(ViewPanel.markers)[p]){
                                ViewPanel.addMarkers1((<HTMLInputElement>params[i]).value, (<HTMLInputElement>params[i]).placeholder);
                            }
                        }
                    }
                }
           });

           ViewPanel.map.addListener('zoom_changed', (event) => {
               var params = document.getElementsByName('params');
               for(var i=0; i<params.length; i++){
                    if ((<HTMLInputElement>params[i]).checked) {
                        for(var p=0; p<8; p++){
                            if((<HTMLInputElement>params[i]).placeholder==Object.keys(ViewPanel.markers)[p]){
                                ViewPanel.addMarkers1((<HTMLInputElement>params[i]).value, (<HTMLInputElement>params[i]).placeholder);
                            }
                        }
                    }
                }
               });
           ViewPanel.map.addListener('click', (event) => {
               if(ViewPanel.onDirect){
                   var directionsService = new google.maps.DirectionsService();
                   ViewPanel.directionMarker = event.latLng;
                   if(ViewPanel.directionsDisplay_drive != null) {
                        ViewPanel.directionsDisplay_drive.setMap(null);
                        ViewPanel.directionsDisplay_drive = null;
                        ViewPanel.directionsDisplay_walk.setMap(null);
                        ViewPanel.directionsDisplay_walk = null;
                    }
                   var request = {
                        origin: new google.maps.LatLng(48.480015, 135.100237),
                        destination: ViewPanel.directionMarker,
                        travelMode: google.maps.TravelMode.WALKING
                    };
                    var request1 = {
                        origin: new google.maps.LatLng(48.480015, 135.100237),
                        destination: ViewPanel.directionMarker,
                        travelMode: google.maps.TravelMode.DRIVING
                    };
                    var walk_time;
                    var walk_dir;

                   ViewPanel.directionsDisplay_walk = new google.maps.DirectionsRenderer({ polylineOptions: { strokeColor: "#6fba33" } });
                   ViewPanel.directionsDisplay_walk.setMap(ViewPanel.map);
                   ViewPanel.directionsDisplay_drive = new google.maps.DirectionsRenderer({ polylineOptions: { strokeColor: "#6bb1f7" } });
                   ViewPanel.directionsDisplay_drive.setMap(ViewPanel.map);

                   directionsService.route(request, function(result, status) {
                       if (status == google.maps.DirectionsStatus.OK) {
                           ViewPanel.directionsDisplay_walk.setDirections(result);
                           walk_dir = result.routes[0].legs[0].distance.text;
                           walk_time = result.routes[0].legs[0].duration.text;
                       }
                   });

                setTimeout(function() {
                    var style="width: 30px;height: 30px;background-size: 20px;background-repeat: no-repeat;border-radius: 50px;"+
                    "background-position: center; float: left;";
                   directionsService.route(request1, function(result, status) {
                       if (status == google.maps.DirectionsStatus.OK) {
                           ViewPanel.directionsDisplay_drive.setDirections(result);
                           ViewPanel.infoWindow.setContent(
                               '<p>'+result.routes[0].legs[0].end_address+'</p>'+
                              "<div style='display: flex; flex-wrap: wrap; height: 70px;'>"+
                                "<div style='width: 100%; line-height: 30px;'>"+
                                    "<div style='background-image: url(src/icons/walk.png); background-color: #93cb65; "+style+"'></div>"+
                                        walk_dir +" (" +walk_time+")</div>"+
                                "<div style='width: 100%; line-height: 30px;'>"+
                                "<div style='background-image: url(src/icons/car.png); background-color: #6bb1f7; "+style+"'></div>"+
                                result.routes[0].legs[0].distance.text+" (" +result.routes[0].legs[0].duration.text+") </div>"+

                              "</div>");
                           ViewPanel.infoWindow.setOptions({maxWidth: 200});
                           ViewPanel.infoWindow.setPosition(result.routes[0].legs[0].end_location)
                           ViewPanel.infoWindow.open(ViewPanel.map);
                       }
                   });
               }, 300);

               }

           });
       }

        addMarkers(elem: string, event:any){
           if((<HTMLInputElement>event.target).checked){
               ViewPanel.onParam = true;
               var request = {
                   bounds: ViewPanel.map.getBounds(),
                   keyword: (<HTMLInputElement>event.target).value
               };
               if(!ViewPanel.service)
                    ViewPanel.service = new google.maps.places.PlacesService(ViewPanel.map);
               ViewPanel.service.radarSearch(request, function (results, status) {
                   if (status == google.maps.places.PlacesServiceStatus.OK) {
                       for (var i = 0; i < results.length; i++) {
                           var placeLoc = results[i].geometry.location;
                           ViewPanel.addMarker(new google.maps.Marker({
                               map: ViewPanel.map,
                               position: results[i].geometry.location,
                               icon: 'src/icons/googleTarget.png'
                           }), results[i], elem, ViewPanel.service);
                       }
                   }
               }
               );

           }
           else {
               ViewPanel.onParam = false;
               for (var i = 0; i <  ViewPanel.markers[elem].length; i++) {
                   (<google.maps.Marker>ViewPanel.markers[elem][i]).setMap(null);
                }

           }
        }

        static addMarker(elem: any, rez: any, arr: string, serv: any){
           ViewPanel.markers[arr].push(elem);
           google.maps.event.addListener(elem, 'mouseover', function() {
               serv.getDetails(rez, function(result, status) {
                   if (status !== google.maps.places.PlacesServiceStatus.OK) {
                       console.error(status);
                       return;
                   }
                   ViewPanel.infoWindow.setContent(result.name);
                   ViewPanel.infoWindow.open(ViewPanel.map, elem);
               });
            });
       }

        static addMarkers1(elem: string, name: string){
                var request = {
                    bounds: (<google.maps.Map>ViewPanel.map).getBounds(),
                    //radius: '500',
                    keyword: elem
                };
                ViewPanel.service.radarSearch(request, callback);
                function callback(results, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK && ViewPanel.onParam ) {
                        for (var i = 0; i < results.length; i++) {
                            var isTo = -1;
                            for(var j = 0; j<ViewPanel.markers[name].length; ++j){
                                if(results[i].geometry.location.equals((<google.maps.Marker>ViewPanel.markers[name][j]).getPosition())){
                                    if(!(<google.maps.Marker>ViewPanel.markers[name][j]).getMap())
                                        (<google.maps.Marker>ViewPanel.markers[name][j]).setMap(ViewPanel.map);
                                    isTo=j;
                                    break;
                                }
                            }
                            if(isTo == -1){
                                ViewPanel.addMarker(new google.maps.Marker({
                                    map: ViewPanel.map,
                                    position: results[i].geometry.location,
                                    icon: 'src/icons/googleTarget.png'
                                }), results[i], name, ViewPanel.service);
                            }
                        }
                        var is=[];
                        for (var i = 0; i < results.length; i++) {
                            for(var j = 0; j<ViewPanel.markers[name].length; ++j){
                                if(results[i].geometry.location.equals((<google.maps.Marker>ViewPanel.markers[name][j]).getPosition())){
                                    if(is.indexOf(j)== -1)
                                        is.push(j);
                                    break;
                                }
                            }
                        }
                        for(var i=0; i<ViewPanel.markers[name].length; ++i){
                            var tr=-1;
                            for(var j=0; j<is.length; ++j){
                                if(i == is[j]){
                                    tr=0;
                                    break;
                                }

                            }
                            if(tr==-1){
                                (<google.maps.Marker>ViewPanel.markers[name][i]).setMap(null);
                            }
                        }

                    }
                }
        }

        addDirection(event: any){

            if((<HTMLInputElement>event.target).checked){
                ViewPanel.onDirect=true;
            } else {
                ViewPanel.onDirect=false;
                ViewPanel.directionsDisplay_walk.setMap(null);
                ViewPanel.directionsDisplay_drive.setMap(null);
                ViewPanel.infoWindow.close();
            }
        }

        hide_object(event){
            var panel = (<HTMLElement>event.currentTarget).parentElement.parentElement;
            console.log(panel);
            panel.parentElement.parentElement.appendChild(panel);
            var elem = (<HTMLElement>event.currentTarget).parentElement.parentElement.parentElement.getElementsByClassName('hide').item(0);
            if(elem){
                panel.parentElement.parentElement.appendChild(elem);
            }

        }
 }
