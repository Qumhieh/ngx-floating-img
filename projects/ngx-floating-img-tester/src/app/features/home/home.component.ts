import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'fit-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private _titleService: Title) {
    this._titleService.setTitle('ngx-floating-img Home');
  }

}
