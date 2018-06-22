import { Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import { User } from '../classes/user';
import { ActivatedRoute, Router} from '@angular/router';

@Component({

  selector: 'inter-page',

  template: `
    <div class= "inter-page">
    <div class = 'line1'>
        <div >
            <div><span [class.active] = "isInput" (click)="inpReg(0)">Вход</span><hr><span [class.active] = "isReg" (click)="inpReg(1)">Регистрация</span></div>
            <div id="soc" *ngIf="!isPay"><span *ngIf="isInput">Войти через:</span><span *ngIf="isReg">Войти через:</span>
                <div style='background-image: url(src/google-dis.png)' (click)="soc_aut('google', $event)"></div>
                <div style='background-image: url(src/facebook-dis.png)'></div>
                <div style='background-image: url(src/twitter-dis.png)'></div>
                <div style='background-image: url(src/VK-dis.png)' (click)="soc_aut('vk', $event)"></div>
                <div style='background-image: url(src/ok-dis.png)'></div>
            </div>
            <div  id='mail' ><span>Ваш Email:</span><input type="email" ></div>
            <div  id='pass' *ngIf="isInput"><span>Код доступа:</span><input type="password"> </div>
            <div class="button1" *ngIf="isInput" (click)="forgot()">Забыли пароль?</div>
            <div class="button" *ngIf="isInput" (click)="input()">Далее</div> <div class="button" *ngIf="isReg" (click)="registr()">Далее</div>
        </div>
    </div>
    </div>

  `,
  styleUrls: [ 'app/pages/inter-page.css' ],

})

export class InterPage implements OnInit{
    isPay: boolean;
    isInput: boolean = true;
    isReg: boolean = false;

    ngOnInit() {

    }

    constructor(private auth: UserService, private route: ActivatedRoute, private router: Router) {
        let  path1: String = (<String>router.url).split("#")[1];
          if(path1){
            console.log(path1);
            let params: String[] = path1.split("&");
            let x: Array<[string, string]> =[];
            for(let i = 0; i < params.length; ++i){
                let tar: string[] = params[i].split("=");
                x.push([tar[0],tar[1]]);
            }
            if(x[0][0] != "error"){
                setTimeout(() => {
                    auth.vkUser(x);
                    this.auth._user.subscribe(user => {
                        if(user){
                            if(this.auth.user.countTime()){
                                this.router.navigate(['/find']);
                            } else{
                                this.router.navigate(['/pay']);
                            }
                        }
                    }) ;

                },250);
            }
        }
    }

    inpReg(val){
        if(val==0) {
            this.isInput = true;
            this.isReg = false;
        } else{
            this.isInput = false;
            this.isReg = true;
        }
    }

    input(){
        this.auth.getUser(
            (<HTMLElement>document.getElementById("mail")).getElementsByTagName('input').item(0).value,
            (<HTMLElement>document.getElementById("pass")).getElementsByTagName('input').item(0).value
        );
        this.auth._user.subscribe(user => {
            if(user){
                alert("Вы успешно вошли в систему!");

                if(this.auth.user.countTime()){
                    this.router.navigate(['/find']);
                } else{
                    this.router.navigate(['/pay']);
                }
            }
        }, err => {
            if(err == "Not find email"){
                alert("Неверный email или пароль!");
            }
        },
    )  ;

    }

    ngOnChanges() {

    }


    soc_aut(type:string, event){
        this.auth.getSocUser(type);
    }

    registr(){
        this.auth.addUser(document.getElementById("mail").getElementsByTagName("input").item(0).value).subscribe( data => {
            if(data.result == "OK"){
                alert("Регистрация прошла успешно. На указанный вами e-mail отправлен пароль для входа в систему.");
                this.inpReg(0);
            } else alert("Указанные вами данные уже зарегестрированы в системе!");
        }, error => {

        });
    }
    forgot(){
        if(document.getElementById("mail").getElementsByTagName("input").item(0).value)
            this.auth.clearPassword(document.getElementById("mail").getElementsByTagName("input").item(0).value);
        else alert("Email не указан");
    }

 }
