function removeOldHTML(result_id) {
    var del = document.getElementById(result_id);
    if (del != null) {
        del.remove();
    }
}

function renderHTML(data, result_id, container) {
    var htmlString = "<tbody id=" + result_id + ">";
    var s_id = "";

    for (i=0; i<data.length; i++) {
        var close_class = data[i].closeClass;
        var symb_class = data[i].symbolClass;

        if (data[i].DstLvl != 0 && data[i].DstLvl != null) {
            s_id = "dstlvl" + data[i].DstLvl;
            htmlString += "<tr><td class=" + symb_class + ">" + data[i].Symbol + "</td><td class=" + close_class + ">" + data[i].Close + "</td><td class=" + s_id + ">" + data[i].Signal + "</td></tr>";
        }
        else {
            htmlString += "<tr><td class=" + symb_class + ">" + data[i].Symbol + "</td><td class=" + close_class + ">" + data[i].Close + "</td><td>" + data[i].Signal + "</td><td>" + data[i].Risco + "</td><td>" + data[i].Alvo2nd + "</td></tr>";
        }
    }
    htmlString += "</tbody>";
    container.insertAdjacentHTML('beforeend', htmlString);
}

function loadJSON_urls(file_id, callback) {
    var api_url = "https://api.jsonstorage.net/v1/json/" + file_id;
	var xobj = new XMLHttpRequest();
    xobj.onreadystatechange = function () {
          if (xobj.readyState == XMLHttpRequest.DONE) {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
	xobj.open('GET', api_url, true);
	xobj.setRequestHeader('Content-Type', 'application/json');
    xobj.send();
}

function loadJSON_file(file, callback) {
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
}

function init() {
    let name1 = "";
    let name2 = "";
    let name3 = "";
	let file1 = "";
    let file2 = "";
    let file3 = "";

	const url_file = "json_id.json";
	
	loadJSON_file(url_file, function(response) {
		// Parse JSON string into object
		var actual_JSON = JSON.parse(response);
		
		for (i=0; i<3; i++) {
			let num = i+1;
			
			var json_file = actual_JSON[0];
			
			file1 = "Screener1a" + num.toString();
			file2 = "Screener2a" + num.toString();
			file3 = "Screener3a" + num.toString();
			name1 = json_file[file1];
			name2 = json_file[file2];
			name3 = json_file[file3];
			
			loadJSON_urls(name1, function(response) {
				// Parse JSON string into object
				var actual_JSON = JSON.parse(response);
				var fibo_result_id = "fibo_result" + num.toString();
				var fibo_id = "fibo" + num.toString();
				var fiboContainer = document.getElementById(fibo_id);

				removeOldHTML(fibo_result_id);
				renderHTML(actual_JSON, fibo_result_id, fiboContainer);
			});

			loadJSON_urls(name2, function(response) {
				// Parse JSON string into object
				var actual_JSON = JSON.parse(response);
				var rm_result_id = "rm_result" + num.toString();
				var rm_id = "rm" + num.toString();
				var rmContainer = document.getElementById(rm_id);

				removeOldHTML(rm_result_id);
				renderHTML(actual_JSON, rm_result_id, rmContainer);
			});

			loadJSON_urls(name3, function(response) {
				// Parse JSON string into object
				var actual_JSON = JSON.parse(response);
				var dst_result_id = "dst_result" + num.toString();
				var dst_id = "dst" + num.toString();
				var dstContainer = document.getElementById(dst_id);

				removeOldHTML(dst_result_id);
				renderHTML(actual_JSON, dst_result_id, dstContainer);
			});
		}
	});
}

init();
setInterval(init, 120000);