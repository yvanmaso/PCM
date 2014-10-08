from twisted.web import resource

def printArgs(args):
  s = ""
  for (k, v) in sorted(args.items()):
    l = len(k) + 3
    s += k + " = "
    first = True
    for i in v:
      s += ("" if first else " " * l) + i + "\n"
      first = False
  return s
  
def parseArgs(args):
  s = ""

  for (k, v) in sorted(args.items()):
    extra = ""

    if len(v) == 4:
      template = "*{1}* - Row: {0[0]}; column: {0[1]}"

      if v[2] == v[3]:
        extra = "UNCHANGED"
        template += "; value: {0[2]}"
      elif v[2] == "":
        extra = "ADDED"
        template += "; new value: {0[3]}"
      elif v[3] == "":
        extra = "DELETED"
        template += "; old value: {0[2]}"
      else:
        extra = "CHANGED"
        template += "; old value: {0[2]}; new value: {0[3]}"

    else:
      template = "Unknown params: {}"

    s += template.format(v, extra) + "\n"
  return s


class CallbackResource(resource.Resource):
  def render(self, request):
    request.setHeader("Content-Type", "text/plain; charset=utf-8")
    return parseArgs(request.args)

resource = CallbackResource()
