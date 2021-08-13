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
        if (data[i].DstLvl != null) {
            s_id = "dstlvl" + data[i].DstLvl;
            htmlString += "<tr><td>" + data[i].Symbol + "</td><td>" + data[i].Close + "</td><td class=" + s_id + ">" + data[i].Signal + "</td></tr>";
        }
        else {
            htmlString += "<tr><td>" + data[i].Symbol + "</td><td>" + data[i].Close + "</td><td>" + data[i].Signal + "</td></tr>";
        }
    }
    htmlString += "</tbody>";
    container.insertAdjacentHTML('beforeend', htmlString);
}

function loadJSON(file, callback) {
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

    for (i=0; i<3; i++) {
        let num = i+1;
        name1 = "Screener1-" + num.toString() + ".json";
        name2 = "Screener2-" + num.toString() + ".json";
        name3 = "Screener3-" + num.toString() + ".json";

        loadJSON(name1, function(response) {
            // Parse JSON string into object
            var actual_JSON = JSON.parse(response);
            var fibo_result_id = "fibo_result" + num.toString();
            var fibo_id = "fibo" + num.toString();
            var fiboContainer = document.getElementById(fibo_id);

            removeOldHTML(fibo_result_id);
            renderHTML(actual_JSON, fibo_result_id, fiboContainer);
        });

        loadJSON(name2, function(response) {
            // Parse JSON string into object
            var actual_JSON = JSON.parse(response);
            var rm_result_id = "rm_result" + num.toString();
            var rm_id = "rm" + num.toString();
            var rmContainer = document.getElementById(rm_id);

            removeOldHTML(rm_result_id);
            renderHTML(actual_JSON, rm_result_id, rmContainer);
        });

        loadJSON(name3, function(response) {
            // Parse JSON string into object
            var actual_JSON = JSON.parse(response);
            var dst_result_id = "dst_result" + num.toString();
            var dst_id = "dst" + num.toString();
            var dstContainer = document.getElementById(dst_id);

            removeOldHTML(dst_result_id);
            renderHTML(actual_JSON, dst_result_id, dstContainer);
        });
    }
}

init();
setInterval(init, 15000);