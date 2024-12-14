import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { ColorComponent } from './components/color/color.component';
import { FrontComponent } from './templates/front/front.component';
import { AdminComponent } from './templates/admin/admin.component';
import { LoginComponent } from './auth/login/login.component';
import { NF404Component } from './components/nf404/nf404.component';
import { RhComponent } from './optimizationPattern/rh/rh.component';
import { CustomPreloadingStrategy } from './custom-preloading.strategy';
import { ProductsComponent } from './products/products.component';
import { MasterDetailsCvComponent } from './cv/master-details-cv/master-details-cv.component';
import { DetailsCvComponent } from './cv/details-cv/details-cv.component';

const routes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'rh', component: RhComponent },
  { path: 'products', component: ProductsComponent },
  {
    path: 'cv',
    loadChildren: () => import('./cv/cv.module').then((m) => m.CvModule),
    data: { preload: true },
  },
  {
    path: '',
    component: FrontComponent,
    children: [
      {
        path: 'todo',
        loadChildren: () =>
          import('./todo/todo.module').then((m) => m.TodoModule),
      },
    ],
  },
  {
    path: 'master-details',
    component: MasterDetailsCvComponent,
    children: [
      {
        path: ':id',
        component: DetailsCvComponent,
      },
    ],
  },
  {
    path: "admin",
    component: AdminComponent,
    children: [{ path: "color", component: ColorComponent }],
  },
  { path: '**', component: NF404Component },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomPreloadingStrategy,
    }),
  ],
  exports: [RouterModule],
  providers: [CustomPreloadingStrategy],
})
export class AppRoutingModule {}
