import unittest
from services.regions import region_service


class RegionsTest(unittest.TestCase):
  def test_regions_not_empty(self):
    self.assertTrue(len(region_service.regions))


if __name__ == "__main__":
  unittest.main()
