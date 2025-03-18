import type { Wallet } from '@/admin/stores/wallets/types';

export type DashboardTokenData = {
    walletId: Wallet['id']
    token: string
    securityDeposit: number
    workingDeposit: number
    frozenDeposit: number
    rate: number
    currency: string
}

export type DashboardToken = DashboardTokenData & {
    id: string
}
