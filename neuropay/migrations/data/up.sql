INSERT INTO token_contents (token_id, content_id, content_value)
VALUES (null, 1, 'В будущем здесь будет ссылка на файл с инструкцией.'),
         (null, 2, 'В будущем здесь будет контактная информация.'),
         (null, 3, 'Обработка Pay Out заявок недоступна из-за недостаточного уровня вашего токена.'),
         (null, 4, 'Сумма вашего баланса ниже допустимого значения. Прием новых заявок Pay In будет доступен после пополнения баланса!');


INSERT INTO banks (id, name)
VALUES (1, 'Сбербанк'),
       (2, 'Альфа-банк'),
       (3, 'Т-Банк'),
       (4, 'OZON'),
       (5, 'Райффайзенбанк'),
       (6, 'АкБарс'),
       (7, 'ПСБ'),
       (8, 'Уралсиб'),
       (9, 'Совкомбанк'),
       (10, 'МТС Банк'),
       (11, 'Газпромбанк'),
       (12, 'БКС'),
       (13, 'Почта Банк'),
       (14, 'РНКБ'),
       (15, 'Яндекс Банк'),
       (16, 'Оренбург Банк'),
       (17, 'UniCredit Bank (ЮниКредит)'),
       (18, 'Углеметбанк');

INSERT INTO token_banks (token_id, bank_id)
VALUES (null, 1),
         (null, 2),
         (null, 3),
         (null, 4),
         (null, 5),
         (null, 6),
         (null, 7),
         (null, 8),
         (null, 9),
         (null, 10),
         (null, 11),
         (null, 12),
         (null, 13),
         (null, 14),
         (null, 15),
         (null, 16),
         (null, 17),
         (null, 18);


INSERT INTO wallets (id, wallet_address)
VALUES (1, 'TQGiBszGbRcHis9ywxEEvtvfUeGnrHK5MX');


INSERT INTO tokens (wallet_id, token)
VALUES (1, 'j6RTqE9xAbF2Kk5VyHG7CnPd4'),
       (1, 'X9D2gCvLk8AqZTbE4fJwP7R5n'),
       (1, 't8Yk3PzQX7eL6uZc5rWjA2Fh'),
       (1, 'R7sL2Kj8Tn3x9Vq4bYp5fCmG'),
       (1, 'D3GksDhdCpf13IyB80FAEPCX'),
       (1, 'iI3qDVhPvDtKICLWeCOqMHdz'),
       (1, 'du1FhuLsG1JemAiYnmcB7AIN'),
       (1, '1RmXnupLn2yC4FCoxiSPtHdI'),
       (1, 'DGMTglgc3jXqyRyaUGnwGYST'),
       (1, 'tFknVg2Q7y9Mxg4QE0hvDB92'),
       (1, 'BnLozzjMakm8UPm69U9xQHvG'),
       (1, '4W7ncqF3RPJHZe7ATnhOiI0q'),
       (1, 'SEDiMLCiIHhcOnlybhSKuT9z'),
       (1, '5r6MPuBvguCIO79J1LWWKehU'),
       (1, 'GofyqrfbscnDSUm1BvImmqKy'),
       (1, 'TkdjsJefxgNRLk3UqOpplZm'),
       (1, 'BldqtfvcmQWEn9HbJkUyrqPg'),
       (1, 'FpxlwtzsnPVKm7XcQnRddLkT'),
       (1, 'GftuxbyodTQLm8RaWpkmoSnV'),
       (1, 'NplkgqybvDXWn2VzImJtpdQz'),
       (1, 'RchwtfvoxLJMk5XaQsUyzKrN'),
       (1, 'JrfgyopbxRQLu6NzTpHmtKyP'),
       (1, 'LgdjexuqnWNPm4TzYrOpkXvQ'),
       (1, 'MczhxqfovVURl9NsWrJtyKbP'),
       (1, 'DqlkwbtynQJXm1VcRoFpzgNs');
