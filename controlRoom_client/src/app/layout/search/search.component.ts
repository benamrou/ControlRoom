import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { SelectItem, Chips, Message } from '../../shared/components/index';
import { SearchService } from '../../shared/services/index';
import { ItemComponent } from '../../shared/cards/';

export class SearchResultFormat {
  COL1?;
  COL2?;
  COL3?;
  COL4?;
  COL5?;
  COL6?;
}

@Component({
	moduleId: module.id,
    selector: 'search-cmp',
    templateUrl: './search.component.html',
    providers: [SearchService],
    styleUrls: ['./search.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class SearchComponent {

  // Search action
   values: string [] = [];
   msgs: Message[] = [];

  // Search result 
   searchResult : any [] = [];
   columnsResult: any [] = [];

   // Selected element
   selectedElement: SearchResultFormat = {};
   searchButtonEnable: boolean = true; // Disable the search button when clicking on search in order to not overload queries

   // Indicator to check the first research
   performedResearch: boolean = false;

  // Indicator for sub-panel detail
  itemDetail: boolean = false;


  constructor(private _searchService: SearchService) {
    this.columnsResult = [
      { field: 'COL1', header: 'Data type' },
      { field: 'COL3', header: 'Reference' },
      { field: 'COL4', header: 'Information' },
      { field: 'COL5', header: 'Status' },
      { field: 'COL6', header: 'Type' },
    ];
  }
  

  search() {
    this.razSearch();
    this.msgs.push({severity:'info', summary:'Info Message', detail: 'Looking for the elements : ' + JSON.stringify(this.values)});
    this.searchButtonEnable = false; 
    this._searchService.getResult(this.values)
            .subscribe( 
                data => { this.searchResult = data; }, // put the data returned from the server in our variable
                error => {
                      console.log('Error HTTP GET Service ' + error + JSON.stringify(error)); // in case of failure show this message
                      this.msgs.push({severity:'error', summary:'ERROR Message', detail: error });
                },
                () => { 
                  this.msgs.push({severity:'warn', summary:'Info Message', detail: 'Retrieved ' + 
                                     this.searchResult.length + ' reference(s).'});
                      this.performedResearch = true;
                      this.searchButtonEnable = true;
                }
            );
  }

  clickItemDetail() {
    this.msgs.push({severity:'info', summary:'Info Message', detail: 'Retrieving item details ' + this.selectedElement.COL3});
    
    this.itemDetail = true; 
  }

  razSearch () {
    this.searchResult = [];
    this.selectedElement = {};
    this.itemDetail = false; 
  }
}