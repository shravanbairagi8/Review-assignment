window.about = function() {
  var aboutPage = {};
  var type = 'GET';
  var hideElement = 'hidden';
  var click = 'click';

  function getData(key) {
    var value = localStorage.getItem(key);
    return value;
  }

  function storeData(fullName, gender, birthDate, mStatus, location, occupation, skills, job) {
    var newData =  {
      'name': fullName,
      'gender': gender,
      'birthDate': birthDate,
      'status': mStatus,
      'location': location,
      'occupation': occupation,
      'skill': skills,
      'job': job
    };

    window.helper().setLocalStorageData('userData', newData);
  }

  function personData() {
    const userData = window.helper().getLocalStorageData('userData');
    return userData;
  }

  function defaultUserInfo() {
    var userData = personData();
    if (userData == null) {
      let dataUrl = '../assets/data/about.json';

      $.get({url: dataUrl, type: type, success: function(userDetails)  {
        storeData(userDetails.name, userDetails.gender, userDetails.birthDate, userDetails.status, userDetails.location, userDetails.occupation, userDetails.skills, userDetails.job);
        updatePersonalInfo();
      }});
    }
  }

  //Default values of about info and work form deatails
  function personalInfo() {
    let userInfo = personData();
    let userName = userInfo.name;
    let gender = userInfo.gender;
    let bday = userInfo.birthDate;
    let status = userInfo.status;
    let currLocation = userInfo.location;

    $('.name-input').val(userName);
    $('.gender-input').val(gender);
    $('.birth-date-input').val(bday);
    $('.merital-status-input').val(status);
    $('.current-location-input').val(currLocation);

    $('.user-name').text(userName)
    $('.user-fullname').text(userName);
    $('.profile-name').text(userName);
    $('.name').text(userName);
    $('.gender').text(gender);
    $('.birth-date').text(bday);
    $('.merital-status').text(status);
    $('.location').text(currLocation);
  }

  function professionalInfo() {
    let userInfo = personData();
    let occupation = userInfo.occupation;
    let skill = userInfo.skill;
    let job = userInfo.job;

    $('.occupation-input').val(occupation);
    $('.skills-input').val(skill);
    $('.job-input').val(job);

    $('.occupation').text(occupation);
    $('.skills').text(skill);
    $('.job').text(job);
    $('.profile-job').text(occupation);
  }

  function submitEventData() {
    var fullName = $('.name-input').val();
    var gender = $('.gender-input').val();
    var birthDate = $('.birth-date-input').val();
    var mStatus = $('.merital-status-input').val();
    var location = $('.current-location-input').val();
    var occupation = $('.occupation-input').val();
    var skills = $('.skills-input').val();
    var job = $('.job-input').val();

    storeData(fullName, gender, birthDate, mStatus, location, occupation, skills, job);
  }

  //display edit form data into about section
  function editButtonClickEvents() {
    $('#basic-info-edit').on(click, function() {
      $('#personal-info').addClass(hideElement);
      $('#personal-info-form').removeClass(hideElement);
    });

    $('#work-edit').on(click, function() {
      $('#professional-form').removeClass(hideElement);
      $('#professional-info').addClass(hideElement);
    });
  }

  function editUserInfo() {
    $('#info-form').validate({
      submitHandler: function(form) {
        $('#submit-basic-info').on(click, function(event) {
          event.preventDefault();
          $('#personal-info').removeClass(hideElement);
          $('#personal-info-form').addClass(hideElement);
          submitEventData();
          personalInfo();
        });
      }
    });

    $('#work-form').validate({
      submitHandler: function(form) {
        $('#submit-work').on(click, function(event) {
          event.preventDefault();
          $('#professional-form').addClass(hideElement);
          $('#professional-info').removeClass(hideElement);
          submitEventData();
          professionalInfo();
        });
      }
    });
  }

  function updatePersonalInfo() {
    let userInfo = personData();
    if (userInfo) {
      personalInfo();
      professionalInfo();
    }
  }

  function displayAbout() {
    let templateUrl = '../assets/templates/about.mustache';

    $.get({url: templateUrl, type: type, success: function(aboutTemplate) {
      window.helper().renderContent(aboutTemplate, 'about');
      window.helper().updateName('profile-name');
      defaultUserInfo();
      editButtonClickEvents();
      editUserInfo();
      updatePersonalInfo();
    }});
  }
  //display About Page with template
  aboutPage.initialize = function() {
    displayAbout();
  }
  return aboutPage;
};
