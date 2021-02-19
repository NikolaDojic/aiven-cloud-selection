import re
import traceback
from services.http_client import request

imgs = {
    "azure": "https://console.aiven.io/44dc479a1802bcb6996ab03a40b15923.png",
    "aws": "https://console.aiven.io/178c42cbb2c415976529db5c05b18304.png",
    "google": "https://console.aiven.io/9789c734722bef53b119852d91132a79.png",
    "do": "https://console.aiven.io/0b0c79059b641ca7867be39863a97de1.png",
    "upcloud": "https://console.aiven.io/f00b8cd058bf543584144ec9205eb51a.png",
}


class CloudService:
  def __init__(self):
    clouds = []
    available_platforms = []
    self.get_clouds()

  def get_clouds(self):
    self.clouds = []
    try:
      self.clouds = request("GET", "clouds").get("clouds", [])
      self.platforms_from_clouds()
    except Exception as e:
      traceback.print_exc()
      print(e.__class__, e)

  def platforms_from_clouds(self, clouds=None):
    self.available_platforms = []
    clouds = clouds or self.clouds
    for cloud in clouds:
      platform_id = cloud.get("cloud_name", "").split("-")[0]
      cloud = self.__normalize_cloud(cloud)

      if all([
          platform["platform_id"] != platform_id
          for platform in self.available_platforms
      ]):
        try:
          name = re.findall(r'(?<=\-\s)(.*?)(?=\:)',
                            cloud["cloud_description"])[0] or platform_id
        except Exception as e:
          traceback.print_exc()
          print(e.__class__, e)
          name = platform_id

        new_platform = {
            "platform_id": platform_id,
            "name": name,
            "img": imgs.get(platform_id, "")
        }
        self.available_platforms.append(new_platform)

  def filter_by_platform(self, platform_id, clouds=None):
    clouds = clouds or self.clouds
    if not platform_id:
      return [*clouds]
    filtered_clouds = [
        cloud for cloud in clouds
        if cloud["cloud_name"].startswith(f"{platform_id}-")
    ]
    return filtered_clouds

  def filter_by_geo_region(self, geo_region, clouds=None):
    clouds = clouds or self.clouds
    if not geo_region:
      return [*clouds]
    filtered_clouds = [
        cloud for cloud in clouds if cloud["geo_region"] == geo_region
    ]
    return filtered_clouds

  def filter_clouds(self, platform="", geo_region=""):
    clouds = self.filter_by_platform(platform)
    clouds = self.filter_by_geo_region(geo_region, clouds)
    return clouds

  def __normalize_cloud(self, cloud):
    location = {}
    location_keys = [key for key in cloud if key.startswith("geo_")]
    for key in location_keys:
      location[key[4:]] = cloud[key]
      del cloud[key]
    cloud["location"] = location
    return cloud


cloud_service = CloudService()
