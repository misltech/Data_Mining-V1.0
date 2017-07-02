
var keyword;
var locationinput;
var larray = [];

$(document).ready(function () {
  $('.query-submit').click(function () {
    if ($("#keyword").val() != "" & $("#location").val() != "") {
      keyword = $("#keyword").val();
      locationinput = $("#location").val();
      $("#facepp-result, #showresult-container, .splash, #calc-avg-container, #average-container").css("display", "none");
      $("#results-button").html('See Results');
      //$("#loader").css("display", "block");
      locationEncoder(locationinput);

    }
    else
      return;

  });


  $("body").on("click", ".f-images", function (e) {
    init($(this).attr("src"));
    $("#showresult-container").css("display", "block");

  });



  $("#results-button").click(function () {
    if ($("#photo-result").css("display") == "block") {

      $("#photo-result, #page-selection,#average-container").css("display", "none");
      $("#showresult-container, .fpimg, #facepp-result").css("display", "block");
      $("#results-button").html('Go back');

      $(".caption").each(function () {
        if ($(".caption").length >= 2) {
          $("#calc-avg-container").css("display", "block");
        }
      });
    }
    else {

      $("#photo-result, #showresult-container, #page-selection").css("display", "block");
      $("#results-button").html('See Results');
      $(".fpimg,#average-container,#calc-avg-container").css("display", "none");
    }

  });


  var indexOfCurrent;
  var counter = 0;


  $("#getAverage-button").click(function () {

    if ($('#average-results').children().length > 0) {
      $('#average-results').empty();
    }


    var clocation;
    var csmile;



    $(".caption").each(function () {


      if (IsValidArray($(this).find('.data-location').text())) {

        larray[indexOfCurrent].smile += parseFloat($(this).find('.data-smile').text());
        larray[indexOfCurrent].iteration++;

      }

      else {

        clocation = $(this).find('.data-location').text();

        if (isNaN(parseFloat($(this).find('.data-smile').text()))) {
          csmile = 0;
        }

        else {

          csmile = parseFloat($(this).find('.data-smile').text());
          counter++;
        }

        var obj = { location: "", smile: 0, iteration: 0 };
        obj.location = clocation;
        obj.smile = csmile;
        obj.iteration += counter;

        larray.push(obj);
        counter = 0;
      }

    });

    CalculateSmile();
  });

  function IsValidArray(value) {
    if (larray.length > 0) {  //if not empty
      for (var i = 0; i < larray.length; i++) {
        if (larray[i].location == value) {
          indexOfCurrent = i;
          return true;
        }
      }
    }
    else {
      return false;
    }

  };

  function CalculateSmile() {
    $.each(larray, function (index, value) {
      larray[index].smile = larray[index].smile / larray[index].iteration;
    });

    DisplayValues(larray);
  };

  function DisplayValues(stans) {
    $.each(stans, function (position, val) {
      $('#average-results').append('<div class="col-sm-4"><div class="caption avg-pos"><p class="avg-location-text">' + stans[position].location + '<p class="avg-smile-text"> Smile = ' + stans[position].smile + '</p></div></div>');

    });
    $("#average-container").css("display", "block");
    larray = [];
  }
});