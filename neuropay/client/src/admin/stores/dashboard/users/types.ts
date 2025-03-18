import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';

export type DashboardUserData = {
    email: string
    password: string
}

export type DashboardUser = DashboardUserData & {
    id: string
    tokenId: DashboardToken['id']
}
