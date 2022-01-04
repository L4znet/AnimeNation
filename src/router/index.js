import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Single from '../views/Single.vue'
import Profil from '../views/Profil.vue'
import Results from '../views/Results.vue'
import MostFollowed from '../views/MostFollowed.vue'
import Feed from '../views/Feed.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:title',
    name: 'Single',
    component: Single
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil
  },
  {
    path: '/results',
    name: 'Results',
    component: Results
  },
  {
    path: '/most-followed',
    name: 'MostFollowed',
    component: MostFollowed
  },
  {
    path: '/feed',
    name: 'Feed',
    component: Feed
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
