const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // Home
      { path: '', name: 'home', component: () => import('pages/home/IndexPage.vue') },
      { path: 'categories', name: 'home.categories', component: () => import('pages/home/CategoriesPage.vue') },
      { path: 'explore', name: 'home.explore', component: () => import('pages/home/ExplorePage.vue') },
      { path: 'category', name: 'home.category', component: () => import('src/pages/home/CategoriesPage.vue') },
      { path: 'category/:slug', name: 'home.category.show', component: () => import('pages/home/ShowCategoryPage.vue') },
      { path: 'product/:slug', name: 'home.showproduct', component: () => import('pages/home/ShowProductPage.vue') },
      { path: 'cart', name: 'home.cart', meta: { requiresAuth: true, roles: ['Admin', 'Mitra', 'Customer'] }, component: () => import('pages/home/CartPage.vue') },
      { path: 'transaction/:invoice', name: 'home.transaction', meta: { requiresAuth: true, roles: ['Admin', 'Mitra', 'Customer'] }, component: () => import('pages/home/TransactionPage.vue') },
      { path: 'profile', name: 'home.profile', meta: { requiresAuth: true, roles: ['Admin', 'Mitra', 'Customer'] }, component: () => import('pages/home/ProfilePage.vue') },
      {
        path: 'order',
        component: () => import('layouts/OrderLayout.vue'),
        meta: { requiresAuth: true, roles: ['Admin', 'Mitra', 'Customer'] },
        children: [
          { path: '', name: 'home.order', component: () => import('src/pages/home/order/AllPage.vue') },
          { path: 'notyetpaid', name: 'home.order.notyetpaid', component: () => import('src/pages/home/order/NotyetpaidPage.vue') },
          { path: 'packaged', name: 'home.order.packaged', component: () => import('src/pages/home/order/PackagedPage.vue') },
          { path: 'sent', name: 'home.order.sent', component: () => import('src/pages/home/order/SentPage.vue') },
          { path: 'finished', name: 'home.order.finished', component: () => import('src/pages/home/order/FinishedPage.vue') },
          { path: 'canceled', name: 'home.order.canceled', component: () => import('src/pages/home/order/CanceledPage.vue') }
        ]
      },
      { path: 'setting', name: 'home.setting', meta: { requiresAuth: true, roles: ['Admin', 'Mitra', 'Customer'] }, component: () => import('pages/home/SettingPage.vue') },
      { path: 'tutorial', name: 'home.tutorial', component: () => import('pages/home/information/TutorialPage.vue') },
      { path: 'terms', name: 'home.terms', component: () => import('pages/home/information/TermsPage.vue') },
      { path: 'privacypolicy', name: 'home.privacypolicy', component: () => import('pages/home/information/PrivacypolicyPage.vue') },

      // Auth
      { path: 'login', name: 'login', component: () => import('pages/auth/LoginPage.vue') },
      { path: 'register', name: 'register', component: () => import('pages/auth/RegisterPage.vue') },

      // Not Found
      { path: '/:catchAll(.*)*', component: () => import('pages/ErrorNotFound.vue') }
    ]
  },

  // Dashboard
  {
    path: '/dashboard',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      { path: 'home', meta: { requiresAuth: true, roles: ['Admin', 'Mitra'] }, name: 'dashboard.home', component: () => import('pages/dashboard/IndexDashboard.vue') },
      { path: 'user', meta: { requiresAuth: true, roles: ['Admin'] }, name: 'dashboard.user', component: () => import('pages/dashboard/user/IndexUser.vue') },
      { path: 'category', meta: { requiresAuth: true, roles: ['Admin'] }, name: 'dashboard.category', component: () => import('pages/dashboard/category/IndexCategory.vue') },
      { path: 'product', meta: { requiresAuth: true, roles: ['Admin', 'Mitra'] }, name: 'dashboard.product', component: () => import('pages/dashboard/product/IndexProduct.vue') },
      { path: 'promotion', meta: { requiresAuth: true, roles: ['Admin', 'Mitra'] }, name: 'dashboard.promotion', component: () => import('pages/dashboard/promotion/IndexPromotion.vue') },
      { path: 'transaction', meta: { requiresAuth: true, roles: ['Admin', 'Mitra'] }, name: 'dashboard.transaction', component: () => import('pages/dashboard/transaction/IndexTransaction.vue') },
      { path: 'setting', meta: { requiresAuth: true, roles: ['Admin'] }, name: 'dashboard.setting', component: () => import('pages/dashboard/setting/IndexSetting.vue') }
    ]
  }
]

export default routes
