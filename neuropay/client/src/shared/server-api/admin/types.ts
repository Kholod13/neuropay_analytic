export enum EActionResultStatus {
    SUCCESS = 'success',
    ERROR = 'error'
}

export type ActionResponse = {
    status: EActionResultStatus
    message: string
}

export type FetchActionResponse<T> = ActionResponse & {
    data: T
}
