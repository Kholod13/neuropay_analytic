import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';
import type { Bank } from '@/admin/stores/banks/types';

export type DashboardCard = {
    id: string
    externalId: string
    token: DashboardToken
    bank: Bank
    cardNumber: string
    accountNumber: string
    phoneNumber: string
    hidden: boolean
}
