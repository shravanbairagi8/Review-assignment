window.photos = function() {
  var photo = {};

  function showPost() {
    let images = helper.getLocalStorageData('uploads');
    if (images) {
      let photoTemplateUrl = '../assets/templates/add-image.mustache';
      $.get({url: photoTemplateUrl, type: type, success: function(image) {
        let output = Mustache.render(image, images);
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
    let element = 'photos';
    let dataUrl = '../assets/data/posts.json';
    let templateurl = '../assets/templates/photos.mustache';

    $.get({url: dataUrl, type: type, success: function(photos) {
      $.get({url: templateurl, success: function(frmaes) {
        let frame = Mustache.render(frmaes, photos);
        helper.renderContent(frame, element);
        helper.updateName('profile-name');
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
