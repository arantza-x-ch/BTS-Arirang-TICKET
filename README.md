<h1 align="center">Decorar Entrada BTS-ARIRANG</h1>
<p align="center">
    <a href = "https://arantza-x-ch.github.io/BTS-Arirang-TICKET/" alt="Ir a la página web">
        <img src="https://github.com/arantza-x-ch/BTS-Arirang-TICKET/blob/master/Assets/entrada4.png" alt="Entrada BTS Vacía" height="250">
    </a>
</p>

---

## Introducción

Personalizar entrada falsa de BTS del tour ARIRANG, agregando pequeños 'stickers' e información del concierto.


## Descripción General del Proyecto

El proyecto se desarrolla en JavaScript, para poder generar pequeñas imagenes y texto dentro de un canvas (sin limite de generación). Estas imagenes se podrán mover dentro del canvas. 
El contenido del canvas es descargable o reseteable.


## Funcionamiento

La página genera un canvas que contiene una imagen, la entrada, como base.<br>

En la parte superior se encuentran los botones con los 'stickers', para reseteo/limpieza del canvas y para la descarga la entrada/canvas.<br>
Presionando sobre los botones de los 'stickers' se generá un 'sticker' dentro del canvas que se podrá mover dentro del mismo.<br>

En la parte inferior se enlistan las fechas del tour divididas en: Asia, Norte América, Latinoamérica, Europa, Australia.<br>
Presionando sobre cualquier fecha se agregara la fecha, hora de inicio, ciudad y país a la entrada.<br>

Para la eliminación de los 'stickers' y/o la información del concierto se tendrá que resetar el canvas al completo.


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
|    ├── TekoLight-Medium_2.Woff2
|    ├── bts-logo.png
|    ├── cover_arirang.png
|    ├── download.png
|    ├── e.png
|    ├── entrada1.png
│    ├── entrada3.png
│    ├── entrada4.png
│    └── reset.png
├── index.css
├── index.html
└── main.js
```

## Cambios para Personalizar 
 
No es necesario que las imagenes tengan el mismo tamaño exacto pero si es importante que mantengan la misma proporción dentro de lo posible.

### Stickers

Tamaño de la imagenes/stickers:  50 x 50 px.

### Entrada/ Ticket

Nota: dentro del proyecto hay varias versiones para su uso.<br>
Tamaño de la entrada/ticket:  1350 x 750 px.
