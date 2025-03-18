import type { CustomCssGetterPayload } from '@/themes/types';

export default {
    css: ({ dt }: CustomCssGetterPayload) => `
.p-floatlabel {
    font-size: 1rem;
}

.p-floatlabel:has(.p-invalid) label {
    color: ${dt('floatlabel.invalid.color')} !important; /* stylelint-disable-line declaration-no-important */
}
`,
};
