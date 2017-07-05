import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule }  from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search.component';
import { DataTableModule, MultiSelectModule, ButtonModule, ChipsModule,
         MessagesModule, GrowlModule,
        TooltipModule } from '../../shared/components/index';

import { ItemModule } from '../../shared/index';
import { SearchRoutingModule } from './search-routing.module';
import { StatModule } from '../../shared';

@NgModule({
    imports: [ RouterModule,HttpModule, CommonModule,FormsModule,
               DataTableModule,MultiSelectModule,
               ButtonModule, ChipsModule, 
               MessagesModule, GrowlModule,
               TooltipModule, ItemModule,
               StatModule,
               SearchRoutingModule ],
    declarations: [SearchComponent],
    exports: [SearchComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SearchModule { }