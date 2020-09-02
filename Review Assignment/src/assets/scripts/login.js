window.logIn = function() {
  var displayLoginPage = {};
  var click = 'click';
  var mainContainer = $('#main-container');
  var helper = window.helper();

  var loginData = {'email': 'demouser123@gmail.com', 'password': '123456'};
  helper.setLocalStorageData('userLogin', loginData);

  function clickEvents() {
    //Code when user click on logout button
    $('#logout').on(click, function() {
      mainContainer.empty();
      window.logIn().initialize();
    });

    //click event on timeLine
    $('#timeline').on(click, function() {
      window.timeline().initialize();
      helper.historyManager('timeLine');
    });
    //about click event
    $('#about').on(click, function() {
      window.about().initialize();
      helper.historyManager('aboutInfo');
    });
    //friends button click
    $('#friends').on(click, function() {
      var currentElement = $(this).attr('id');
      window.friends().initialize();
      helper.historyManager('friends');
    });
    //display photos
    $('#photos').on(click, function() {
      window.photos().initialize();
      helper.historyManager('photos');
    });

    //click event on title
    $('.title').on(click, function() {
      window.timeline().initialize();
      helper.historyManager('timeLine');
    });
  }

  function displayLogIn() {
    const templateUrl = '../assets/templates/main-page.mustache';
    $.get({url: templateUrl, type: 'GET', success: function(main) {
      mainContainer.html(main);
      clickEvents();
      window.sidebar().initialize();
      window.timeline().initialize();
      helper.historyManager('timeLine');
    }});
  }


  function formValidation() {
    $("#form-login").validate({
      submitHandler: function(form) {
        $('#login').on(click, function(event) {
          event.preventDefault();
          var credentials = helper.getLocalStorageData('userLogin');
          var email = $('#email').val();
          var pswd = $('#passwd').val();

          if (email == credentials.email & pswd == credentials.password) {
            $('.invalid-data').addClass('hidden');
            displayLogIn();
          }
          else {
            $('.invalid-data').removeClass('hidden');
          }
        });
      }
    });
  }

  function logInPage() {
    const templateUrl = '../assets/templates/login.mustache';

    $.get({url: templateUrl, type: 'GET', success: function(logInTemplate) {
      mainContainer.append(logInTemplate);
      formValidation();
    }});
  }

  displayLoginPage.initialize = function() {
    logInPage();
  }
  return displayLoginPage;
}
