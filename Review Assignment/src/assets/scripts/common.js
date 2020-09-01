window.common = function() {
  var commonFunctions = {};
  var renderContent = {};
  var updateName = {};
  var historyManager = {};
  var active = 'active-tab';

  commonFunctions.renderContent = function(template, element) {
    $('#main-content').html(template);
    $('.menu-content').removeClass(active);
    $('#' + element).addClass(active);
  }

  commonFunctions.updateName = function(nameId) {
    let userName = JSON.parse(localStorage.getItem('userData'));
    if (userName != null) {
      $('.' + nameId).text(userName.name);
    }
  }

  commonFunctions.historyManager = function(currentPage) {
    history.pushState({historyKey: currentPage}, null, "/" + currentPage);
  }

  commonFunctions.setLocalStorageData = function(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  commonFunctions.getLocalStorageData = function(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  return commonFunctions;
}
