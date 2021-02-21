import unittest
import json
from app import app
from services.clouds import cloud_service
from services.http_client import request


class CloudResourceTest(unittest.TestCase):
  def setUp(self):
    app.config['TESTING'] = True
    app.config['WTF_CSRF_ENABLED'] = False
    app.config['DEBUG'] = False
    self.app = app.test_client()

    self.assertEqual(app.debug, False)

  def test_get_clouds(self):
    response = self.app.get("/api/clouds", follow_redirects=True)
    clouds = json.loads(response.data)
    self.assertListEqual(clouds["clouds"], cloud_service.clouds)


if __name__ == "__main__":
  unittest.main()
