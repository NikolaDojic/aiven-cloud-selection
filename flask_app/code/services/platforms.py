import re
import traceback

imgs = {
    "azure": "https://console.aiven.io/44dc479a1802bcb6996ab03a40b15923.png",
    "aws": "https://console.aiven.io/178c42cbb2c415976529db5c05b18304.png",
    "google": "https://console.aiven.io/9789c734722bef53b119852d91132a79.png",
    "do": "https://console.aiven.io/0b0c79059b641ca7867be39863a97de1.png",
    "upcloud": "https://console.aiven.io/f00b8cd058bf543584144ec9205eb51a.png",
}


class PlatformService:
  def __init__(self, clouds=[]):
    platforms = []
    self.platforms_from_clouds(clouds)

  def platforms_from_clouds(self, clouds=[]):
    self.platforms = []
    for cloud in clouds:
      platform_id = cloud.get("cloud_name", "").split("-")[0]
      if all([
          platform["platform_id"] != platform_id for platform in self.platforms
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
            "img": imgs.get(platform_id, ""),
            "regions": [cloud["location"]["region"]]
        }
        self.platforms.append(new_platform)
      else:
        platform = [
            platform for platform in self.platforms
            if platform["platform_id"] == platform_id
        ][0]
        current_region = cloud["location"]["region"]
        if current_region not in platform["regions"]:
          platform["regions"].append(current_region)


platform_service = PlatformService()
