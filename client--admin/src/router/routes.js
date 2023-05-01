import Index from 'pages/IndexPage.vue';
import Find from 'pages/FindPage.vue';
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
      { path: '', component: Index, meta: { title: 'Home' } },
      { path: 'find', component: Find, meta: { title: 'Find student' } },
      { path: 'filter', component: Filter, meta: { title: 'Filter violations' } },
      { path: 'stats/violation', component: Violation, meta: { title: 'Violation' } },
      { path: 'stats/time-and-date', component: Time, meta: { title: 'Time & Date' } },
      { path: 'stats/course-and-year', component: Course, meta: { title: 'Course & Year' } },
      { path: 'stats/guard', component: Guard, meta: { title: 'Guard' } }
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
