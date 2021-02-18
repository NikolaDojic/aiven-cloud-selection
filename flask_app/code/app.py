from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from resources.clouds import Clouds
from resources.platforms import Platforms

app = Flask(__name__)
api = Api(app, "/api")
cors = CORS(app)

api.add_resource(Clouds, "/clouds")
api.add_resource(Platforms, "/platforms")

if __name__ == '__main__':
  app.run(port=5000, debug=True)
