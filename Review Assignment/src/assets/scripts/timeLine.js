window.timeline = function() {
  var timeLine = {};
  var storageKey = 'uploads';
  var math = Math;
  var max = 1001;

  // To display time on posts
  function displayTime(element) {
    let postTime = $('#' + element).attr('data-id');
    let minute  = postTime.slice(19,21);
    let dt = new Date();
    let currTime = dt.getMinutes();
    let postedTime = 0;
    let maxSeconds = 60;
    let $element = $('#' + element);
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

  // code to add new post on timeLine
  function showPost() {
    let photos = helper.getLocalStorageData(storageKey);
    if (photos) {
      let templateUrl = '../assets/templates/posts.mustache';

      $.get({url: templateUrl, type: type, success: function(postTemplate) {

        let postTemp = Mustache.render(postTemplate, photos);
        $('.newpost').remove();
        $('.post-outer-container').prepend(postTemp);
        $('.display-year').removeClass('hidden');
        helper.updateName('user-name');

        for (let j in photos.posts) {
          let timeId = photos.posts[j].i;
          displayTime(timeId);
        }
      }});

      let activity = photos.posts.length + 1;
      $('.activity-number').text(activity);
    }
  }

  function addPost() {
    let activityCount = parseInt($('.activity-number').text());
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
          let postData = JSON.parse(localStorage.getItem(storageKey));
          let random = math.floor(math.random() * max);
          let postImage = $('#photo').val();
          let comment = $('#comments').val();
          let date = new Date();
          if (postImage != '' & comment != '') {
            if (postData) {
              postData.posts.unshift({image:postImage, desc:comment, time: Date(), i:random});
            } else {
              postData = {posts:[{image:postImage, desc:comment, time: Date(), i:random}]};
            }
          }
          helper.setLocalStorageData(storageKey, postData);
          showPost();
        });
      }
    });
  }
  // code to display timeline
  function displayTimeLine() {
    const templateUrl = '../assets/templates/timeline.mustache';
    const dataUrl = '../assets/data/posts.json';

    $.get({url: dataUrl, type: type, success: function(timeLineData) {
      $.get({url: templateUrl, type: type, success: function(timeLineTemplate) {

        let timeLineTemp = Mustache.render(timeLineTemplate, timeLineData);
        helper.renderContent(timeLineTemp, 'timeline');
        helper.updateName('user-name');
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
