function addWish(id, user, timestamp, text) {
    var pText = text.replace(/\r\n/g, "<br>").replace(/\n/g, "<br>");

    var t = document.querySelector('#wish-template');
    t.content.querySelector('.username-div > p').innerHTML = user;
    t.content.querySelector('.timestamp-div > p').innerHTML = timestamp;
    t.content.querySelector('.wish-text-div > p').innerHTML = pText;

    var clone = document.importNode(t.content, true);
    clone.querySelector('.wish-div').setAttribute("data-wish-id", id);

    var feedbox = document.querySelector("#feedbox");
    feedbox.insertBefore(clone, feedbox.firstChild);
}


(function(){
    // render feed
    var jqxhr = $.get('/api/v1/wishs/')
        .done(function(data){
        for(var i=0; i<data.length; i++){
            wish = data[i]
            var id = wish['id'];
            var createdAt = wish['created_at'];
            var text = wish['text'];
            var user = wish['user'];
            addWish(id, user, createdAt, text);
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
                    var wishId = wish['id'];
                    var createdAt = wish['created_at'];
                    var text = wish['text'];
                    var user = wish['user'];
                    addWish(wishId, user, createdAt, text);
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


(function(){
    // when close button is clicked, delete wish.
    $(document).ready(function(){
        $('#delete-wish-modal').on('show.bs.modal', function(evt){
            var clickedBtn = evt.relatedTarget;
            var wishId = clickedBtn.parentElement.getAttribute('data-wish-id');
            $('#wishId').val(wishId);
        })

        $('#modal-delete-btn').click(function(){
            var wishId = $('#wishId').val();
            var request = $.ajax({
                url: '/api/v1/wish/' + wishId,
                method: 'DELETE',
            })
            .done(function(data, textStatus, xhr){
                $('div[data-wish-id="' + wishId + '"]').remove();
            })
            .fail(function(xhr, textStatus, errorThrown){
                console.log(errorThrown);
            });
        })
    })
})();

