import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxFloatingImgComponent } from './ngx-floating-img.component';
import { NgxFloatingImgService } from './ngx-floating-img.service';
import { NGX_FLOATING_IMG_OPTIONS_TOKEN, NGX_FLOATING_IMG_DEFAULT_OPTIONS, NGX_FI_WINDOW, NGX_FLOATING_IMG_CLIENT_OPTIONS_TOKEN } from './ngx-floating-img';
import { NGXFloatingImgOptions } from './model/ngx-floating-img-options';
import { DeviceDetectorService } from './device-detector.service';
import { MobileTouchService } from './mobile-touch.service';

export function ngxFIWindowFactory () {
  return typeof window !== 'undefined' && window.document ? window : undefined;
}

export function ngxFIOptionsFactory (ngxFloatingImgOptions: NGXFloatingImgOptions) {
  return Object.assign({}, NGX_FLOATING_IMG_DEFAULT_OPTIONS, ngxFloatingImgOptions);
}

@NgModule({
  declarations: [
    NgxFloatingImgComponent
  ],
  imports: [ 
    CommonModule
  ],
  exports: [
    NgxFloatingImgComponent
  ]
})
export class NgxFloatingImgModule {

  static forRoot(ngxFloatingImgOptions: NGXFloatingImgOptions = {}): ModuleWithProviders {
    return {
      ngModule: NgxFloatingImgModule,
      providers: [
        NgxFloatingImgService,
        DeviceDetectorService,
        MobileTouchService,
        { provide: NGX_FLOATING_IMG_CLIENT_OPTIONS_TOKEN, useValue: ngxFloatingImgOptions, multi: false },
        { provide: NGX_FLOATING_IMG_OPTIONS_TOKEN, useFactory: ngxFIOptionsFactory, deps: [NGX_FLOATING_IMG_CLIENT_OPTIONS_TOKEN]},
        { provide: NGX_FI_WINDOW, useFactory: ngxFIWindowFactory }
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
