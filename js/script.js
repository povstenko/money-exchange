
window.onload = loadJSON;
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
            let rates_currency = document.getElementById("rates_currency");

            for (const property in json.rates) {
                convert_from.innerHTML += `<option value="${property}">${property}</option>`;
                convert_to.innerHTML += `<option value="${property}">${property}</option>`;
                rates_currency.innerHTML += `<option value="${property}">${property}</option>`;
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

google.charts.load('current', { 'packages': ['bar'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    let rates_base = document.getElementById("rates_base");
    let rates_currency = document.getElementById("rates_currency");
    let rates_month = document.getElementById("rates_month");

    let start_date = rates_month.value + '-01';
    let end_date = rates_month.value + '-31';

    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `https://api.exchangeratesapi.io/history?start_at=${start_date}&end_at=${end_date}`, true);
    
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let json = JSON.parse(this.response);
            console.log(json);

            var data = [['Date', 'Rate']];
            for (const property in json.rates) {
                data.push([property, json.rates[property][rates_currency.value]]);
            }
            console.log(data);
            
            var data = google.visualization.arrayToDataTable(data);
        
            var options = {
                chart: {
                    title: 'Month Rates',
                    subtitle: `EUR month rates from ${start_date} to ${end_date}`,
                }
            };
        
            var chart = new google.charts.Bar(document.getElementById('columnchart_material'));
        
            chart.draw(data, google.charts.Bar.convertOptions(options));
        }
    };
    xhttp.send();

   
}