import { NgModule } from '@angular/core';
import { FitMainWrapperDirective } from './directives/fit-main-wrapper/fit-main-wrapper.directive';
import { FitSectionComponent } from './components/fit-section/fit-section.component';
import { NgxFloatingImgModule } from 'projects/ngx-floating-img/src/public_api';
import { NgxCodeGeneratorComponent } from './components/ngx-code-generator/ngx-code-generator.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    NgxFloatingImgModule.forRoot()
  ],
  declarations: [
    FitMainWrapperDirective, 
    FitSectionComponent, 
    NgxCodeGeneratorComponent
  ],
  exports: [
    NgxFloatingImgModule,
    FitMainWrapperDirective, 
    FitSectionComponent,
    NgxCodeGeneratorComponent
  ]
})
export class SharedModule { }
