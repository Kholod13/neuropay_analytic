import { type ComputedRef, ref, type Ref, watch } from 'vue';
import type {
    FormError,
    FormErrorsByFieldName,
    IsFieldTouched,
} from './types';
import { isValue } from '@/shared/utils/typeUtils';

export type FormErrorsComposable<T extends string> = {
    getFieldErrorText (name: T): string | undefined;
    isFieldInvalid (name: T): boolean;
}

export function useFormErrors<T extends string> (
    values: Ref<Record<T, unknown>>,
    validationErrors: ComputedRef<FormErrorsByFieldName<T>>,
    isFieldTouched: IsFieldTouched<T>,
): FormErrorsComposable<T> {
    const dirtyFieldNames = ref(new Set()) as Ref<Set<T>>;

    watch(values, (newValues, oldValues) => {
        if (dirtyFieldNames.value.size === Object.keys(values.value).length) {
            return;
        }
        const fieldNames = Object.keys(newValues) as T[];

        fieldNames.forEach((fieldName) => {
            if (!isFieldDirty(fieldName) && newValues[fieldName] !== oldValues[fieldName]) {
                setFieldDirty(fieldName, true);
            }
        });
    });

    return {
        getFieldErrorText: getFieldError,
        isFieldInvalid,
    };

    function isFieldInvalid (name: T): boolean {
        return isValue(getFieldError(name));
    }

    function getFieldError (name: T): FormError | undefined {
        const validationError = validationErrors.value[name];

        return isFieldTouched(name) ? validationError : undefined;
    }

    function isFieldDirty (name: T): boolean {
        return dirtyFieldNames.value.has(name);
    }

    function setFieldDirty (name: T, isDirty: boolean): void {
        if (isDirty) {
            dirtyFieldNames.value.add(name);
        } else {
            dirtyFieldNames.value.delete(name);
        }
    }
}
