//Team case project 9
		$(document).ready(function() {
			  clockUpdate();
			  setInterval(clockUpdate, 1000);
			})

			function clockUpdate() {
			  var date = new Date();
			  $('.digital-clock').css({'color': '#fff', 'text-shadow': '0 0 6px #ff0'});
			  function addZero(x) {
				if (x < 10) {
				  return x = '0' + x;
				} else {
				  return x;
				}
			  }

			  function twelveHour(x) {
				if (x > 12) {
				  return x = x - 12;
				} else if (x == 0) {
				  return x = 12;
				} else {
				  return x;
				}
			  }

			  var h = addZero(twelveHour(date.getHours()));
			  var m = addZero(date.getMinutes());
			  var s = addZero(date.getSeconds());

			  $('.digital-clock').text(h + ':' + m + ':' + s)
			}
					
			
		//Team case 5	
		let saveFile = () => {

			// Get the data from each element on the form.
			const name = document.getElementById('fname');
			const email = document.getElementById('email');
			
			if(required() == true){
			const country = [];
			var Asia = document.getElementById("Asia");  
			var America = document.getElementById("America");  
			var Africa = document.getElementById("Africa");  
			var Europe = document.getElementById("Europe");  
			
			if(Asia.checked == true){
				country.push("Asia");
			}
			if(America.checked == true){
				country.push("America");
			}
			if(Africa.checked == true){
				country.push("Africa");
			}
			if(Europe.checked == true){
				country.push("Europe");
			}
			
			// This variable stores all the data.
			let data = 
				'\r Hey '+ name.value +', This is the confirmation copy of your query ' + 
				'made at : ' +new Date() + ' \r\n ' + 
				'Countries Queried for: ' + country + ' \r\n ' + 
				'Registered with Email: ' + email.value + ' \r\n ' +
				' We will get back to you as soon as possible.\r\n ' + 
				+ ' \r\n Thanks '
				;
			
			// Convert the text to BLOB.
			const textToBLOB = new Blob([data], { type: 'text/plain' });
			const sFileName = 'Confirmation.txt';	   // The file to save the data.

			let newLink = document.createElement("a");
			newLink.download = sFileName;

			if (window.webkitURL != null) {
				newLink.href = window.webkitURL.createObjectURL(textToBLOB);
			}
			else {
				newLink.href = window.URL.createObjectURL(textToBLOB);
				newLink.style.display = "none";
				document.body.appendChild(newLink);
			}

			newLink.click(); 
			}
	
		}


		function required()
		{	
			
			var emp1 = document.forms["form1"]["fullname"].value;
			var emp2 = document.forms["form1"]["email"].value;
			var emp3 = document.forms["form1"]["subject"].value;
			if ((emp1 == "") ||(emp2 == "") ||(emp3 == "") )
			{
				alert(" All fields are mandatory.");
				return false;
			}
			
			else 
			{
				if(ValidateEmail(emp2)){
				alert('Query Submitted. We will get back to you soon.. Thanks!! You will get a confirmation file');
				return true; 
				}
				else return false;
			}
		}
		
		
		function ValidateEmail(email) {
		//regex
		var emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (email.match(emailformat)) {
			return true;
		}
		else{
			alert("Invalid Email!!!")
			return false;
			}
		};

	