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

  @Output() onComplete = new EventEmitter<string>();
  @Input() init:number = 20;
  private countdownEndRef: Subscription = null;
test:number=10
  constructor(public timer:TimerService){}

  ngOnInit(){
  //el initi toma el valor que se pasa por plantilla desde el appComponent, ignorando el valor del componente, en este caso ignora el 20
  this.timer.restartCountdown(this.init);


  //Proceso paralelo a la linea de arriba
  //cuando la cuenta regresiva finalice se va amitir el string a su componente padre y este va a mostrar el valor del evento con un alert
  this.countdownEndRef = this.timer.countdownEnd$.subscribe(()=>{
    this.onComplete.emit('cuenta regresiva finalizada');
  });


  }

  ngOnDestroy(){
    this.timer.destroy();
    this.countdownEndRef.unsubscribe();  
  }

}
