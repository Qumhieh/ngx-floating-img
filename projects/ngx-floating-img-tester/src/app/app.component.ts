import { Component, AfterViewChecked, DoCheck } from '@angular/core';

@Component({
  selector: 'fit-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx-floating-img-tester';

  public testColor = '#555';

  constructor() {
    setTimeout(() => {
      this.testColor = '#cd3232';
    }, 3000); 
  }
}
