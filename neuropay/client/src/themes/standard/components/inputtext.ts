import type { CustomCssGetterPayload } from '@/themes/types';

export default {
    css: ({ dt }: CustomCssGetterPayload) => `
.p-inputtext.p-invalid {
    border-color: ${dt('inputtext.invalidBorderColor')} !important;
}

.p-inputtext.p-invalid:focus {
    box-shadow: 0 0 0 0.2rem ${dt('red.200')} !important;
}

.p-password:has(.p-inputtext.p-invalid) path {
    fill: ${dt('inputtext.invalidBorderColor')};
}
`,
};
