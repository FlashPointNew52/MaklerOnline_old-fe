import { Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import { User } from '../classes/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({

  selector: 'pay-page',

  template: `
  <div class= "inter-page">
    <div class='line'>
        <div id='pay'><span>Выберите тариф:</span>
                <div (click)="payment(50)"><div>1 день</div>50</div>
                <div (click)="payment(150)"><div>3 дня</div>150</div>
                <div (click)="payment(350)"><div>1 неделя</div>350</div>
                <div (click)="payment(1500)"><div>1 месяц</div>1500</div>
        </div>
        <div >Для перехода в процессинговый центр, "Всплывающее окно" в браузере должно быть разблокировано.
Если после выбора тарифа ничего не происходит, Вам необходимо войти в настройки браузера и разблокировать "Всплывающее окно", и
обновить страницу.
        </div>
        <div><span>Осталось:</span>
            <div>{{auth.getAuthUser()?.left_time?.days || "00"}} дней</div>
            <div>{{auth.getAuthUser()?.left_time?.getTime() || "00:00:00"}}</div>
        </div>
    </div>
</div>

  `,
  styleUrls: [ 'app/pages/inter-page.css' ],
})

export class PayPage implements OnInit{
    isPay: boolean;
    isInput: boolean = true;
    isReg: boolean = false;

    constructor(private auth: UserService, private route: ActivatedRoute, private router: Router) {

    }

    payment(summ: number){
        if(this.auth.user){
            this.auth.pay(summ);
        } else
            this.router.navigate(['/inter']);
    }

    ngOnInit() {
        setTimeout(() => {
            let  params: String[] = (<String>this.router.url).split("?")[1].split("&");
            if(params){
              let x: Array<[string, string]> =[];
              for(let i = 0; i < params.length; ++i){
                  let tar: string[] = params[i].split("=");
                  x.push([tar[0],tar[1]]);
              }
              if(x[0][0] == "isPaid"){
                  if(x[0][1] == "true")
                    alert("Ваш платеж успешно зачислен");
                  else if(x[0][1] == "false")
                    alert("Платеж не был осуществлен");
              }
            }
        }, 1500);

    }


    soc_aut(type:string, event){
        if((<HTMLElement>event.target.parentElement).getAttribute('disabled') == "false"){

        }
    }

 }
