import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'fit-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss']
})
export class ExamplesComponent implements OnInit {

  constructor(private _titleService: Title) { 
    this._titleService.setTitle('ngx-floating-img Examples');
  }

  ngOnInit() { }

  public showMessage(message: string): void {
    console.log(message);
  }

}
