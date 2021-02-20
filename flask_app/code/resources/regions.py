import traceback
from flask_restful import Resource
from services.regions import region_service


class Regions(Resource):
  def get(self):
    try:
      return {
          "regions": region_service.regions,
      }, 200
    except Exception as e:
      traceback.print_exc()
      print(e.__class__, e)
      return { 'message': 'failed to fetch data'}, 500
