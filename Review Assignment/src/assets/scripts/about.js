window.about = function() {
  var aboutPage = {};
  var hideElement = 'hidden';
  var click = 'click';

  // setting default user info
  function storeData(userData) {
    let newData =  {
      'name': userData.name,
      'gender': userData.gender,
      'birthDate': userData.birthDate,
      'status': userData.status,
      'location': userData.location,
      'occupation': userData.occupation,
      'skills': userData.skills,
      'job': userData.job
    };

    helper.setLocalStorageData('userData', newData);
  }

  function personData() {
    const userData = helper.getLocalStorageData('userData');
    return userData;
  }

  function defaultUserInfo() {
    var userData = personData();
    if (userData == null) {
      let dataUrl = '../assets/data/about.json';

      $.get({url: dataUrl, type: type, success: function(userDetails)  {
        storeData(userDetails);
        updatePersonalInfo();
      }});
    }
  }

  // Default values of about info and work form deatails
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
    let skill = userInfo.skills;
    let job = userInfo.job;

    $('.occupation-input').val(occupation);
    $('.skills-input').val(skill);
    $('.job-input').val(job);

    $('.occupation').text(occupation);
    $('.skills').text(skill);
    $('.job').text(job);
    $('.profile-job').text(occupation);
  }

  // editing of user info starts from here
  function submitEventData() {
    let fullName = $('.name-input').val();
    let gender = $('.gender-input').val();
    let birthDate = $('.birth-date-input').val();
    let mStatus = $('.merital-status-input').val();
    let location = $('.current-location-input').val();
    let occupation = $('.occupation-input').val();
    let skills = $('.skills-input').val();
    let job = $('.job-input').val();

    let updatedData =  {
      'name': fullName,
      'gender': gender,
      'birthDate': birthDate,
      'status': mStatus,
      'location': location,
      'occupation': occupation,
      'skills': skills,
      'job': job
    };
    storeData(updatedData);
  }

  // display edit form data into about section
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

  // calling template through ajax
  function displayAbout() {
    let templateUrl = '../assets/templates/about.mustache';

    $.get({url: templateUrl, type: type, success: function(aboutTemplate) {
      helper.renderContent(aboutTemplate, 'about');
      helper.updateName('profile-name');
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
