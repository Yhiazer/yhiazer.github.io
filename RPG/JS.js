//Ejercicio de practica Javascript

//Objeto base para los personajes
class Character {
    constructor(name, health, damage) {
        //Atributos
        this.name = name;
        this.health = health;
        this.maxhealth = health;
        this.damage = damage;
    }
    //Verifica si el personaje esta vivo
    isAlive() {
        return this.health > 0;
    }

    //Ataca a otro personaje seleccionado
    attack(target) {
        var x = Math.floor(Math.random()*10+1);
        console.log(`${this.name} deals ${x} DMG to ${target.name}`);
        target.health -= x;
    }

    attack_manual_heroe(target) {
        var x = Math.floor(Math.random()*10+1);
        console.log(`${this.name} deals ${x} DMG to ${target.name}`);
        target.health -= x;
        actualizarBarraVida2(target.health, target.maxhealth);
    }

    attack_manual_limo(target) {
        var x = Math.floor(Math.random()*10+1);
        console.log(`${this.name} deals ${x} DMG to ${target.name}`);
        target.health -= x;
        actualizarBarraVida(target.health, target.maxhealth);
    }

    //Retorna la información actual del personaje
    status() {
        return `${this.name} - HP ${this.health}/${this.maxhealth}`;
    }
}

//Función para combatir
function fight(firstCharacter, secondCharacter) {
    console.log("Empieza el combate!");
    console.log(hero.status());
    console.log(enemy.status());
    while (true) {

        //Primer personaje ataca si esta vivo
        if (firstCharacter.isAlive()) {
            firstCharacter.attack(secondCharacter);
            console.log(hero.status());
            console.log(enemy.status());
            actualizarBarraVida(hero.health, hero.maxhealth);
        } else {
            console.log(`${firstCharacter.name} died!`);
            actualizarBarraVida(hero.health, hero.maxhealth);
            break;
        }

        //Segundo personaje ataca si esta vivo
        if (secondCharacter.isAlive()) {
            secondCharacter.attack(firstCharacter);
            console.log(hero.status());
            console.log(enemy.status());
            actualizarBarraVida2(enemy.health, enemy.maxhealth);
        } else {
            console.log(`${secondCharacter.name} died!`);
            actualizarBarraVida2(enemy.health, enemy.maxhealth);
            break;
        }
    }
}

//Creación de personajes
const hero = new Character("Heroe", Math.floor(Math.random()*750), 110);
const enemy = new Character("Limo", Math.floor(Math.random()*1000), 40);

// Obtener elementos de la barra de vida
var barraVida = document.getElementById("barraVida");
var rellenoVida = document.getElementById("rellenoVida");
var textoVida = document.getElementById("textoVida");

var barraVida2 = document.getElementById("barraVida2");
var rellenoVida2 = document.getElementById("rellenoVida2");
var textoVida2 = document.getElementById("textoVida2");

function actualizarBarraVida(vidaActual, vidaMaxima) {
    // Calcular el porcentaje de vida actual
    var porcentajeVida = (vidaActual / vidaMaxima) * 100;
    
    // Establecer el ancho del relleno de la barra de vida
    rellenoVida.style.width = porcentajeVida + "%";

    // Actualizar el texto de la barra de vida
    textoVida.textContent = "Vida: " + vidaActual + " / " + vidaMaxima;
}

function actualizarBarraVida2(vidaActual, vidaMaxima) {
    // Calcular el porcentaje de vida actual
    var porcentajeVida = (vidaActual / vidaMaxima) * 100;
    
    // Establecer el ancho del relleno de la barra de vida
    rellenoVida2.style.width = porcentajeVida + "%";

    // Actualizar el texto de la barra de vida
    textoVida2.textContent = "Vida: " + vidaActual + " / " + vidaMaxima;
}

document.addEventListener("keydown", function(event) {
    const tecla= event.key;
    if (tecla === "x") {
        hero.attack_manual_heroe(enemy);
    } else if(tecla === "n") {
        enemy.attack_manual_limo(hero);
    }
});

//Comenzar combate

var boton = document.getElementById("miBoton");

boton.addEventListener("click", function () {
    fight(hero, enemy);
});

window.alert("Vida Heroe: "+hero.maxhealth+"\nVida Slime: "+enemy.maxhealth)