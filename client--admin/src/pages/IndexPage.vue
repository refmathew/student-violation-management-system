<template>
  <q-page class="page--index">
    <input-search placeholder="Find students..." @click="handleInputSearchClick" />
    <div class="page--index__main">
      <div class="page--index__table-heading">Recent Violations</div>
      <q-table :columns="columns" :rows="violationStore.recent" row-key="timestamp" virtual-scroll wrap-cells
        :rows-per-page-options="[0]" style="max-height: 48rem;" flat bordered hide-bottom />
    </div>
  </q-page>
</template>

<script setup>
import { format } from 'date-fns';
import { useViolationStore } from 'src/stores/violation-store';
import InputSearch from 'src/components/InputSearch.vue';
import { useRouter } from 'vue-router';
import { useUserStore } from 'src/stores/user-store';
const router = useRouter();
const userStore = useUserStore();
// if (Object.keys(userStore.user).length === 0) router.push('/login')

const violationStore = useViolationStore();
violationStore.requestRecent();


/* Table */
const columns = [
  {
    name: 'timestamp',
    label: 'Date & Time',
    field: 'timestamp',
    sortable: false,
    format: (timestamp) => `${format(new Date(timestamp), 'dd LLL yyyy | HH:mm')}`,
    style: 'font-size: 1.4rem; font-weight: 300',
    align: 'left',
    headerStyle: 'font-weight: 600'
  },
  {
    name: 'studentId',
    label: 'Student Id',
    field: 'studentId',
    sortable: false,
    style: 'font-size: 1.4rem; font-weight: 300',
    align: 'left',
    headerStyle: 'font-weight: 600'
  },
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    sortable: false,
    style: 'font-size: 1.4rem; font-weight: 300',
    align: 'left',
    headerStyle: 'font-weight: 600'
  },
  {
    name: 'course',
    label: 'Course',
    field: 'course',
    sortable: false,
    style: 'font-size: 1.4rem; font-weight: 300',
    align: 'left',
    headerStyle: 'font-weight: 600'
  },
  {
    name: 'year',
    label: 'Year',
    field: 'year',
    sortable: false,
    style: 'font-size: 1.4rem; font-weight: 300',
    align: 'left',
    headerStyle: 'font-weight: 600'
  },
  {
    name: 'violation',
    label: 'Offense',
    field: 'violation',
    sortable: false,
    style: 'font-size: 1.4rem; font-weight: 300',
    align: 'left',
    headerStyle: 'font-weight: 600'
  },
  {
    name: 'guard',
    label: 'Guard on Duty',
    field: 'guard',
    sortable: false,
    style: 'font-size: 1.4rem; font-weight: 300',
    align: 'left',
    headerStyle: 'font-weight: 600'
  },
]

const handleInputSearchClick = () => {
  router.push('/find')
}
</script>

<style lang="scss">
.page--index {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6.4rem;

  &__form {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  &__main {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }

  &__table-heading {
    font-size: 2rem;
    font-weight: 600;
  }

  .q-table {
    &__container {
      background-color: $secondary-1;
      padding-left: 3.2rem;
      padding-right: 3.2rem;
      padding: 1.6rem;
    }

    th {
      font-size: 1.4rem;
    }

    &__middle {
      color: $primary-2;
    }
  }
}
</style>
