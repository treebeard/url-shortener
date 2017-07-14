$("#url-field").keyup(function(event){
    if(event.keyCode == 13){
        $(".btn-shorten").click();
    }
});

// add an event listener to the shorten button for when the user clicks it
$('.btn-shorten').on('click', function(){

  //check if url starts with http or https, if not, append http
  var protocolpattern = /^((http|https):\/\/)/;
  var pattern = /^(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  var inputurl = $.trim($('#url-field').val());

  if (!inputurl){
      var resultHTML = '<span>No URL found</span>';
      $('#link').html(resultHTML);
      $('#link').hide().fadeIn('slow');
  }

  else if(!pattern.test(inputurl)) {
      var resultHTML = '<span>Invalid URL, are you sure you entered it correctly?</span>';
      $('#link').html(resultHTML);
      $('#link').hide().fadeIn('slow');
  }

  else{
    if (!protocolpattern.test(inputurl)){
        inputurl = "http://" + inputurl;
    }
    // AJAX call to /api/shorten with the URL that the user entered in the input box
    $.ajax({
      url: '/api/shorten',
      type: 'POST',
      dataType: 'JSON',
      data: {url: inputurl},
      success: function(data){
          // display the shortened URL to the user that is returned by the server
          var resultHTML = '<a class="result" target="_blank" href="' + data.shortUrl + '">'
              + data.shortUrl + '</a>';
          $('#link').html(resultHTML);
          $('#link').hide().fadeIn('slow');
      }
    });
  }
  /**
  if (!inputurl){
      var resultHTML = '<span>No URL found</span>';
      $('#link').html(resultHTML);
      $('#link').hide().fadeIn('slow');
  }

  else if(!validUrl.isUri(inputurl)) {
      var resultHTML = '<span>Invalid URL, are you sure you entered it correctly?</span>';
      $('#link').html(resultHTML);
      $('#link').hide().fadeIn('slow');
  }

  else{
    if (!protocolpattern.test(inputurl)){
        inputurl = "http://" + inputurl;
    }
    // AJAX call to /api/shorten with the URL that the user entered in the input box
    $.ajax({
      url: '/api/shorten',
      type: 'POST',
      dataType: 'JSON',
      data: {url: inputurl},
      success: function(data){
          // display the shortened URL to the user that is returned by the server
          var resultHTML = '<a class="result" target="_blank" href="' + data.shortUrl + '">'
              + data.shortUrl + '</a>';
          $('#link').html(resultHTML);
          $('#link').hide().fadeIn('slow');
      }
    });
  }
  **/
});