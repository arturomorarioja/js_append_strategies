/**
 * JavaScript performance example: multiple appends on the page vs. one single append on the page
 * 
 * @author  Arturo Mora-Rioja (amri@kea.dk)
 * @version 1.0.0, December 2022
 * @version 1.1.0, June 2023. Adding a template literal to innerHTML added
 */
'use strict';

const iterations = 100000;
const clearPage = () => { document.querySelector('main > section').innerHTML = ''; }

document.querySelector('#multiple').addEventListener('click', (e) => {
    e.preventDefault();
    
    const startTime = Date.now();

    clearPage();
    document.querySelector('main > section').appendChild(document.createElement('ul'));

    for (let index = 0; index < iterations; index++) {
        let listElement = document.createElement('li');
        listElement.appendChild(document.createTextNode('Multiple appends: List element number ' + index));
        
        // One append on the page per iteration
        document.querySelector('main > section > ul').appendChild(listElement);
    }

    console.log('Multiple appends takes ' + (Date.now() - startTime) + ' ms.');
});

document.querySelector('#single').addEventListener('click', (e) => {
    e.preventDefault();

    const startTime = Date.now();

    clearPage();
    const list = document.createElement('ul');

    for (let index = 0; index < iterations; index++) {
        let listElement = document.createElement('li');
        listElement.appendChild(document.createTextNode('Single append: List element number ' + index));

        list.appendChild(listElement);
    }
    
    // Only one append on the page
    document.querySelector('main > section').appendChild(list);

    console.log('Single append takes ' + (Date.now() - startTime) + ' ms.');
});

document.querySelector('#innerHTML').addEventListener('click', (e) => {
    e.preventDefault();

    const startTime = Date.now();

    clearPage();
    let list = '<ul>';
    
    for (let index = 0; index < iterations; index++) {
        list += `<li>innerHTML: List element number ${index}</li>`
    }
    list += '</ul>';

    // No appends. The new elements are added as a long template literal
    document.querySelector('main > section').innerHTML = list;

    console.log('Changing innerHTML with template literals takes ' + (Date.now() - startTime) + ' ms.');
});