import { Component, OnInit} from '@angular/core';

@Component({

  selector: 'lab-page',

  template: `
  <div class= "lab-page" style="margin-top: 100px;">
        <div (click)="fitnes()" class="button">Оценить</div>
        <div (click)="otborPopul = [].concat(otbor(firstPopul));" class="button">Отобрать</div>
        <div (click)="cross()" class="button">Скрестить</div>
        <div (click)="mutantPopul = mutation(25, 3);" class="button">Мутировать</div>
        <div (click)="getRezult()" class="button">Результат</div>
        <div (click)="new()" class="button">Новое поколение</div>
<div>
        <table style='float:left; margin-right: 20px;'>
            <tr *ngFor="let fen of fenotip; let i=index">
                <td style="border: 1px solid;">Фенотип {{i+1}}</td>
                <td style="border: 1px solid;">{{fen}}</td>
            </tr>
        </table>
        <table style='float:left; margin-right: 20px;'>
            <tr>
                <td style="border: 1px solid;" colspan = "3">Приспособление</td>
            </tr>
            <tr *ngFor="let pop of firstPopul; let i=index">
                <td style="border: 1px solid;">Особь {{i+1}}</td>
                <td style="border: 1px solid;">{{pop.osob}}</td>
                <td style="border: 1px solid;">{{pop.fitnes}}</td>
            </tr>
        </table>
        <table style='float:left; margin-right: 20px;'>
            <tr>
                <td style="border: 1px solid;" colspan = "3">Отбор (турнирный)</td>
            </tr>
            <tr *ngFor="let pop of otborPopul; let i=index">
                <td style="border: 1px solid;">Особь {{i+1}}</td>
                <td style="border: 1px solid;">{{pop.osob}}</td>
                <td style="border: 1px solid;">{{pop.fitnes}}</td>
            </tr>
        </table>
        <table style='float:left; margin-right: 20px;'>
            <tr>
                <td style="border: 1px solid;" colspan = "3">Скрещивание(равн. кроссовер)</td>
            </tr>
            <tr *ngFor="let pop of crossPopul; let i=index">
                <td style="border: 1px solid;">Особь {{i+1}}</td>
                <td style="border: 1px solid;">{{pop.osob}}</td>
            </tr>
        </table>

        <table style='float:left; margin-right: 20px;'>
            <tr>
                <td style="border: 1px solid;" colspan = "3">Мутация (трансл {{25}}%)</td>
            </tr>
            <tr *ngFor="let pop of mutantPopul; let i=index">
                <td style="border: 1px solid;">Особь {{i+1}}</td>
                <td style="border: 1px solid;">{{pop.osob}}</td>
            </tr>
        </table>

        <table style='float:left'>
            <tr>
                <td style="border: 1px solid;" colspan = "3">Итог поколения</td>
            </tr>
            <tr *ngFor="let pop of rezultPopul; let i=index">
                <td style="border: 1px solid;">Особь {{i+1}}</td>
                <td style="border: 1px solid;">{{pop.osob}}</td>
            </tr>
        </table>
</div>
  </div>

  `,
  styles: [`
    .button{
        float: left;
        border-style: outset;
        margin: 0 10px;
        padding: 0 10px;
    }
    div{
        float: left;
        margin: 30px 0 0 8px;
    }
`]
})

export class LabPage implements OnInit{
    fenotip: Array<String>=[];
    firstPopul: Array<any>=[];
    otborPopul: Array<any>=[];
    crossPopul: Array<any>=[];
    mutantPopul: Array<any>=[];
    rezultPopul: Array<any>=[];
    constructor() {

    }

    new(){
        this.firstPopul = [].concat(this.rezultPopul);
        this.otborPopul = [];
        this.crossPopul= [];
        this.mutantPopul= [];
        this.rezultPopul= [];
    }

    ngOnInit() {
        for(let i=0; i<5; i++){
            let val = (Math.floor(Math.random() * (15 - 0 + 1)) + 0).toString(2);
            val="0000"+val;
            this.fenotip.push(val.substr(-4,4));
        }
        for(let i=0; i<10; i++){
            let val = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
            let val1 = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
            while(val == val1)
                val1 = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
            this.firstPopul.push({osob: this.fenotip[val]+this.fenotip[val1], fitnes: 0});
        }

    }

    fitnes(){
        for(let i=0; i<this.firstPopul.length; i++){
            this.firstPopul[i].fitnes = this.fitnes_function(this.firstPopul[i].osob, this.firstPopul.length);
        }
    }

    cross(){
        this.crossPopul = [];
        for(let i=0; i<this.otborPopul.length; i+=2){
            if(i+1 != this.otborPopul.lenght)
                this.crossPopul = this.crossPopul.concat(this.cross_function(this.otborPopul[i], this.otborPopul[i+1])):
        }
    }

    getRezult(){
        this.rezultPopul = [].concat(this.mutantPopul);
        this.rezultPopul = this.rezultPopul.concat(this.otborPopul);
    }

    fitnes_function(str, num) {
        let val = 0;
        for(let i=0; i<str.length; ++i)
            val+=parseInt(str.charAt(i));
        return Math.round(val/num*1000)/1000;
    }

    otbor(popul: Array<any>){
        let otborRezult: Array<any>=[];
        for(let i=0; i<popul.length; i++){
            let count = Math.floor(Math.random() * (popul.length - 2 - 2 )) + 2;
            let indexes: Array<number>=[];
            for(let j=0; j<count; j++){
                let num: number = Math.floor(Math.random() * (popul.length - 0)) + 0;
                while(indexes.indexOf(num) > -1){
                    num = Math.floor(Math.random() * (popul.length  - 0)) + 0;
                }
                indexes.push(num);
            }
            let tempPopul: Array<any>=[];
            for(let ind of indexes)
                tempPopul.push(popul[ind]);
            tempPopul.sort((a, b) => {return a.fitnes - b.fitnes;});
            let t = tempPopul.pop();
            otborRezult.push(t);
        }
        return otborRezult;
    }

    cross_function(osob1, osob2){
        let child1 = "";
        let child2 = "";
        let retArr: Array<any>=[];
        for(let i=0; i< osob1.osob.length; ++i){
            let ind = Math.floor(Math.random() * (2 - 0 )) + 0;
            if(ind==0){
                child1+=osob1.osob.charAt(i);
                child2+=osob2.osob.charAt(i);
            } else{
                child1+=osob2.osob.charAt(i);
                child2+=osob1.osob.charAt(i);
            }
        }
        retArr.push({osob: child1, fitnes: 0});
        retArr.push({osob: child2, fitnes: 0});
        return retArr;
    }

    mutation(pers, count){
        let retArr: Array<any> = [];
        for(let i=0; i< this.firstPopul.length;++i){
            let randomPercent = Math.floor(Math.random() * (100 - 0 )) + 0;
            if(randomPercent <= pers){
                let randpos = Math.floor(Math.random() * (9 - count - 0 )) + 0;
                let subs = this.firstPopul[i].osob.substr(randpos, count);
                console.log(randpos);
                randpos = Math.floor(Math.random() * (this.firstPopul[i].osob.length - 0 )) + 0;
                let temp = this.firstPopul[i].osob.substr(0, randpos) + this.firstPopul[i].osob.substr(randpos+count);
                temp+=temp;
                console.log(this.firstPopul[i].osob, randpos, temp.substr(0, randpos), subs, temp.substr(randpos));
                retArr.push({osob: (temp.substr(0, randpos - count) + subs + temp.substr(randpos)).substr(0, 8), fitnes: 0});
            }
        }
        return retArr;
    }

 }
