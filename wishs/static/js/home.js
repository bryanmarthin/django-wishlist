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
    // render feed
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


(function(){
    // add wish to feed when click add wish
    $(document).ready(function(){
        $('#add-wish-btn').click(function(){
            var addWishElm = $('#add-wish-textarea')
            var addWishVal = addWishElm.val();
            if (addWishVal){
                var request = $.ajax({
                    url: '/api/v1/wish/',
                    method: 'POST',
                    data: {
                        'user': 'John Smith',
                        'text': addWishVal,
                    },
                    dataType: 'json',
                })

                request.done(function(wish){
                    var createdAt = wish['created_at'];
                    var text = wish['text'];
                    var user = wish['user'];
                    addWish(user, createdAt, text);
                })

                request.fail(function(){
                    alert("Your wish can't be granted.")
                })

                request.always(function(){
                    addWishElm.val('');
                })

            } else {
                alert('Please enter your wish.')
            }
        })
    })
})();

