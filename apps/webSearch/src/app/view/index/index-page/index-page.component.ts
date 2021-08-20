import { Component, OnInit } from '@angular/core';
import {GoogleWebSearchService} from "../../../service/googleWebSearch/googleWebSearch.service";
import {WebSearchModel} from "../../../model/webSearch/webSearch.model";
import {FormControl} from "@angular/forms";
import {ElementQueries} from "css-element-queries";

@Component({
  selector: 'webSearch-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {

  initialized = false;
  searchData: WebSearchModel[] = [];

  loading = false;

  searchFormControl: FormControl = new FormControl();
  pagesNumberFormControl: FormControl = new FormControl(1);

  constructor(
    private googleWebSearchService: GoogleWebSearchService
  ) {
    ElementQueries.init();
  }

  ngOnInit(): void {
  }

  search(){
    this.loading = true;

    if(this.searchFormControl.value){
      this.googleWebSearchService.getSearch(
        {
                      searchText: this.searchFormControl.value,
                      pagesNumber: this.pagesNumberFormControl.value
                   }
        ).subscribe(res => {
        this.initialized = true;
        this.searchData = res['data'];
        this.loading = false;
      })
    }else{
      this.searchData = [];
      this.loading = false;
    }
  }

  checkPagesNumber(){
    if(this.pagesNumberFormControl.value && this.pagesNumberFormControl.value < 1){
      this.pagesNumberFormControl.setValue(1)
    }
  }

}
