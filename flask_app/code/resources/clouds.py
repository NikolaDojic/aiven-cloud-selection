import traceback
from flask_restful import Resource, reqparse
from services.clouds import cloud_service


class Clouds(Resource):
  def get(self):
    try:
      parser = reqparse.RequestParser()
      parser.add_argument('geo_region', type=str)
      parser.add_argument('platform', type=str)
      args = parser.parse_args()
      platform = args["platform"]
      geo_region = args["geo_region"]
      clouds = cloud_service.filter_clouds(platform, geo_region)
      return { "clouds": clouds }, 200
    except Exception as e:
      traceback.print_exc()
      print(e.__class__, e)
      return { 'message': 'failed to fetch data'}, 500
