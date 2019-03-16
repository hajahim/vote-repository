import Vue from 'vue'
import Router from 'vue-router'
import VueSkeletonLoading from 'vue-skeleton-loading'
import HomePage from '@/pages/HomePage'
import ListCandidates from '@/pages/ListCandidates'
import CreateCandidate from '@/pages/CreateCandidate'
import CreateElection from '@/pages/CreateElection'
import CreateElectionGroup from '@/pages/CreateElectionGroup'
import ListElections from '@/pages/ListElections'
import ListElectionsGroup from '@/pages/ListElectionsGroup'
import ElectionDetails from '@/pages/ElectionDetails'
import ElectionGroupDetails from '@/pages/ElectionGroupDetails'

Vue.use(VueSkeletonLoading)
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/listeCandidate',
      name: 'ListCandidates',
      component: ListCandidates
    },
    {
      path: '/createCandidate',
      name: 'CreateCandidate',
      component: CreateCandidate
    },
    {
      path: '/createElection',
      name: 'CreateElection',
      component: CreateElection
    },
    {
      path: '/createElectionGroup',
      name: 'CreateElectionGroup',
      component: CreateElectionGroup
    },
    {
      path: '/listElections',
      name: 'ListElections',
      component: ListElections
    },
    {
      path: '/listElectionsGroup',
      name: 'ListElectionsGroup',
      component: ListElectionsGroup
    },
    {
      path: '/electionDetails/:id',
      name: 'ElectionDetails',
      component: ElectionDetails
    },
    {
      path: '/electionGroupDetails/:id',
      name: 'ElectionGroupDetails',
      component: ElectionGroupDetails
    }
  ]
})

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    window.NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  window.NProgress.done()
})

export default router
