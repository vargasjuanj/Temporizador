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

  //   <!-- link del tuto original
  // http://blog.enriqueoriol.com/2017/05/comunicacion-servicio-componente-en-angular.html#:~:text=En%20las%20buenas%20pr%C3%A1cticas%20de,Http%20)%20todo%20es%20muy%20bonito. -->


  @Input() init: number = 20;   //el init toma el valor que se pasa por plantilla desde el appComponent, ignorando el valor del componente, en este caso ignora el 20

  @Output() onComplete = new EventEmitter<string>();

  private countdownEndRef: Subscription = null;
  public sin_pipe_async: number

  constructor(public timer: TimerService) { }

  ngOnInit() {
    this.timer.restartCountdown(this.init);

    //no funca con esto, con pipe si funca
    this.timer.countdown$.subscribe(n => {
      this.sin_pipe_async = n // con String Interpolación no refresca en la plantill, usando two data binding tampoco
      //   //alert(n) //asi si lo muestra bien, 10, 9 , 8, etc
    })


    //cuando la cuenta regresiva finalice se va amitir el string a su componente padre y este va a mostrar el valor del evento con un alert
    this.countdownEndRef = this.timer.countdownEnd$.subscribe(() => {
      this.onComplete.emit('cuenta regresiva finalizada');
    });


  }

  ngOnDestroy() {
    this.timer.destroy();
    this.countdownEndRef.unsubscribe();
  }

}