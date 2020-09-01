window.timeline = function() {
  var timeLine = {};
  var type = 'GET';
  var storageKey = 'uploads';
  var math = Math;
  var max = 1001;

  // To display time on posts
  function displayTime(element) {
    var pTime = $('#' + element).attr('data-id');
    var minute  = pTime.slice(19,21);
    var dt = new Date();
    var currTime = dt.getMinutes();
    var postedTime = 0;
    var maxSeconds = 60;
    var $element = $('#' + element);
    if (currTime > minute) {
      postedTime = currTime - parseInt(minute);
    } else if (currTime < minute) {
        postedTime = currTime + parseInt(minute);
    }

    if (postedTime >= maxSeconds) {
      postedTime = postedTime + maxSeconds;
      const timeInHour = math.floor(postedTime / maxSeconds);
      $element.text(timeInHour + " " + ' hour ago');
    } else if (postedTime < 1) {
        $element.text('Few seconds ago');
    } else if (postedTime == 1){
      $element.text(postedTime + " " + ' minute ago')
    } else {
      $element.text(postedTime + " " + ' minutes ago');
    }
  }

  //code to add new post on timeLine
  function showPost() {
    var photos = JSON.parse(localStorage.getItem(storageKey));
    if (photos != null) {
      let templateUrl = '../assets/templates/posts.mustache';

      $.get({url: templateUrl, type: type, success: function(postTemplate) {

        var postTemp = Mustache.render(postTemplate, photos);
        $('.newpost').remove();
        $('.post-outer-container').prepend(postTemp);
        $('.display-year').removeClass('hidden');
        window.common().updateName('user-name');

        for (var j in photos.posts) {
          var timeId = photos.posts[j].i;
          displayTime(timeId);
        }
      }});

      var activity = photos.posts.length + 1;
      $('.activity-number').text(activity);
    }
  }

  function addPost() {
    var activityCount = parseInt($('.activity-number').text());
    $("#post-form").validate({
      messages: {
        url: {
          required: "Enter a url",
          url: "Your url must be in the format of https://.."
        }
      },
      submitHandler: function(form) {
        $('#submit-post').on('click', function(event) {
          event.preventDefault();
          activityCount += 1;
          var postData = JSON.parse(localStorage.getItem(storageKey));
          var random = math.floor(math.random() * max);
          var postImage = $('#photo').val();
          var comment = $('#comments').val();
          var date = new Date();
          if (postImage != '' & comment != '') {
            if (postData) {
              postData.posts.unshift({image:postImage, desc:comment, time: Date(), i:random});
            } else {
              postData = {posts:[{image:postImage, desc:comment, time: Date(), i:random}]};
            }
          }
          localStorage.setItem(storageKey, JSON.stringify(postData));
          showPost();
        });
      }
    });
  }

  function displayTimeLine() {
    const templateUrl = '../assets/templates/timeline.mustache';
    const dataUrl = '../assets/data/posts.json';

    $.get({url: dataUrl, type: type, success: function(timeLineData) {
      $.get({url: templateUrl, type: type, success: function(timeLineTemplate) {

        var timeLineTemp = Mustache.render(timeLineTemplate, timeLineData);
        window.common().renderContent(timeLineTemp, 'timeline');
        window.common().updateName('user-name');
        addPost();
        showPost();
        $('.display-year').text(timeLineData.posts.time);
      }});
    }});
  }

  timeLine.initialize = function() {
    displayTimeLine();
  }
  return timeLine;
}
