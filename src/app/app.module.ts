import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { ChartsModule } from 'ng2-charts';
import { FlexLayoutModule } from "@angular/flex-layout";



import { AppComponent } from './app.component';
import { UtilComponent } from './util/util.component';
import { GraphsComponent } from './graphs/graphs.component';



@NgModule({
  declarations: [
    AppComponent,
    UtilComponent,
    GraphsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
