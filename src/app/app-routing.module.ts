import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
    {
        path: 'routes',
        loadChildren: () => import('./routes/routes.module').then(m => m.RoutesPageModule)
    },  {
    path: 'rendered-routes',
    loadChildren: () => import('./rendered-routes/rendered-routes.module').then( m => m.RenderedRoutesPageModule)
  }

<<<<<<< HEAD
const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'routes',
        loadChildren: () =>
            import('./routes/routes.module').then(m => m.RoutesPageModule)
    },
    {
        path: 'rendered-routes',
        loadChildren: () =>
            import('./rendered-routes/rendered-routes.module').then(
                m => m.RenderedRoutesPageModule
            )
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
=======

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
>>>>>>> ffffbc6a19a0b9bc92329e630d504fe25f512b4f
