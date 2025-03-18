import type { DashboardToken } from '@/shared/server-api';

export type DashboardUserData = {
    email: string
    password: string
}

export type DashboardUser = DashboardUserData & {
    id: string
    token_id: DashboardToken['id']
}
