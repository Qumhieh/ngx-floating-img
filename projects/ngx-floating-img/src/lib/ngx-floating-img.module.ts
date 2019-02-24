import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxFloatingImgComponent } from './ngx-floating-img.component';
import { NgxFloatingImgService } from './ngx-floating-img.service';
import { NGX_FLOATING_IMG_OPTIONS_TOKEN, NGX_FLOATING_IMG_DEFAULT_OPTIONS, NGX_FI_WINDOW } from './ngx-floating-img';
import { NGXFloatingImgOptions } from './model/ngx-floating-img-options';

export function ngxFIWindowFactory () {
  return typeof window !== 'undefined' && window.document ? window : undefined;
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

  static forRoot(ngxFloatingImgOptions?: NGXFloatingImgOptions): ModuleWithProviders {
     return {
      ngModule: NgxFloatingImgModule,
      providers: [
        NgxFloatingImgService,
        { provide: NGX_FLOATING_IMG_OPTIONS_TOKEN, useValue: Object.assign({}, NGX_FLOATING_IMG_DEFAULT_OPTIONS, ngxFloatingImgOptions) },
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
