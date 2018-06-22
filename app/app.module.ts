import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { RealtyTileComponent } from './components/realty-tile.component';
import { RealtyListComponent } from './components/realty-list.component';
import { GoogleMapComponent } from './components/google-map.component';
import { OwnerPageComponent } from './components/owner-page.component';
import { MainPageComponent } from './components/main-page.component';
import { FavouritesListComponent } from './components/favourites-list.component';
import { ViewPanel } from './components/view-panel.component';
import { InterPage } from './components/inter-page.component';
import { LabPage } from './components/lab-page.component';
import { PayPage } from './components/pay.component';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { User } from './classes/user';

const appRoutes: Routes = [
  { path: 'main', component: MainPageComponent , data: {user: User} },
  { path: 'find', component: OwnerPageComponent, data: {user: User}  },
  { path: 'favourite', component: FavouritesListComponent , data: {user: User} },
  { path: 'inter', component: InterPage, data: {user: User} },
  { path: 'pay', component: PayPage , data: {user: User} },
  { path: 'labwork1', component: LabPage },
  { path: 'social',
    redirectTo: '/inter',
    pathMatch: 'full'
    },
  { path: 'paid',
    redirectTo: '/pay?isPaid=true',
    pathMatch: 'full'
    },
  { path: 'fail',
      redirectTo: '/pay?isPaid=false',
      pathMatch: 'full'
      },
  { path: '',
    redirectTo: '/main',
    pathMatch: 'full'
},
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({

  imports:      [ BrowserModule ,
                    HttpModule,
                    JsonpModule,
                    RouterModule.forRoot(appRoutes,  { useHash: true }),
                 ],
  declarations: [ AppComponent ,
                  RealtyTileComponent,
                  RealtyListComponent,
                  GoogleMapComponent,
                  OwnerPageComponent,
                  MainPageComponent,
                  FavouritesListComponent,
                  ViewPanel,
                  InterPage,
                  LabPage,
                  PayPage
                ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
