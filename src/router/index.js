import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ToursPage from '../views/ToursPage.vue'
import DatesPage from '../views/DatesPage.vue'
import FestivalsPage from '../views/FestivalsPage.vue'
import ArtistsPage from '../views/ArtistsPage.vue'
import AboutPage from '../views/AboutPage.vue'
import TourDetailsPage from '../views/TourDetailsPage.vue'
import VinylDetailPage from '../views/VinylDetailPage.vue'
import AllVinylPage from '../views/AllVinylPage.vue'
import LabelVinylPage from '../views/LabelVinylPage.vue'
import ArtistDetailPage from '../views/ArtistDetailPage.vue'
import AllMerchPage from '../views/AllMerchPage.vue'
import AllAccessoriesPage from '../views/AllAccessoriesPage.vue'
import MerchDetailPage from '../views/MerchDetailPage.vue'
import LoginPage from '../views/LoginPage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/tours', name: 'Tours', component: ToursPage },
  { path: '/tours/:id', name: 'TourDetails', component: TourDetailsPage },
  { path: '/dates', name: 'Dates', component: DatesPage },
  { path: '/festivals', name: 'Festivals', component: FestivalsPage },
  { path: '/artists', name: 'Artists', component: ArtistsPage },
  { path: '/artists/:id', name: 'ArtistDetail', component: ArtistDetailPage },
  { path: '/about', name: 'About', component: AboutPage },
  { path: '/vinyl/:id', name: 'VinylDetail', component: VinylDetailPage },
  { path: '/revelations/merch/vinyl', name: 'AllVinyl', component: AllVinylPage },
  { path: '/revelations/merch', name: 'AllMerch', component: AllMerchPage },
  { path: '/revelations/merch/accessories', name: 'AllAccessories', component: AllAccessoriesPage },
  { path: '/merch/:id', name: 'MerchDetail', component: MerchDetailPage },
  { path: '/accessories/:id', name: 'AccessoryDetail', component: MerchDetailPage },
  { path: '/labels/:labelName', name: 'LabelVinyl', component: LabelVinylPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
