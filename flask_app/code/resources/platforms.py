import traceback
from flask_restful import Resource, reqparse
from services.clouds import cloud_service


class Platforms(Resource):
  def get(self):
    try:
      return {
          "platforms": cloud_service.available_platforms,
      }, 200
    except Exception as e:
      traceback.print_exc()
      print(e.__class__, e)
      return { 'message': 'failed to fetch data'}, 500
