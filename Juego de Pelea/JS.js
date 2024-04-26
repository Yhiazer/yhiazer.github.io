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

    calcularEvento(danyo){
        var x = Math.floor(Math.random() * 5);
        if (x == 0) {
            danyo = danyo*3;
            console.log("Critico "+danyo+" Damage!!");
        } else if (x == 1 || x == 2) {
            danyo = danyo*0;
            console.log("Fallo!!");
        }
        return danyo;
    }

    attack_manual_heroe(target) {
        console.log(`${this.name} deals ${this.damage} DMG to ${target.name}`);
        target.health -= this.calcularEvento(this.damage);
        actualizarBarraVida2(target.health, target.maxhealth);
        if (target.health <= 0) {
            enemigo.setAttribute("src", "img/explosion.gif");
            setTimeout(function(){
                window.alert("J2 perdio");
            },1000);
        }
    }

    attack_manual_limo(target) {
        console.log(`${this.name} deals ${this.damage} DMG to ${target.name}`);
        target.health -= this.calcularEvento(this.damage);
        actualizarBarraVida(target.health, target.maxhealth);
        if (target.health <= 0) {
            heroe.setAttribute("src", "img/explosion.gif");
            setTimeout(function(){
                window.alert("J1 perdio");
            },1000);
        }
    }

    //Retorna la información actual del personaje
    status() {
        return `${this.name} - HP ${this.health}/${this.maxhealth}`;
    }
}

const hero = new Character("Heroe", Math.floor(Math.random() * 5000 + 500), Math.floor(Math.random() * 10 + 1));
const enemy = new Character("Limo", Math.floor(Math.random() * 5000 + 500), Math.floor(Math.random() * 10 + 1));

//Variables

var ventanaAncho = window.innerWidth;
var ventanaAlto = window.innerHeight;
var velocidad = 5;
var teclasPresionadas = {};

//Player 1

var objeto = document.getElementById('player1');
var heroe = document.getElementById('heroe');
var posX = Math.floor(Math.random() * 300);
var posY = Math.floor(Math.random() * 300);

var barraVida = document.getElementById("barraVida");
var rellenoVida = document.getElementById("rellenoVida");
var textoVida = document.getElementById("textoVida");

function moverObjeto() {
    objeto.style.left = posX + 'px';
    objeto.style.top = posY + 'px';
}

//Player 2

var objeto2 = document.getElementById('player2');
var enemigo = document.getElementById('enemigo');
var posX2 = Math.floor(Math.random() * 300);
var posY2 = Math.floor(Math.random() * 300);

var barraVida2 = document.getElementById("barraVida2");
var rellenoVida2 = document.getElementById("rellenoVida2");
var textoVida2 = document.getElementById("textoVida2");

function moverObjeto2() {
    objeto2.style.left = posX2 + 'px';
    objeto2.style.top = posY2 + 'px';
}

//Mover Objeto

function manejarMovimiento() {
    if (teclasPresionadas['w'] && posY > 0) {
        posY -= velocidad;
    }
    if (teclasPresionadas['a'] && posX > 0) {
        posX -= velocidad;
    }
    if (teclasPresionadas['s'] && posY < ventanaAlto - objeto.offsetHeight) {
        posY += velocidad;
    }
    if (teclasPresionadas['d'] && posX < ventanaAncho - objeto.offsetWidth) {
        posX += velocidad;
    }
    if (teclasPresionadas['ArrowUp'] && posY2 > 0) {
        posY2 -= velocidad;
    }
    if (teclasPresionadas['ArrowLeft'] && posX2 > 0) {
        posX2 -= velocidad;
    }
    if (teclasPresionadas['ArrowDown'] && posY2 < ventanaAlto - objeto2.offsetHeight) {
        posY2 += velocidad;
    }
    if (teclasPresionadas['ArrowRight'] && posX2 < ventanaAncho - objeto2.offsetWidth) {
        posX2 += velocidad;
    }
}

document.addEventListener('keydown', function (event) {
    teclasPresionadas[event.key] = true;
});

document.addEventListener('keyup', function (event) {
    teclasPresionadas[event.key] = false;
});

function verificarPosicion() {
    var distanciaX = Math.abs(posX - posX2);
    var distanciaY = Math.abs(posY - posY2);

    if (distanciaX <= 30 && distanciaY <= 30) {
        reposicionar();
    }
}

function reposicionar() {
    posX = Math.floor(Math.random() * 500);
    posY = Math.floor(Math.random() * 500);
    posX2 = Math.floor(Math.random() * 500);
    posY2 = Math.floor(Math.random() * 500);
    calcularDanyo();
}

function calcularDanyo(){
    hero.attack_manual_heroe(enemy);
    enemy.attack_manual_limo(hero);
}

function actualizarBarraVida(vidaActual, vidaMaxima) {
    var porcentajeVida = (vidaActual / vidaMaxima) * 100;

    rellenoVida.style.width = porcentajeVida + "%";

    textoVida.textContent = "Vida: " + vidaActual + " / " + vidaMaxima;
}

function actualizarBarraVida2(vidaActual, vidaMaxima) {
    var porcentajeVida = (vidaActual / vidaMaxima) * 100;

    rellenoVida2.style.width = porcentajeVida + "%";

    textoVida2.textContent = "Vida: " + vidaActual + " / " + vidaMaxima;
}

setInterval(function () {
    manejarMovimiento();
    moverObjeto();
    moverObjeto2();
    verificarPosicion(); 
}, 10);

setInterval(function (){
    actualizarDanyo();
}, 3000);

function actualizarDanyo(){
    hero.damage += Math.floor(Math.random() * 100 + 1);
    enemy.damage += Math.floor(Math.random() * 100 + 1);
}

//Fin

window.alert("Vida Heroe: " + hero.maxhealth + "\nVida Slime: " + enemy.maxhealth);

window.onload = function() {
    // Obtener los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    
    // Obtener las URLs de las imágenes de los parámetros de URL
    const heroImageSrc = urlParams.get('heroImage');
    const enemyImageSrc = urlParams.get('enemyImage');

    // Establecer las fuentes de las imágenes en la página
    document.getElementById('hero').src = heroImageSrc;
    document.getElementById('enemy').src = enemyImageSrc;
}