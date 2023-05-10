import Index from 'pages/IndexPage.vue';
import Find from 'pages/FindPage.vue';
import Filter from 'pages/FilterPage.vue';
import Violation from 'pages/stats/ViolationPage.vue';
import Course from 'pages/stats/CoursePage.vue';
import Time from 'pages/stats/TimePage.vue';
import Guard from 'pages/stats/GuardPage.vue';
import Login from 'src/pages/LoginPage.vue';

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'indexPage',
        component: Index,
        meta: {
          title: 'Home'
        }
      },
      {
        path: 'find',
        name: 'findPage',
        component: Find,
        meta: {
          title: 'Find student'
        }
      },
      {
        path: 'filter',
        name: 'filterPage',
        component: Filter,
        meta: {
          title: 'Filter violations'
        }
      },
      {
        path: 'stats/violation',
        name: 'statsViolationPage',
        component: Violation,
        meta: {
          subTitle: 'Violation'
        }
      },
      {
        path: 'stats/time-and-date',
        name: 'statsTimeAndDatePage',
        component: Time,
        meta: {
          subTitle: 'Time of the Day'
        }
      },
      {
        path: 'stats/course-and-year',
        name: 'statsCourseAndYearPage',
        component: Course,
        meta: {
          subTitle: 'Course & Year'
        }
      },
      {
        path: 'stats/guard',
        name: 'statsGuardPage',
        component: Guard,
        meta: {
          subTitle: 'Guard'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'loginPage',
    component: Login,
    meta: {
      title: 'Login'
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
