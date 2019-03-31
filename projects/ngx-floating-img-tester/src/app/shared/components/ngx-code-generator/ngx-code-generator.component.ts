import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fit-ngx-code-generator',
  templateUrl: './ngx-code-generator.component.html',
  styleUrls: ['./ngx-code-generator.component.scss']
})
export class NgxCodeGeneratorComponent implements OnInit {

  @Input('thumbSrc') thumbSrc: string;
  @Input('id') id: string;
  @Input('imgSrc') imgSrc: string;
  @Input('imgWidth') imgWidth: string;
  @Input('imgHeight') imgHeight: string;
  @Input('showLoading') showLoading: string;
  @Input('imgAnimationType') imgAnimationType: string;
  @Input('imgAnimationSpeed') imgAnimationSpeed: string;
  @Input('overlayColor') overlayColor: string;
  @Input('overlayAnimation') overlayAnimation: string;
  @Input('overlayDismiss') overlayDismiss: string;
  @Input('thumbBgColor') thumbBgColor: string;
  @Input('vpPadding') vpPadding: string;
  @Input('showCloseButton') showCloseButton: string;
  @Input('disableScroll') disableScroll: boolean;

  @Input('beforeShow') beforeShow: string;
  @Input('afterShow') afterShow: string;
  @Input('onFullImgLoad') onFullImgLoad: string;
  @Input('beforeClose') beforeClose: string;
  @Input('afterClose') afterClose: string;

  constructor() { }

  ngOnInit() { }

}
