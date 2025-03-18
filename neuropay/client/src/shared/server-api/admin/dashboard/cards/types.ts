import type { Bank, DashboardToken } from '@/shared/server-api';

export type DashboardCard = {
    id: string
    external_id: string
    token_id: DashboardToken['id']
    bank_id: Bank['id']
    card_number: string
    account_number: string
    phone_number: string
    hidden: boolean
}
