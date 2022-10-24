import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './components/notification/notification/notification.component';
import { NotificationService } from './notification.service';


@NgModule({
  declarations: [
    NotificationComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    NotificationService
  ]
})
export class NotificationModule {
  /*static forRoot(): ModuleWithProviders<NotificationModule>{
    return  {
      ngModule: NotificationModule,
      providers: [
        NotificationService
      ]
    };
  }*/
}
