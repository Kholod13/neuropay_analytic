export enum EDynamicContentKey {
    PLATFORM_INSTRUCTION = 'platform_instruction',
    CONTACT_INFORMATION = 'contact_information',
    PAY_OUT_ORDERS_ARE_UNAVAILABLE_ERROR_MESSAGE = 'pay_out_orders_are_unavailable_error_message',
    PAY_IN_ORDERS_ARE_UNAVAILABLE_ERROR_MESSAGE = 'pay_in_orders_are_unavailable_error_message',
}

export type DynamicContentKey = EDynamicContentKey | string

export type DynamicDashboardContent = Record<EDynamicContentKey, string | null>
