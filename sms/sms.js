//
// // extra materialize thing
// var fileInputTextDiv = document.getElementById('file_input_text_div');
// var fileInput = document.getElementById('file_input_file');
// var fileInputText = document.getElementById('file_input_text');
//
// fileInput.addEventListener('change', changeInputText);
// fileInput.addEventListener('change', changeState);
//
// function changeInputText() {
//   var str = fileInput.value;
//   var i;
//   if (str.lastIndexOf('\\')) {
//     i = str.lastIndexOf('\\') + 1;
//   } else if (str.lastIndexOf('/')) {
//     i = str.lastIndexOf('/') + 1;
//   }
//   fileInputText.value = str.slice(i, str.length);
// }
//
// function changeState() {
//   if (fileInputText.value.length != 0) {
//     if (!fileInputTextDiv.classList.contains("is-focused")) {
//       fileInputTextDiv.classList.add('is-focused');
//     }
//   } else {
//     if (fileInputTextDiv.classList.contains("is-focused")) {
//       fileInputTextDiv.classList.remove('is-focused');
//     }
//   }
// }
//

// extra materialize thing



console.log("working");
// var file = document.getElementById('file_upload').;


function smsfunc(){
  console.log("working2");
  var phone = document.getElementById('phone_number').value;
  var sms = document.getElementById('sms_body').value;

  // var file = document.getElementById('file_upload').value;
console.log(sms);
  fetch("http://139.59.85.163/main/send_sms/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-USER-ID": "9eeb9069-dd2f-4d46-9b15-1703280f9dbb"
    },
    body: JSON.stringify({
      "phone":phone,
      "sms-body":sms

    }) // body data type must match "Content-Type" header
  })
    .then(response => response.json())
    .then(console.log);
console.log(sms);
}











// main part



































//
//
//
// //////////////////////////////
// // main thing starts here only
//
//
// var data = {
//         // "phone no.": document.querySelector('#phone').value,
//         // "sms_body": document.querySelector('#sms_body').value
//         "lat": document.getElementById('phone').value,
//         "long": document.getElementById('sms_body').value
//     };
//
// // console.log(document.getElementById('phone').value);
// console.log(data);
// function CallMe(data) {
//   var url = "http://139.59.85.163/main/update_location";
//         // console.log(document.getElementById('phone').value);
//
//       // Convention is to Http not req
//       var req = new XMLHttpRequest();
//       req.open('POST', url , true );
//
//     req.setRequestHeader = {'content-type': 'application/json' , "X-USER-ID": "c408041b-2da5-43ec-ba82-690f2d2f3e54"};
//    console.log(JSON.stringify(data));
//       req.send(JSON.stringify(data));
//       req.onload = () => {
//           console.log(req.responseText);
//       }}
