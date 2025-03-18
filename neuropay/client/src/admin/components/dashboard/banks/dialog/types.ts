import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';
import type { UpdateDashboardBankData } from '@/admin/stores/dashboard/banks/types';

export type DashboardBankPayload = {
    tokenId: DashboardToken['id'] | null
    data: UpdateDashboardBankData
}
