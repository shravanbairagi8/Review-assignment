window.helper = function() {
  var helperFunctions = {};
  var renderContent = {};
  var updateName = {};
  var historyManager = {};
  var active = 'active-tab';

  //to render content on page
  helperFunctions.renderContent = function(template, element) {
    $('#main-content').html(template);
    $('.menu-content').removeClass(active);
    $('#' + element).addClass(active);
  }

  //to update user name
  helperFunctions.updateName = function(nameId) {
    let userName = JSON.parse(localStorage.getItem('userData'));
    if (userName) {
      $('.' + nameId).text(userName.name);
    }
  }

  // to control history
  helperFunctions.historyManager = function(currentPage) {
    history.pushState({historyKey: currentPage}, null, "/" + currentPage);
  }

  // local storgae related code
  helperFunctions.setLocalStorageData = function(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  helperFunctions.getLocalStorageData = function(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  return helperFunctions;
}
