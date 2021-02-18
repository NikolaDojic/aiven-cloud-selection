from os import environ, path, urandom

from dotenv import load_dotenv

basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, '.env'))

API_KEY = environ.get("FLASK_APP_AIVEN_API_KEY")
API_URL = "api.aiven.io"
