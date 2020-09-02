window.photos = function() {
  var photo = {};
  var type = 'GET';

  function showPost() {
    var images = JSON.parse(localStorage.getItem('uploads'));
    if (images) {
      let photoTemplateUrl = '../assets/templates/add-image.mustache';
      $.get({url: photoTemplateUrl, type: type, success: function(image) {
        var output = Mustache.render(image, images);
        $('.gallery').prepend(output);
        displayModalImage();
      }});
    }
  }

  function displayModalImage() {
    $('.modal-link').on('click', function() {
      let imageUrl = $(this).attr('src');
      $('.modal-image').attr('src', imageUrl);
    });
  }

  function displayUploads() {
    var element = 'photos';
    var dataUrl = '../assets/data/posts.json';
    var templateurl = '../assets/templates/photos.mustache';

    $.get({url: dataUrl, type: type, success: function(photos) {
      $.get({url: templateurl, success: function(frmaes) {
        var frame = Mustache.render(frmaes, photos); 
        window.common().renderContent(frame, element);
        window.common().updateName('profile-name');
        showPost();
        displayModalImage();
      }});
    }});
  }

  photo.initialize = function() {
    displayUploads();
  }
  return photo;
};
