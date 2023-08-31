import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartComponent } from './modules/chart/chart.component';
import {ChartInterfaceComponent} from './modules/chart-interface/chart-interface.component';
import {MatButtonModule} from '@angular/material';
import { ChartdureComponent } from './modules/chartdure/chartdure.component';



@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    ChartInterfaceComponent,
    ChartdureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DefaultModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
