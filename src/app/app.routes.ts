import { Routes } from '@angular/router';
import { LayoutComponent } from "./layout/layout.component";

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'users',
        loadComponent: () => import('./user-list/user-list.component').then(c => c.UserListComponent)
      }
    ]
  }
];
