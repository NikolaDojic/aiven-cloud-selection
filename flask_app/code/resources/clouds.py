import traceback
from flask_restful import Resource, reqparse
from services.clouds import cloud_service


class Clouds(Resource):
  def get(self):
    try:
      parser = reqparse.RequestParser()
      parser.add_argument('region', type=str)
      parser.add_argument('platform', type=str)
      parser.add_argument('refresh', type=str)
      args = parser.parse_args()
      platform = args["platform"]
      refresh = args["refresh"]
      region = args["region"]
      if refresh == "true":
        cloud_service.get_clouds()

      clouds = cloud_service.filter_clouds(platform, region)
      return { "clouds": clouds }, 200
    except Exception as e:
      traceback.print_exc()
      print(e.__class__, e)
      return { 'message': 'failed to fetch data'}, 500


class ClosestCloud(Resource):
  def get(self):
    try:
      parser = reqparse.RequestParser()
      parser.add_argument('latitude', type=float, required=True)
      parser.add_argument('longitude', type=float, required=True)
      args = parser.parse_args()
      cloud = cloud_service.get_closest_cloud(args)
      return cloud, 200
    except Exception as e:
      traceback.print_exc()
      print(e.__class__, e)
      return { 'message': 'failed to fetch data'}, 500
