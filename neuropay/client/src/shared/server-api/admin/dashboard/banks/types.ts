import type { Numeric } from '@/shared/server-api/types';
import type { Bank, DashboardToken } from '@/shared/server-api';

export type DashboardBank = {
    id: string
    token_id?: DashboardToken['id'] | null
    bank_id: Bank['id']
    sort_order: Numeric
}

export type UpdateDashboardBankData = {
    name: Bank['name']
    sort_order: DashboardBank['sort_order']
}
