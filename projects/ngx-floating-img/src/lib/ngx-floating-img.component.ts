import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';

import { NgxFloatingImgService } from './ngx-floating-img.service';

@Component({
  selector: 'fi-ngx-floating-img',
  templateUrl: './ngx-floating-img.component.html',
  styleUrls: ['./ngx-floating-img.component.css']
})
export class NgxFloatingImgComponent implements OnInit, OnChanges {
  
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  public showFullImgTrigger: boolean = false;
  public showFullImgInProgress: boolean = false;
  public fullImageLoaded: boolean = false;

  public imageRatio: number;
  public imgWrapperStyle: object = {};
  public imgInnerWrapperStyle: object = {};
  public overlayStyle: object = {};

  @Input('id') id: string;
  @Input('imgSrc') imgSrc: string;
  @Input('imgWidth') imgWidth: number;
  @Input('imgHeight') imgHeight: number;
  @Input('showLoading') showLoading: boolean;
  @Input('imgAnimationType') imgAnimationType: string;
  @Input('imgAnimationSpeed') imgAnimationSpeed: number;
  @Input('overlayColor') overlayColor: string;
  @Input('overlayAnimation') overlayAnimation: boolean;
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
    private _ngxFloatingImgService: NgxFloatingImgService
  ) { }

  ngOnInit() {
    // validate inputs
    if (this._ngxFloatingImgService.validateInputs()) {
      // set component default values
      this._ngxFloatingImgService.setComponentDefaultValues(this);
      // set default component style
      this.setComponentStyle();
    }
  }

  private setComponentStyle (): void {
    // set image ratio
    this.imageRatio = this._ngxFloatingImgService.getImgRatio(this.imgWidth, this.imgHeight);
    // set image wrapper padding
    this.imgWrapperStyle = this._ngxFloatingImgService.getVpPadding(this.vpPadding);
    // set inner image wrapper animation
    this.imgInnerWrapperStyle = this._ngxFloatingImgService.getImgTransition(this.imgAnimationSpeed, this.imgAnimationType);
    // set overlay animation
    this.overlayStyle = this._ngxFloatingImgService.getOverlayTransition(this.overlayAnimation, this.imgAnimationSpeed);
  }

  public triggerImg(): void {
    if (!this.showFullImgTrigger) {
      this._ngxFloatingImgService.showFullImg(this);
    } else {
      this._ngxFloatingImgService.closeFullImg();
    }
  }

}