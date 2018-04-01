import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ModalFormComponent } from './modal.form.component';
import { MarkService } from './mark.service';
import { WindowRef } from './window-ref';

@NgModule({
  declarations: [
    AppComponent,
    ModalFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [WindowRef, MarkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
