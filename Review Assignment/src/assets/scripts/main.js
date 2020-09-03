$(document).ready(function () {
  var logInPage = window.logIn().initialize();

  // prev and next button of browser
  window.addEventListener('popstate', function(e) {
    if (e.state) {
       $('#main-content').empty();
      switch(e.state.historyKey) {
        case 'friends':
          window.friends().initialize();
          break;
        case 'loginPage':
          logInPage;
          break;
        case 'timeLine':
          window.timeline().initialize();
          break;
        case 'photos':
          window.photos().initialize();
          break;
        case 'aboutInfo':
          window.about().initialize();
          break;
      }
    }
  });

  logInPage;
  helper.historyManager('loginPage');
});
var type = 'GET';
var helper = window.helper();
