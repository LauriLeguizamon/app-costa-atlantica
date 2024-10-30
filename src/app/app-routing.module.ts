import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/tour/tour.module').then((m) => m.TourPageModule),
  },
  {
    path: 'tour/:tourId',
    loadChildren: () =>
      import('./pages/tour-detail/tour-detail.module').then(
        (m) => m.TourDetailPageModule
      ),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
