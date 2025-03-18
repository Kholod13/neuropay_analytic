import { merge } from 'lodash-es';
import { useToast } from 'primevue';
import type { EMessageGroup, MessageOptions } from './types';
import { DEFAULT_MESSAGE_GROUP, defaultMessageOptions } from './constants';
import { wait } from '@/shared/utils/utils';

export type MessageComposable = {
    add (message: MessageOptions): Promise<void>;
    remove (message: MessageOptions): void;
    removeGroup (group: string): void;
    removeAllGroups (): void;
}

export function useToastMessage (): MessageComposable {
    const toast = useToast();

    async function add (message: MessageOptions): Promise<void> {
        const options = merge(defaultMessageOptions, message);

        removeGroup(options.group ?? DEFAULT_MESSAGE_GROUP);
        await wait(0);

        toast.add(options);
    }

    function remove (message: MessageOptions): void {
        toast.remove(merge(defaultMessageOptions, message));
    }

    function removeGroup (group: EMessageGroup): void {
        toast.removeGroup(group);
    }

    function removeAllGroups (): void {
        toast.removeAllGroups();
    }

    return {
        add,
        remove,
        removeGroup,
        removeAllGroups,
    };
}
