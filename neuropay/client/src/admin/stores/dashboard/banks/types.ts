import type { Bank } from '@/admin/stores/banks/types';
import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';

export type DashboardBank = {
    id: string
    token?: DashboardToken
    bank: Bank
    sortOrder: number
}

export type UpdateDashboardBankData = {
    name: Bank['name']
    sortOrder: DashboardBank['sortOrder']
}
