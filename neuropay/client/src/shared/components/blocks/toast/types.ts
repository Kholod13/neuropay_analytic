export enum EMessageSeverity {
    SUCCESS = 'success',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
    SECONDARY = 'secondary',
    CONTRAST = 'contrast',
}

export enum EMessageGroup {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

export type MessageOptions = {
    severity: EMessageSeverity,
    detail?: string
    summary?: string
    closable?: boolean
    life?: number
    group?: EMessageGroup
}
