function getfacebook(url){
  try {
    var options =
    {
      "id" : url,
      "shares" : "application/json"
    };
    var response = UrlFetchApp.fetch("http://graph.facebook.com/?id=http://"+encodeURIComponent(url)+"&format=json", options);
  var results = Utilities.jsonParse(response.getContentText());
  var result = results;
  return result.shares;
  } catch(e){
    Logger.log(e);
  }
  var err = "-";
return err;
}
