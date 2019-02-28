import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fit-section',
  templateUrl: './fit-section.component.html',
  styleUrls: ['./fit-section.component.scss']
})
export class FitSectionComponent implements OnInit {

  @Input('title') title: string;

  constructor() { }

  ngOnInit() { }

}
