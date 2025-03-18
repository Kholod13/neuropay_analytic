export enum EAdminSigninStatus {
    SUCCESS = 'success',
    ERROR = 'error',
}

export type AdminSigninResponse = {
    status: EAdminSigninStatus
    message?: string
}

export type AdminUser = {
    login: string
}
