function loadJSON() {

    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://api.exchangeratesapi.io/latest", true);
    
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let json = JSON.parse(this.response);
            console.log(json);

            let latest_table = document.getElementById("table-currency");
            let convert_from = document.getElementById("convert_from");
            let convert_to = document.getElementById("convert_to");
            let convert_date = document.getElementById("convert_date");
            let convert_result = document.getElementById("convert_result");


            for (const property in json.rates) {
                convert_from.innerHTML += `<option value="${property}">${property}</option>`;
                convert_to.innerHTML += `<option value="${property}">${property}</option>`;
            }
            convert_date.innerHTML = json['date'];

            document.getElementById("date").innerHTML = json['date'];
            for (const property in json.rates) {
                latest_table.innerHTML += ` <tr>
                                                <td>${property}</td>
                                                <td>${json.rates[property]}</td>
                                            </tr>`;
            }
            $('.table-body').paginathing({
                perPage: 10,
                ulClass: 'pagination',
                liClass: 'page-item',
                containerClass: 'panel-footer'
            })
        }
        
    };
    xhttp.send();
}
window.onload = loadJSON;

function convert() {
    let convert_from = document.getElementById("convert_from");
    let convert_to = document.getElementById("convert_to");
    let convert_date = document.getElementById("convert_date");
    let convert_result = document.getElementById("convert_result");

    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `https://api.exchangeratesapi.io/${convert_date.value}?base=${convert_from.value}`, true);
    
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let json = JSON.parse(this.response);
            console.log(json['rates']);
            convert_result.innerText = `${json['rates'][convert_to.value]}`;
        }
        
    };
    xhttp.send();
}