export type DashboardCardData = {
    bank_id: string
    card_number: string
    account_number: string
    phone_number: string
    hidden: boolean
}

export type DashboardCard = DashboardCardData & {
    id: string
    external_id: string
}
