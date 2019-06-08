document.getElementById("myForm");

function validateAge() {
  var today = new Date();
  var birthDate = new Date($("#birthdate").val());
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age = age - 1;
  }

  if (age < 18) {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }
  console.log(age); //to delete
}

function reload() {
  window.location.reload();
}

/*
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal


// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal


// When the user clicks anywhere outside of the modal, close it

*/

$(function() {
  function after_form_submitted(data) {
    if (data.result == "success") {
      $("form#reused_form").hide();
      $("#success_message").show();
      $("#error_message").hide();
    } else {
      $("#error_message").append("<ul></ul>");

      jQuery.each(data.errors, function(key, val) {
        $("#error_message ul").append("<li>" + key + ":" + val + "</li>");
      });
      $("#success_message").hide();
      $("#error_message").show();

      //reverse the response on the button
      $('button[type="button"]', $form).each(function() {
        $btn = $(this);
        label = $btn.prop("orig_label");
        if (label) {
          $btn.prop("type", "submit");
          $btn.text(label);
          $btn.prop("orig_label", "");
        }
      });
    } //else
  }

  $("#reused_form").submit(function(e) {
    e.preventDefault();

    $form = $(this);
    //show some response on the button
    $('button[type="submit"]', $form).each(function() {
      $btn = $(this);
      $btn.prop("type", "button");
      $btn.prop("orig_label", $btn.text());
      $btn.text("Sending ...");
    });

    var formdata = new FormData(this);
    $.ajax({
      type: "POST",
      url: "handler.php",
      data: formdata,
      success: after_form_submitted,
      dataType: "json",
      processData: false,
      contentType: false,
      cache: false
    });
  });
});
