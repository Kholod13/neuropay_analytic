import type { KPI, Statistics } from './types';
import { getDateString } from '@/shared/utils/dateUtils';

export function getStatisticsByDate (statistics: Statistics[]): Record<string, Statistics> {
    return Object.fromEntries(statistics.map(item => [getDateString(item.date), item]));
}

export function pullKpi (date: Date, statisticsByDate: Record<string, Statistics>): KPI {
    return statisticsByDate[getDateString(date)] ?? {
        profit: 0,
        transactionsCount: 0,
    };
}
