import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Views
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Dashboard from '@/views/Dashboard.vue'
import ConsultantList from '@/views/ConsultantList.vue'
import ConsultantDetail from '@/views/ConsultantDetail.vue'
import BookingForm from '@/views/BookingForm.vue'
import Bookings from '@/views/Bookings.vue'
import Profile from '@/views/Profile.vue'
import AdminDashboard from '@/views/admin/Dashboard.vue'
import AdminUsers from '@/views/admin/Users.vue'
import AdminConsultants from '@/views/admin/Consultants.vue'
import AdminBookings from '@/views/admin/Bookings.vue'
import AdminCategories from '@/views/admin/Categories.vue'
import NotFound from '@/views/NotFound.vue'
import Services from '@/views/Services.vue'
import ServiceDetail from '@/views/ServiceDetail.vue'
import BookingConfirmation from '@/views/BookingConfirmation.vue'
import BookingPage from '../views/BookingPage.vue';
import BookingSuccess from '../views/BookingSuccess.vue';
import About from '@/views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Home - Zentro' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: 'Login - Zentro', guest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { title: 'Register - Zentro', guest: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { title: 'Dashboard - Zentro', requiresAuth: true }
  },
  {
    path: '/consultants',
    name: 'ConsultantList',
    component: ConsultantList,
    meta: { title: 'Find Consultants - Zentro' }
  },
  {
    path: '/consultants/:id',
    name: 'ConsultantDetail',
    component: ConsultantDetail,
    meta: { title: 'Consultant Profile - Zentro' }
  },
  {
    path: '/book/:consultantId',
    name: 'BookingForm',
    component: BookingForm,
    meta: { title: 'Book Session - Zentro', requiresAuth: true, requiresClient: true }
  },
  {
    path: '/bookings',
    name: 'MyBookings',
    component: Bookings,
    meta: { title: 'My Bookings - Zentro', requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { title: 'Profile - Zentro', requiresAuth: true }
  },
  {
    path: '/booking-confirmation',
    name: 'BookingConfirmation',
    component: BookingConfirmation,
    meta: { title: 'Booking Confirmed - Zentro', requiresAuth: true }
  },
  {
    path: '/booking-confirmation/:bookingId',
    name: 'BookingConfirmation',
    component: () => import('@/views/BookingConfirmation.vue')
  },
  {
    path: '/booking/:serviceId',
    name: 'BookingPage',
    component: BookingPage
  },
  {
    path: '/booking-success/:bookingId',
    name: 'BookingSuccess',
    component: BookingSuccess
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { title: 'About - Zentro' }
  },
  // Admin routes
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { title: 'Admin Dashboard - Zentro', requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: AdminUsers,
    meta: { title: 'Manage Users - Zentro', requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/consultants',
    name: 'AdminConsultants',
    component: AdminConsultants,
    meta: { title: 'Manage Consultants - Zentro', requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/bookings',
    name: 'AdminBookings',
    component: AdminBookings,
    meta: { title: 'Manage Bookings - Zentro', requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/categories',
    name: 'AdminCategories',
    component: AdminCategories,
    meta: { title: 'Manage Categories - Zentro', requiresAuth: true, requiresAdmin: true }
  },
  // Service routes
  {
    path: '/services',
    name: 'Services',
    component: Services,
    meta: { title: 'Our Services - Zentro' }
  },
  {
    path: '/services/:id',
    name: 'ServiceDetail',
    component: ServiceDetail,
    meta: { title: 'Service Details - Zentro' }
  },
  // 404 route
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { title: 'Page Not Found - Zentro' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Set page title
  document.title = to.meta.title || 'Zentro - Professional Consulting Services'
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
    return
  }
  
  // Check if route requires admin role
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next('/dashboard')
    return
  }
  
  // Check if route requires client role
  if (to.meta.requiresClient && !authStore.isClient) {
    next('/dashboard')
    return
  }
  
  // Redirect authenticated users away from guest routes
  if (to.meta.guest && authStore.isAuthenticated) {
    next('/dashboard')
    return
  }
  
  next()
})

export default router 