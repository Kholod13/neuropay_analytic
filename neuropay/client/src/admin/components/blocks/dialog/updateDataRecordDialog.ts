import { computed, type Ref } from 'vue';
import type { UpdateDataRecordPayload } from './types';
import type { DataRecord } from '@/shared/types';

export type UseUpdateDataRecordDialogReturn<Data extends DataRecord, UpdateRecordData> = {
    visible: Ref<boolean>
    record: Readonly<Ref<Data | null>>

    submit (data: UpdateRecordData): void
}

export function useUpdateDataRecordDialog<Data extends DataRecord, UpdateRecordData> (
    editingRecordId: Ref<string | null>,
    recordsById: Ref<Record<string, Data>>,
    emit: (event: 'submit', payload: UpdateDataRecordPayload<UpdateRecordData>) => void,
): UseUpdateDataRecordDialogReturn<Data, UpdateRecordData> {
    const visible = computed({
        get: () => !!editingRecordId.value,
        set: (value: boolean) => {
            if (!value) {
                editingRecordId.value = null;
            }
        },
    });

    const record = computed(() =>
        editingRecordId.value
            ? recordsById.value[editingRecordId.value] ?? null
            : null,
    );

    function submit (data: UpdateRecordData): void {
        if (editingRecordId.value) {
            emit('submit', { id: editingRecordId.value, data });
        }
    }

    return {
        visible,
        record,
        submit,
    };
}
