function loadJSON() {
    
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://api.exchangeratesapi.io/latest", true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let json = JSON.parse(this.response);
            // document.getElementById("test").innerHTML = json;
            // document.getElementById("date").innerHTML = json['date'];
            console.log(json.rates);
            let table = document.getElementById("table-currency");

            for (const property in json.rates) {
                console.log(`${property}: ${json.rates[property]}`);
                table.innerHTML += `
                <tr>
                    <th scope="row">${property}</th>
                    <td>${json.rates[property]}</td>
                </tr>`;
            }
            $('.table-body').paginathing({
                perPage: 10,
                containerClass: 'panel-footer'
            })
        }
    };
    xhttp.send();
}
window.onload = loadJSON;
// <li class="list-group-item">${property}: ${json.rates[property]}</li