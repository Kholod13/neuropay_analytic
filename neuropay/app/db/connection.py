import os
import sqlite3

from app.settings import BASE_DIR

DB_FILE_PATH = os.path.join(BASE_DIR, 'data.db')


class CursorContext:
    def __init__(self, connection):
        self.connection = connection
        self.cursor = None

    def __enter__(self):
        self.cursor = self.connection.cursor()
        return self.cursor

    def __exit__(self, exc_type, exc_value, traceback):
        self.cursor.close()


def dict_row_factory(cursor, row):
    return {col[0]: row[idx] for idx, col in enumerate(cursor.description)}


def new_db_connection():
    connection = sqlite3.connect(DB_FILE_PATH)
    connection.row_factory = dict_row_factory

    return connection


def new_connection_cursor(connection):
    return CursorContext(connection)
