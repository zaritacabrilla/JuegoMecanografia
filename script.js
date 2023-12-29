document.addEventListener("DOMContentLoaded", function () {
  const frases = [
    "La felicidad se puede hallar hasta en los más oscuros momentos, si somos capaces de usar bien la luz.",
    "Las palabras son, en mi no tan humilde opinión, nuestra más inagotable fuente de magia, capaces de infringir daño y de remediarlo.",
    "El amor es una fuerza que es más hermosa y más terrible que la muerte.",
    "Todos tenemos luz y oscuridad en nuestro interior. Lo que importa es qué parte elegimos potenciar.",
    "Lo único que nos da miedo cuando nos asomamos a la muerte o a la oscuridad, es lo desconocido.",
    "Tiempos oscuros y difíciles nos aguardan. Pronto deberemos elegir entre lo que es correcto y lo que es fácil.",
    "La fuerza de tus convicciones determina tu éxito, no el número de tus seguidores.",
    "No sientas pena de los muertos, sino de los vivos, y sobretodo de aquellos que viven sin amor.",
  ];

  let palabras = [];
  let indicePalabras = 0;
  let tiempoInicio = 0;
  let intentos = 0;

  const fraseElement = document.getElementById("frase");
  const mensajeElement = document.getElementById("mensaje");
  const valorEscritoElement = document.getElementById("valor-escrito");
  const botonComenzar = document.getElementById("boton-inicio-juego");
  const botonRegresarInicio = document.getElementById("boton-regresar-inicio");

  valorEscritoElement.style.display = "none";

  function mostrarInput() {
    const valorEscritoElement = document.getElementById("valor-escrito");
    valorEscritoElement.style.display = "block";
    valorEscritoElement.focus();
  }

  function eliminarInput() {
    const valorEscritoElement = document.getElementById("valor-escrito");
    valorEscritoElement.style.display = "none";
  }

  function resaltarSiguientePalabra() {
    const palabrasAnteriores = palabras.slice(0, indicePalabras).join(" ");
    const resaltarPalabraActual = palabras[indicePalabras];
    const textoRestante = palabras.slice(indicePalabras + 1).join(" ");

    fraseElement.innerHTML = `${palabrasAnteriores} <span class="destacar">${resaltarPalabraActual}</span> ${textoRestante}`;
  }

  function abrirContenedorFrase() {
    const contenedorFrase = document.getElementById("contenedor-frase");
    contenedorFrase.style.display = "block";
  }

  function cerrarContenedorFrase() {
    const contenedorFrase = document.getElementById("contenedor-frase");
    contenedorFrase.style.display = "none";
  }

  function limpiarContenedorFrase() {
    fraseElement.innerHTML = "";
  }

  function mostrarModal(mensaje) {
    const contenedorModal = document.getElementById("contenedor-modal");
    mensajeElement.textContent = mensaje;
    contenedorModal.style.display = "block";
    botonComenzar.style.display = "none";
    botonRegresarInicio.style.display = "none";
  }

  //Función que hace que al cerrar el modal, siendo más de un intento, se vuelva cargar el juego.

  function cerrarModal() {
    const contenedorModal = document.getElementById("contenedor-modal");
    contenedorModal.style.display = "none";

    if (intentos > 0) {
      limpiarContenedorFrase();
      procesoJuego();
      abrirContenedorFrase();
      botonComenzar.style.display = "block";
      botonRegresarInicio.style.display = "block";
    }
  }

  //Función que incluye la primera parte del juego

  function iniciarJuego() {
    const fraseIndice = Math.floor(Math.random() * frases.length);
    const frase = frases[fraseIndice];
    palabras = frase.split(" ");
    indicePalabras = 0;

    const abarcarPalabras = palabras.map(function (palabra) {
      return `<span>${palabra}</span>`;
    });

    fraseElement.innerHTML = abarcarPalabras.join(" ");
    fraseElement.childNodes[0].className = "destacar";

    mensajeElement.innerText = "";

    valorEscritoElement.value = "";
    valorEscritoElement.focus();

    tiempoInicio = new Date().getTime();
  }

  //Función que incluye la segunda parte del juego

  function manejarErroresEscritura() {
    const palabraActual = palabras[indicePalabras];
    const valorEscrito = valorEscritoElement.value.trim();

    if (valorEscrito === palabraActual) {
      valorEscritoElement.value = "";
      indicePalabras++;

      if (indicePalabras < palabras.length) {
        resaltarSiguientePalabra();
      } else {
        eliminarInput();
        cerrarContenedorFrase();
        const tiempoTranscurrido = new Date().getTime() - tiempoInicio;
        const mensaje = `¡FELICIDADES! terminaste en ${
          tiempoTranscurrido / 1000
        } segundos.`;
        mostrarModal(mensaje);
      }

      if (indicePalabras > 0 && fraseElement.childNodes[indicePalabras - 1]) {
        fraseElement.childNodes[indicePalabras - 1].className = "";
      }
    } else if (palabraActual.startsWith(valorEscrito)) {
      valorEscritoElement.className = "";
    } else {
      valorEscritoElement.className = "error";
    }
  }

  function iniciarEventoInput() {
    valorEscritoElement.addEventListener("input", manejarErroresEscritura);
  }

  function iniciarEventoCerrarModal() {
    document
      .getElementById("cerrar-modal")
      .addEventListener("click", cerrarModal);
  }

  //Función que incluye todas las funciones necesarias para el proceso del juego.

  function procesoJuego() {
    botonComenzar.addEventListener("click", function () {
      intentos++;
      iniciarJuego();
      iniciarEventoInput();
      iniciarEventoCerrarModal();
      mostrarInput();
    });
  }

  botonComenzar.addEventListener("click", procesoJuego);
});
