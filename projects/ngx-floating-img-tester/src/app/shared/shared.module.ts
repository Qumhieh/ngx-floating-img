import { NgModule } from '@angular/core';
import { FitMainWrapperDirective } from './directives/fit-main-wrapper/fit-main-wrapper.directive';

@NgModule({
  declarations: [FitMainWrapperDirective],
  exports: [FitMainWrapperDirective]
})
export class SharedModule { }
