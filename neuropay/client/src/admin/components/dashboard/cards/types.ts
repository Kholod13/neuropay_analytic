import type { DashboardCard } from '@/admin/stores/dashboard/cards/types';
import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';
import type { Bank } from '@/admin/stores/banks/types';

export type CardRow = Omit<DashboardCard, 'token' | 'bank'> & {
    tokenId: DashboardToken['id']
    token: DashboardToken['token']
    bank: Bank['name']
}
