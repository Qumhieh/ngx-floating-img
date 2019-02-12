import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, EventEmitter, Output } from '@angular/core';

import { NgxFloatingImgService } from './ngx-floating-img.service';

@Component({
  selector: 'fi-ngx-floating-img',
  templateUrl: './ngx-floating-img.component.html',
  styleUrls: ['./ngx-floating-img.component.css']
})
export class NgxFloatingImgComponent implements OnInit {
  
  public showFullImgTrigger: boolean = false;
  public imageRatio: number;

  @Input('id') id: string;
  @Input('imgSrc') imgSrc: string;
  @Input('imgWidth') imgWidth: number;
  @Input('imgHeight') imgHeight: number;
  @Input('showLoading') showLoading: boolean = true;
  @Input('imgAnimationType') imgAnimationType: string = 'ease-out';
  @Input('imgAnimationSpeed') imgAnimationSpeed: number = 250;
  @Input('overlayColor') overlayColor: string = 'transparent';
  @Input('overlayAnimationSpeed') overlayAnimationSpeed: number = 0;
  @Input('overlayDismiss') overlayDismiss: boolean = true;
  @Input('thumbBgColor') thumbBgColor: string = '#f0f0f0';
  @Input('vpPadding') vpPadding: number = 20;
  // TODO: @Input('thumbLazyLoad') thumbLazyLoad: boolean = true;
  // TODO: @Input('navigation') navigation: boolean = false;

  @Output('beforeShow') beforeShow = new EventEmitter<string>();
  @Output('afterShow') afterShow = new EventEmitter<string>();
  @Output('onFullImgLoad') onFullImgLoad = new EventEmitter<string>();
  @Output('beforeClose') beforeClose = new EventEmitter<string>();
  @Output('afterClose') afterClose = new EventEmitter<string>();

  @ViewChild('imgFigure') imgFigure: ElementRef;
  @ViewChild('imgWrapper') imgWrapper: ElementRef;
  @ViewChild('imgInnerWrapper') imgInnerWrapper: ElementRef;

  constructor(
    private _renderer: Renderer2,
    private _ngxFloatingImgService : NgxFloatingImgService
  ) { }

  ngOnInit() {
    // validate inputs
    this._ngxFloatingImgService.validateInputs();
    // set image ratio
    this.imageRatio = this._ngxFloatingImgService.getImgRatio(this.imgWidth, this.imgHeight);
  }






  public showFullImg(): void {
    if (!this.showFullImgTrigger) {
      window.requestAnimationFrame(() => {
        this.showFullImgTrigger = true;   
          this._renderer.setStyle(this.imgInnerWrapper.nativeElement, 'position', 'relative');
          this._renderer.setStyle(this.imgInnerWrapper.nativeElement, 'width', '500px');
          this._renderer.setStyle(this.imgInnerWrapper.nativeElement, 'left', this.imgFigure.nativeElement.getBoundingClientRect().left - 10 + 'px');
          this._renderer.setStyle(this.imgInnerWrapper.nativeElement, 'top', this.imgFigure.nativeElement.getBoundingClientRect().top - 10 + 'px');
          console.log(this.imgWrapper.nativeElement.width);
          window.requestAnimationFrame(() => {
            console.log(this.imgWrapper.nativeElement.width);
            this._renderer.setStyle(this.imgInnerWrapper.nativeElement, 'position', 'relative');
            this._renderer.setStyle(this.imgInnerWrapper.nativeElement, 'width', '500px');
            this._renderer.setStyle(this.imgInnerWrapper.nativeElement, 'left', '50%');
            this._renderer.setStyle(this.imgInnerWrapper.nativeElement, 'top', '50%');
            this._renderer.setStyle(this.imgInnerWrapper.nativeElement, 'transform', 'translate(-50%,-50%) scale(2.2,2.2)');
          });
        });
     
    } else {
      
      this._renderer.setStyle(this.imgInnerWrapper.nativeElement, 'position', 'relative');
    this._renderer.setStyle(this.imgInnerWrapper.nativeElement, 'width', '500px');
    this._renderer.setStyle(this.imgInnerWrapper.nativeElement, 'left', this.imgFigure.nativeElement.getBoundingClientRect().left - 10 + 'px');
    this._renderer.setStyle(this.imgInnerWrapper.nativeElement, 'top', this.imgFigure.nativeElement.getBoundingClientRect().top - 10 + 'px');
    this._renderer.setStyle(this.imgInnerWrapper.nativeElement, 'transform', 'translate(0,0) scale(1,1)');
    setTimeout(() => {
      this.showFullImgTrigger = false
      this._renderer.setStyle(this.imgInnerWrapper.nativeElement, 'position', 'static');
      this._renderer.setStyle(this.imgInnerWrapper.nativeElement, 'left', 'auto');
    this._renderer.setStyle(this.imgInnerWrapper.nativeElement, 'top', 'auto');
    this._renderer.setStyle(this.imgInnerWrapper.nativeElement, 'transform', 'translate(0,0) scale(1,1)');
    }, 200)

    }
    
    
  }

}
