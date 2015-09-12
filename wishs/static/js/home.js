function addWish(user, timestamp, text) {
  var pText = text.replace(/\r\n/g, "<br>").replace(/\n/g, "<br>");

  var t = document.querySelector('#wish-template');
  t.content.querySelector('#user').innerHTML = user;
  t.content.querySelector('#timestamp').innerHTML = timestamp;
  t.content.querySelector('#text').innerHTML = pText;

  var clone = document.importNode(t.content, true);
  var feedbox = document.querySelector("#feedbox");

  feedbox.insertBefore(clone, feedbox.firstChild);
}


(function(){
  // make AJAX call to http://127.0.0.1:8000/api/v1/wishs/
  var jqxhr = $.get('/api/v1/wishs/')
    .done(function(data){
      for(var i=0; i<data.length; i++){
        wish = data[i]
        var createdAt = wish['created_at'];
        var text = wish['text'];
        var user = wish['user'];
        addWish(user, createdAt, text);
      }
    })
})();

