from . import app  # Импортируем приложение из __init__.py
from .settings import FLASK_DEBUG, HOST, PORT

if __name__ == "__main__":
    app.run(host=HOST, port=PORT, debug=FLASK_DEBUG)

print(app.url_map)