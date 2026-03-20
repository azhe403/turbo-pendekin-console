import { usePathname, useRouter } from "next/navigation"
import { routes, getActiveRoute, getBreadcrumbs } from "@/lib/routes"

export function useNavigation() {
  const pathname = usePathname()
  const router = useRouter()

  const activeRoute = getActiveRoute(pathname)
  const breadcrumbs = getBreadcrumbs(pathname)
  const isSettingsPage = pathname.startsWith('/settings')

  const navigate = (route: keyof typeof routes | string) => {
    if (typeof route === 'string') {
      router.push(route)
      return
    }

    const targetRoute = routes[route]
    if (targetRoute) {
      router.push(targetRoute)
    }
  }

  const navigateToLink = (id: string) => {
    router.push(routes.linkDetail(id))
  }

  const navigateToEditLink = (id: string) => {
    router.push(routes.editLink(id))
  }

  const navigateToSettings = (section?: keyof typeof routes.settings) => {
    if (section) {
      router.push(routes.settings[section])
    } else {
      router.push(routes.settings.root)
    }
  }

  return {
    // Current state
    pathname,
    activeRoute,
    breadcrumbs,
    isSettingsPage,
    
    // Navigation methods
    navigate,
    navigateToLink,
    navigateToEditLink,
    navigateToSettings,
    router,
    
    // Routes
    routes,
  }
}
