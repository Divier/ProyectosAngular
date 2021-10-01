import { NgModule } from '@angular/core';

// PrimeNg
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ListboxModule } from 'primeng/listbox';
import { ToolbarModule } from 'primeng/toolbar';
import { SidebarModule } from 'primeng/sidebar';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  exports: [
    InputTextModule,
    CardModule,
    CalendarModule,
    FieldsetModule,
    ButtonModule,
    InputNumberModule,
    TableModule,
    MessagesModule,
    MessageModule,
    TabViewModule,
    TooltipModule,
    ConfirmPopupModule,
    ListboxModule,
    ToolbarModule,
    SidebarModule,
    RippleModule
  ]
})
export class PrimengModule { }
