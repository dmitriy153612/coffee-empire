<template>
  <div class="filter">
    <form class="filter__form">
      <fieldset
        v-for="(column, index) in filterSchema"
        :key="index"
        class="filter__fieldset"
      >
        <legend class="filter__legend">
          {{ column.title }}
        </legend>
        <UiInput
          v-model="models[index].min"
          class="filter__input"
          :type="column.filter"
          :placeholder="column.filter !== 'text' ? 'from' : column.title"
        />
        <UiInput
          v-if="column.filter !== 'text'"
          v-model="models[index].max"
          class="filter__input"
          :type="column.filter"
          placeholder="to"
        />
      </fieldset>
    </form>
    <UiButton @click="clearModels">
      Clear Filters
    </UiButton>
  </div>
</template>

<script setup lang="ts">
import type { Reactive } from 'vue'
import type { TableSchema, Student, FilterSchema } from '@/types/student'
import { isFilterSchema } from '@/types/student'

interface Model {
  min: string | number
  max: string | number
}

const props = defineProps<{
  tableSchema: TableSchema[]
  students: Student[]
}>()

const emit = defineEmits<{
  (e: 'filter', students: Student[]): void
}>()

const filterSchema = computed<FilterSchema[]>(() => props.tableSchema.filter(column => isFilterSchema(column)))
const models: Reactive<Model>[] = reactive(createModels(filterSchema.value.length))
const filteredStudents = ref(props.students)

function createModels(length: number): Model[] {
  return Array.from({ length }, () => ({ min: '', max: '' }))
}

function clearModels() {
  models.forEach((model) => {
    model.min = ''
    model.max = ''
  })
}

function filterNumber(
  min: string | number,
  max: string | number,
  fieldName: keyof Student,
  student: Student,
): boolean {
  const tableValue = Number(student[fieldName])
  const minValue = min !== '' ? Number(min) : -Infinity
  const maxValue = max !== '' ? Number(max) : Infinity

  return tableValue >= minValue && tableValue <= maxValue
}

function filterText(
  min: string,
  fieldName: keyof Student,
  student: Student,
): boolean {
  if (!min) return true
  const tableValue = student[fieldName].toString().toLowerCase()
  return tableValue.startsWith(min.toLowerCase())
}

function filterDate(
  min: string,
  max: string,
  filedName: keyof Student,
  student: Student,
): boolean {
  const tableDate = getParsedDate(student[filedName].toString())
  const minValue = min ? getParsedDate(min) : null
  const maxValue = max ? getParsedDate(max) : null

  if (minValue === null && maxValue === null) {
    return true
  }
  if (minValue === null) {
    return tableDate <= maxValue!
  }
  if (maxValue === null) {
    return tableDate >= minValue
  }
  return tableDate >= minValue! && tableDate <= maxValue!
}

function getParsedDate(dateStr: string): number {
  const dateStrISO = convertDateStrToISOFormat(dateStr)
  return Date.parse(dateStrISO)
}

function convertDateStrToISOFormat(str: string): string {
  const [dateStr] = str.split(' ')
  return dateStr.split('.').reverse().join('-')
}

function filterTableColumn(model: Model, modelIndex: number, student: Student) {
  const schemaItem = filterSchema.value[modelIndex]
  const type = schemaItem.filter
  if (type === 'text') {
    return filterText(model.min.toString(), schemaItem.name, student)
  }
  else if (type === 'number') {
    return filterNumber(model.min, model.max, schemaItem.name, student)
  }
  else if (type === 'date') {
    return filterDate(
      model.min.toString(),
      model.max.toString(),
      schemaItem.name,
      student,
    )
  }
}

function filterTable() {
  filteredStudents.value = props.students.filter((student) => {
    return models.every((model, modelIndex) => {
      return filterTableColumn(model, modelIndex, student)
    })
  })
  emit('filter', filteredStudents.value)
}

watch(models, filterTable, { deep: true })
</script>

<style scoped lang="scss">
.filter {
  &__form {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 16px;
  }
  &__fieldset {
    display: flex;
    flex-direction: column;
    flex: 1 1 150px;
    padding: 0;
    margin: 0;
    border: none;
  }
  &__input {
    min-width: 140px;

    width: 100% ;
  }
}
</style>
