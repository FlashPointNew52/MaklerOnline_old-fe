"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var realty_tile_component_1 = require("./components/realty-tile.component");
var realty_list_component_1 = require("./components/realty-list.component");
var google_map_component_1 = require("./components/google-map.component");
var owner_page_component_1 = require("./components/owner-page.component");
var main_page_component_1 = require("./components/main-page.component");
var favourites_list_component_1 = require("./components/favourites-list.component");
var view_panel_component_1 = require("./components/view-panel.component");
var inter_page_component_1 = require("./components/inter-page.component");
var lab_page_component_1 = require("./components/lab-page.component");
var pay_component_1 = require("./components/pay.component");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var user_1 = require("./classes/user");
var appRoutes = [
    { path: 'main', component: main_page_component_1.MainPageComponent, data: { user: user_1.User } },
    { path: 'find', component: owner_page_component_1.OwnerPageComponent, data: { user: user_1.User } },
    { path: 'favourite', component: favourites_list_component_1.FavouritesListComponent, data: { user: user_1.User } },
    { path: 'inter', component: inter_page_component_1.InterPage, data: { user: user_1.User } },
    { path: 'pay', component: pay_component_1.PayPage, data: { user: user_1.User } },
    { path: 'labwork1', component: lab_page_component_1.LabPage },
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
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule,
            http_1.HttpModule,
            http_1.JsonpModule,
            router_1.RouterModule.forRoot(appRoutes, { useHash: true }),
        ],
        declarations: [app_component_1.AppComponent,
            realty_tile_component_1.RealtyTileComponent,
            realty_list_component_1.RealtyListComponent,
            google_map_component_1.GoogleMapComponent,
            owner_page_component_1.OwnerPageComponent,
            main_page_component_1.MainPageComponent,
            favourites_list_component_1.FavouritesListComponent,
            view_panel_component_1.ViewPanel,
            inter_page_component_1.InterPage,
            lab_page_component_1.LabPage,
            pay_component_1.PayPage
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map