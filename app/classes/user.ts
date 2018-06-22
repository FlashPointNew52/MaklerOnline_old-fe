import {Realty} from '../classes/realty';

export class User {
  id: number = 0;
  name: string = "";
  time: string = "";
  can_estimate: boolean[];
  favourite: number[];
  left_time: Dates;
  id_timer: any;

  constructor(id, name, time, can_estimate , favourite){
      this.id = id;
      this.name = name;
      this.time = time;
      this.can_estimate = can_estimate;
      this.favourite = favourite;
      this.left_time = new Dates();
  }

  public countTime(): boolean{
      this.stop_timer();
      var interval = new Date(this.time).getTime() - new Date().getTime() - 10*3600*1000;
      if(interval>0){
          this.left_time.days= Math.floor(interval / (1000 * 3600 * 24));
          interval-=this.left_time.days*1000 * 3600 * 24;
          this.left_time.hours = Math.floor(interval/(1000 * 3600));
          interval-=this.left_time.hours*1000 * 3600;
          this.left_time.minute = Math.floor(interval / (1000 * 60 ));
          interval-=this.left_time.minute*1000 * 60;
          this.left_time.second = Math.floor(interval / 1000 );
          this.start_timer();
          return true;
      } else{
          return false;
      }
  };

  public newLeft_time() {
      this.stop_timer();
      this.left_time = new Dates();
  }

  start_timer(){
      this.id_timer = setInterval(() => {
          var have_time = this.left_time.reduce_the_time();
          if(!have_time) clearInterval(this.id_timer );
      }, 1000);
  }

  stop_timer(){
      clearInterval(this.id_timer);
  }

  hasTime(): boolean{
      return this.left_time.hasTime();
  }

}

export class Dates {
    days: number = 0;
    hours: number = 0;
    minute: number = 0;
    second: number = 0;

    getTime(): string{
        var str="";
        if(this.hours>9)  str+=this.hours;
        else  str+="0"+this.hours;
        str+=":"
        if(this.minute>9)
            str+=this.minute;
        else str+="0"+this.minute;
        str+=":"
        if(this.second>9)
            str+=this.second;
        else str+="0"+this.second;
        return str;
    }

    hasTime(){
        if(this.days || this.hours || this.minute || this.second){
            return true;
        }
        else return false;
    }

    reduce_the_time(){
        if(this.second> 0){
            this.second-=1;
            return true;
        }
        else{
            this.second=59;
            if(this.minute >0)  {
                this.minute-=1;
                return true;
            }
            else{
                this.minute=59;
                if(this.hours>0)  {
                    this.hours-=1;
                    return true;
                }
                else{
                    this.hours=23;
                    if(this.days>0)  {
                        this.days-=1;
                        return true;
                    }
                    else {
                        this.hours=0;
                        this.minute=0;
                        this.second=0;
                        return false;
                    }
                }
            }
        }
    }
}
