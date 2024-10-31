import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/hotel/hotel.module').then((m) => m.TourPageModule),
  },
  {
    path: 'hotel/:hotelId',
    loadChildren: () =>
      import('./pages/hotel-detail/hotel-detail.module').then(
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
