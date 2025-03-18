export type KPI = {
    profit: number
    transactionsCount: number
}

export type Statistics = KPI & {
    date: Date
}
