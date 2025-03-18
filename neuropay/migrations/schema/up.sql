create table admin_users
(
    id       integer not null
        constraint admin_users_pk
            primary key autoincrement,
    login    TEXT    not null
        constraint admin_users_pk_2
            unique,
    password TEXT    not null
);

create table banks
(
    id   integer not null
        constraint banks_pk
            primary key autoincrement,
    name TEXT    not null
        constraint banks_pk_2
            unique
);

create table contents
(
    id          integer not null
        constraint contents_pk_2
            primary key autoincrement,
    content_key TEXT    not null
        constraint contents_pk
            unique,
    description TEXT    not null
);

create table wallets
(
    id             integer not null
        constraint wallets_pk
            primary key autoincrement,
    wallet_address TEXT    not null
        constraint wallets_pk_2
            unique
);

create table tokens
(
    id               integer               not null
        constraint tokens_pk
            primary key autoincrement,
    token            TEXT                  not null
        constraint tokens_pk_2
            unique,
    wallet_id        integer               not null
        constraint tokens_wallets_id_fk
            references wallets
            on update restrict on delete restrict,
    security_deposit REAL    default 0.00  not null,
    working_deposit  REAL    default 0.00  not null,
    rate             integer default 8     not null,
    is_deactivated   integer default 0     not null,
    frozen_deposit   REAL    default 0.00  not null,
    currency         TEXT    default 'RUB' not null
);

create table cards
(
    id             INTEGER not null
        primary key autoincrement,
    bank_id        INTEGER
        constraint cards_banks_id_fk
            references banks
            on update restrict on delete restrict,
    card_number    TEXT,
    phone_number   TEXT,
    hidden         INTEGER default 0,
    account_number TEXT,
    external_id    integer not null,
    token_id       integer not null
        constraint cards_tokens_id_fk
            references tokens
            on update restrict on delete cascade
);

create index cards_bank_id_index
    on cards (bank_id);

create index cards_token_id_index
    on cards (token_id);

create table kpi_statistics
(
    id                 integer           not null
        constraint kpi_statistics_pk
            primary key autoincrement,
    token_id           integer           not null
        constraint kpi_statistics_tokens_id_fk
            references tokens
            on update restrict on delete cascade,
    date               TEXT,
    profit             integer           not null,
    transactions_count integer default 0 not null,
    constraint kpi_statistics_pk_2
        unique (token_id, date)
);

create index kpi_statistics_token_id_index
    on kpi_statistics (token_id);

create table token_banks
(
    id         integer             not null
        constraint token_banks_pk
            primary key autoincrement,
    token_id   integer
        constraint token_banks_tokens_id_fk
            references tokens
            on update restrict on delete cascade,
    bank_id    integer             not null
        constraint token_banks_banks_id_fk
            references banks
            on update restrict on delete cascade,
    sort_order integer default 100 not null,
    constraint token_banks_pk_2
        unique (token_id, bank_id)
);

create index token_banks_sort_order_index
    on token_banks (sort_order);

create table token_contents
(
    id            integer not null
        constraint token_contents_pk
            primary key autoincrement,
    token_id      integer
        constraint token_contents_tokens_id_fk
            references tokens
            on update restrict on delete cascade,
    content_id    integer not null
        constraint token_contents_contents_id_fk
            references contents
            on update restrict on delete cascade,
    content_value TEXT    not null,
    constraint token_contents_pk_2
        unique (token_id, content_id)
);

create index token_contents_content_id_index
    on token_contents (content_id);

create index token_contents_token_id_index
    on token_contents (token_id);

create index tokens_is_deactivated_index
    on tokens (is_deactivated desc);

create index tokens_wallet_id_index
    on tokens (wallet_id);

create table users
(
    id       INTEGER not null
        primary key autoincrement,
    token_id integer not null
        constraint users_tokens_id_fk
            references tokens
            on update restrict on delete cascade,
    email    TEXT    not null
        constraint users_pk
            unique,
    password TEXT    not null
);

create index users_token_id_index
    on users (token_id);


INSERT INTO admin_users (login, password)
VALUES ('admin@neuropay', 'K86f0mNnEM81');

INSERT INTO contents (id, content_key, description)
VALUES (1, 'platform_instruction', 'Инструкция'),
       (2, 'contact_information', 'Контакты'),
       (3, 'pay_out_orders_are_unavailable_error_message', 'Pay Out - сообщение об ошибке'),
       (4, 'pay_in_orders_are_unavailable_error_message', 'Pay In - сообщение об ошибке');
