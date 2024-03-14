import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { NgForOf, NgIf } from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';


@Component({
    selector: 'app-dictionary',
    standalone: true,
    imports: [
        MatSlideToggleModule,
        FormsModule,
        HttpClientModule,
        HttpClientModule,
        NgForOf,
        NgIf,
        MatButton,
        MatInput,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        MatCard,
        MatFormField
    ],
    templateUrl: './dictionary.component.html',
    styleUrl: './dictionary.component.css'
})

export class DictionaryComponent {
    public searchWords: string = '';
    results: any[] = [];
    public notFound: boolean = false;
    public buttonDisabled : boolean = false;


    constructor(private http: HttpClient) {
    }


    fetchWord() {
        this.buttonDisabled = true;
        this.http.get<any[]>('https://api.dictionaryapi.dev/api/v2/entries/en/' + this.searchWords)
            .subscribe(
                {
                    next: (data: any) => {
                        this.results = data;
                        this.notFound = false;
                        this.buttonDisabled = false;
                        console.log(data);
                    },
                    error: (err: any) => {
                        this.notFound = (err.status === 404);
                        this.buttonDisabled = false;
                        console.log(err);
                    }
                }
            )
    }


}

