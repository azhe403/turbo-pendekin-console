// Centralized route definitions for better maintainability
export const routes = {
  // Main navigation routes
  dashboard: '/',
  create: '/routes/create',
  routes: '/routes',
  analytics: '/analytics',
  activity: '/activity',

  // Settings routes
  settings: {
    root: '/settings',
    general: '/settings',
    security: '/settings/security',
    notifications: '/settings/notifications',
    integrations: '/settings/integrations',
  },

  // Dynamic routes
  linkDetail: (id: string) => `/routes/${id}`,
  editLink: (id: string) => `/routes/${id}/edit`,

  // Authentication routes
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    otp: '/auth/otp',
    otpVerify: (otp: string) => `/auth/otp/${otp}`,
  },

  // External routes
  api: {
    pendekin: '/api/pendekin',
    links: '/api/links',
    analytics: '/api/analytics',
  },
} as const

// Route groups for breadcrumbs and navigation
export const routeGroups = {
  main: [
    { title: 'Dashboard', href: routes.dashboard, icon: 'LayoutDashboard' },
    { title: 'Routes', href: routes.routes, icon: 'LinkIcon' },
    { title: 'Analytics', href: routes.analytics, icon: 'BarChart3' },
    { title: 'Activity', href: routes.activity, icon: 'Activity' },
  ],
  settings: [
    { title: 'General', href: routes.settings.general },
    { title: 'Security', href: routes.settings.security },
    { title: 'Notifications', href: routes.settings.notifications },
    { title: 'Integrations', href: routes.settings.integrations },
  ],
} as const

// Helper functions for route generation
export const getActiveRoute = (pathname: string) => {
  const mainRoute = routeGroups.main.find(route => 
    pathname === route.href || pathname.startsWith(route.href + '/')
  )
  
  if (mainRoute) return mainRoute
  
  const settingsRoute = routeGroups.settings.find(route => 
    pathname === route.href
  )
  
  return settingsRoute || null
}

export function getBreadcrumbs(pathname: string) {
  const breadcrumbs: { title: string; href?: string }[] = []
  
  // Add main section
  if (pathname.startsWith('/settings')) {
    breadcrumbs.push({ title: 'Settings', href: routes.settings.root })
    
    const settingsPage = routeGroups.settings.find(route => route.href === pathname)
    if (settingsPage) {
      breadcrumbs.push({ title: settingsPage.title })
    }
  } else if (pathname.startsWith('/routes/') && pathname !== '/routes') {
    breadcrumbs.push({ title: 'Routes', href: routes.routes })
    const id = pathname.split('/')[2]
    if (id) {
      breadcrumbs.push({ title: `Route ${id}` })
    }
  } else if (pathname.startsWith('/routes/')) {
    if (pathname === '/routes/create') {
      breadcrumbs.push({ title: 'Create' })
    } else if (pathname === '/routes') {
      breadcrumbs.push({ title: 'Routes' })
    }
  } else {
    const mainRoute = routeGroups.main.find(route => route.href === pathname)
    if (mainRoute) {
      breadcrumbs.push({ title: mainRoute.title })
    }
  }
  
  return breadcrumbs
}

// Export types for TypeScript
export type RouteKey = keyof typeof routes
export type SettingsRouteKey = keyof typeof routes.settings
