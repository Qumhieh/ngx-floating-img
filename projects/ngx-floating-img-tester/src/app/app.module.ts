import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxFloatingImgModule } from 'projects/ngx-floating-img/src/public_api';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { HeaderComponent } from './features/header/header.component';
import { ExamplesComponent } from './features/examples/examples.component';
import { ApiComponent } from './features/api/api.component';
import { FooterComponent } from './features/footer/footer.component';
import { HomeComponent } from './features/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ExamplesComponent,
    ApiComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    NgxFloatingImgModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
