import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
  path: '', 
  component: TabsPage,
  children: [
  {
  path: 'all-leads',
  children: [
  {
  path: '',
  loadChildren: () => import('../all-leads/all-leads.module').then( m => m.AllLeadsPageModule) 
  }
  ]
  },
    {
  path: 'reseller-management',
  children: [
  {
 path: '',
  loadChildren: () => import('../reseller-management/reseller-management.module').then( m => m.ResellerManagementPageModule)
  }
  ]
  },
  {
  path: 'enquiry-management',
  children: [
  {
 path: '',
  loadChildren: () => import('../enquiry-management/enquiry-management.module').then( m => m.EnquiryManagementPageModule)
  }
  ]
  },
  {
    path: 'my-leads',
    children: [
    {
   path: '',
    loadChildren: () => import('../my-leads/my-leads.module').then( m => m.MyLeadsPageModule)
    }
    ]
    },
  {
  path: '',
  redirectTo: '/tabs/all-leads',
  pathMatch: 'full'
  }
  ]
  },
  {
  path: '',
  redirectTo: '/tabs/all-leads',
  pathMatch: 'full'
  }


  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
