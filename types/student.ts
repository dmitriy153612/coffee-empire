export interface Student {
  id: string
  name: string
  surname: string
  age: number
  date_created: string
}

export interface TableSchema {
  title: string
  name: keyof Student
  filter?: 'date' | 'number' | 'text'
}

export type FilterSchema = Required<TableSchema>

export function isFilterSchema(tableSchema: TableSchema): tableSchema is FilterSchema {
  return Object.hasOwn(tableSchema, 'filter')
}
