import { EMessageGroup, type MessageOptions } from './types';

export const DEFAULT_MESSAGE_GROUP = EMessageGroup.SECONDARY;

export const defaultMessageOptions: Partial<MessageOptions> = {
    group: DEFAULT_MESSAGE_GROUP,
    life: 3000,
};
