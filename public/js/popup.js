
$(document).ready(function(){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

        //search

    $('#search-box').keyup(function(){
        var keyword = $(this).val();
        var _html ='';
        $.ajax({
            url: 'search',
            type : 'get',
            data: {keyword: keyword},
            success: function(data){
                //console.log(data)
                for(var user of data.user){
                    _html += '<div class="propo">';
                    _html += '<img src="http://127.0.0.1:8000/image/avt/'+user.avatar+'" class="propo-img">';
                    _html += '<a class="propo-name" href="http://127.0.0.1:8000/Kilogram/'+user.username+'">'+user.username+'</a> </div>';
                    $('.proposal-list').html(_html)
                    //console.log(user.username)
                }
            }

           

            
        })
        //  for(var i in user){
        //         _html += '<div class="propo">';
        //         _html += '<img src="http://127.0.0.1:8000/image/avt/AVT.2.1654262360.jpg" class="propo-img">';
        //         _html += '<a class="propo-name" href="">'+i.username+'</a> </div>';
        //         $('.proposal-list').html(_html)     
        //     }        

        
    })




    var pro_PostID

    $(".icon-comment, .user-post").click(function() {
        pro_PostID = $(this).attr('id');
    })
    // crop image
    $image_crop = $('#image_demo').croppie({
        enableExif: true,
        showZoomer: false,
        viewport: {
            width:456,
            height:486,
            type:'square' //circle
        },
        boundary:{
          width:456,
          height:486
        }
      });
     
      $('#upload_image').on('change', function(){
          $('.input_upload_img').hide()
        var reader = new FileReader();
        reader.onload = function (event) {
          $image_crop.croppie('bind', {
            url: event.target.result
          }).then(function(){
            console.log('jQuery bind complete');
          });
        }
        reader.readAsDataURL(this.files[0]);
        // $('#uploadimageModal').modal('show');
      });

    // create post popup
    $('.js-create-post').click(function(){
        $('.cr-image').hide()
        $('.modal').addClass('open');
        $('.cr-viewport').add('.cr-boundary').css('border-bottom-left-radius', '15px')
    })

    $('.js-modal-close').click(function(){
        $('.modal').removeClass('open');
        $('.input_upload_img').show()
    })

    $('#post_btn').click(function(event){
        event.preventDefault();
        caption = $('#caption').val()

        $image_crop.croppie('result', {
            type: 'canvas',
            size: 'viewport'}).then(function(response){
                
                $.ajax({
                    url:"post",
                    type: "POST",
                    data: {"image":response, "caption":caption },
                    success: function(){
                        alert('Upload successfully');
                        $('.modal').removeClass('open');
                    },
                    error: function(){
                        alert('Upload failed');
                     },
                }) 

               location.reload()
            })
    })

    
    save_img = document.querySelector("#chose-img");
    save_img.onchange = function (e) {
        if (e.target.files.length > 0) {
            src = URL.createObjectURL(e.target.files[0]);
            image = document.querySelector(".img-container img");
            image.src = src;
        }
    }


    // modify
    $('.modify').click(function(){
        $('.modify-modal').addClass('open');
    })

    $('.modal-mdf-close').click(function(){
        $('.modify-modal').removeClass('open');
    })

    $('#mdf_form').on('submit', function(event){
        event.preventDefault()
        var y =  new FormData(this);
        $.ajax({
            type: 'post',
            url: "profile/mdf",
            data:new FormData(this),
            contentType: false,
            processData: false,

            success: function(data){
                // alert('Your changes have been successful');
                alert(data.success);
                location.reload();
                $('.modify-modal').removeClass('open');
                
                
            },
            error: function(data){
                alert(data.responseJSON.error);
             }
        
        })
    })




    // post option

    $('.post-option').click(function(){
        $('.post-option-container').addClass('open')
    })

    $('.post-option-container').click(function(){
        $('.post-option-container').removeClass('open')
    })

    $('.post-option-delete').click(function(){
        $.ajax({
            type: 'post',
            data:{'pro_PostID': pro_PostID},
            url: "post/delete",
            success: function(data){
                alert('delete successfully')
                location.reload();
            }

        })
    })

    // edit option

    $('.post-option-edit').click(function(){

        rootSrcImg =  $('.post-photo').attr('src')
        rootCaption = $('.modal-caption').text()

        $('.edit-modal').addClass('open')
        
        $('.edit-left-modal img').attr('src',rootSrcImg)
        $('#edit-caption').text(rootCaption)

    })

    $('.edit-modal-close').click(function(){
        $('.edit-modal').removeClass('open')
    })

    $('#edit-post_btn').click(function(event){
        event.preventDefault()
        edit_caption = $('#edit-caption').val()
        $.ajax({
            type: 'post',
            url: "post/edit",
            data: {'postID': pro_PostID, 'newCaption' : edit_caption},
            success: function(data){
                alert('Done')
            }
        })
    })
})


