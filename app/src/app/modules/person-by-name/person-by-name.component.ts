import { Component, OnInit } from '@angular/core';
import {Conference} from '../../model/conference';
import {DataLoaderService} from '../../data-loader.service';
import {Router} from '@angular/router';

import {LocalDAOService} from  '../../localdao.service';
import {DBLPDataLoaderService} from "../../dblpdata-loader.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-person-by-name',
  templateUrl: './person-by-name.component.html',
  styleUrls: ['./person-by-name.component.scss']
})
export class PersonByNameComponent implements OnInit {
  persons;
  personsFound = [];
  searchTerms = new Subject<string>();
  constructor(private router: Router,
              private dataLoaderService: DataLoaderService,
              private DaoService: LocalDAOService,
              private  dBPLDataLoaderService: DBLPDataLoaderService) { }

  ngOnInit() {
    this.persons = this.DaoService.query("getAllPersons", null);
    this.searchTerms.debounceTime(300)
                    .distinctUntilChanged()
                    .switchMap(term => term)
  }

  search(term: string): void {
    console.log(term);
    this.searchTerms.next(term);
    this.personsFound.length = 0;
    if (term !== ""){
      this.findPerson(term);
    }
    console.log(this.personsFound);
  }

  findPerson(term: string): void{
    for(var key in this.persons){
      if(this.persons[key].name.toUpperCase().match(term.toUpperCase())){
        this.personsFound.push(this.persons[key]);
      }
    }
  }
}
