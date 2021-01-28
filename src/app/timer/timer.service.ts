import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";


@Injectable()
export class TimerService {

  private countdownEndSource = new Subject<void>();
  public countdownEnd$ = this.countdownEndSource.asObservable();
  private countdownTimerRef:any = null;
  private init:number = 0;
  public countdown:number = 0;

  constructor() { }

  restartCountdown(init?){
    if(init)
      this.init = init;

    if(this.init >0){
      this.clearTimeout();
      this.countdown=this.init
      this.doCountdown();
    }
  }


  public destroy(){
      //clean timeout reference
  }
  private doCountdown(){
    if(this.countdown > 0){
       this.countdownTimerRef = setTimeout(()=>{
        this.countdown--;
        alert(this.countdown); //Desde aca si muestra el decremento, en el componente no actualiza el valor
        this.processCountdown();
      }, 1000);
    }
  }


  private processCountdown(){
    if(this.countdown == 0){
      this.countdownEndSource.next();
    }

    else{
      this.doCountdown();
    }
  }

  private clearTimeout(){
    //remove countdown reference
  }

 
}
