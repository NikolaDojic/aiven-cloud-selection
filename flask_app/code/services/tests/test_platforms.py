import unittest
from services.platforms import platform_service


class PlatformsTest(unittest.TestCase):
  def test_platforms_not_empty(self):
    self.assertTrue(len(platform_service.platforms))


if __name__ == "__main__":
  unittest.main()
