import { ETextInputType } from './types';

export const inputMaskByType = {
    [ETextInputType.CARD_NUMBER]: '9999 9999 9999 9999',
    [ETextInputType.CARD_EXPIRATION_DATE]: '99/99',
} as const;
