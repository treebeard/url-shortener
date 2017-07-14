// add an event listener to the shorten button for when the user clicks it
$('.btn-shorten').on('click', function(){
  // AJAX call to /api/shorten with the URL that the user entered in the input box
  var pattern = /^((http|https|ftp):\/\/)/;
  var inputurl = $('#url-field').val();
  if(!pattern.test(inputurl)) {
      inputurl = "http://" + inputurl;
  }

  $.ajax({
    url: '/api/shorten',
    type: 'POST',
    dataType: 'JSON',
    data: {url: inputurl},
    success: function(data){
        // display the shortened URL to the user that is returned by the server
        var resultHTML = '<a class="result" href="' + data.shortUrl + '">'
            + data.shortUrl + '</a>';
        $('#link').html(resultHTML);
        $('#link').hide().fadeIn('slow');
    }
  });
});