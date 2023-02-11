// Variables
const carrito = document.querySelector ('#carrito')
const contenedorCarrito = document.querySelector ('#lista-carrito tbody')
const vaciarCarrito = document.querySelector ('#vaciar-carrito')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
let   articulosCarrito = []

cargarEventListener()
function cargarEventListener () {
    //Cuando agregas un curso presionando "Agregar"
    listaCursos.addEventListener ('click', agregarCurso)

    // Elimina curso del carrito 
    carrito.addEventListener ('click', eliminarCurso)

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener ('click', () => {
        articulosCarrito = []
        limpiarHTML()
    })
}

// Funciones
function agregarCurso (e) {
    e.preventDefault()
    if (e.target.classList.contains ('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado)
    }

}
// Elimina cursos
function eliminarCurso  (e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id')

        //Elimina del array por el data-id
        articulosCarrito = articulosCarrito.filter (curso => curso.id !== cursoId)
        carritoHTML()
    }
}

//Lee el contenido del HTML al que le dimos click y extra info del curso
function leerDatosCurso(curso) {
    console.log (curso);

    //Crear un obj con contenido curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento ya existe
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id)
    if (existe) {
        // Actualizamos cantidad
        const cursos = articulosCarrito.map( curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad ++
                return curso
            } else {
                return curso
            }
        })
        articulosCarrito = [...cursos]
    } else {
        // Agrega elementos al array de carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
        console.log('articulosCarrito', articulosCarrito)
    }
    carritoHTML()
}

// Muestra el carrito de compras en el HTML
function carritoHTML () {

    //Limpia el HTML
    limpiarHTML ()

    // Pinta artículo en carrito
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>
            <img src="${imagen}" witdh='100'>
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `
        //Agregar el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row)
    })
}

// Elimina cursos del tbody
function limpiarHTML () {
    // Forma lenta
    // contenedorCarrito.innerHTML = ''

    // Forma con mayor rendimiento
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

