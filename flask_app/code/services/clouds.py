import re
import traceback
from services.http_client import request


class CloudService:
  def __init__(self):
    clouds = []
    available_platforms = []
    self.get_clouds()

  def get_clouds(self):
    self.clouds = []
    self.available_platforms = []
    try:
      self.clouds = request("GET", "clouds").get("clouds", [])
      for cloud in self.clouds:
        prefix = cloud.get("cloud_name", "").split("-")[0]
        if all([
            platform["prefix"] != prefix
            for platform in self.available_platforms
        ]):
          try:
            name = re.findall(r'(?<=\-\s)(.*?)(?=\:)',
                              cloud["cloud_description"])[0] or prefix
          except Exception as e:
            traceback.print_exc()
            print(e.__class__, e)
            name = prefix

          new_platform = { "prefix": prefix, "name": name }
          self.available_platforms.append(new_platform)
    except Exception as e:
      traceback.print_exc()
      print(e.__class__, e)

  def filter_by_platform(self, prefix, clouds=None):
    clouds = clouds or self.clouds
    if not prefix:
      return [*clouds]
    filtered_clouds = [
        cloud for cloud in clouds
        if cloud["cloud_name"].startswith(f"{prefix}-")
    ]
    return filtered_clouds

  def filter_by_geo_region(self, geo_region, clouds=None):
    clouds = clouds or self.clouds
    if not geo_region:
      return [clouds]
    filtered_clouds = [
        cloud for cloud in clouds if cloud["geo_region"] == geo_region
    ]
    return filtered_clouds

  def filter_clouds(self, platform="", geo_region=""):
    clouds = self.filter_by_platform(platform)
    clouds = self.filter_by_geo_region(geo_region, clouds)
    return clouds


cloud_service = CloudService()
