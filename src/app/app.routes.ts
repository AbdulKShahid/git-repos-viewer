import { Routes } from '@angular/router';

export const routes: Routes = [
    
    {
        path: 'repos',
        loadComponent: () => 
            import('./modules/repos/components/repos-list/repos-list.component')
                .then(m => m.ReposListComponent)
    },
     {
        path: 'repos/:id',
        loadComponent: () => 
            import('./modules/commits/components/commits-list/commits-list.component')
                .then(m => m.CommitsListComponent)
    },
];
