// Variables
let nombre = 'Miguel';
const apellido = 4;
var isDeveloper = true;

{
    var dentroDelScope = "Dentro del scope";
}

console.log(dentroDelScope); 

// Los tipos primitivos(number, string, boolean, null, undefined) son inmutables
const firstName = 'Francisco';
firstName.toUpperCase();
console.log(firstName); // output => Francisco
const firstNameWithUpperCase = firstName.toUpperCase();
console.log(firstNameWithUpperCase); // output => FRANCISCO
//--

// Los objetos no son primitivos (array, objetos, funciones, etc), pero son mutables (puedes cambiar su valor original)
console.log(restar(10,4));

// ejemplo 1 : Cuando agrego un elemento a un array muta
const list = [];
list.push(1);
console.log(list[0]); // output => 1

// ejemplo 2 : Agregar un elemento al array sin mutar, usar concat()
const listDos = [];
listDos.concat(157);
console.log(listDos[0]); // output => vacio
const anotherList = listDos.concat(157); // concat() nos devuelve otro otra lista
console.log(anotherList);

// ejemlo 3: objetos
const persona = {
    name: 'Francisco',
    twitter: '@JhersonHuacho',
    age: 18,
    isDeveloper: true,
    links: ['https://jhersonhuacho.com','https://line.com']
}

console.log(persona.name);
console.log(persona.links[0]);

const field = 'twitter'; // usar esta variable para acceder al valor de esa propiedad
console.log(persona[field]); // => persona[]
//console.log(persona['twitter']); // esto es diferente al anterior

// function expresion
// parametros => (operando1, operando2)
const sumar = (operando1, operando2) => {
    console.log(operando1);
    console.log(operando2);
    return operando1 + operando2;
}

// argumnentos => (2,2)
const resultado = sumar(2,2);
console.log(resultado);

// function declaration
function restar (a, b) {
    return a - b;
}

/**
 * Esta función de JS restar() se puede utilizar mas arriba, 
 * porque JS tiene un sistema que primero parsea el código, detecta donde estan las funciones, las variables,
 * y hay algunas que ya los genera en memoria por ejemplo las funciones hacen esto "function restar() { }".
 * Esto es uno de las cosas que se llaman hosting. 
 */

// Inferencia => 2 + "2" = 2dos  => Lo que hace JS es inferir el tipo de los datos que quieres utilizar


