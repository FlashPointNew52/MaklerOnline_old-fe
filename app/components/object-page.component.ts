import {  Component} from '@angular/core';
import {  Realty} from '../classes/realty';

export class Titles {
  icon: string;
  text: string;
}

@Component({
    inputs: [
        'is_Fav',
    ],
    selector: 'object-page',
    template: `
            <div class="photo">
                <div class="preview" (click)="photo(-1)"></div>
                <div class="img_cont"><img src="{{realty_object.photos[curren_photo]}}">
                    <div class="logo">
                        <div>ЕЖЕНЕДЕЛЬНИК</div>
                        <div class="logo1">НЕДВИЖИМОСТЬ</div>
                        <div>ГРУППА КОМПАНИЙ ZAVRUS</div>
                        </div>
                </div>
                <div class="next" (click)="photo(1)"></div>

            </div>

            <div class="info_panel">
                <div>Квартира</div>
                <hr>
                <div class= "important">
                    <div>
                        <span>Этаж</span>
                        <span>{{realty_object.floor}}/{{realty_object.floors}}</span>
                    </div>
                    <div class ="vertical-line"></div>
                    <div>
                        <span>Комнат</span>
                        <span>{{realty_object.rooms}}</span>
                    </div>
                    <div class ="vertical-line"></div>
                    <div>
                        <span>Цена</span>
                        <span>{{realty_object.price}} 000 &#8381;</span>
                    </div>
                </div>
                <hr>
                <div class="describe">
                    <div><span>Населенный пункт</span><span> {{realty_object.locale}}</span></div>
                    <div><span>Район</span><span> {{realty_object.district}}</span></div>
                    <div><span>Адрес</span><span> {{realty_object.address}}</span></div>
                    <div><span>Площадь</span><span> {{realty_object.squere}}</span></div>
                    <div><span>Балкон/лоджия</span><span> {{realty_object.balcony}}</span></div>
                    <div><span>Состояние</span><span> {{realty_object.condition}}</span></div>
                    <div><span>Дата добавления</span><span> {{realty_object.date}}</span></div>
                    <span> {{realty_object.describe}}</span>
                </div>
                <div class="facilities"><span>Удобства</span>
                    <div class="facil" *ngFor="let fac of fasilities">
                        <div [ngStyle]="{'background-image': 'url(' + fac.icon + ')'}"></div>
                        <span>{{fac.text}}</span>
                    </div>
                </div>
                <div class='open'>КОНТАКТЫ</div>
            </div>

            <div class=map><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d794.3418394905735!2d135.04563214449757!3d48.488652158750796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5efaea409b46d56b%3A0x30ef189ce79aa35a!2z0YPQuy4g0JfQsNC_0LDRgNC40L3QsCwgMTU1LCDQpdCw0LHQsNGA0L7QstGB0LosINCl0LDQsdCw0YDQvtCy0YHQutC40Lkg0LrRgNCw0LksIDY4MDAxMQ!5e0!3m2!1sru!2sru!4v1477295245060"
            width="100%" height="100%" frameborder="0" style="border:0" allowfullscreen></iframe></div>

        <div class="close" (click)= "hide_object()"></div>
    `,
    styleUrls: [ '' ],
    styles: [`
        .logo{
            display: inline-block;
            font-family: "Open Sans";
            margin-left: 30px;
            position: absolute;
            top: -63px;
            right: 0px;
            background-color: rgb(255, 255, 255);
            width: 250px;
            height: 71;

        }
        .logo div:first-child{
            font-size: 12pt;
            color: #465678;
            text-align: left;
            position: relative;
            left: 13px;
            bottom: -5;
        }
        .logo div:last-child{
            color: #465678;
            font-size: 8pt;
            text-align: right;
            position: relative;
            left: -11px;
            top: -5;
        }
        .logo .logo1{
            font-size: 20pt;
            color: #750f0f;
        }

        .photo{
            margin-top: 100px;
            width: 64vw;
            margin-left: 10px;
            max-width: 819px;
            position: relative;
            height: 546px;
            min-width: 819px;
            text-align: center;
        }

        .photo .tiles{
            position: relative;
            top: -65px;
            background-color: rgba(238, 232, 170, 0.51);
            width: 100%;
            height: 65px;
        }

        .photo .whirligig{
            position: relative;
            display: flex;
            justify-content: center;
            top: -100px;
            background-color: rgba(95, 94, 92, 0.61);
            width: 100%;
            height: 100px;
        }

        .photo>.whirligig >div{
            float: left;
            width: 100px;
            height: 100px;
            background-size: cover;
        }

        .photo img{
            max-width: 100%;
            height: 100%;
            margin: auto;
        }
        .photo>.img_cont{
            position: relative;
            display: inline;
            z-index: 1;
        }

        .map{
            margin-top: 10px;
            min-width: 819px;
            max-width: 819px;
            width: 100%;
            height: 50vh;
            max-height: 546px;
            margin-left: 10px;
            margin-top: 20px;
            order: 2;
        }

        .info_panel{
            font-family: "Roboto";
            margin-top: 100px;
            margin-left: 20px;
            margin-right: 10px;
            /* display: block; */
            width: 31vw;
            height: 100vh;
            order: 3;
        }

        .info_panel .describe{
            width: 100%;
            color: #4a4a4a;
        }

        .info_panel .describe div{
            display: flex;
            justify-content: space-between;
        }

        .info_panel > div:first-child{
            font-size: 25pt;
            text-align-last: left;
            color: #8e8e8e;
        }

        .info_panel .describe >span{
            display: block;
            margin-top: 30px;
            text-align: justify;
        }

        .info_panel .describe >span:before{
            content: "Описание: ";
            color: black;
        }

        .info_panel .add_info{
            width: 100%;
            height: 45vh;
            min-height: 324px;
        }

        .open{
            width: 170px;
            height: 45px;
            background-color: #e27e13;
            text-align: center;
            position: relative;
            line-height: 45px;
            font-size: 14pt;
            color: white;
            font-weight: 900;
            margin: auto;
        }

        .next, .preview{
            position: absolute;
            display: flex;
            width: 70px;
            height: 70px;
            background-image: url(src/preview.png);
            background-size: contain;
            background-repeat: no-repeat;
            top: calc(50% - 35px);
            z-index: 2;
        }
        .next{
            left: calc(100% - 70px);
            transform: scale(-1, 1);
        }
        .next:hover{
            background-image: url(src/preview_hover.png);
            transform: scale(-1, 1);
        }
        .preview:hover{
            background-image: url(src/preview_hover.png);
        }

        .close{
            background-image: url(src/cross.png);
            width: 50px;
            background-size: cover;
            height: 50px;
            position: absolute;
            left: calc(95vw - 50px);
            margin-right: 12vw;
            top: 20px;
        }

        .close:hover{
            background-image: url(src/cross_hover.png);
        }

        hr{
            width: 95%;
            border-color: rgba(74, 74, 74, 0.27);
            margin-bottom: 30px;
            border-bottom-width: 0;
        }

        hr:first-of-type{
            margin-bottom: 0;
            margin-top: 15px;
        }

        .important{
            position: relative;
            display: flex;
            width: 100%;
            justify-content: space-around;
            padding-top: 10px;

        }
        .important > div{
            display: block;
            text-align: center;
        }

        .important > div >span:first-child{
            display: block;
            font-size: 15pt;
            text-align: center;
            color: #4a4a4a;
        }

        .important > div >span:last-child{
            font-size: 25pt;
            text-align: center;
            color: #9a2222;
        }
        .important .vertical-line{
            border-right: 1px inset rgba(74, 74, 74, 0.27);
        }

        .facilities{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
        }

        .facilities> span{
            width: 100%;
            position: relative;
            display: block;
            text-align: left;
            font-size: 18pt;
            margin-bottom: 15px;
            margin-top: 20px;
            color: #8e8e8e;
        }

        .facil{
            height: 50px;
            width: 50px;
            font-size: 9pt;
            text-align: center;
            margin: auto auto 25px auto;
            flex: 0 0 20%;
        }

        .facil>div{
            width: 100%;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            height: 80%;
        }
        .facil>span{
            height: 60px;
            width: 30px;
        }

        @media screen and (max-width:1279px) {
            .info_panel{
                order: 2;
                width: 819px;
            }
            .map{
                order: 3;
            }
        }
    `]
})

export class ObjectPageComponent {
    curren_photo=0;
    fasilities: Titles[] =[
        {icon:"src/icons/refreger.jpg", text:"Холодильник"},
        {icon:"src/icons/washer.jpg", text:"Стиральная машина"},
        {icon:"src/icons/TV.jpg", text:"Телевизор"},
        {icon:"src/icons/sofa.jpg", text:"Диван"},
        {icon:"src/icons/bed.jpg", text:"Кровать"},
        {icon:"src/icons/kitchen.jpg", text:"Кухонный гарнитур"},
        {icon:"src/icons/furniture.jpg", text:"Мебель"},
        {icon:"src/icons/microwaveoven.jpg", text:"Микроволновая печь"},
        {icon:"src/icons/cooker.jpg", text:"Плита"},
        {icon:"src/icons/condition.jpg", text:"Кондиционер"},
        {icon:"src/icons/dishwasher.jpg", text:"Посудомоечная машина"},
    ];
    realty_object: Realty ;

    photo(val: number){
        if((this.curren_photo+val) > -1 && (this.curren_photo+val) < this.realty_object.photos.length){
            this.curren_photo = this.curren_photo + val;
        }
    }

    hide_object(){
        (<HTMLElement>document.getElementsByTagName("object-page").item(0)).style.setProperty('display', 'none');
    }

}
