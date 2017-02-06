import {Component, OnInit} from '@angular/core';
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
                private  dBPLDataLoaderService: DBLPDataLoaderService) {
    }

    ngOnInit() {
        this.persons = this.DaoService.query("getAllPersons", null);
        this.searchTerms.debounceTime(300)
            .distinctUntilChanged()
            .switchMap(term => term)
    }

    search(term: string): void {
        this.searchTerms.next(term);
        this.personsFound.length = 0;
        if (term !== "") {
            this.findPerson(term);
        }
    }

    findPerson(term: string): void {
        let hasMatch = false;
        for (var key in this.persons) {
            let match = this.persons[key].name.toUpperCase().match(term.toUpperCase());
            if (match) {
                hasMatch = true;
                let personClone = JSON.parse(JSON.stringify(this.persons[key]));
                let lastIndex = match.index + term.length;
                personClone.htmlName = personClone.name.slice(0, match.index) + '<b>' + personClone.name.slice(match.index, lastIndex) + '</b>' + personClone.name.slice(lastIndex);
                this.personsFound.push(personClone);
            }
        }
        if (!hasMatch && term.trim() !== "") {
            let notFoundObject = {
                id: "#",
                name: "#",
                htmlName: "&laquo;<b>" + term + "</b>&raquo; not found."
            };
            this.personsFound.push(notFoundObject);
        }
    }
}
