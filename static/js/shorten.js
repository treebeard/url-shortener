$("#url-field").keyup(function(event){
    if(event.keyCode == 13){
        $(".btn-shorten").click();
    }
});

// add an event listener to the shorten button for when the user clicks it
$('.btn-shorten').on('click', function(){

  //check if url starts with http or https, if not, append http
  var protocolpattern = /^((http|https):\/\/)/;
  var pattern = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z‌​]{2,6}\b([-a-zA-Z0-9‌​@:%_\+.~#?&=]*)/gm;
  var re_weburl = new RegExp(
    "^" +
        // protocol identifier (optional) + //
        "(?:(?:https?:)?//)?" +
        // user:pass authentication (optional)
        "(?:\\S+(?::\\S*)?@)?" +
        // host (optional) + domain + tld
        "(?:(?!-)[-a-z0-9\\u00a1-\\uffff]*[a-z0-9\\u00a1-\\uffff]+(?!./|\\.$)\\.?){2,}" +
        // server port number (optional)
        "(?::\\d{2,5})?" +
        // resource path (optional)
        "(?:/\\S*)?" +
    "$", "i"
  );
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