'use strict';

var url = 'https://restcountries.eu/rest/v1/name/';
var countriesList = document.getElementById('countries');



document.getElementById('search').addEventListener('click', searchCountries);

function searchCountries() {
    var countryName = document.getElementById('country-name').value;
    if(!countryName.length) countryName = 'Poland';
    fetch(url + countryName)
        .then(function(resp) {
            return resp.json();
        })
        .then(showCountriesList);
};

function showCountriesList(resp) {
    countriesList.innerHTML = '';
    resp.forEach(function(item){
        var listElement = document.createElement('li');
        
        var flagBox = document.createElement('div');
        var flagImage = document.createElement('img');
        flagBox.appendChild(flagImage);
        listElement.appendChild(flagBox);

        var listElementHeading = document.createElement('h2');
        listElementHeading.innerText = item.name;
        listElement.appendChild(listElementHeading);
        
        var table = document.createElement('table');
        var countryInfo = {
            capital: ['Capital', item.capital],
            area: ['Land area', item.area + ' sq. km'],
            population: ['Population', item.population],
            currencies: ['Currency', item.currencies], 
            languages: ['Language(s)', item.languages]
        };
        for (var key in countryInfo) {
            var tableRow = document.createElement('tr');
            
            var firstColumnData = document.createElement('td');
            firstColumnData.innerText = countryInfo[key][0];
            tableRow.appendChild(firstColumnData);

            var secondColumnData = document.createElement('td');
            secondColumnData.innerText = countryInfo[key][1];
            tableRow.appendChild(secondColumnData);

            table.appendChild(tableRow);
        }
        listElement.appendChild(table);

        // getting a flag

        fetch('https://restcountries.eu/rest/v2/alpha/' + item.alpha3Code)
            .then(function(flagResp) {
                return flagResp.json();
            })
            .then(function(flagResp) {
                flagImage.setAttribute('src', flagResp.flag);
            });

        countriesList.appendChild(listElement);
    });
};