import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fit-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss']
})
export class ExamplesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public showMessage(message: string): void {
    console.log(message);
  }

}
