function prepare_dtq_view(q_number, q_data){

	console.log("preparing view.....");
 
	var q_container = document.createElement("div");
	q_container.className = "q_container";
	q_container.id = "" + q_number;
	
	var number_label = get_number_label(q_number)
	
	var stmt_label = get_stmt_label(q_data["stmt"]);
	
	var options_table = create_options_table(q_number, q_data["options"]);
	
	var clear_button = document.createElement("button");
	clear_button.id = q_number + "_" + "clear";
	clear_button.className = "clear_response";
	clear_button.innerHTML = "Clear Response";
	
	q_container.append(number_label);
	q_container.append(stmt_label);
	q_container.append(options_table);
	q_container.append(clear_button);
	
	return q_container;
}

function create_options_table(q_number, options){

	var option_container = document.createElement("table");
	option_container.id = q_number + "_options";
	option_container.className = "options_table";
	
	var options_tag = ["A", "B", "C", "D", "E"];
	
	for(var i = 0; i < options.length; i++){
	
		// creating table row
		var option_row = document.createElement("tr");
		option_row.className = "option";
		
		// creating table data cell
		var tag_td = document.createElement("td");
		tag_td.className = "tag";
		tag_td.innerHTML = options_tag[i] + ".";
		
		var option_content = document.createElement("td");
		option_content.className = "content";
		option_content.id = q_number + "_" + options_tag[i]; 
		
		option_content.innerHTML = options[i];
		
		// appending td to tr and tr to table
		option_row.append(tag_td);
		option_row.append(option_content);
		
		option_container.append(option_row);
	}
	
	return option_container;

}



function get_number_label(q_number){

	var number_label = document.createElement("div");
	number_label.className = "number";
	number_label.innerHTML = "" + q_number;

	return number_label;
}

function get_stmt_label(stmt){

	var stmt_label = document.createElement("div");
	stmt_label.className = "stmt";
	stmt_label.innerHTML = stmt;
	
	return stmt_label;
	
}