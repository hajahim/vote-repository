import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import ListCandidates from '@/pages/ListCandidates'
import CreateCandidate from '@/pages/CreateCandidate'
import CreateElection from '@/pages/CreateElection'
import ListElections from '@/pages/ListElections'
import ElectionDetails from '@/pages/ElectionDetails'

Vue.use(Router)

export default new Router({
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
      path: '/listElections',
      name: 'ListElections',
      component: ListElections
    },
    {
      path: '/electionDetails/:id',
      name: 'ElectionDetails',
      component: ElectionDetails
    }
  ]
})
