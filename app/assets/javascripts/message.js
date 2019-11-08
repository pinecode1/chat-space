$(document).on('turbolinks:load', function(){
    function buildHTML(message) {
      var content = message.content ? `${ message.content }` : "";
      var img = message.image  ? `<img src=${ message.image }` : "";
      
      var html = ` 
      <div class="message" data-message-id= "${message.id}">
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.user_name}
            </div>
            <div class="upper-message__date">
              ${message.created_at}
            </div>
          </div> 
          <div class="lower-message">
            <p class="lower-message__content">
              ${content}
            </p>
          </div>
          ${img}
      </div>
      `
      return html;
    }
    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(message){
        var html = buildHTML(message);
        $('.messages').append(html);
        $('form')[0].reset();
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function(){
        alert("メッセージ送信に失敗しました");
      })
      return false;
    })
  
    var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        if (messages.length != 0 ) {
          messages.forEach(function(message){
            insertHTML = buildHTML(message)
          });
           $('.messages').append(insertHTML);
           $('form')[0].reset();
           $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        }
      })
      .fail(function() {
        alert('error');
      });  
    }; 
  };
  setInterval(reloadMessages, 5000);
});

