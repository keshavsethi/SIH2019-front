
console.log("working");



function sendfunc(){
  var name = document.getElementById('event_name').value;
  var email  = document.getElementById('contact_email').value;
  var phone  = document.getElementById('number').value;
  var  discription = document.getElementById('event_discription').value;
  var  fund_goal= document.getElementById('fund_goal').value;
 //url see this//
    console.log(discription);
  fetch("http://139.59.85.163/payments/add_event", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      "X-USER-ID": "9eeb9069-dd2f-4d46-9b15-1703280f9dbb", // need correct id
    },
    body: JSON.stringify({
      "name":name,
      "email":email,
      "phone":phone,
      "discription":discription,
      "fund_goal":fund_goal
    }) // body data type must match "Content-Type" header
  })
    .then(response => response.json())
    .then(console.log);

}
