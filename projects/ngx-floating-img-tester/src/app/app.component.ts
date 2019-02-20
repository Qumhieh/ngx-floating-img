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
    console.log('channngggeeeeddd');
  }

  test(event) {
  }

}
