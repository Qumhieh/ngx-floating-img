import { NgModule } from '@angular/core';
import { FitMainWrapperDirective } from './directives/fit-main-wrapper/fit-main-wrapper.directive';
import { FitSectionComponent } from './components/fit-section/fit-section.component';
import { NgxFloatingImgModule } from 'projects/ngx-floating-img/src/public_api';

@NgModule({
  imports: [
    NgxFloatingImgModule.forRoot()
  ],
  declarations: [
    FitMainWrapperDirective, 
    FitSectionComponent
  ],
  exports: [
    NgxFloatingImgModule,
    FitMainWrapperDirective, 
    FitSectionComponent
  ]
})
export class SharedModule { }
