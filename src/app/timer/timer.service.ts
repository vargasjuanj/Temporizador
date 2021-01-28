import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


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
        this.countdown=this.countdown-1;
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

  // private countdownTimerRef:any = null;
  // private init:number = 0;
  // private countdownSource = new BehaviorSubject<number>(0);
  // private countdownEndSource = new Subject<void>();
  // public countdown$ = this.countdownSource.asObservable();
  // public countdownEnd$ = this.countdownEndSource.asObservable();

  // constructor() { }

  // destroy():void{
  //   this.clearTimeout();
  // }

  // restartCountdown(init?){
  //   if(init){ // si no es cero, le asignamos el valor del parametro a el init del servicio
   
  //     this.init = init;
  //   }


  //   if(this.init >0){
     
  //      //this.clearTimeout();
  //     this.countdownSource.next(this.init); //Si es mayor a cero convertimos el numero en un stream y al ser subjectBehavior mantiene el estado, lo cargamos con cierto numero inicial

  //      this.doCountdown(); //Enpieza a hacer la cuentra regresiva en base a cierto numero
  //   }
   
  // }

  // private doCountdown(){
  //   if(this.countdownSource.getValue() > 0){  //al usarse recursivamente necesitamos la condición de quiebre, cuando el valor del subjectBehavior llego a cero será el punto de quiebre, si no iremos disminuyendo de a un valor cada un segundo
  //     this.countdownTimerRef = setTimeout(()=>{
  //       this.countdownSource.next(this.countdownSource.getValue() -1); //con el next emitimos otro valor, en este caso le restamos uno, como este tipo de observable tiene estado podemos ir restando de a 1
  //       this.processCountdown(); //validamos si ha terminado o volvemos a llamar a doCountdown
  //     }, 1000);
  //   }
  // }

  // private processCountdown(){
  //   if(this.countdownSource.getValue() <= 1){
 
  //     //Cuando emito el stream en el timerComponent al estar suscrito a countdownEnd$, llega este stream y se activa el evenEmitter, que emite el alert desde appComponent, y se deja de emitir el otro flujo del numero para atras, porque no entra en el else ya que se cumple la condición de que si llega a cero, o en este caso que le pusimos 1 para testear
  //     this.countdownEndSource.next();

      
  //   }
  //   else{
    
  //     this.doCountdown();
  //   }
  // }

  // private clearTimeout(){
  //   if(this.countdownTimerRef){
  //     clearTimeout(this.countdownTimerRef);
  //     this.countdownTimerRef = null;
  //   }
  // }

}
