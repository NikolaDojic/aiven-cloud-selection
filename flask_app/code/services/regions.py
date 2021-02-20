import traceback


class RegionService:
  def __init__(self, clouds=[]):
    self.regions = []
    self.regions_from_clouds(clouds)

  def regions_from_clouds(self, clouds=[]):
    self.platforms = []
    for cloud in clouds:
      current_region = cloud["location"]["region"]
      platform_id = cloud.get("cloud_name", "").split("-")[0]
      if all([region["region"] != current_region for region in self.regions]):
        new_region = { "region": current_region, "platforms": [platform_id] }
        self.regions.append(new_region)
      else:
        region = [
            region for region in self.regions
            if region["region"] == current_region
        ][0]
        if platform_id not in region["platforms"]:
          region["platforms"].append(platform_id)


region_service = RegionService()
