import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { TimerService } from "app/timer/timer.service";
import { Subscription } from "rxjs/Subscription";


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  providers: [TimerService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit, OnDestroy {
  // Hasta ahora la cuenta atrás la cojo directamente en el template del componente, accediendo a timer.countdown.

  // Esto, no es muy eficiente, ya que es angular quien todo el rato tiene que comprobar si el valor de countdown ha cambiado. Sería mejor que el propio servicio me avisara cuando el valor ha cambiado. 
  // Esto es lo que se conoce como Programación Reactiva.

// No funciona lo de arriba, pasa por ejemplo del 10 al 0 en la vista, si invocamos un alert en el servicio si muestra el decremento pero en el componente no.
  @Output() onComplete = new EventEmitter<void>();
  @Input() init:number = 20;

  private countdownEndRef: Subscription = null;
aux:any
  constructor(public timer:TimerService){}

  ngOnInit(){
    this.aux=this.timer.countdown;
    this.timer.restartCountdown(this.init);

    this.countdownEndRef = this.timer.countdownEnd$.subscribe(()=>{
      this.onComplete.emit();
    })
  }


  ngOnDestroy(){
    this.timer.destroy();
    this.countdownEndRef.unsubscribe();
  }


//   @Output() onComplete = new EventEmitter<string>();
//   @Input() init:number = 20;
//   private countdownEndRef: Subscription = null;
// aux:any
// count:number=10;
//   constructor(public timer:TimerService){}

//   ngOnInit(){
//   //el initi toma el valor que se pasa por plantilla desde el appComponent, ignorando el valor del componente, en este caso ignora el 20
//   this.timer.restartCountdown(this.init);


// //En ves de usar en la plantilla el pipe "timer.countdown$ | async" nos podemos suscribir de esta forma, pero la ventaja que tiene el pipe que se desuscribe automaticamente
// this.timer.countdown$.subscribe(n=>{
//   this.aux=n // con String Interpolación no refresca en la plantill, usando two data binding con la directiva ngModel si actualiza el valor
//   //alert(n) //asi si lo muestra bien, 10, 9 , 8, etc
// })
//   //Proceso paralelo a la linea de arriba
//   //cuando la cuenta regresiva finalice se va amitir el string a su componente padre y este va a mostrar el valor del evento con un alert
//   this.countdownEndRef = this.timer.countdownEnd$.subscribe(()=>{
//     this.onComplete.emit('cuenta regresiva finalizada');
//   });


//   }

//   ngOnDestroy(){
//     this.timer.destroy();
//     this.countdownEndRef.unsubscribe();  
//   }

}
