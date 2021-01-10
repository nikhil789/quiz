var USER_INPUT = {};
		
		
function main(){

	var ele1 = document.getElementById('timer_and_submit');
	ele1.style.display = "block";
	var title = document.getElementById("title");
	title.innerHTML = DATA["title"];
	
	var QUESTIONS = DATA["questions"];
	
	for(var i = 0; i < QUESTIONS.length; i++){
	 
		var q = QUESTIONS[i];
		
		USER_INPUT[i + 1] = "";
		
		if(q["type"] == "dtq"){
		
			var q_container_obj = prepare_dtq_view(i+1, q);
			
			var main_container = document.getElementById("main_container");
			
			main_container.append(q_container_obj);
		}
		
		else if(q["type"] == "msq") {
		
		
			var q_container_obj = prepare_msq_view(i+1, q);
			
			var main_container = document.getElementById("main_container");
			
			main_container.append(q_container_obj);	

			
		
		}
		else
			alert("unknown format!!");
	
	}
	
	// adding click event to option content
	
	var content_array = document.getElementsByClassName("content");
	
	for(var i = 0; i < content_array.length; i++){
	
		var option_content = content_array[i];
		option_content.addEventListener("click", addingClick);
	
	}
	
	// adding function to clear response
	
	var clear_button_array = document.getElementsByClassName("clear_response");
	
	for(var i = 0; i < clear_button_array.length; i++){
	
		var clear_button = clear_button_array[i];
		clear_button.addEventListener("click", addingClick);
	
	}
	
}

var addingClick = function(){

	check_uncheck(this);
	store_the_value(this);
	
}

function check_uncheck(obj){
	
	var meta_data = obj.id.split("_");
	
	var q_num = meta_data[0];
	var ele_id = q_num + "_options";

	var tbl = document.getElementById(ele_id);
	var tbl_rows = tbl.rows;

	var options_tag = ["A", "B", "C", "D", "E"];

	for(var i = 0; i < tbl_rows.length; i++){

		var id = q_num + "_" + options_tag[i];
		
		document.getElementById(id).style.backgroundColor = "white";
		document.getElementById(id).style.color = "black";

	}

	
	if(meta_data[1] != "clear"){
		
		obj.style.backgroundColor = "#33adff";
		obj.style.color = "white";
	}
	
}

function store_the_value(obj){

	var meta_data = obj.id.split("_");
	var q_num = meta_data[0];
	var response = meta_data[1];
	
	USER_INPUT[q_num] = (response == "clear" ? "" : obj.innerHTML);

}


function submit(){
	
	//fetch correct answers
	var ques_arr = DATA["questions"];
	
	var CORRECT_ANS = {};
	
	for(var i = 0; i < ques_arr.length; i++){
	
		CORRECT_ANS[i+1] = ques_arr[i]["correct"];
	
	}
	
	//match the answers
	
	var correct_ans_count = 0;
	var wrong_ans_count = 0;
	var not_attempted_count = 0;
	
	for(let q_no in USER_INPUT){
	
		var ele_id = q_no + "_options";

		var tbl = document.getElementById(ele_id);
		var tbl_rows = tbl.rows;

		var options_tag = ["A", "B", "C", "D", "E"];
		
		for(var i = 0; i < tbl_rows.length; i++){

			var id = q_no + "_" + options_tag[i];
			
			var option_txt = document.getElementById(id).innerHTML;
			
			if(option_txt == USER_INPUT[q_no]){
				
				document.getElementById(id).style.backgroundColor = "firebrick";
				document.getElementById(id).style.color = "white";
			
			}
			
			if(option_txt == CORRECT_ANS[q_no]){
				
				document.getElementById(id).style.backgroundColor = "lightseagreen";
				document.getElementById(id).style.color = "white";
			
			}

		}
		
		var q_container = document.getElementById(q_no);
			var msg_container = document.createElement("div");
			
			if(USER_INPUT[q_no] == CORRECT_ANS[q_no]){
			
				var msg = "Solved Correctly";
				msg_container.style.color = "lightseagreen";
				correct_ans_count += 1;
				
			}
			else if(USER_INPUT[q_no] == ""){
			
				var msg = "Not attempted";
				msg_container.style.color = "orange";
				not_attempted_count += 1;
				
			}
			else{
			
				var msg = "It's <b>Incorrect</b>";
				msg_container.style.color = "firebrick";
				wrong_ans_count += 1;
				
			}
			
			msg_container.innerHTML = msg;
			q_container.append(msg_container);
			
	}
	
	var correct_disp = document.getElementById("correct_count");
	var wrong_disp = document.getElementById("wrong_count");
	var not_attempted_disp = document.getElementById("not_attempted_count");
	
	correct_disp.innerHTML = "" + correct_ans_count;
	wrong_disp.innerHTML = "" + wrong_ans_count;
	not_attempted_disp.innerHTML = "" + not_attempted_count;
	document.getElementById("result").style.display = "block";
	//remove click event from options and clear response buttons.
	
	var options = document.querySelectorAll(".content");
	
	for(var i = 0; i < options.length; i++){
		var opt = options[i];
		
		opt.removeEventListener('click', addingClick);
	}
	
	var responses = document.querySelectorAll(".clear_response");
	
	for(var i = 0; i < responses.length; i++){
		var clr = responses[i];
		
		clr.removeEventListener('click', addingClick);
	}
	
}

function timer()
			{
				var time1 = DATA["duration"];
				var time = parseInt(time1);
				var timer_element = document.getElementById("timer");
				timer_element.innerHTML = time;			
				var hr = Math.floor(time / 60);
				var min = time % 60;
				var sec = 1;
					console.log("initial time is = ", hr + " : " + min + " : " + sec);
				stop = setInterval(dec,100);
				function dec()
				{
					console.log(" inside function "); 
					if(sec == 1)
					{

						sec = 60;
						min -= 1;
						if(min == -1)
						{
							min = 59;
							hr -= 1;
						}

					if(hr == -1 && min == 59 && sec == 60)
						{
							clearInterval(stop); 
							alert("time is up !!");
							submit(); 
						}
					}		
					sec = sec - 1;
					
					console.log("time left = ", hr + " : " + min + " : " + sec);
					if(sec < 10)
					{
						if(min < 10)
						{
							timer_element.innerHTML = hr + " : 0" + min + " : 0" + sec;
						}
						else
							timer_element.innerHTML = hr + " : " + min + " : 0" + sec;

					}
					else
						timer_element.innerHTML = hr + " : " + min + " : " + sec;		
						
				}

			}
//main();
//timer();