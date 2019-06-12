function validateAge() {
  var today = new Date();
  var birthDate = new Date($("#birthdate").val());
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age = age - 1;
  }

  if (age < 18) {
    var modal = document.getElementById("modal");
    var modalText = document.getElementById("modal-text");
    modal.style.display = "block";
    modalText.style.visibility = "visible";
  }
}

function reload() {
  window.location.reload();
}

function afterSubmit(event) {
  event.preventDefault();

  let formData = {
    name: $("#name").val(),
    birthdate: $("#birthdate").val(),
    file: $("#file").val()
  };

  $.ajax({
    type: "POST",
    url: "/",
    data: formData,
    dataType: "json",
    encode: true,
    success: function(data) {
      let addr = "http://localhost:3005" + formData.file;

      var modal = document.getElementById("modal");
      let modalNormalHeader = document.getElementById("modal-header-text");
      modalNormalHeader.style.visibility = "hidden";
      let modalNormalText = document.getElementById("modal-text");
      modalNormalText.style.visibility = "hidden";

      let modalHeader = document.getElementById("modal-header-submitted");
      modalHeader.style.visibility = "visible";
      let modalText = document.getElementById("modal-submitted");
      modalText.style.visibility = "visible";
      $("#filename").attr("href", addr);
      $("#candidateName").text(formData.name);
      modal.style.display = "block";
    },
    error: function(error) {
      var modal = document.getElementById("modal");
      let modalNormalHeader = document.getElementById("modal-header-text");
      modalNormalHeader.style.visibility = "hidden";
      let modalNormalText = document.getElementById("modal-text");
      modalNormalText.style.visibility = "hidden";
      
      let modal = document.getElementById("modal");
      let modalHeader = document.getElementById("modal-header-error");
      modalHeader.style.visibility = "visible";
      let modalText = document.getElementById("modal-error");
      modalText.style.visibility = "visible";
      modal.style.display = "block";
    }
  });
}

async function getCandidate() {
  let response = await fetch(
    `http://localhost:3005/candidate?name=` + formData.name
  );
  let data = await response.json();
  parse(data);
}

async function parse(response) {
  if (!response) {
    handleError();
  }
  await populate(response);
}

async function populate(json) {
  console.log(json);
}

async function handleError() {
  console.log("fodeu");
}
