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
  // NOTA=> No funciona lo de ABAJO, pasa por ejemplo del 10 al 0 en la vista, si invocamos un alert en el servicio si muestra el decremento pero en el componente no.

  
  /* Hasta ahora la cuenta atrás la cojo directamente en el template del componente, accediendo a timer.countdown.

  // Esto, no es muy eficiente, ya que es angular quien todo el rato tiene que comprobar si el valor de countdown ha cambiado. Sería mejor que el propio servicio me avisara cuando el valor ha cambiado. 
   Esto es lo que se conoce como Programación Reactiva.
   */

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


}
