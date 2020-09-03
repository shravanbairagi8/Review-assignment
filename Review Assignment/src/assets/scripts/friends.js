//display friends page with template and raw data
window.friends = function() {
  var friend = {};
  var followingNumber = $('.following-count');

  //Unfollow button functionality
  function toggleFollowBtn() {
    let unFollow = {data: []};
    $('.follow-unfollow-btn').on('click', function() {
      let followBtn = $('.follow-unfollow-btn');
      let followingCount = parseInt(followingNumber.text());
      let unFollowingList = getDataFromLocalStorage('unfollow');
      if (unFollowingList) {
        unFollow = unFollowingList;
      }
      let currElementText = $(this).text();
      let clickedElement = $(this).attr('data-id');

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
      helper.setLocalStorageData('unfollow', unFollow);
    });
  }

  function renderPage(template, data) {
    if (data) {
      let friendsPagedata = Mustache.render(template, data);
      helper.renderContent(friendsPagedata, 'friends');
      helper.updateName('user-name');
    }
  }

  function setDataToLocalStorage() {
    let dataUrl = '../assets/data/friends.json';
    $.get({url: dataUrl, type: 'GET', success: function(data) {
      helper.setLocalStorageData('people', data);
    }});
  }

  function getDataFromLocalStorage(key) {
    let data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
  }

  function updateFollowings() {
    let unFollowingList = helper.getLocalStorageData('unfollow');
    if (unFollowingList) {
      for (let i in unFollowingList.data) {
        $('.' + unFollowingList.data[i]).text('Follow');
      }
    }
  }

  function displayFriends() {
    setDataToLocalStorage();
    const templateUrl = '../assets/templates/friends.mustache';
    let peopleData = helper.getLocalStorageData('people');
    let followList = helper.getLocalStorageData('followings');

    $.get({url: templateUrl, type: 'GET', success: function(friendsTemplate) {
      let friendsList = followList ?  followList :  peopleData;
      renderPage(friendsTemplate, friendsList);

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
