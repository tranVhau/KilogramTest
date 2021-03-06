$(document).ready(function(){
    var postID = 0;

    Pusher.logToConsole = true;

     var pusher = new Pusher('bdf53e2c44d214125a54', {
       cluster: 'ap1'
     });
 
     var channel = pusher.subscribe('my-channel');
     channel.bind('my-event-comment', function(data) {
        var html_tag = 
        "<div class='content-post-cmt'>"+
            "<div class='content-post-pic-cmt'>"+
                "<img src='/image/avt/" + data.currUser.avatar +"'/>" +
            "</div>"+
            "<div class='cmt-box-main'>"+
                "<div class='top-cmt'>"+
                    "<p class='user-cmt'>" + data.currUser.username + "</p>"+
                    "<p class='sub-cmt-time'>1 hour ago</p>"+
                    "<p class='cmt-sub'>"+data.comment+ "</p>"+
                "</div>"+
            "</div>"+
        "</div>"
        
        $('#content-'+postID+'-main').append(html_tag)
    });



    $(".icon-comment, .user-post").click(function() {
        postID = $(this).attr('id');
        $("#content-post-right-wrapper").attr("class", "content-"+postID+"-right");
        $(".content-post-main").attr("id", "content-"+postID+"-main");
        $.ajax({
            type: 'post',
            url: "/comment/post/"+postID,
            cache: false,
            success: function(data){
                $(".content-post-main").html("");
                $.each(data.cmtLst, function( index, value) {
                    html_comment_tag = "<div class='content-post-cmt'>"+
                        "<div class='content-post-pic-cmt'>"+
                            "<img src='/image/avt/" + value.avatar + "'/>"+
                    "</div>"+
                    "<div class='cmt-box-main'>"+
                        "<div class='top-cmt'>"+
                            "<p class='user-cmt'>"+ value.username +"</p>"+
                            "<p class='sub-cmt-time'>1 hour ago</p>"+
                            "<p class='cmt-sub'>"+value.comment+ "</p>"+
                        "</div>"+
                    "</div>"+
                "</div>"
                });
                

                $('.modal-caption').text(data.postData.caption)
                $('.like-post').text(data.postData.likecount + " Likes");
                $('.post-photo').attr('src',"/image/post/"+data.postData.imgdir);
                $('.user-post-avt').attr('src', "/image/avt/"+data.postData.avatar);
                $('.content-post-name').text(data.postData.username)
                

                $('.post-modal').addClass('open');

                // alert(data.postData.username)
            }
        })
      });


    


      $(document).on('keyup', '.cmt-box', function(e){
        var comment = $(this).val();

        if(e.keyCode == 13 && comment != ''){
            $(this).val('');
            
            $.ajax({
                type: "post",
                url:"/comment",
                cache: false,
                data: {'comment': comment, 'postID': postID},
                success: function(){

                },
                error: function(jqXHR, status, err) {
                    
                },
                compelete: function(){
                   
                }
            })
        }
    })
    

    $('.modal-post-close').click(function(){
        // postID = $(this).attr('id');
        // alert(postID);
        $('.post-modal').removeClass('open');
    })

})
