from app import app
from app.settings import FLASK_DEBUG, HOST, PORT

app.run(host=HOST, port=PORT, debug=FLASK_DEBUG)
