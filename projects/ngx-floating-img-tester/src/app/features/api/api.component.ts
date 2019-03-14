import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'fit-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {

  constructor(private _titleService: Title) { 
    this._titleService.setTitle('ngx-floating-img API');
  }

  ngOnInit() { }

}
