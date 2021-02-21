from services.clouds import cloud_service, distance_calculator
import unittest


class CloudsTest(unittest.TestCase):
  def test_clouds_not_empty(self):
    self.assertTrue(len(cloud_service.clouds))

  def test_filter_clouds_by_platform(self):
    aws_clouds = cloud_service.filter_by_platform("aws")
    only_aws = all(
        [cloud["cloud_name"].startswith("aws-") for cloud in aws_clouds])
    do_clouds = cloud_service.filter_by_platform("do")
    only_do = all(
        [cloud["cloud_name"].startswith("do-") for cloud in do_clouds])
    upcloud_clouds = cloud_service.filter_by_platform("upcloud")
    only_upcloud = all([
        cloud["cloud_name"].startswith("upcloud-") for cloud in upcloud_clouds
    ])
    self.assertTrue(only_upcloud and only_do and only_aws)

  def test_filter_clouds_by_region(self):
    africa_clouds = cloud_service.filter_by_region("africa")
    only_africa = all(
        [cloud["location"]["region"] == "africa" for cloud in africa_clouds])
    europe_clouds = cloud_service.filter_by_region("europe")
    only_europe = all(
        [cloud["location"]["region"] == "europe" for cloud in europe_clouds])
    south_america_clouds = cloud_service.filter_by_region("south america")
    only_south_america = all([
        cloud["location"]["region"] == "south america"
        for cloud in south_america_clouds
    ])
    self.assertTrue(only_africa and only_europe and only_south_america)

  def test_distance_calculator(self):
    coord1 = {
        "latitude": 13,
        "longitude": 20,
    }
    coord2 = {
        "latitude": 1,
        "longitude": 13,
    }
    distance = 1540  #source https://www.nhc.noaa.gov/gccalc.shtml
    margin_for_error = 10  #it is tolerable if the distance calculation is of by 10km
    calculated_distance = round(distance_calculator(coord1, coord2))
    self.assertTrue(abs(distance - calculated_distance) < margin_for_error)


if __name__ == "__main__":
  unittest.main()
