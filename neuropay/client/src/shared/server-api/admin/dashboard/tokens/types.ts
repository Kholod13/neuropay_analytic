import type { Numeric } from '@/shared/server-api/types';
import type { Wallet } from '@/shared/server-api/admin/wallets';

export type DashboardTokenData = {
    wallet_id: Wallet['id']
    token: string
    security_deposit: Numeric
    working_deposit: Numeric
    frozen_deposit: Numeric
    rate: Numeric
    currency: string
}

export type DashboardToken = DashboardTokenData & {
    id: string
}
