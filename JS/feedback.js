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
				

		//Project 3 + 6 implementation
		function myFunction() {
		  var table = document.getElementById("myTable");
		  var row = table.insertRow(0);
		  var cell1 = row.insertCell(0);
		  var cell2 = row.insertCell(1);
		  var cell3 = row.insertCell(2);
		  var cell4 = row.insertCell(3);
		  var cell5 = row.insertCell(4);
			
		  var radios = document.getElementsByName("experience");
		  //Test case 7
			var radioVal;
			for (var i = 0; i < radios.length; i++) {       
				if (radios[i].checked) {
					radioVal = radios[i].value;
					found = 0;
					break;
				}
			}
			if(found == 1)
			{
				alert("Please Select Any Option");
			} 
			

		  var name = document.getElementById("name").value;
		  var comments = document.getElementById("comments").value;
		  
		  
		  cell1.innerHTML = "Name:";
		  cell2.innerHTML = name;
		  cell3.innerHTML = "Ratings: "+radioVal;
		  cell4.innerHTML = "Comments:";
		  cell5.innerHTML = comments;
		 

		}