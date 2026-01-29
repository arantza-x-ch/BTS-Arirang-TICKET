<h1 align="center">Decorar Entrada BTS-ARIRANG</h1>
<p align="center">
    <a href = "https://arantza-x-ch.github.io/BTS-Arirang-TICKET/" alt="Ir a la página web">
        <img src="https://github.com/arantza-x-ch/BTS-Arirang-TICKET/blob/master/Assets/BTS-ARIRANG-TIQUET%20(5).png" alt="Entrada BTS Vacía" height="250"/>
    </a><br><br>
    <a href="https://arantza-x-ch.github.io/BTS-Arirang-TICKET/" alt="BTS-Arirang-BTS">https://arantza-x-ch.github.io/BTS-Arirang-TICKET/</a>
</p>

---

## Introducción

Personalizar entrada falsa de BTS del tour ARIRANG, agregando pequeñas 'pegatinas' e información del concierto.


## Descripción General del Proyecto

El proyecto se desarrolla en JavaScript, para poder generar pequeñas imagenes y texto dentro de un canvas (sin limite de generación). Estas imagenes se podrán mover dentro del canvas. 
El contenido del canvas es descargable y reseteable.


## Funcionamiento

La página genera un canvas que contiene una imagen, la entrada, como base.<br>

Las diferentes interacciones con el canvas se dividen en tres contenedores.<br>

El contendor principal consta de las 'pegatinas' que se agregarán al canvas y dos pequeños botones de navegación.Todas las 'pegatinas' podrán moverse libremente dentro del canvas.<br> 
De manera interna cada vez se se agregue una 'pegatina' se creará un objeto que almacenará la imagen, su posición dentro del canvas, tamaño y si es movible; será añadido a un array con el resto de 'pegatinas' y se 'pintará' en el canvas. La navegación es una simple páginación para poder recorrer todas las 'pegatinas' que disponemos.<br>

En el siguiente contenedor se muestra todas las paradas del tour separadas en: Asia, Norte América, Latinoamérica, Europa, Australia.<br>
Cada parada se genera a través de la extracción de datos del archivo 'concertsdata.json', se filtra y se muestra los datos principales: ciudad, país, día y mes. A la hora de mostrarse al canvas se agregará la hora de inicio del concierto.<br>

Para finalizar, se encuentra un cuadro de texto, se actualiza en tiempo real en el canvas; se incluyen dos botones que permiten poder limpiar/reiniciar el canvas al completo o la opción de poder eliminar las 'pegatinas' de manera individual y un botón de descarga del canvas al completo.<br>
Al limpiar el canvas de todas las personalizaciones únicamente se mantendrá la imagen de base. Con la ayuda de un checkbox activaremos la opción de poder eliminar las 'pegatinas' de manera indiviual sin la necesidad de resetear el canvas al completo.<br>

Dentro del canvas los únicos elementos movibles serán las 'pegatinas' que se hayan agregado, siempre que el botón de eliminar no esté activo.

## Estructura del Proyecto

```
BTS-Arirang-TICKET/
├── assets/
│    ├── 21JHOPE.png
|    ├── 21JIMIN.png
|    ├── 21JIN.png
|    ├── 21JK.png
|    ├── 21RM.png
|    ├── 21SUGA.png
|    ├── 21V.png
|    ├── 21VAN.png
│    ├── 22JHOPE.png
|    ├── 22JIMIN.png
|    ├── 22JIN.png
|    ├── 22JK.png
|    ├── 22RM.png
|    ├── 22SUGA.png
|    ├── 22V.png
|    ├── BTS-ARIRANG-TIQUET(5).png
|    ├── BTS-ARIRANG-TIQUET.png
|    ├── TekoLight-Medium_2.Woff2BTS-ARIRANG-TIQUET.png
|    ├── bts-logo.png
|    ├── cover_arirang.png
|    ├── download.png
|    ├── e.png
|    ├── entrada1.png
│    ├── entrada3.png
│    ├── entrada4.png
│    └── reset.png
│    └── trash.png
│    └── trashred.png
│    └── triangle.png
│    └── trianglered.png
├── index.css
├── index.html
└── main.js
```

## Cambios para Personalizar 
 
No es necesario que las imagenes tengan el mismo tamaño exacto pero si es importante que mantengan la misma proporción dentro de lo posible.

### Pegatinas / Stickers

Tamaño de la imagenes/stickers:  50 x 50 px.

### Entrada/ Ticket

Tamaño de la entrada/ticket:  1350 x 750 px.<br>

Nota: Dentro del proyecto hay varias versiones para su uso.<br>
