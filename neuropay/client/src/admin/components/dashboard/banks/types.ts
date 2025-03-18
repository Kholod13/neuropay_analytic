import type { DashboardBank } from '@/admin/stores/dashboard/banks/types';
import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';
import type { Bank } from '@/admin/stores/banks/types';

export type DashboardBankRow = {
    id: DashboardBank['id']
    tokenId: DashboardToken['id'] | null
    token: DashboardToken['token'] | null
    bankId: Bank['id']
    bank: Bank['name']
    sortOrder: DashboardBank['sortOrder']
}
