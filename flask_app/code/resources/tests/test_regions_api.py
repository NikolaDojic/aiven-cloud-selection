import unittest
import json
from app import app
from services.regions import region_service
from services.http_client import request


class RegionResourceTest(unittest.TestCase):
  def setUp(self):
    app.config['TESTING'] = True
    app.config['WTF_CSRF_ENABLED'] = False
    app.config['DEBUG'] = False
    self.app = app.test_client()

    self.assertEqual(app.debug, False)

  def test_get_regions(self):
    response = self.app.get("/api/regions", follow_redirects=True)
    regions = json.loads(response.data)
    self.assertListEqual(regions["regions"], region_service.regions)


if __name__ == "__main__":
  unittest.main()
