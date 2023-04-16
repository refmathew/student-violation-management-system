import Index from 'pages/IndexPage.vue';
import Search from 'pages/SearchPage.vue';
import Filter from 'pages/FilterPage.vue';
import Violation from 'pages/stats/ViolationPage.vue';
import Course from 'pages/stats/CoursePage.vue';
import Time from 'pages/stats/TimePage.vue';
import Guard from 'pages/stats/GuardPage.vue';

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', Index },
      { path: 'search', component: Search },
      { path: 'filter', component: Filter },
      { path: 'stats/violation', component: Violation },
      { path: 'stats/time-and-date', component: Time },
      { path: 'stats/course-and-year', component: Course },
      { path: 'stats/guard', component: Guard }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
