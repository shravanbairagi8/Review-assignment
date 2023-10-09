window.sidebar = function() {
  var sideBar = {};
  var hidden = 'hidden';
  var $followButton = $('.follow-btn');
  var counter = 0;
  var newFriend = {list: []};

  function updateFollowings() {
    if (newFriend) {
      let templateUrl = '../assets/templates/add-friend.mustache';
      $.get({url: templateUrl, type: type, success: function(template) {
         addFriend = Mustache.render(template, newFriend)
        $('.friend-container').append(addFriend);
      }});
    }
  }
  // side bar follow button clickEvent
  function followButtonClick() {
    let delay = 700;
    let maxElements = 0;
    let followingCount = parseInt($('.following-count').text());
    $('.follow-btn').on('click', function() {
      let totalElements = $('.display-false').length;
      followingCount += 1;
      $('.following-count').text(followingCount);
      let users = helper.getLocalStorageData('people');
      let update = users;
      let followList = helper.getLocalStorageData('followings');
      if (followList) {
        update = followList;
      }
      let followings = {people: []};
      counter += 1;
      let clickedElement = $(this).attr('data-id');
      let activeTile = $(this).parentsUntil('.suggestion-body');
      activeTile.fadeOut(delay);
      for (let i in  update.people) {
        let currIndex = update.people[i];
        if (clickedElement == currIndex.sno) {
          followings.people.push({'name': currIndex.name, 'flag': "true", 'job': currIndex.job, 'sno': currIndex.sno, 'image': currIndex.image, 'follow': currIndex.follow});
          newFriend = {list: [{'name': currIndex.name, 'flag': "true", 'job': currIndex.job, 'sno': currIndex.sno, 'image': currIndex.image, 'follow': currIndex.follow}]};
        } else {
          followings.people.push({'name': currIndex.name, 'flag': currIndex.flag, 'job': currIndex.job, 'sno': currIndex.sno, 'image': currIndex.image, 'follow': currIndex.follow});
        }
        helper.setLocalStorageData('followings', followings);
      }
      if (totalElements == counter) {
        $('.suggestion-container').addClass(hidden);
        localStorage.setItem('suggetionsDisplay', 'false');
      }
      updateFollowings();
    });
  }

  function defaultDataForSidebarFriends() {
    const dataUrl = '../assets/data/friends.json';
    const templateUrl = '../assets/templates/sidebar-friends.mustache';
    $.get({url: dataUrl, type: type, success: function(data) {
      $.get({url: templateUrl, type: type, success: function(template) {
        let showFriends = Mustache.render(template, data)
        $('.friends-body').html(showFriends);
        $('#tile-5').nextAll().addClass( "hidden");
      }});
    }});
  }

  // See more buttton functionality
  function displaySeeMore() {
    defaultDataForSidebarFriends();
    let seeMoreBtn = $('.see-more-btn');
    seeMoreBtn.on('click', function(event) {
      if (seeMoreBtn.text() == 'See all') {
        const dataUrl = '../assets/data/friends.json';
        const templateUrl = '../assets/templates/sidebar-friends.mustache';
        $.get({url: dataUrl, type: type, success: function(data) {
          $.get({url: templateUrl, type: type, success: function(template) {
            let showFriends = Mustache.render(template, data)
            $('.friends-body').html(showFriends);
          }});
        }});
        seeMoreBtn.text('Hide');
      } else {
        defaultDataForSidebarFriends();
        seeMoreBtn.text('See all');
      }
    });
  }

  function suggetionsDisplay() {
    let show = localStorage.getItem('suggetionsDisplay');
    if (show == 'false') {
      $('.suggestion-container').addClass(hidden);
    }
  }
  // to display side bar on page
  function displaySidebar() {
    const dataUrl = '../assets/data/friends.json';
    const templateUrl = '../assets/templates/sidebar.mustache';

    $.get({url: dataUrl, type: type, success: function(suggetions) {
      $.get({url: templateUrl, success: function(sidebar) {
        let sideBar = Mustache.render(sidebar, suggetions)
        $('#side-bar').html(sideBar);
        displaySeeMore();
        followButtonClick();
        displaySuggestion();
        $('.display-true').addClass(hidden);
        suggetionsDisplay();
      }});
    }});
  }

  function displaySuggestion() {
    let flag = localStorage.getItem('sidebar');
    if (flag == 'false') {
      $('.suggestion-container').addClass(hidden);
    }
  }

  sideBar.initialize = function() {
    displaySidebar();
    followButtonClick();
    displaySuggestion();
  }
  return sideBar;
}
