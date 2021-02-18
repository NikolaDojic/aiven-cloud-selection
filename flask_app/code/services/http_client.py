import http.client
from config import API_KEY, API_URL
import json
import traceback

conn = http.client.HTTPSConnection(API_URL)
API_VERSION = "/v1/"


def request(method, sufix, **kwargs):
  try:
    key_args = { **kwargs }

    if "headers" not in key_args:
      key_args["headers"] = {}

    key_args["headers"] = {
        "Authorization": f"Bearer {API_KEY}",
        **key_args["headers"]
    }
    conn.request(method, f"{API_VERSION}{sufix}", **kwargs)
    res = conn.getresponse()
    data = res.read()
    return json.loads(data.decode("utf-8"))
  except Exception as e:
    traceback.print_exc()
    print(e.__class__, e)
    return res
