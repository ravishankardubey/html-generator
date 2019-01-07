import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HtmlGeneratorComponent } from './html-generator/html-generator.component';
import { ClipboardModule } from 'ngx-clipboard';
import { AppRoutingModule } from './app-routing.module';
import { LovsCheckComponent } from './lovs-check/lovs-check.component';

@NgModule({
  declarations: [
    AppComponent,
    HtmlGeneratorComponent,
    LovsCheckComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ClipboardModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
