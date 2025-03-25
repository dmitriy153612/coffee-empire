<template>
  <table class="table">
    <thead class="table__thead">
      <tr>
        <th
          v-for="(header, index) in schema"
          :key="index"
        >
          {{ header.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(student, studentIndex) in students"
        :key="studentIndex"
      >
        <td
          v-for="({ name }, index) in schema"
          :key="index"
        >
          {{ getTdBySchemaOrder(name, students, studentIndex) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { Student, TableSchema } from '~/types/student'

defineProps<{
  students: Student[]
  schema: TableSchema[]
}>()

// устанавливает столбцы таблицы в соответствии их порядка в schema
function getTdBySchemaOrder(
  valueName: keyof Student,
  students: Student[],
  index: number,
) {
  if (valueName in students[index]) {
    const td = students[index][valueName]
    return td
  }
}
</script>

<style scoped lang="scss">
.table {
  border-collapse: collapse;
  border: 1px solid $gray-300;
  th {
    background: $yellow-300;
    color: $black;
    padding: 10px 20px;
    text-align: left;
  }
  td {
    padding: 10px 20px;
    border: 1px solid $gray-300;
  }
  tr:nth-child(2n) {
    background-color: $slate-100;
  }
}
</style>
