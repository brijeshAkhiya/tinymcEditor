import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EditorModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatTabsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
