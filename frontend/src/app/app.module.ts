import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import {AppComponent} from './app.component'
import {TableComponent} from './components/table/table.component'
import {ModalComponent} from './components/modal/modal.component'
import {FocusDirective} from './directives/focus.directive'
import {ChangePipe} from './pipes/changeModal.pipe'
import {FilteredPipe} from './pipes/filtered.pipe'
import {ChangeModalComponent} from './components/change-modal/change-modal.component'
import {Routes, RouterModule} from '@angular/router'
import {TablePageComponent} from './components/table-page/table-page.component'
import {ErrorPageComponent} from './components/error-page/error-page.component'
import {RegisterComponent} from './components/register/register.component'
import {EntryComponent} from './components/entry/entry.component'
import {HttpClientModule} from '@angular/common/http'
import {DeleteComponent} from './components/delete/delete.component'
import {NotificationComponent} from './components/notification/notification.component'

const appRoutes: Routes = [
  { path: 'entry', component: EntryComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'crm', component: TablePageComponent },
  { path: '**', component: ErrorPageComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ModalComponent,
    FocusDirective,
    ChangePipe,
    FilteredPipe,
    ChangeModalComponent,
    TablePageComponent,
    ErrorPageComponent,
    RegisterComponent,
    EntryComponent,
    DeleteComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
