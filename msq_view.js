function prepare_msq_view(q_number, q_data){

	console.log("preparing msq view.....");

	var q_container = document.createElement("div");
	q_container.className = "q_container";
	q_container.id = "" + q_number;
	
	var number_label = get_number_label(q_number)
	
	var stmts_template = get_stmts_template(q_data);
	
	var options_table = create_options_table(q_number, q_data["options"]);
	
    var button_div = document.createElement("div");
    button_div.className = "button_div";
	var clear_button = document.createElement("button");
	clear_button.id = q_number + "_" + "clear";
	clear_button.className = "clear_response";
	clear_button.innerHTML = "Clear Response";

    button_div.append(clear_button);
	
	q_container.append(number_label);
	q_container.append(stmts_template);
	q_container.append(options_table);
	q_container.append(button_div);
	
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

function get_stmts_template(q_data){

	var stmts_template = document.createElement("div");
	stmts_template.className = "stmts_temp";
	
	var head_stmt_label = document.createElement("p");
	head_stmt_label.className = "head_stmt";
	head_stmt_label.innerHTML = q_data["head_stmt"];
	
	var stmts_container = document.createElement("table");
	
	var stmts = q_data["stmts"];
	
	for(var i = 0; i < stmts.length; i++){
	
		// creating table row
		var stmt_row = document.createElement("tr");
		
		// creating table data cell
		var stmt_no_td = document.createElement("td");
		stmt_no_td.style.verticalAlign = "top";
		stmt_no_td.innerHTML = i + 1 + ".";
		
		var stmt_content = document.createElement("td");		
		stmt_content.innerHTML = stmts[i];
		
		// appending td to tr and tr to table
		stmt_row.append(stmt_no_td);
		stmt_row.append(stmt_content);
		
		stmts_container.append(stmt_row);
	}
	
	stmts_template.append(head_stmt_label);
	stmts_template.append(stmts_container);
	
	if(q_data["foot_stmt"]){
	
		var foot_stmt_label = document.createElement("p");
		foot_stmt_label.className = "foot_stmt";
		foot_stmt_label.innerHTML = q_data["foot_stmt"];
		
		stmts_template.append(foot_stmt_label);
	}
	
	return stmts_template;
}