//display friends page with template and raw data
window.friends = function() {
  var friend = {};
  var followingNumber = $('.following-count');

  //Unfollow button functionality
  function toggleFollowBtn() {
    var unFollow = {data: []};
    $('.follow-unfollow-btn').on('click', function() {
      var followBtn = $('.follow-unfollow-btn');
      var followingCount = parseInt(followingNumber.text());
      var unFollowingList = getDataFromLocalStorage('unfollow');
      if (unFollowingList) {
        unFollow = unFollowingList;
      }
      var currElementText = $(this).text();
      var clickedElement = $(this).attr('data-id');

      if (currElementText == 'Follow') {
        $(this).text('Unfollow');
        followingCount += 1;
        followingNumber.text(followingCount);
        unFollow.data.splice(unFollow.data.indexOf(clickedElement), 1);
      } else {
        unFollow.data.push(clickedElement);
        $(this).text('Follow');
        followingCount -= 1;
        followingNumber.text(followingCount);
      }
      localStorage.setItem('unfollow', JSON.stringify(unFollow));
    });
  }

  function renderPage(template, data) {
    if (data) {
      var friendsPagedata = Mustache.render(template, data);
      window.common().renderContent(friendsPagedata, 'friends');
      window.common().updateName('user-name');
    }
  }

  function setDataToLocalStorage() {
    let dataUrl = '../assets/data/friends.json';
    $.get({url: dataUrl, type: 'GET', success: function(data) {
      var peopleData = JSON.stringify(data);
      localStorage.setItem('people', peopleData);
    }});
  }

  function getDataFromLocalStorage(key) {
    let data = localStorage.getItem(key);
    if (data) {
      let persons = JSON.parse(data);
      return persons;
    } else {
      return data;
    }
  }

  function updateFollowings() {
    var unFollowingList = getDataFromLocalStorage('unfollow');
    if (unFollowingList) {
      for (var i in unFollowingList.data) {
        $('.' + unFollowingList.data[i]).text('Follow');
      }
    }
  }

  function displayFriends() {
    setDataToLocalStorage();
    const templateUrl = '../assets/templates/friends.mustache';
    var peopleData = getDataFromLocalStorage('people');
    var followList = getDataFromLocalStorage('followings');

    $.get({url: templateUrl, type: 'GET', success: function(friendsTemplate) {
      if (followList != null) {
        renderPage(friendsTemplate, followList);
      } else {
        var peopleData = getDataFromLocalStorage('people');
        renderPage(friendsTemplate, peopleData);
      }
      toggleFollowBtn();
      $('.false').addClass('hidden');
      updateFollowings();
    }});
  }

  friend.initialize = function() {
    displayFriends();
  }
  return friend;
};
