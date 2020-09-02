window.helper = function() {
  var helperFunctions = {};
  var renderContent = {};
  var updateName = {};
  var historyManager = {};
  var active = 'active-tab';

  helperFunctions.renderContent = function(template, element) {
    $('#main-content').html(template);
    $('.menu-content').removeClass(active);
    $('#' + element).addClass(active);
  }

  helperFunctions.updateName = function(nameId) {
    let userName = JSON.parse(localStorage.getItem('userData'));
    if (userName) {
      $('.' + nameId).text(userName.name);
    }
  }

  helperFunctions.historyManager = function(currentPage) {
    history.pushState({historyKey: currentPage}, null, "/" + currentPage);
  }

  helperFunctions.setLocalStorageData = function(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  helperFunctions.getLocalStorageData = function(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  return helperFunctions;
}
