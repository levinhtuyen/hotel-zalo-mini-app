export default function parseQueryString(query) {

  if (!query) {
    return
  }
  var urlparts = query?.split('/?');
  var vars = urlparts[1]?.split("&");
  var params = {};
  if (!vars)
  {
    return
  }
  for (var i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=") as any;
    var key = decodeURIComponent(pair?.shift());
    var value = decodeURIComponent(pair.join("="));
    // If first entry with this name
    if (typeof params[key] === "undefined") {
      params[key] = value;
      // If second entry with this name
    } else if (typeof params[key] === "string") {
      var arr = [params[key], value];
      params[key] = arr;
      // If third or later entry with this name
    } else {
      params[key].push(value);
    }
  }
  return params;
}
