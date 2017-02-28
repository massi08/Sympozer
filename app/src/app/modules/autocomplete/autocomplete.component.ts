import {Component, OnInit, Input} from '@angular/core';
import {Conference} from '../../model/conference';
import {DataLoaderService} from '../../data-loader.service';
import {Router} from '@angular/router';

import {LocalDAOService} from  '../../localdao.service';
import {DBLPDataLoaderService} from "../../dblpdata-loader.service";
import {Subject} from "rxjs";

@Component({
    selector: 'app-autocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
    @Input() items: Object;
    itemsFound = [];
    searchTerms = new Subject<string>();
    hasItem: boolean;
    hasSearchValue: boolean;

    constructor(private router: Router,
                private dataLoaderService: DataLoaderService,
                private DaoService: LocalDAOService,
                private  dBPLDataLoaderService: DBLPDataLoaderService) {
    }

    ngOnInit() {
        this.searchTerms.debounceTime(300)
            .distinctUntilChanged()
            .switchMap(term => term)
    }

    search(term: string): void {
        this.searchTerms.next(term);
        this.itemsFound.length = 0;
        if (term !== "") {
            this.findItem(term);
        }
    }

    findItem(term: string): void {
        let isMatch = false;
        for (var key in this.items) {
            let match = this.items[key].name.toUpperCase().match(term.toUpperCase());
            if (match) {
                isMatch = true;
                this.hasItem = true;
                let itemClone = JSON.parse(JSON.stringify(this.items[key]));
                let lastIndex = match.index + term.length;
                itemClone.htmlName = itemClone.name.slice(0, match.index) + '<b>' + itemClone.name.slice(match.index, lastIndex) + '</b>' + itemClone.name.slice(lastIndex);
                this.itemsFound.push(itemClone);
            }
        }
        if (term.trim() !== "") {
            this.hasSearchValue = true;
            if (!isMatch) {
                this.hasItem = false;
            }
        }

        else {
            this.hasSearchValue = false;
        }
    }
}
