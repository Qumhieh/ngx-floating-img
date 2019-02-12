import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { NgxFloatingImgComponent } from './ngx-floating-img.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgxFloatingImgService } from './ngx-floating-img.service';

export const NGX_FLOATING_IMG_OPTIONS = new InjectionToken<NGXFloatingImgOptions>('ngxfloatingimg default options');

export interface NGXFloatingImgOptions {
    platform: string,
    defaultOptions: {
        showLoading: boolean;
        imgAnimationType: string;
        imgAnimationSpeed: number;
        overlayColor: string;
        overlayAnimationSpeed: number;
        overlayDismiss: boolean;
        thumbBgColor: string;
        vpPadding: number;
    }
}

export const NGXFloatingImgOptions: NGXFloatingImgOptions = {
  platform: '',
    defaultOptions: {
        showLoading: true,
        imgAnimationType: 'ease-out',
        imgAnimationSpeed: 250,
        overlayColor: 'transparent',
        overlayAnimationSpeed: 0,
        overlayDismiss: true,
        thumbBgColor: '#f0f0f0',
        vpPadding: 20
    }
}

@NgModule({
  declarations: [
    NgxFloatingImgComponent
  ],
  imports: [ 
    BrowserModule
  ],
  exports: [
    NgxFloatingImgComponent
  ]
})
export class NgxFloatingImgModule {

  static forRoot(ngxFloatingImgOptions = NGXFloatingImgOptions): ModuleWithProviders {
    return {
      ngModule: NgxFloatingImgModule,
      providers: [
        NgxFloatingImgService,
        { provide: NGX_FLOATING_IMG_OPTIONS, useValue: {} }
      ]
    }
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: NgxFloatingImgModule,
      providers: [ ]
    }
  }

}
