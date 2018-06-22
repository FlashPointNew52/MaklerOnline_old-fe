import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, Response , URLSearchParams, Headers} from '@angular/http';
import { Realty } from '../classes/realty'
import { User } from '../classes/user';
import { Observable }  from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class UserService {
    //@Output userUpd: EventEmitter = new EventEmitter();
    user: User;
    _user: BehaviorSubject<User> = new BehaviorSubject(undefined);
    baseUrl : string = "http://dev.zavrus.com";

    constructor (private http: Http) {}

    getAuthUser(){
        return this.user;
    }

    getUser(email: string, password: string){
        let options = new URLSearchParams();
        options.append('mail', email);
        options.append('pass', password);
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let isGet: boolean;
        this.http.post(this.baseUrl+"/getUser", options.toString(), {
            headers: headers
        }).map(response => response.json()).subscribe(data => {
            console.log(data);
            if(data.result == "OK"){
                localStorage.setItem("session", data.session);
                this.user = new User( data.id, data.name,  data.time, [], data.favourite);
                this.user.countTime();
                this._user.next(this.user);
            } else {
                this._user.error("Not find email");
                this._user = new BehaviorSubject(undefined);
            }
        } , error => {
            console.log('Could not load todos.');
        });
    }

    setUser(user?: User){
        if(user){
            this.user = user;
        } else {
            this.user = undefined;
            //this.userUpd.emit(this.user);
        }
        this._user.next(this.user);
    }

    getSocUser(type: string){
        if(type == "vk"){
            let form = <HTMLFormElement>document.createElement("form");
            document.body.appendChild(form);
            form.method = "GET";
            form.action = "https://oauth.vk.com/authorize";
            let inputs : any[] = [document.createElement("INPUT"),
                                document.createElement("INPUT"),
                                document.createElement("INPUT"),
                                document.createElement("INPUT"),
                                document.createElement("INPUT"),
                                document.createElement("INPUT"),
                                document.createElement("INPUT")];

            inputs[0].name = 'client_id';
            inputs[0].value = 5784298;

            inputs[1].name = 'display';
            inputs[1].value = "page";

            inputs[2].name = 'redirect_uri';
            inputs[2].value = "http://xn--b1adacaabaehsdbwnyeec1a7dwa0toa.xn--p1ai/#/inter";

            inputs[3].name = 'scope';
            inputs[3].value = "email";

            inputs[4].name = 'response_type';
            inputs[4].value = "token";

            inputs[5].name = 'v';
            inputs[5].value = 5.62;

            inputs[6].name = 'state';
            inputs[6].value = 123456;

            for (var i =0; i<7; ++i){
                inputs[i].type = 'hidden';
                form.appendChild(inputs[i]);
            }
            form.submit();
        }
        return;
    }

    addUser(mail: string){
        let options = new URLSearchParams();
        options.append('mail', mail);
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(this.baseUrl+"/newUser", options.toString(), {
            headers: headers
        }).map(response => response.json());
    }
    newSession(){
        let options = new URLSearchParams();
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        if(localStorage.getItem("session")){
            options.append("session", localStorage.getItem("session"));
            this.http.post(this.baseUrl+"/getSession", options.toString(), {
                headers: headers
            }).map(response => response.json()).subscribe(data => {
                //console.log(data);
                if(data.result == "Ok"){
                    this.user = new User( data.id, data.name,  data.time, [], data.favourite);
                    this.user.countTime();
                    this._user.next(this.user);
                }
                else {
                    localStorage.removeItem('session');
                }

            } , error => {
                console.log('Could not load todos.');
            });
        }

    }

    clearPassword(email: string){
        let options = new URLSearchParams();
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        options.append("email", email);
        this.http.post(this.baseUrl+"/updatePassword", options.toString(), {
                headers: headers }).map(response => response.json()).subscribe(data => {
                if(data.result == "OK"){
                    alert("На указанный вами Email был отправлен новый пароль");
                }
                else if(data.Rison == "Not find user"){
                    alert("Пользователь с таким Email не существует");
                } else alert("Ошибка: "+ data.Reason);
            }, error => {
                console.log('Could not load todos.');
            });
    }

    closeSession(){
        let options = new URLSearchParams();
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        options.append("session", localStorage.getItem("session"));
        this.http.post(this.baseUrl+"/closeSession", options.toString(), {
                headers: headers
            }).map(response => response.json()).subscribe(data => {
                if(data.result == "Ok"){
                    localStorage.removeItem('session');
                }
                else {
                }

            } , error => {
                console.log('Could not load todos.');
            });
    }

    pay(summ: number){
        let options = new URLSearchParams();
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        options.append("userId", ""+this.user.id);
        options.append("summ", ""+summ);
        this.http.post(this.baseUrl+"/prePay", options.toString(), {
                headers: headers
            }).map(response => response.json()).subscribe(data => {
                let form = <HTMLFormElement>document.createElement("form");
                document.body.appendChild(form);
                form.method = "POST";
                form.action = "https://wl.walletone.com/checkout/checkout/Index";
                //form.target = "_blank";
                let inputs : any[] = [document.createElement("INPUT"),
                                    document.createElement("INPUT"),
                                    document.createElement("INPUT"),
                                    document.createElement("INPUT"),
                                    document.createElement("INPUT"),
                                    document.createElement("INPUT"),
                                    document.createElement("INPUT"),
                                    document.createElement("INPUT")];

                inputs[0].name = 'WMI_MERCHANT_ID';
                inputs[0].value = data.WMI_MERCHANT_ID;

                inputs[1].name = 'WMI_PAYMENT_NO';
                inputs[1].value = data.WMI_PAYMENT_NO;

                inputs[2].name = 'WMI_PAYMENT_AMOUNT';
                inputs[2].value = data.WMI_PAYMENT_AMOUNT;

                inputs[3].name = 'WMI_CURRENCY_ID';
                inputs[3].value = data.WMI_CURRENCY_ID;

                inputs[4].name = 'WMI_DESCRIPTION';
                inputs[4].value = "Оплата доступа на ЕженедельникНедвижимость.рф";

                inputs[5].name = 'WMI_SUCCESS_URL';
                inputs[5].value = data.WMI_SUCCESS_URL;

                inputs[6].name = 'WMI_FAIL_URL';
                inputs[6].value = data.WMI_FAIL_URL;

                inputs[7].name = 'WMI_SIGNATURE';
                inputs[7].value = data.WMI_SIGNATURE;

                for (var i =0; i<8; ++i){
                    inputs[i].type = 'hidden';
                    form.appendChild(inputs[i]);
                }
                form.submit();

            } , error => {
                console.error(error);
            });

    }

    editFavList(id: number, add: boolean){
        if(this.user){
            let options = new URLSearchParams();
            options.append('userId', this.user.id.toString());
            options.append('reltyId', id.toString());
            options.append('isAdd', add.toString());
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            let isGet: boolean;
            this.http.post(this.baseUrl+"/editFavList", options.toString(), {
                headers: headers
            }).map(response => response.json()).subscribe(data => {
                if(data.result == "OK"){
                    //localStorage.setItem("session", data.session);
                    this.user.favourite = data.newList;
                    //this.user.countTime();
                    //this._user.next(this.user);
                } else {
                    //this._user.error("Not find email");
                    //this._user = new BehaviorSubject(undefined);
                }
            } , error => {
                console.log('Could not load todos.');
            });
        }

    }

    vkUser(params: any){
        let options = new URLSearchParams();
        options.append('userId', params[2][1]);
        this.http.get(this.baseUrl+"/vkUser?"+options.toString())
        .map(response => response.json()).subscribe(data => {
            console.log(data);
            if(data.result == "OK"){
                if(data.isNew)
                    alert("Вы успешно зарегистрировались в системе");
                localStorage.setItem("session", data.session);
                this.user = new User( data.id, data.name,  data.time, [], data.favourite);
                this.user.countTime();
                this._user.next(this.user);
            } else {
                //this._user.error("Not find email");
                //this._user = new BehaviorSubject(undefined);
            }
        } , error => {
            console.log('Could not load todos.');
        });
    }

    private extractData_get(res: Response) {
        let body = res.json();
        let user: User;

        if(body.result == "OK"){
            return user=new User( body.id, body.name,  body.time, [], body.favourite);
        }
        else {
            return user=undefined;
        }
    }

}
