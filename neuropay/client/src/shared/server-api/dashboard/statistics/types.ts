import type { Numeric } from '@/shared/server-api/types';

export type KPI = {
    profit: Numeric
    transactions_count: Numeric
}

export type Statistics = KPI & {
    date: string
}
