import traceback
from flask_restful import Resource
from services.platforms import platform_service


class Platforms(Resource):
  def get(self):
    try:
      return {
          "platforms": platform_service.platforms,
      }, 200
    except Exception as e:
      traceback.print_exc()
      print(e.__class__, e)
      return { 'message': 'failed to fetch data'}, 500
