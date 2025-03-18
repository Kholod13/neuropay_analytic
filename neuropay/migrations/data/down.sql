UPDATE contents
SET default_value = ''
WHERE content_key = 'platform_instruction';

UPDATE contents
SET default_value = ''
WHERE content_key = 'contact_information';

UPDATE contents
SET default_value = ''
WHERE content_key = 'pay_out_orders_are_unavailable_error_message';

UPDATE contents
SET default_value = ''
WHERE content_key = 'pay_in_orders_are_unavailable_error_message';


DELETE FROM banks;
DELETE FROM wallets;
DELETE FROM tokens;
