import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, EventEmitter, Output, Inject } from '@angular/core';

import { NgxFloatingImgService } from './ngx-floating-img.service';
import { NGX_FLOATING_IMG_OPTIONS_TOKEN } from './ngx-floating-img';
import { NGXFloatingImgOptions } from './model/ngx-floating-img-options';

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
  @Input('showLoading') showLoading: boolean;
  @Input('imgAnimationType') imgAnimationType: string;
  @Input('imgAnimationSpeed') imgAnimationSpeed: number;
  @Input('overlayColor') overlayColor: string;
  @Input('overlayAnimationSpeed') overlayAnimationSpeed: number;
  @Input('overlayDismiss') overlayDismiss: boolean;
  @Input('thumbBgColor') thumbBgColor: string;
  @Input('vpPadding') vpPadding: number;
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
    private _ngxFloatingImgService: NgxFloatingImgService,
    @Inject(NGX_FLOATING_IMG_OPTIONS_TOKEN) private _ngxFloatingImgOptions: NGXFloatingImgOptions
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
