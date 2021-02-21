import traceback
from math import sin, cos, sqrt, atan2, radians
from services.http_client import request
from services.platforms import platform_service
from services.regions import region_service


class CloudService:
  def __init__(self):
    self.clouds = []
    self.get_clouds()

  def get_clouds(self):
    self.clouds = []
    try:
      self.clouds = [
          self.__normalize_cloud(cloud)
          for cloud in request("GET", "clouds").get("clouds", [])
      ]
      platform_service.platforms_from_clouds(self.clouds)
      region_service.regions_from_clouds(self.clouds)
    except Exception as e:
      traceback.print_exc()
      print(e.__class__, e)

  def filter_by_platform(self, platform_id, clouds=None):
    clouds = clouds or self.clouds
    if not platform_id:
      return [*clouds]
    filtered_clouds = [
        cloud for cloud in clouds
        if cloud["cloud_name"].startswith(f"{platform_id}-")
    ]
    return filtered_clouds

  def filter_by_region(self, region, clouds=None):
    clouds = clouds or self.clouds
    if not region:
      return [*clouds]
    filtered_clouds = [
        cloud for cloud in clouds if cloud["location"]["region"] == region
    ]
    return filtered_clouds

  def filter_clouds(self, platform="", region=""):
    clouds = self.filter_by_platform(platform)
    clouds = self.filter_by_region(region, clouds)
    return clouds

  def __normalize_cloud(self, cloud):
    location = {}
    location_keys = [key for key in cloud if key.startswith("geo_")]
    for key in location_keys:
      location[key[4:]] = cloud[key]
      del cloud[key]
    cloud["location"] = location
    return cloud

  def get_closest_cloud(self, user_coordinates, clouds=None):
    clouds = clouds or self.clouds
    shortest_distance = 120000  #absurdly large number
    closest_cloud = None
    for cloud in (self.clouds):
      current_distance = distance_calculator(cloud["location"],
                                             user_coordinates)
      if shortest_distance > current_distance:
        shortest_distance = current_distance
        closest_cloud = cloud

    return closest_cloud


#credit Michael0x2a https://stackoverflow.com/a/19412565/7562654
def distance_calculator(coord1, coord2):
  # approximate radius of earth in km
  R = 6371.0

  lat1 = radians(coord1["latitude"])
  lon1 = radians(coord1["longitude"])
  lat2 = radians(coord2["latitude"])
  lon2 = radians(coord2["longitude"])

  dlon = lon2 - lon1
  dlat = lat2 - lat1

  a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
  c = 2 * atan2(sqrt(a), sqrt(1 - a))

  distance = R * c
  return distance


cloud_service = CloudService()
