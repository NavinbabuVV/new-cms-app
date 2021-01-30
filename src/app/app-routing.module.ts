import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'welcome-slider',
    loadChildren: () => import('./welcome-slider/welcome-slider.module').then(m => m.WelcomeSliderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactPageModule)
  },
  {
    path: 'order-license',
    loadChildren: () => import('./order-license/order-license.module').then(m => m.OrderLicensePageModule)
  },
  {
    path: 'add-to-cart',
    loadChildren: () => import('./add-to-cart/add-to-cart.module').then(m => m.AddToCartPageModule)
  },
  {
    path: 'order-success',
    loadChildren: () => import('./order-success/order-success.module').then(m => m.OrderSuccessPageModule)
  },
  {
    path: 'order-failure',
    loadChildren: () => import('./order-failure/order-failure.module').then(m => m.OrderFailurePageModule)
  },
  {
    path: 'quotation',
    loadChildren: () => import('./quotation/quotation.module').then(m => m.QuotationPageModule)
  },
  {
    path: 'license-key-search',
    loadChildren: () => import('./license-key-search/license-key-search.module').then(m => m.LicenseKeySearchPageModule)
  },
  {
    path: 'petty-cash',
    loadChildren: () => import('./petty-cash/petty-cash.module').then(m => m.PettyCashPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'invoice-payment',
    loadChildren: () => import('./invoice-payment/invoice-payment.module').then(m => m.InvoicePaymentPageModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then(m => m.ProductPageModule)
  },
  {
    path: 'did-number',
    loadChildren: () => import('./did-number/did-number.module').then(m => m.DidNumberPageModule)
  },
  {
    path: 'view-cart',
    loadChildren: () => import('./view-cart/view-cart.module').then(m => m.ViewCartPageModule)
  },
  {
    path: 'view-qutation',
    loadChildren: () => import('./view-qutation/view-qutation.module').then(m => m.ViewQutationPageModule)
  },
  {
    path: 'actual-cost',
    loadChildren: () => import('./actual-cost/actual-cost.module').then(m => m.ActualCostPageModule)
  },
  {
    path: 'quotation-comments',
    loadChildren: () => import('./quotation-comments/quotation-comments.module').then(m => m.QuotationCommentsPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsPageModule)
  },
  {
    path: 'enquiry-management',
    loadChildren: () => import('./enquiry-management/enquiry-management.module').then(m => m.EnquiryManagementPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'reseller-management',
    loadChildren: () => import('./reseller-management/reseller-management.module').then(m => m.ResellerManagementPageModule)
  },
  {
    path: 'enquiry-ticket-assign',
    loadChildren: () => import('./enquiry-ticket-assign/enquiry-ticket-assign.module').then(m => m.EnquiryTicketAssignPageModule)
  },
  {
    path: 'reseller-ticket-assign-page',
    loadChildren: () => import('./reseller-ticket-assign-page/reseller-ticket-assign-page.module').then(m => m.ResellerTicketAssignPagePageModule)
  },
  {
    path: 'global-search',
    loadChildren: () => import('./global-search/global-search.module').then(m => m.GlobalSearchPageModule)
  },
  {
    path: 'global-search-result',
    loadChildren: () => import('./global-search-result/global-search-result.module').then(m => m.GlobalSearchResultPageModule)
  },
  {
    path: 'all-leads',
    loadChildren: () => import('./all-leads/all-leads.module').then(m => m.AllLeadsPageModule)
  },
  {
    path: 'all-lead-result',
    loadChildren: () => import('./all-lead-result/all-lead-result.module').then(m => m.AllLeadResultPageModule)
  }, {
    path: 'customer-special-edit',
    loadChildren: () => import('./customer-special-edit/customer-special-edit.module').then(m => m.CustomerSpecialEditPageModule)
  },
  {
    path: 'my-leads',
    loadChildren: () => import('./my-leads/my-leads.module').then(m => m.MyLeadsPageModule)
  },
  {
    path: 'otppage',
    loadChildren: () => import('./otppage/otppage.module').then(m => m.OtppagePageModule)
  },
  {
    path: 'fingerprint',
    loadChildren: () => import('./fingerprint/fingerprint.module').then(m => m.FingerprintPageModule)
  },
  {
    path: 'newsevents',
    loadChildren: () => import('./newsevents/newsevents.module').then(m => m.NewseventsPageModule)
  },
  {
    path: 'invoice',
    loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoicePageModule)
  },
  {
    path: 'license',
    loadChildren: () => import('./license/license.module').then(m => m.LicensePageModule)
  },
  {
    path: 'credit',
    loadChildren: () => import('./credit/credit.module').then(m => m.CreditPageModule)
  },
  {
    path: 'partnerid',
    loadChildren: () => import('./partnerid/partnerid.module').then(m => m.PartneridPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./terms/terms.module').then(m => m.TermsPageModule)
  },
  {
    path: 'currency',
    loadChildren: () => import('./currency/currency.module').then(m => m.CurrencyPageModule)
  },
  {
    path: 'qrcodelogin',
    loadChildren: () => import('./qrcodelogin/qrcodelogin.module').then(m => m.QrcodeloginPageModule)
  },
  {
    path: 'scanpage',
    loadChildren: () => import('./scanpage/scanpage.module').then(m => m.ScanpagePageModule)
  },
  {
    path: 'prepaid',
    loadChildren: () => import('./prepaid/prepaid.module').then(m => m.PrepaidPageModule)
  },
  {
    path: 'referral',
    loadChildren: () => import('./referral/referral.module').then(m => m.ReferralPageModule)
  },
  {
    path: 'webscan',
    loadChildren: () => import('./webscan/webscan.module').then(m => m.WebscanPageModule)
  },
  {
    path: 'call-history',
    loadChildren: () => import('./call-history/call-history.module').then(m => m.CallHistoryPageModule)
  },
  {
    path: 'extension-list',
    loadChildren: () => import('./extension-list/extension-list.module').then(m => m.ExtensionListPageModule)
  },
  {
    path: 'support-ticket',
    loadChildren: () => import('./support-ticket/support-ticket.module').then( m => m.SupportTicketPageModule)
  },
  {
    path: 'popups',
    loadChildren: () => import('./popups/popups.module').then( m => m.PopupsPageModule)
  },
  {
    path: 'create-ticket',
    loadChildren: () => import('./create-ticket/create-ticket.module').then( m => m.CreateTicketPageModule)
  },
  {
    path: 'view-tickets',
    loadChildren: () => import('./view-tickets/view-tickets.module').then( m => m.ViewTicketsPageModule)
  },
  {
    path: 'listing-payouts',
    loadChildren: () => import('./listing-payouts/listing-payouts.module').then( m => m.ListingPayoutsPageModule)
  },
  {
    path: 'dialler',
    loadChildren: () => import('./dialler/dialler.module').then( m => m.DiallerPageModule)
  },
  {
    path: 'profile-details',
    loadChildren: () => import('./profile-details/profile-details.module').then( m => m.ProfileDetailsPageModule)
  },
  {
    path: 'news-data',
    loadChildren: () => import('./news-data/news-data.module').then( m => m.NewsDataPageModule)
  },
  {
    path: 'proceed-cart',
    loadChildren: () => import('./proceed-cart/proceed-cart.module').then( m => m.ProceedCartPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'today-currency',
    loadChildren: () => import('./today-currency/today-currency.module').then( m => m.TodayCurrencyPageModule)
  },
  {
    path: 'app-settings',
    loadChildren: () => import('./app-settings/app-settings.module').then( m => m.AppSettingsPageModule)
  },
  {
    path: 'acc-manage',
    loadChildren: () => import('./acc-manage/acc-manage.module').then( m => m.AccManagePageModule)
  },
  {
    path: 'renewal',
    loadChildren: () => import('./renewal/renewal.module').then( m => m.RenewalPageModule)
  },
  {
    path: 'gcc',
    loadChildren: () => import('./gcc/gcc.module').then( m => m.GccPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
