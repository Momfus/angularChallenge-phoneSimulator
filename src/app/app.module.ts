import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './shared/angular-material.module';
import { SharedComponentsModule } from './shared/components/shared-components.module';

import { HomeComponent } from './pages/home/home.component';
import { ContactCardComponent } from './components/contact-card/contact-card.component';
import { FormAddContactComponent } from './components/form-add-contact/form-add-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactCardComponent,
    FormAddContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedComponentsModule,
    AngularMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
