<template>
  <main
    v-if="accountStore.students"
    class="main"
  >
    <section class="main__section">
      <AppContainer class="main__container">
        <h1 class="main__title">
          My Students
        </h1>
        <StudentsTableFilter
          class="main__filter"
          :table-schema="tableSchema"
          :students="accountStore.students"
          @filter="filterStudents"
        />
        <StudentsTable
          class="main__table"
          :students="filteredStudents"
          :schema="tableSchema"
        />
      </AppContainer>
    </section>
  </main>
</template>

<script setup lang="ts">
import type { TableSchema, Student } from '~/types/student'

definePageMeta({
  layout: 'account',
  middleware: ['check-token', 'account'],
})

const accountStore = useAccountStore()
const filteredStudents = ref(accountStore.students.slice())

const tableSchema = ref<TableSchema[]>([
  {
    title: 'Id',
    name: 'id',
  },
  {
    title: 'Surname',
    name: 'surname',
    filter: 'text',
  },
  {
    title: 'Name',
    name: 'name',
    filter: 'text',
  },
  {
    title: 'Age',
    name: 'age',
    filter: 'number',
  },
  {
    title: 'Date Created',
    name: 'date_created',
    filter: 'date',
  },
])

function filterStudents(students: Student[]) {
  filteredStudents.value = students
}
</script>

<style scoped lang="scss">
.main {
  &__container {
    display: grid;
    padding-block: 24px 32px;
  }
  &__title {
    margin-block: 0 24px;
  }
  &__filter {
    margin-bottom: 16px;
  }
}
</style>
