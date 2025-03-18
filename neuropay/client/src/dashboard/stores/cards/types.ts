export type CardData = {
    bankId: string
    cardNumber: string
    accountNumber: string
    phone: string
    hidden: boolean
}

export type Card = CardData & {
    id: string
    externalId: string
}
