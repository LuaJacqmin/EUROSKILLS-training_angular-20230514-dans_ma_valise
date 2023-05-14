import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { ValiseTabComponent } from './valise-tab/valise-tab.component';

@NgModule({
  declarations: [
    AppComponent,
    ValiseTabComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
