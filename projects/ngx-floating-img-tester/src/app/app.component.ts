import { Component, AfterViewChecked, DoCheck } from '@angular/core';

@Component({
  selector: 'fit-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  title = 'ngx-floating-img-tester';

  public testColor = '#555';

  constructor() {}

  ngDoCheck() {
    // console.log('channngggeeeeddd');
  }

  beforeShow(event) {
    console.log('beforeShow' + event);
  }
  afterShow(event) {
    console.log('afterShow' + event);
  }
  onFullImgLoad(event) {
    console.log('onFullImgLoad' + event);
  }
  beforeClose(event) {
    console.log('beforeClose' + event);
  }
  afterClose(event) {
    console.log('afterClose' + event);
  }

}
