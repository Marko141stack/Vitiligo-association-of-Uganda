var validatedPayment = false;
var $newemailsavebtn = $("#save-new-email-box");
var $newemailcancelbtn = $("#cancel-box");
var $window = $(window);

var $passwrd = $("#pass-input");
var $showHideCreate = $(".showpwd");
var $passwordreq = $("#password-requirements");
var $weakbox = $("#weak");
var $fairbox = $("#fair");
var $strongbox = $("#strong");

// **********************************************************************************
// Objects for usability of Become a Member Page                                   //
// **********************************************************************************
// Membership Level Object Constructor
function membershipLevel(level, price, years, adults, children, guests, students, seniors) {
  this.level = level;
  this.price = price;
  this.years = years;
  this.adults = adults;
  this.children = children;
  this.guests = guests;
  this.students = students;
  this.seniors = seniors;
  this.memBene = true;
}

// Member Object Constructor
function member(salutation, first, last, email) {
  this.salutation = salutation;
  this.first = first;
  this.last = last;
  this.email = email;
}

// Mailing Address and Phone Number Object Construcor
function mailPhone(address1, address2, city, state, zip, country, phone) {
  this.address1 = address1;
  this.address2 = address2;
  this.city = city;
  this.state = state;
  this.zip = zip;
  this.country = country;
  this.phone = phone;
}

// Child Object Constructor
function child(first, last, month, year) {
  this.first = first;
  this.last = last;
  this.month = year;
}

// Grandchild Object Constructor
function grandchild(first, last, month, year) {
  this.first = first;
  this.last = last;
  this.month = year;
}

// Payment Object Constructor
function payment(invitation, cardNumber, month, year, cvv, zip) {
  this.invitation = invitation;
  this.cardNumber = cardNumber;
  this.month = month;
  this.year = year;
  this.cvv = cvv;
  this.zip = zip;
}
// **********************************************************************************
// End of Objects for usability of Become a Member Page                            //
// **********************************************************************************
var memLevel = new membershipLevel("family", 250, 1, 2, true, 0, 0, 0);
var donateExtra = 0; // Initialized 
var member;
var addressPhone;
var memChildren = [];
var memGrandchildren = [];
var paymentInfo;

var locationInPage;
var editClicked = false;
var farthestLocation = 1;

// Get and set the membership level of the membership
function setMemLevel(id) {
  //membershipLevel(level, price, years, adults, children, guests, students, seniors)
  if (id === "family") {
    memLevel = new membershipLevel("Family", 250, 1, 2, true, 0, 0, 0);
    $("#two").show();
  } else if (id === "ocean") {
    memLevel = new membershipLevel("Ocean Advocate", 300, 1, 2, true, 2, 0, 0);
    $("#two").show();
  } else if (id === "ocean2") {
    memLevel = new membershipLevel("Ocean Advocate - 2 Years", 550, 2, 2, true, 2, 0, 0);
    $("#two").show();
  } else if (id === "ocean3") {
    memLevel = new membershipLevel("Ocean Advocate - 3 Years", 800, 3, 2, true, 2, 0, 0);
    $("#two").show();
  } else if (id === "individual") {
    memLevel = new membershipLevel("Individual", 95, 1, 1, false, 0, 0, 0);
    $("#two").hide();
  } else if (id === "dual") {
    memLevel = new membershipLevel("Dual", 190, 1, 2, false, 0, 0, 0);
    $("#two").show();
  } else if (id === "student") {
    memLevel = new membershipLevel("Student", 75, 1, 1, false, 0, 1, 0);
    $("#two").hide();
  } else if (id === "dual_stud") {
    memLevel = new membershipLevel("Dual Student", 150, 2, 1, false, 0, 2, 0);
    $("#two").show();
  } else if (id === "senior") {
    memLevel = new membershipLevel("Senior", 75, 1, 1, false, 0, 0, 1);
    $("#two").hide();
  } else if (id === "dual_senior") {
    memLevel = new membershipLevel("Dual Senior", 150, 1, 1, false, 0, 0, 2);
    $("#two").show();
  } 

  setPriceNaming();
}

// Set the value of the pay summary fields.
function setPriceNaming() {
  $("#final-mem-level").text("" + memLevel.level);
  $("#final-mem-price").text("$" + memLevel.price);
  updateTotal();
}

// Set the donate value
function setDonateVal(val) {
  donateExtra = val;
  $("#final-donation-value").text("$" + val);
  updateTotal();
}

// Update the final total of the transaction
function updateTotal() {
  var total = memLevel.price + donateExtra;
  $("#final-mem-total").text("$" + total);
  if (donateExtra == 0) {
    $("#additional-donation-row").hide();
  } else {
    $("#additional-donation-row").show();
  }
  $("#accord4").text("Pay $" + total);
}

// Set the member name and e-mail address
// function setMemberInfo(salutaion, first, last, email) {
//   member = new member(salutaion, first, last, email);
// }

// Set the Address and Phone Number for the account
// function setAddressPhone(a1, a2, city, state, zip, country, phone) {
//   addressPhone = new mailPhone(a1, a2, city, state, zip, country, phone);
// }

// Create and add a child to the child array
// function addChild(first, last, month, year) {
//   var child = new child(first, last, month, year);
//   memChildren.push(child);
// }

// // Create and add a grandchild to the grandchildren array
// function addGrandchild(first, last, month, year) {
//   var gchild = new grandchild(first, last, month, year);
//   memGrandchildren.push(gchild);
// }

// Set the payment method
// function setPaymentInfo(invitation, cardNum, month, year, cvv, zip) {
//   paymentInfo = new payment(invitation, cardNum, month, year, cvv, zip);
// }


// ******** Dropdown selectbox script*******
$('select').select2({minimumResultsForSearch: -1});
// ******** Dropdown selectbox ends*******
var ready;
// *****Code for become a member accordian starts ****
$('li a.content').click(function() {

  ready = true;
  /****************************************************************************************************
                                    VALIDATION CODE, PLEASE DO NOT ALTER
  ****************************************************************************************************/

  //******************************************************************* Validation form 1
  // Iterate through every input on the membership step 1 form
    if ($(this).attr("id") == "accord1") {
      $('#membershipstep1').find('input').each(function(){
        // Pick only the inputs that are not of type radio
        if ($(this).attr('type') != "radio" && $(this).attr('id') != "addr2") {
          if ($(this).val() == '') {
            $(this).css("border-color", "#FF4500");
            $("#all-needed").show();
            ready = false;
          } else {
            $(this).css("border-color", "#d2d3db");
            if ($(this).attr("id") == 'fname') {
              member.first = $(this).val();
            } else if ($(this).attr("id") == 'lname') {
              member.last = $(this).val();
            }
          }
          // Test the email
          if ($(this).attr('type') == "email") {
            if (testEmail($(this).val())) {
              $(this).css("border-color", "#d2d3db");
              member.email = $(this).val();
              $("#user-email-login").text("" + member.email);
              $("#valid-email").hide();
            } else {
              $(this).css("border-color", "#FF4500");
              $("#valid-email").show();
              ready = false;
            }
          }
        }
      });

      // Check the country input
      if ($("#select2-country-container").text() == "Country") {
        $("#select2-country-container").parent().css("border-color", "#FF4500");
        ready = false;
      } else {
        $("#select2-country-container").parent().css("border-color", "#d2d3db");
      }

      // Check the state input
      if ($("#select2-state-container").text() == "State") {
        $("#select2-state-container").parent().css("border-color", "#FF4500");
        ready = false;
      } else {
        $("#select2-state-container").parent().css("border-color", "#d2d3db");
      }
    }
  //******************************************************************* Validation form 1

  //   //******************************************************************* Validation form 2
  // Iterate through every input on the membership step 1 form
  if ($(this).attr("id") == "accord2") {
    $('#additionalCardForm').find('input').each(function(){
      // If the user chose yes to add additional cardholders
      if ($("#c1").is(':checked')) {
        if ($("#cholderfname").val() == '') {
          $("#cholderfname").css("border-color", "#FF4500");
          ready = false;
        } else {
          $("#cholderfname").css("border-color", "#d2d3db");
        }

        if ($("#cholderlname").val() == '') {
          $("#cholderlname").css("border-color", "#FF4500");
          ready = false;
        } else {
          $("#cholderlname").css("border-color", "#d2d3db");
        }

      }
      if ($("#m1").is(':checked') &&  ($('#gc1').is(':checked') || $('#gc2').is(':checked'))) { // If they want to add children or grandchildren
        if ($("#gc1").is(':checked')) { // If they want to add children iterate through all the children inputs
          // Find the first and last name of each child and validate it
          $('.child-list').find('input').each(function(){
            if ($(this).val() == '') {
              $(this).css("border-color", "#FF4500");
              ready = false;
            } else {
              $(this).css("border-color", "#d2d3db");
            }
          });

          // Find each month and year and make sure it's not empty
          $('.child-list').find('.select2-selection__rendered').each(function(){
            if ($(this).text() == 'Month' || $(this).text() == 'Year') {
              $(this).parent().css("border-color", "#FF4500");
              ready = false;
            } else {
              $(this).parent().css("border-color", "#d2d3db");
            }
          });

        } else if ($("#gc2").is(':checked')) { // If they want to add grandchildren iterate through all the grandchildren inputs
          // Find the first and last name of each child and validate it
          $('.grandchild-list').find('input').each(function(){
            if ($(this).val() == '') {
              $(this).css("border-color", "#FF4500");
              ready = false;
            } else {
              $(this).css("border-color", "#d2d3db");
            }
          });

          // Find each month and year and make sure it's not empty
          $('.grandchild-list').find('.select2-selection__rendered').each(function(){
            if ($(this).text() == 'Month' || $(this).text() == 'Year') {
              $(this).parent().css("border-color", "#FF4500");
              ready = false;
            } else {
              $(this).parent().css("border-color", "#d2d3db");
            }
          });
        } else {
          ready = false;
        }
      }

    });
  }
  //   //******************************************************************* Validation form 2

  // //******************************************************************* Validation form 3
  // Iterate through every input on the membership step 1 form
  if ($(this).attr("id") == "accord3") {
    if ($passwrd.val() === "") {
      $("#password-empty-error").show();
      ready = false;
    } else {
      $("#password-empty-error").hide();
      if (testPass($passwrd.val())) {
        $passwrd.css("border-color", "#d2d3db");
        $("#pass-title").removeClass("error-pass-bold");
        $("#pass-10").removeClass("error-pass-bold");
        $("#pass-up").removeClass("error-pass-bold");
        $("#pass-sym").removeClass("error-pass-bold");
        $passwrd.css("border-color", "#d2d3db");
      } else {
        ready = false;
        $("#pass-title").addClass("error-pass-bold");
        $("#pass-10").addClass("error-pass-bold");
        $("#pass-up").addClass("error-pass-bold");
        $("#pass-sym").addClass("error-pass-bold");
        $passwrd.css("border-color", "#FF4500");
        $passwordreq.show();
      }
    }
  }
  // //******************************************************************* Validation form 3

  // form 4
  if ($(this).attr("id") == "accord4") {
    if (!validatedPay()) {
      ready = false;
    }
  }
  // end form 4

  /****************************************************************************************************
                                          VALIDATION CODE END
  ****************************************************************************************************/



  // If all the fields are validated
  if (ready) {

    $("#all-needed").hide();

    // If the user didn't click the edit button then proceeed with normal form traversal
    if (!editClicked) {
      if (memLevel.adults == 1 && $(this).attr("id") == "accord1") {
        $(this).parent().parent().parent().next('li').next('li').toggleClass('open');

        $(this).parent().parent().parent().find('.edit').css('display','inline-block');  
        $(this).parent().parent().parent().css('max-height','none');
        $(this).parent().parent().parent().find('form').css('display','none');
        $(this).parent().parent().parent().find('.hidden').css('display','block');
        $(this).hide();

        $(this).parent().parent().parent().next('li').next('li').find('form').css('display','block');
        $(this).parent().parent().parent().next('li').next('li').find('.edit').css('display','none');
        $(this).parent().parent().parent().next('li').next('li').find('.hidden').css('display','none');
        $(this).parent().parent().parent().next('li').next('li').find('a.content').css('display','block');
        $(this).parent().parent().parent().find('h3').css('color', '#666777');
        $(this).parent().parent().parent().next('li').next('li').find('h3').css('color', '#333');

        locationInPage = $(this).parent().parent().parent().next('li').next('li').attr("id");
      } else {

        if ($(this).attr("id") == "accord4") {
          if (validatedPay()) {
            $(this).parent().parent().parent().next('li').toggleClass('open');

            $(this).parent().parent().parent().find('.edit').css('display','inline-block');  
            $(this).parent().parent().parent().css('max-height','none');
            $('li.open').css('max-height','none');
            $(this).parent().parent().parent().find('form').css('display','none');
            $(this).parent().parent().parent().find('.hidden').css('display','block');
            $(this).hide();
          }
        } else {
          $(this).parent().parent().parent().next('li').toggleClass('open');

          $(this).parent().parent().parent().find('.edit').css('display','inline-block');  
          $(this).parent().parent().parent().css('max-height','none');
          $('li.open').css('max-height','none');
          $(this).parent().parent().parent().find('form').css('display','none');
          $(this).parent().parent().parent().find('.hidden').css('display','block');
          $(this).hide();

          $(this).parent().parent().parent().next('li').find('form').css('display','block');
          $(this).parent().parent().parent().next('li').find('.edit').css('display','none');
          $(this).parent().parent().parent().next('li').find('.hidden').css('display','none');
          $(this).parent().parent().parent().next('li').find('a.content').css('display','block');
          $(this).parent().parent().parent().find('h3').css('color', '#666777');
          $(this).parent().parent().parent().next('li').find('h3').css('color', '#333');

          locationInPage = $(this).parent().parent().parent().next('li').attr("id");
        }
      }
    } else {
      // To get the user back to where they started when they pressed Edit
      if (locationInPage == "two") {
        $("#two").toggleClass('open');
        $("#two").find('form').css('display','block');
        $("#two").find('.edit').css('display','none');
        $("#two").find('.hidden').css('display','none');
        $("#two").find('a.content').css('display','block');
        $("#two").find('h3').css('color', '#333');
      } else if (locationInPage == "three") {
        $("#three").toggleClass('open');
        $("#three").find('form').css('display','block');
        $("#three").find('.edit').css('display','none');
        $("#three").find('.hidden').css('display','none');
        $("#three").find('a.content').css('display','block');
        $("#three").find('h3').css('color', '#333');
      } else if (locationInPage == "four") {
        $("#four").toggleClass('open');
        $("#four").find('form').css('display','block');
        $("#four").find('.edit').css('display','none');
        $("#four").find('.hidden').css('display','none');
        $("#four").find('a.content').css('display','block');
        $("#four").find('h3').css('color', '#333');
      }
      $(this).parent().parent().parent().find('.edit').css('display','inline-block');  
      $(this).parent().parent().parent().css('max-height','none');
      $(this).parent().parent().parent().find('form').css('display','none');
      $(this).parent().parent().parent().find('.hidden').css('display','block');
      $(this).hide();

      editClicked = false;
    }


    // if they can't have children:
    if (memLevel.children == false) {
      $(".children-group").hide();
    } else {
      $(".children-group").show();
    }


  }
});

// If the user clicks edit then show the enter membership information accordion
$('li a.edit').click(function() { 
  editClicked = true;

  $('li.open').find('.edit').css('display','inline-block');
  $('li.open').find('h3').css('color', '#666777');
  $('li').removeClass('open');
  $(this).parent().toggleClass('open');
  $(this).parent().css('max-height','none');
  $(this).parent().find('.edit').hide();
  $('.form-accordian-container > ul > li form').hide();
  $(this).parent().find('form').show();
  $('.form-accordian-container > ul > li .hidden').show();
  $(this).parent().find('.hidden').hide();
  $('.form-accordian-container > ul > li a.content').hide();
  $(this).parent().find('.content').show();
  $(this).parent().find('h3').css('color', '#333');  
  // if they can't have children:
  if (memLevel.children == false) {
    $(".children-group").hide();
  } else {
    $(".children-group").show();
  }
});

if($('li#four form').is(':visible')){
  $('.smtxt').hide();
}
else{
  $('.smtxt').show();
}
$('#four a.content').click(function() {
  $(this).show();
});
// ****code for become a member accordian ends ****

// ********************** Form validation code goes here *******************************
/****************************************************************************************************
                           VALIDATION CODE, PLEASE DO NOT ALTER
  ****************************************************************************************************/

// Handle the form validation for membership information accordion 3

// Handle the onclick of the payment button
function validatedPay() {
  var valid = true;
  $('#payment-info-form').find('input').each(function(){
    // If the user chose yes to add additional cardholders 
    if ($(this).attr('id') != "invitecode") {
      if ($(this).val() == '') {
        $(this).css("border-color", "#FF4500");
        valid = false;
      } else {
        $(this).css("border-color", "#d2d3db");
      }
    }
  });

  return valid;
}

// ********************** End Form validation *******************************
/****************************************************************************************************
                                END VALIDATION CODE, PLEASE DO NOT ALTER
  ****************************************************************************************************/


//********** Membership level select dropdown script STARTS here ******
$(".dropdown > dt > a").on('click', function() {  
  $(".dropdown dd ul").show();
  //slideToggle('fast');
  $('.hida').hide();
});

/*$(".dropdown dd ul li a").on('click', function() {
  $(".dropdown dd ul").hide();
});*/

function getSelectedValue(id) {
  return $("#" + id).find("dt a span.value").html();
}

$('.mutliSelect > ul > li > a.fullcheck').on('click', function() {
  var newradio = $(this).find('input[type="radio"]')[0];  
  //newradio.attr('checked');
  var newradioid = newradio.id;
  $(newradio).attr("checked", "checked");
  //alert(newradio);
  var title = $('label[for="' + newradioid + '"]').html();
  $(window).scrollTop(0);
  //  var title = $(this).closest('.mutliSelect').find('input[type="checkbox"]').val(),
  //  title = $(this).val() + ",";

  if ($(newradio).is(':checked')) {
    var html = title;
    $('.hida').empty();
    $('.hida').append(html);
    $('.hida').css('display','table-cell');
    $(".dropdown dd ul").hide();
    //slideToggle('fast');
    $('.radio_title').removeClass('act');
    $(newradio).parent().parent().find('.radio_title').addClass('act');
    // $(".hida").hide();
    setMemLevel(newradioid);
  } else {
    $('span[title="' + title + '"]').remove();
    var ret = $(".hida");
    $('.dropdown dt a').append(ret);

  }
});


/*$('.mutliSelect input[type="radio"]').on('click', function() {
  
  var title = $('label[for="' + this.id + '"]').html();
  $(window).scrollTop(0);
  //  var title = $(this).closest('.mutliSelect').find('input[type="checkbox"]').val(),
  //  title = $(this).val() + ",";

  if ($(this).is(':checked')) {
    var html = title;
    $('.hida').empty();
    $('.hida').append(html);
    $('.hida').css('display','table-cell');
    $(".dropdown dd ul").slideToggle('fast');
    $('.radio_title').removeClass('act');
    $(this).parent().parent().find('.radio_title').addClass('act');
    // $(".hida").hide();
    setMemLevel(this.id);
  } else {
    $('span[title="' + title + '"]').remove();
    var ret = $(".hida");
    $('.dropdown dt a').append(ret);

  }
});
*/

//********** Membership level select dropdown script ENDS here ******

//**********Add Card Holder Script Starts Here ************

$('.inline input[type="radio"]').click(function() {
  if($(this).is(':checked')) {      
    $(this).parent().parent().children().removeClass('active')
    $(this).parent().addClass('active');  
    // If the user clicks yes to add an additional cardholder
    if($('#c1').is(':checked')){     
      $('.cardholdername').show();
    }
    if($('#c2').is(':checked')){
      $('.cardholdername').hide();
    }
    // If the user wants to add a child
    if($('#gc1').is(':checked')){
      $('.grandchild-list').hide();
      $('.child-list').show();
    }
    // If the user wants to add a grandchild
    if($('#gc2').is(':checked')){
      $('.child-list').hide();
      $('.grandchild-list').show();
    }
    // If the user wants to add children or grandchildren
    if($('#m1').is(':checked')){
      $('.optnewmember').css('display','block');
    }
    if($('#m2').is(':checked')){    
      $('.optnewmember').hide();
      $('.grandchild-list').hide();
      $('.child-list').hide();
    }
  }
});

$('.add-child').click(function (){
  $('.child-list ol').append("<li> <a href='javascript:;' class='close'><i class='fa fa-close''></i></a><div class='clearfix'> <div class='five column'> <label for='cfname'>Child's First Name</label> <input type='text' name='cfname' id='cfname' class='u-full-width'> </div><div class='five column'> <label for='clname'>Child's Last Name</label> <input type='text' name='clname' id='clname' class='u-full-width'> </div></div><div class='six columns'> <label for='cbday'>Child's Birthday</label> <div class='six columns newselect'> <select class='u-full-width'> <option disabled selected>Month</option> <option>Jan</option> <option>Feb</option> <option>Mar</option> </select> </div><div class='six columns newselect'> <select class='u-full-width'> <option disabled selected>Year</option> <option>2016</option> <option>2015</option> <option>2014</option> </select> </div></div></li>");
  $('select').select2({minimumResultsForSearch: -1});
});
$('.add-grand').click(function (){
  $('.grandchild-list ol').append("<li> <a href='javascript:;' class='close'><i class='fa fa-close''></i></a><div class='clearfix'> <div class='five column'> <label for='cfname'>Grandchild's First Name</label> <input type='text' name='gcfname' id='gcfname' class='u-full-width'> </div><div class='five column'> <label for='clname'>Grandchild's Last Name</label> <input type='text' name='gclname' id='gclname' class='u-full-width'> </div></div><div class='six columns'> <label for='gcbday'>Grandchild's Birthday</label> <div class='six columns newselect'> <select class='u-full-width'> <option disabled selected>Month</option> <option>Jan</option> <option>Feb</option> <option>Mar</option> </select> </div><div class='six columns newselect'> <select class='u-full-width'> <option disabled selected>Year</option> <option>2016</option> <option>2015</option> <option>2014</option> </select> </div></div><div class='six columns'></div></li>");
  $('select').select2({minimumResultsForSearch: -1});
});

$('.close').click(function(){
  $(this).parent().remove();
})
$('ol').on('click', '.close', function(e) {
  e.preventDefault();
  $(this).parent().remove();
});

//**********Add Card Holder Script Ends Here ************
// Invitation code event handling
$(function() {
  $('#invitetxt').click(function() {
    $('#invitecod').show();
    $('#invitetxt').hide();
    return false;
  });        
});

$(function() {
  $('#applycod').click(function() {
    if ($("#invitecode").val() == "OTTER") {
      $("#invitecode").css("border-color", "#d2d3db");
      $('#invite').show();
      $('#couponcode').show();
      $('#label-coupon').show();
      $("#need-valid-invitation").hide();
      $('#invitecod').hide();
    } else {
      $("#invitecode").css("border-color", "#FF4500");
      $("#need-valid-invitation").show();
    }
    return false;
  });        
});

$(function() {
  $('#remove').click(function() {
    $('#invitetxt').show();
    $('#invite').hide();
    $('#couponcode').hide();
    return false;
  });        
});



/***************Login Area Jquery***************/
$('.fb').click(function(){
  $('.displaytxt').text('Successfully connected with Facebook!');
  $('#three').next('li').toggleClass('open');
  $('#three').find('.edit').css('display','inline-block');
  $('#three').css('max-height','none');
  $('#three').find('form').css('display','none');
  $('#three').find('.hidden').css('display','block');
  $('a#accord3').hide();
  $('#three').find('h3').css('color', '#666777');

  $('#three').next('li').find('form').css('display','block');
  $('#three').next('li').find('.edit').css('display','none');
  $('#three').next('li').find('.hidden').css('display','none');
  $('#three').next('li').find('a.content').css('display','block');
  $('#three').next('li').find('h3').css('color', '#333');
  $('a#accord4').show();
  ready = true;

  locationInPage = "four";
});
$('.google').click(function(){
  $('.displaytxt').text('Successfully connected with Google!');
  $('#three').next('li').toggleClass('open');
  $('#three').find('.edit').css('display','inline-block');
  $('#three').css('max-height','none');
  $('#three').find('form').css('display','none');
  $('#three').find('.hidden').css('display','block');
  $('a#accord3').hide();
  $('#three').find('h3').css('color', '#666777');

  $('#three').next('li').find('form').css('display','block');
  $('#three').next('li').find('.edit').css('display','none');
  $('#three').next('li').find('.hidden').css('display','none');
  $('#three').parent().next('li').find('a.content').css('display','block');
  $('#three').next('li').find('h3').css('color', '#333');
  $('a#accord4').show();
  ready = true;
  locationInPage = "four";
});

$('a#accord3').click(function(){  
  $('.displaytxt').text('Successfully created password!');
});


$showHideCreate.click(function() {
  if ($passwrd.attr("type") == "password") {
    $passwrd.attr("type", "text");
    $showHideCreate.text("HIDE");
  } else {
    $passwrd.attr("type", "password");
    $showHideCreate.text("SHOW");
  }
});




$passwrd.keyup(function() {
  var input = $passwrd.val();
  if (input !== '') {
    var strength = passStrength(input);
    if (strength <= 3) {
      $weakbox.show();
      $fairbox.hide();
      $strongbox.hide();
    } else if (strength === 4) {
      $weakbox.hide();
      $fairbox.show();
      $strongbox.hide();
    } else if (strength === 5) {
      $weakbox.hide();
      $fairbox.hide();
      $strongbox.show();
    }
  }
});

$passwrd.focus(function() {
  $passwordreq.show();
});

function passStrength(pass) {
  var strength = 0;
  var reUpper = /^(?=.*[A-Z]).+$/
  var reLower = /^(?=.*[a-z]).+$/
  var reDigit = /^(?=.*[0-9]).+$/
  var reSymbol = /^(?=.*[-+_!@#$%^&*.,?]).+$/
  if (pass.length >= 10) {
    strength++;
    if (reUpper.test(pass)) {
      strength++;
    }
    if (reLower.test(pass)) {
      strength++;
    }
    if (reDigit.test(pass)) {
      strength++;
    }
    if (reSymbol.test(pass)) {
      strength++;
    }
  }

  return strength;
}

/***************Login Area Jquery***************/



var accordion1= $("#accord1");
var accordion2= $("#accord2");
var accordion3= $("#accord3");
var accordion4= $("#accord4");
/// First Acc

var donationAmnt = $("#amount");
var salutation = $("#exampleRecipientInput");
var fname = $("#fname");
var lname = $("#lname");
var eaddress = $("#eaddress");
var addr1 = $("#addr1");
var addr2 = $("#addr2");
var city = $("#city");
var state = $("#state");
var zip = $("#zip");
var country = $("#country");
var phone = $("#phone");


accordion1.on('click', function(){



  var memLevelTitle = $(".hida .radio_title");
  var memLevelText = $(".hida p");  
  var getTitleVal = memLevelTitle.text();
  var getDescVal = memLevelText.text();
  var getDValue = donationAmnt.val();
  var getmfname = fname.val();
  var getmlname = lname.val();
  var getemail = eaddress.val();
  var getadr1 = addr1.val();
  var getadr2 = addr2.val();
  var getcity = city.val()
  var getstate = state.val();
  var getzip = zip.val();
  var getcountry = country.val();
  var getphone = phone.val();
  //add value to the field
  $(".membershiptitle").text(getTitleVal);
  $(".membershipdetail").text(getDescVal);
  $(".donval").text(getDValue);
  $(".memfname").text(getmfname);
  $(".memlname").text(getmlname);
  $(".mememail").text(getemail);
  $('.ad1').text(getadr1);
  $('.ad2').text(getadr2);
  $('.cty').text(getcity + " ");
  $('.stt').text(getstate);
  $('.ctry').text(getcountry);
  $('.ctry-zip').text(getzip);
  $('.phno').text(getphone);
  $('#mem-header').css('color', '#666777');

});
// form2 cardholder

// var secondcardholder = $("input[name='secondcardholder']:checked").val();
var addmember = $("input[name='addmember']:checked").val();
var children = $("input[name='children']:checked").val();

accordion2.on('click', function(){
  var noholder = $('input:radio[name="secondcardholder"]:checked').val();
  var secondholder = $("#cholderfname").val() + ' ' + $("#cholderlname").val();
  var showholder;
  var childmember;
  var grandclm;
  var addmember = "";
  
  if(jQuery.trim(secondholder).length > 0){
    showholder = secondholder;
  }else{
    showholder = noholder;
  }
  $('.cholder').text(showholder);
  
  if ($('#m1').is(':checked') && ($('#gc1').is(':checked') || $('#gc2').is(':checked'))) {

    $('input:radio[name="children"]').each(function(){
      var selectedrd = $(this).val();

      if(selectedrd == "Grandchildren" && $(this).is(':checked'))    {

        $(".grandchild-list ol li").each(function() {
          var gf = $(this).find("input[name='gcfname']");
          var gl = $(this).find("input[name='gclname']");
          grandclm = $(gf).val() + ' ' + $(gl).val() + ', ';
          addmember += grandclm;
        });
        addmember = addmember.slice(0,-2);

      } else if (selectedrd == "Children" && $(this).is(':checked')) {
        $(".child-list ol li").each(function() {
          var gf = $(this).find("input[name='cfname']");
          var gl = $(this).find("input[name='clname']");
          grandclm = $(gf).val() + ' ' + $(gl).val() + ', ';
          addmember += grandclm;
        });
        addmember = addmember.slice(0,-2); 
      }   
    });
  } else {
    addmember = "None";
  }

  $('.cgmember').text(addmember);
  $('#add-cardholder-header').css('color', '#666777');
});
//*************************************************************************************************************
//**********************************************************************
//**********************************************
//**************************

// Check window width
function checkWidth() {
  var windowsize = $window.width();
  if (windowsize < 720) {
    //if the window is smaller than 720px wide then move save btn above cancel button
    $newemailsavebtn.insertBefore($newemailcancelbtn);
  }
  else{
    //if the window is greater than 720px wide then move save btn next to cancel button as before
    $newemailsavebtn.insertAfter($newemailcancelbtn);
  }
}
// Execute on load
checkWidth();

// Bind event listener
$(window).resize(checkWidth);

/* *******************************************************************
 * Hard coding users for testing
*/
function user(first, last, email, password, id, verified, connected) {
  this.fName = first;
  this.lName = last;
  this.email = email;
  this.password = password;
  this.type = "Family";
  this.exp = "7/24/17";
  this.id = id;
  this.verified = verified;
  this.connected = connected;
}

// Used for testing
// var user1 = new user("John", "Doe", "test@gmail.com", "abc", "000001", false, false);
// var user1;                                                                              // Used for creating a new account, logged in, unverified and not connected
var user2 = new user("John", "Doe", "a", "a", "000001", false, false);  // Used to log in, logged in, not verified and not connected
var user3 = new user("Jane", "Lane", "b", "b", "000002", true, false);  // Used to log in, logged in, verified and not connected
var user4 = new user("Chad", "Lad", "c", "c", "000003", true, true);    // Used to log in, logged in, verified and connected
var userF = new user("Facebook", "Google", "facebook@facebook.com", "a", "000004", true, true);
var userG = new user("Google", "Google", "google@google.com", "a", "000005", true, true);
var userLoggedIn = false;
var membershipNum = 3; // start at the last membershp number completed, hardcoded.
var index = 0;

var users = [user2, user3, user4, userF, userG];

// Create a new user
function createAccount(first, last, email, pass, ver, cert) {
  membershipNum++;
  var idNum = membershipNum.toString();
  var zeroLength = 6 - idNum.length;
  var id = "";
  for (var i = 0; i < zeroLength; i++) {
    id = id + "0";
  }
  id = id + idNum;
  var user1 = new user(first, last, email, pass, id, ver, cert);
  $("#email-resend-inline").html("<strong>" + email + "<strong>");
  users.push(user1);
  index = users.length - 1;
  userLoggedIn = true;
  return user1;
}

function getUser() {
  return users[index];
}

// Test the membership id
function testId(id) {
  var user = getUser();
  if(id === user.id) {
    user.connected = true;
    return true;
  } else {
    return false;
  }
}

// Test the password against a regex
function testPass(pass) {
  var re = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[#?!@$%^&*-])|(?=.*?[0-9])).{10,}$/
  return re.test(pass);
}

// Test the email against a simple regex
function testEmail(email) {
  var re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  return re.test(email);
}

// Log in modal
// Handle the input
$("#log-in-button-modal").click(function() {
  var email = $("#login-email-input").val();
  var pass = $("#login-pass-input").val();

  if (email === "" || pass === "") {
    $("#error-no-match").show();
  } else {
    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      var userE = user.email;
      var userP = user.password;

      if (userE == email && userP == pass) {
        logIn(user);
        index = i;
      } else {
        $("#error-no-match").show();
      }
    }
  }
});


// Log in and test against pre-defined users
// **************************************** possibly change to set state *************
function logIn(user) {  
  $("#error-no-match").hide();
  displayLoginModal(false);
  displayCreateModal(false);
  $("#buy-mem-container").hide();
  $("#manage-membership-content").hide();

  setUserInfo(user);
  displayGreeting(true);
  displayState(user);
  hideScrollModal(false);
}


// If the user already exists return true, else return false.
function userExists(email) {
  for (var i = 0; i < users.length; i++) {
    if (email === users[i].email) {
      return true;
    }
  }
  return false;
}

// Set the border to grey if valid input
$("#login-pass-input").click(function() {
  $(this).css("border-color", "#d2d3db");
});
$("#login-email-input").click(function() {
  $(this).css("border-color", "#d2d3db");
});


/* Add functionality for creating account
  hide the create account model and change the Members page in the E-mail not Verified State */
// Need to change to testing for verification state
$("#create-account-modal-button").click(function() {
  var first = $("#create-account-fname").val();
  var last = $("#create-account-lname").val();
  var email = $("#create-account-email-input").val();
  var pass = $("#create-account-pass-input").val();

  if (userExists(email)) {
    $("#create-account-email-input").css("border-color", "#FF4500");
    $("#valid-email").hide();
    $("#account-exists-already").show();
    $("#please-fix").show();
  } else {
    $("#password-requirements").removeClass("error-modal-bold");
    $("#account-exists-already").hide();
    $("#create-account-email-input").css("border-color", "#d2d3db");
    $("#please-fix").hide();

    if (email !== "" && pass !== "" && first !== "" && last !== "" && testPass(pass) && testEmail(email)) {
      $("#create-account-email-input").css("border-color", "#d2d3db");
      $("#valid-email").hide();
      $("#create-account-pass-input").css("border-color", "#d2d3db");
      $("#create-account-fname").css("border-color", "#d2d3db");
      $("#create-account-lname").css("border-color", "#d2d3db");
      $("#password-requirements").removeClass("error-modal-bold");
      $("#create-account-pass-input").css("border-color", "#d2d3db");
      $("#please-fix").hide();

      var user = createAccount(first, last, email, pass, false, false);
      logIn(user);
      $("#weak").hide();
      $("#fair").hide();
      $("#strong").hide();
    } else {
      $("#please-fix").show();
      if (!testEmail(email)) {
        $("#create-account-email-input").css("border-color", "#FF4500");
        $("#valid-email").show();
      } else {
        $("#create-account-email-input").css("border-color", "#d2d3db");
        $("#valid-email").hide();
      }
      if (testPass(pass)) {
        $("#password-requirements").removeClass("error-modal-bold");
        $("#create-account-pass-input").css("border-color", "#d2d3db");
      } else {
        $("#password-requirements").addClass("error-modal-bold");
        $("#create-account-pass-input").css("border-color", "#FF4500");
        $("#password-requirements").show();
      }
      if (first === "") {
        $("#create-account-fname").css("border-color", "#FF4500");
      } else {
        $("#create-account-fname").css("border-color", "#d2d3db");
      }
      if (last === "") {
        $("#create-account-lname").css("border-color", "#FF4500");
      } else {
        $("#create-account-lname").css("border-color", "#d2d3db");
      }
    }
  }
});


$("#create-account-pass-input").focus(function() {
  $("#password-requirements").show();
  // Show the weak, fair, strong password strength indicators.
  $(this).keyup(function() {
    var input = $("#create-account-pass-input").val();
    var strength = passStrength(input);
    if (strength <= 3) {
      $("#weak").show();
      $("#fair").hide();
      $("#strong").hide();
    } else if (strength === 4) {
      $("#weak").hide();
      $("#fair").show();
      $("#strong").hide();
    } else {
      $("#weak").hide();
      $("#fair").hide();
      $("#strong").show();
    }
  });
});

// Test if the membership number is valid and display warning if not
$("#connect-mem-button").click(function() {
  var id = $("#mem-num-input").val();
  var valid = testId(id);
  if (valid) {
    $("#error-call-membership").hide();
    $("#unable-to-conect-content").hide();
    $("#your-membership-content").show();
  } else {
    $("#error-call-membership").show();
    $("#mem-num-input").css("border-color", "#FF4500");
  }
});

$("#createFacebook").click(function() {
  var user = createAccount("FacebookNew", "Facebook", "facebook2@facebook.com", "a", true, true);
  logIn(user);
});
$("#createGoogle").click(function() {
  var user = createAccount("GoogleNew", "Google", "google2@google.com", "a", true, true);
  logIn(user);
});

$("#loginFacebook").click(function() {
  logIn(userF);
  hideScrollModal(false);
});
$("#loginGoogle").click(function() {
  logIn(userG);
});

// Set the border to grey if valid input
$("#mem-num-input").click(function() {
  $(this).css("border-color", "#d2d3db");
});


// Slider code below ******************************************************************
var sliderAmountMap = [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100];

$( "#slider" ).slider({
  range: "min",
  value: 0, //array index of onload selected default value on slider, for example, 45000 in same array will be selected as default on load
  min: 0, //the values will be from 0 to array length-1
  max: sliderAmountMap.length-1, //the max length, slider will snap until this point in equal width increments
  slide: function( event, ui ) {

    $( "#amount" ).val( "$" + sliderAmountMap[ui.value] ); //map selected "value" with lookup array
    $("#final-donation-value").text("$" + sliderAmountMap[ui.value]);
    donateExtra = sliderAmountMap[ui.value];
    updateTotal();
  }

});
$( "#amount" ).val( "$" + sliderAmountMap[$( "#slider" ).slider( "value")] );//map selected "value" with lookup array
donateExtra = sliderAmountMap[$( "#slider" ).slider( "value")];
updateTotal();

// get the nearest value to position the slider
function nearestVal(event){
  var trimmed = $("#amount").val().substring(1);
  var n1 = parseInt(trimmed);
  var roundValue = 0;
  
  if (n1 % 5 != 0) {
    var getLastDigit = n1.toString().substring(n1.toString().length - 1);
    if (n1 < 5) {
      roundValue = 5;
      return roundValue;
    } else if (parseInt(getLastDigit.toString()) < 3 || (parseInt(getLastDigit.toString()) < 7 && parseInt(getLastDigit.toString()) > 5)) {
      // round down 
      roundValue = n1 - n1 % 5;
      return roundValue;
    } else if ((parseInt(getLastDigit.toString()) >= 3 && parseInt(getLastDigit.toString()) < 5) || parseInt(getLastDigit.toString()) >= 7) {
      //round up
      roundValue = (5 - n1 % 5) + n1;
      return roundValue;
    }
  } else {
    return n1;
  }
}

// get the actual value for the actual donation value
function amountChange(val) {
  var trimmedVal;
  val = $.trim(val);
  if (val !== "") {
    // if the input starts with a $
    if (val.substring(0, 1) === "$") {
      if (val.substring(1, 2) !== "" && $.isNumeric(val.substring(1))) { // if the string isn't empty after the $ and the value is numeric
        trimmedVal = val.substring(1)
      } else {
        trimmedVal = "0";
      }
    // if the input doesn't have a $
    } else {
      if ($.isNumeric(val)) { // if the value is numberic
        trimmedVal = val;
      } else {
        trimmedVal = "0";
      }
    }
  } else {
    trimmedVal = "0";
  }
  return trimmedVal;
}

$("#amount").change(function () {
  // Get the actual amount for calculating the total
  var actualValue = amountChange($(this).val());
  $(this).val('$' + actualValue);
  setDonateVal(parseInt(actualValue));
  updateTotal();
  
  // get the rounded value for the slider
  var getVal = nearestVal();
  if(getVal > 100) {
    var checkmorehund = 100;
    $("#slider").slider('value', sliderAmountMap.indexOf(parseInt(checkmorehund)));
  } else {
    $("#slider").slider('value', sliderAmountMap.indexOf(parseInt(getVal)));
  }
});




// // testing zip city and state form
// $("#zip").keyup(function(e) { 
//     var zipCode = $(this).val();
//     // done do anything until/unless the zip code is at least five characters long and numberic
//     if (zipCode.length === 5 && $.isNumeric(zipCode)) {
//       var requestURL = 'http://ziptasticapi.com/' + zipCode + '?callback=?';
//       $.getJSON(requestURL, null, function(data) {
//         console.log(data);
//         if (data.city) $('#city').val(data.city);
//         if (data.state) $('#state').val(data.state);
//       });
//     }
// });