import type { ColumnProps } from 'primevue/column';

export type DataColumnProps<T extends string = string> = ColumnProps & {
    field: T
}
