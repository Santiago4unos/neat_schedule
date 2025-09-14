# Neat Schedule

Este es mi pequeño proyecto para solucionar un problema de conveniencia que encontré, el de hacer el horario de Edcore más visualmente bonito y fácil de leer usando una herramienta llamada [jsPDF](https://www.npmjs.com/package/jspdf), así que muchas gracias a jsPDF por ayudar a hacer esto posible. 
## Historia detrás de este proyecto
Verán, yo antes estaba en una prepa de la UDG y cuando apenas entré los horarios se veían iguales a los de ahora en Edcore, varios de nosotros o hacíamos nuestros propios horarios manualmente o instalábamos una aplicación de terceros que se llama SIIAPP que funcionaba como una versión más estéticamente linda que el SIIAU de ese entonces, incluyendo un horario más fácil de leer, pero ya pasados unos semestres anunciaron una nueva aplicación llamada LEO la cual era oficial y finalmente solucionaba el problema del horario "feo". Así que cuando entré al Tecnológico y me di cuenta que los horarios se veían igual que los horarios viejos de mi prepa decidí hacer una herramienta yo mismo que solucionara el problema, así como lo hizo en su momento SIIAPP, intenté primero con una herramienta llamada [pdfjs-lib](https://www.npmjs.com/package/pdfjs-lib) pero no funcionó para este proyecto ya que solo me daba el texto de vuelta sin decirme sus coordenadas, por lo que no podría diferenciar entre esto:
|Grupo                                       |Lunes|Martes               | Miercoles           | Jueves | Viernes |
|--------------------------------------------|-----|---------------------|---------------------|--------|---------|
|ACH-2307B - CÁLCULO DIFERENCIAL - JUAN PEREZ|     |07:00:00 08:00:00 F39|09:00:00 10:00:00 E31|        |  |

Y esto:

|Grupo                                       |Lunes|Martes           |Miercoles| Jueves | Viernes |
|--------------------------------------------|-----|-----------------|---------|--------|---------|
|ACH-2307B - CÁLCULO DIFERENCIAL - JUAN PEREZ| |07:00:00 08:00:00 F39|         |        |09:00:00 10:00:00 E31|

Ya que para ambos me salía algo similar a esto:
ACH-2307B - CÁLCULO DIFERENCIAL - 07:00:00 08:00:00 F39 09:00:00 10:00:00 E31

> El texto del grupo cortado porque a veces el nombre del maestro
> aparecía en la siguiente linea y no lo leía todo junto

Por lo cual decidí usar [jsPDF](https://www.npmjs.com/package/jspdf), una herramienta en la que ya agrupaba cada texto en esta estructura:
```javascript
    "40": [
        {
            "text": "Texto de linea 1:",
            "x": 32,
            "y": 572,
            "width": 32.44,
            "height": 8
        },
        {
            "text": "Segundo texto de linea 1:",
            "x": 32,
            "y": 572,
            "width": 32.44,
            "height": 8
        },
    ],
    "80": [
        {
            "text": "Texto de linea 2",
            "x": 87.2,
            "y": 572,
            "width": 121.78400000000005,
            "height": 8
        },
    ]
```

Y ya con esto podía acomodarlo en columnas y así para finalmente poder convertirlo en html y mostrarlo en pantalla.
## Diferencia de este proyecto y LEO
Aunque hay **algo que diferencía** todavía al mío al momento en el que escribo esto **(2025/09/14)** que es que en LEO cuando intentas descargar el horario, todavía lo descarga como se veía antes el horario en SIIAU, mientras que mi proyecto si lo descargas todavía se ve visualmente atractivo.
