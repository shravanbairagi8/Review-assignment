window.sidebar = function() {
  var sideBar = {};
  var hidden = 'hidden';
  var type = 'GET';
  var $followButton = $('.follow-btn');
  var counter = 0;
  var newFriend = {list: []};

  function setStorage(value) {
    localStorage.setItem('follow', JSON.stringify(value));
  }

  function getPeopleData()  {
    let totalPersons = JSON.parse(localStorage.getItem('people'));
    return totalPersons;
  }

  function updateFollowings() {
    if (newFriend) {
      var templateUrl = '../assets/templates/add-friend.mustache';
      $.get({url: templateUrl, type: type, success: function(template) {
        var addFriend = Mustache.render(template, newFriend)
        $('.friend-container').append(addFriend);
      }});
    }
  }

  function followButtonClick() {
    var delay = 700;
    var maxElements = 0;
    var followingCount = parseInt($('.following-count').text());
    $('.follow-btn').on('click', function() {
      var totalElements = $('.data-false').length;
      followingCount += 1;
      $('.following-count').text(followingCount);
      var users = JSON.parse(localStorage.getItem('people'));
      var update = users;
      var followList = JSON.parse(localStorage.getItem('followings'));
      if (followList != null) {
        update = followList;
      }
      var followings = {people: []};
      counter += 1;
      var clickedElement = $(this).attr('data-id');
      let activeTile = $(this).parentsUntil('.suggestion-body');
      activeTile.fadeOut(delay);
      for (var i in  update.people) {
        let currIndex = update.people[i];
        if (clickedElement == currIndex.sno) {
          followings.people.push({'name': currIndex.name, 'flag': "true", 'job': currIndex.job, 'sno': currIndex.sno, 'image': currIndex.image, 'follow': currIndex.follow});
          newFriend = {list: [{'name': currIndex.name, 'flag': "true", 'job': currIndex.job, 'sno': currIndex.sno, 'image': currIndex.image, 'follow': currIndex.follow}]};
        } else {
          followings.people.push({'name': currIndex.name, 'flag': currIndex.flag, 'job': currIndex.job, 'sno': currIndex.sno, 'image': currIndex.image, 'follow': currIndex.follow});
        }
        localStorage.setItem('followings', JSON.stringify(followings));
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
        var showFriends = Mustache.render(template, data)
        $('.friends-body').html(showFriends);
        $('#tile-5').nextAll().addClass( "hidden");
      }});
    }});
  }

  //See more buttton functionality
  function displaySeeMore() {
    defaultDataForSidebarFriends();
    var seeMoreBtn = $('.see-more-btn');
    seeMoreBtn.on('click', function(event) {
      if (seeMoreBtn.text() == 'See all') {
        const dataUrl = '../assets/data/friends.json';
        const templateUrl = '../assets/templates/sidebar-friends.mustache';
        $.get({url: dataUrl, type: type, success: function(data) {
          $.get({url: templateUrl, type: type, success: function(template) {
            var showFriends = Mustache.render(template, data)
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
    var show = localStorage.getItem('suggetionsDisplay');
    if (show == 'false') {
      $('.suggestion-container').addClass(hidden);
    }
  }

  function displaySidebar() {
    const dataUrl = '../assets/data/friends.json';
    const templateUrl = '../assets/templates/sidebar.mustache';

    $.get({url: dataUrl, type: type, success: function(suggetions) {
      $.get({url: templateUrl, success: function(sidebar) {
        var sideBar = Mustache.render(sidebar, suggetions)
        $('#side-bar').html(sideBar);
        displaySeeMore();
        followButtonClick();
        displaySuggestion();
        $('.data-true').addClass(hidden);
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
