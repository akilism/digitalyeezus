#!/usr/bin/env python
from twisted.web.server import Site
from twisted.web.resource import Resource
from twisted.internet import reactor

import yeezus_lang
import cgi
import json

PORT = 8888
yeezus = yeezus_lang.YeezusResponder()


class YeezusTalks(Resource):
  def render_GET(self, request):
    return "<html><body><pre>%s</pre></body></html>" % ("Can't tell me nothing.", )

  def render_POST(self, request):
    reply = { 'reply': self.get_reply(cgi.escape(request.args['message'][0])) }
    request.responseHeaders.addRawHeader(b"content-type", b"application/json")
    return json.dumps(reply)
    # return "<html><body>%s</body></html>" % (, )

  def get_reply(self, message):
    print("=> " + message)
    reply = yeezus.buildreply(message)
    print("<= " + reply)
    return reply.encode('unicode-escape')


root = Resource()
root.putChild('yeezus', YeezusTalks())
root.putChild('', YeezusTalks())
factory = Site(root)
reactor.listenTCP(PORT, factory)
print('Listening on ' + str(PORT))
reactor.run()
