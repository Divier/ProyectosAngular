import { Component, EventEmitter, Input, OnDestroy, Output, SimpleChanges, OnChanges } from '@angular/core';

import { Message } from 'primeng/api';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html'
})
export class MessageComponent implements OnChanges, OnDestroy {

  msgs: Message[] = [];

  @Input() messageType!: number;
  @Output() hideMessageEvent = new EventEmitter<boolean>();

  subscriptor!: Subscription;

  constructor() { }

  ngOnChanges(change: SimpleChanges) {

    console.log('ON-CHANGE - MenssageComponent');
    if (this.messageType == 0) {
      this.msgs.push({ severity: 'success', summary: 'Exitoso', detail: 'Registro almacenado correctamente' });
    }
    if (this.messageType == -1) {
      this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al almacenar el registro' });
    }
    this.setTimeViewMessage();
  }

  ngOnDestroy(): void {

    console.log('DESTROY - MenssageComponent');
    this.subscriptor.unsubscribe();
  }

  private setTimeViewMessage() {

    this.subscriptor = interval(1000).subscribe(second => {
      if (second == 3) {
        this.msgs.pop();
      } else if (second == 4) {
        this.setHideMessageEvent();
      }
    });
  }

  private setHideMessageEvent() {
    this.hideMessageEvent.emit(true);
  }
}
