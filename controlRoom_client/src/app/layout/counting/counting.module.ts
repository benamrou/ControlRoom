import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { CountingComponent } from './counting.component';
import { PanelModule, DataTableModule, MultiSelectModule,ButtonModule, TabMenuModule,TabViewModule, DialogModule,
         MessagesModule, GrowlModule, DataGridModule, AccordionModule,  CalendarModule } from '../../shared/components/index';
import { AlertModule } from 'ngx-bootstrap/';
import { CountingRoutingModule } from './counting-routing.module';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule, PanelModule, AlertModule, TabMenuModule, TabViewModule,DialogModule,
               DataTableModule,MultiSelectModule, ButtonModule, DataGridModule, AccordionModule,CalendarModule,
               MessagesModule, GrowlModule,
               CountingRoutingModule, PageHeaderModule ],
    declarations: [CountingComponent],
    exports: [CountingComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CountingModule { }
