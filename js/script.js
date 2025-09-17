/**
 * JavaScript performance example: multiple appends on the page vs. one single append on the page
 * 
 * @author  Arturo Mora-Rioja
 * @version 1.0.0, December 2022
 * @version 1.1.0, June 2023. Adding a template literal to innerHTML added
 * @version 1.2.0, January 2024. cloneNode() added
 * @version 1.2.1, September 2025. Refactoring
 */
'use strict';

const initialisePage = () => { 
    document.querySelector('main > section').innerHTML = '';
    return parseInt(document.querySelector('#txtIterations').value);
}

/**
 * Multiple appends
 */
document.querySelector('#multiple').addEventListener('click', (e) => {
    e.preventDefault();
    
    const iterations = initialisePage();
    const startTime = Date.now();
    
    document.querySelector('main > section').appendChild(document.createElement('ul'));

    for (let index = 0; index < iterations; index++) {
        let listElement = document.createElement('li');
        listElement.appendChild(document.createTextNode('Multiple appends: List element number ' + index));
        
        // One append on the page per iteration
        document.querySelector('main > section > ul').appendChild(listElement);
    }

    console.log('Multiple appends takes ' + (Date.now() - startTime) + ' ms.');
});

/**
 * Single append
 */
document.querySelector('#single').addEventListener('click', (e) => {
    e.preventDefault();

    const iterations = initialisePage();
    const startTime = Date.now();

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

/**
 * cloneNode()
 */
document.querySelector('#cloneNode').addEventListener('click', (e) => {
    e.preventDefault();

    const iterations = initialisePage();
    const startTime = Date.now();

    const list = document.createElement('ul');

    const listItemTemplate = document.createElement('li');
    listItemTemplate.appendChild(document.createTextNode('cloneNode(): List element number '));
    listItemTemplate.appendChild(document.createElement('span'));

    for (let index = 0; index < iterations; index++) {
        let listElement = listItemTemplate.cloneNode(true);
        listElement.querySelector('span').innerText = index;
        list.appendChild(listElement);
    }

    document.querySelector('main > section').appendChild(list);

    console.log('cloneNode() takes ' + (Date.now() - startTime) + ' ms.');
});

/**
 * innerHTML
 */
document.querySelector('#innerHTML').addEventListener('click', (e) => {
    e.preventDefault();
    
    const iterations = initialisePage();
    const startTime = Date.now();

    let list = '<ul>';
    
    for (let index = 0; index < iterations; index++) {
        list += `<li>innerHTML: List element number ${index}</li>`
    }
    list += '</ul>';

    // No appends. The new elements are added as a long template literal
    document.querySelector('main > section').innerHTML = list;

    console.log('Changing innerHTML with template literals takes ' + (Date.now() - startTime) + ' ms.');
});