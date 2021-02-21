import unittest
import json
from app import app
from services.platforms import platform_service
from services.http_client import request


class PlatformResourceTest(unittest.TestCase):
  def setUp(self):
    app.config['TESTING'] = True
    app.config['WTF_CSRF_ENABLED'] = False
    app.config['DEBUG'] = False
    self.app = app.test_client()

    self.assertEqual(app.debug, False)

  def test_get_platforms(self):
    response = self.app.get("/api/platforms", follow_redirects=True)
    platforms = json.loads(response.data)
    self.assertListEqual(platforms["platforms"], platform_service.platforms)


if __name__ == "__main__":
  unittest.main()
