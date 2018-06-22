import {  Component,Input,trigger,state,style,transition,animate} from '@angular/core';

export class Titles {
  icon: string;
  text: string;
}

export  class Review {
  state: string;
  photo: string;
  name: string;
  text: string;
  job: string;
}

export class Adds {
  count: number;
  text: string;
}
window.addEventListener("orientationchange", function() {

    if(document.documentElement.clientWidth > 600){
        if(MainPageComponent.char.length==2)
            MainPageComponent.char='0';
            else MainPageComponent.char='00';
    }

}, false);


function getPersent(): string {
    if(document.documentElement.clientWidth < 600)
        return ""+(document.documentElement.clientWidth*0.45)+"px";
    else return "35%";
}

@Component({
    animations: [
        trigger('isVisibleChanged', [
            state('2' , style({ right: '100vw'  })),
            state('00' , style({ right: 'calc(50vw - '+(document.documentElement.clientWidth*0.45)+'px)' })),
            state('0' , style({ right: 'calc(50vw - 35%)' })),
            state('1', style({ right: '-100vw' })),
            transition('0 <=> 2', animate('500ms')),
            transition('00 <=> 2', animate('500ms')),
            transition('1 <=> 0', animate('500ms')),
            transition('1 <=> 00', animate('500ms')),
            transition('2 <=> 1', animate('0ms')),
        ])
    ],
    selector: 'main-page',
    templateUrl: 'app/pages/main-page.html',
    styleUrls: [ 'app/pages/main-page.css' ]
})


export class MainPageComponent {

    static char : string = "00";

    isVisible : boolean = false;

    titles : Titles[] = [
        { icon: "src/icon_ok.png", text: "Никаких\xA0посредников. Никаких\xA0сложностей. Только\xA0недвижимость." },
        { icon: "src/sofa.png", text: "Занимайтесь своими делами, пока Ваш помощник занимается вашими. " },
        { icon: "src/list.png", text: "Самая большая база недвижимости. Нет\xA0смысла искать - Все уже здесь. " },
        { icon: "src/price2.png", text: "Простой и безопасный способ оплаты. " }
    ];

    dates : Adds[] = [
        { count: 89, text: "Объектов недвижимости поступило сегодня" },
        { count: 1538, text: "Объектов выставлено за прошедшую неделю" },
        { count: 101, text: "Заявок обработано" }
    ];

     reviews : Review[] = [
        { photo: "src/Parfenova.jpg", job: "Специалист банковского дела", name: "Юлия Парфенова", state: MainPageComponent.char,
            text: "...Уже много знакомых и знакомые моих знакомых нашли через вас то, что искали!)))" },
        { photo: "src/Karol.jpg", job: "Ветеринар", name: "Григорий Кароль", state: '1',
            text: "От души! Приехал позвонил, заехал)))" },
        { photo: "src/Curnosov.jpg", job: "DJ - звукооператор", name: "Дмитрий Курносов", state: '2',
            text: `Отличный сайт, хоть еще и не снял квартиру, но все же... обзвонил несколько объявлений, договорился на встречи,
            даже не спросили :\"А вас какая квартира интересует?\". Ура!!! Наконец то, появился такой сайт...у меня эмоция))
            Буду рекомендовать).`
        }
    ];

    nextReview(val: boolean) {

        var second = document.getElementsByClassName("review").item(1);
        var third = document.getElementsByClassName("review").item(2);
        var position = 0;
        if(!val){
            for (var rev of this.reviews){
                var stat = +rev.state;
                if(stat-1 <0) rev.state='2';
                else if((stat-1)==0){
                    rev.state=MainPageComponent.char;
                } else rev.state=''+(stat-1);
            }
        }
        else {
            for (var rev of this.reviews){
                var stat = +rev.state;
                if(stat+1 > 2 ) rev.state=MainPageComponent.char;
                else rev.state=''+(stat+1);
            }
        }
    }
}
