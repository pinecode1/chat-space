$(document).on('turbolinks:load', function(){
   function buildHTML(contents) {
    var data = contents.image.url  ? `<img src=${contents.image.url} class="lower-message__image">` : "";

    var html = ` 
    <div class="message">
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${contents.user_name}
          </div>
          <div class="upper-message__date">
            ${contents.date}
          </div>
        </div> 
        <div class="lower-message">
          <p class="lower-message__content">
            ${contents.content}
          </p>
            ${data}
        </div>
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
    .done(function(contents){
      var html = buildHTML(contents);
      $('.messages').append(html);
      $('form')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
    return false;
  })
});
