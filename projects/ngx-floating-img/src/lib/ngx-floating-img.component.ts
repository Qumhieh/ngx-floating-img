import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fi-ngx-floating-img',
  templateUrl: './ngx-floating-img.component.html',
  styles: ['./ngx-floating-img.component.css']
})
export class NgxFloatingImgComponent implements OnInit {

  @Input('mainImgSrc') mainImgSrc: string;
  @Input('imgRation') imgRatio: number;
  @Input('animationSpeed') animationSpeed: number = 1;
  @Input('lazyLoad') lazyLoad: boolean = true;
  @Input('loadingBar') loadingBar: boolean = true;
  @Input('showBG') showBG: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
