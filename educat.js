class Curso{
    constructor(nombre, profesor, estudiantes = []){
        this.nombre = nombre;
        this.profesor = profesor;
        this.estudiantes = estudiantes;
    }
    agregarEstudiante(estudiante){
        this.estudiantes.push(estudiante);
    }

    listarEstudiantes() {
        if (this.estudiantes.length === 0) {
            return `No hay estudiantes en el curso de ${this.nombre}.`;
        }

        const lista = this.estudiantes.map(estudiante => {
            return `- ${estudiante.nombre}, Edad: ${estudiante.edad}, Nota: ${estudiante.nota}`;
        }).join('\n');

        return `Lista de estudiantes en el curso de ${this.nombre}:\n${lista}`;
    }
    obtenerPromedio() {
     
        if (this.estudiantes.length === 0) return 0;

        const totalNotas = this.estudiantes.reduce((sum, estudiante) => sum + estudiante.nota, 0); // Suma las notas
        return totalNotas / this.estudiantes.length;
    }
}

class Estudiante {
    constructor(nombre, edad, nota, curso) {
        this.nombre = nombre;
        this.edad = edad;
        this.nota = nota;
        this.curso = curso;
    }
    presentarse(){
        return `Hola, soy ${this.nombre}, tengo ${this.edad} años y estoy en el curso de ${this.curso}.`;
    }
}

// Cursos
const cursoMatematicas = new Curso('Matemáticas', 'Profesor Pérez');
const cursoIngles = new Curso('Ingles', 'Profesor Jirafales');
const cursoProgramacion = new Curso('Programacion', 'Profesora Candia');

// Crear estudiantes
const estudiante1 = new Estudiante('Juan', 20, 8.5, 'Matemáticas');
const estudiante2 = new Estudiante('Ana', 22, 9.0, 'Matemáticas');
const estudiante3 = new Estudiante('Pedro', 21, 7.5, 'Matemáticas');

const estudiante4 = new Estudiante('Alberto', 25, 7.5, 'Ingles');
const estudiante5 = new Estudiante('Sofia', 19, 9.0, 'Ingles');
const estudiante6 = new Estudiante('Lucio', 23, 5.5, 'Ingles');

const estudiante7 = new Estudiante('Simon', 19, 10, 'Programacion');
const estudiante8 = new Estudiante('Fernando', 27, 8.0, 'Programacion');
const estudiante9 = new Estudiante('Agustin', 22, 9.5, 'Programacion');

// Agregar estudiantes al curso
cursoMatematicas.agregarEstudiante(estudiante1);
cursoMatematicas.agregarEstudiante(estudiante2);
cursoMatematicas.agregarEstudiante(estudiante3);

cursoIngles.agregarEstudiante(estudiante4);
cursoIngles.agregarEstudiante(estudiante5);
cursoIngles.agregarEstudiante(estudiante6);

cursoProgramacion.agregarEstudiante(estudiante7);
cursoProgramacion.agregarEstudiante(estudiante8);
cursoProgramacion.agregarEstudiante(estudiante9);

// Listar estudiantes
console.log(cursoMatematicas.listarEstudiantes());
console.log(cursoIngles.listarEstudiantes());
console.log(cursoProgramacion.listarEstudiantes());

// Calcular y mostrar el promedio de notas
const promedioNotas1 = cursoMatematicas.obtenerPromedio();
console.log(`El promedio de notas en el curso de ${cursoMatematicas.nombre} es: ${promedioNotas1.toFixed(2)}`);

const promedioNotas2 = cursoIngles.obtenerPromedio();
console.log(`El promedio de notas en el curso de ${cursoIngles.nombre} es: ${promedioNotas2.toFixed(2)}`);

const promedioNotas3 = cursoProgramacion.obtenerPromedio();
console.log(`El promedio de notas en el curso de ${cursoProgramacion.nombre} es: ${promedioNotas3.toFixed(2)}`);

//Conexion

// Mantener una lista de cursos global
let cursos = [];

document.addEventListener('DOMContentLoaded', () => {
    const formCurso = document.getElementById('formCurso');
    const formEstudiante = document.getElementById('formEstudiante');
    const listadoCursos = document.getElementById('listadoCursos');
    const selectEstudianteCurso = document.getElementById('estudianteCurso'); // El select de cursos para estudiantes
    const listaEstudiantes = document.getElementById('listaEstudiantes'); // Lista para el modal

    if (formCurso && listadoCursos && selectEstudianteCurso) {
        // Evento para crear cursos
        formCurso.addEventListener('submit', function (event) {
            event.preventDefault(); // Evita que el formulario se envíe y recargue la página

            const nombreCurso = document.getElementById('cursoNombre').value;
            const profesorCurso = document.getElementById('cursoProfesor').value;

            if (nombreCurso && profesorCurso) {
                // Crear un nuevo curso y agregarlo a la lista global
                const nuevoCurso = new Curso(nombreCurso, profesorCurso);
                cursos.push(nuevoCurso);

                // Crear el div para mostrar el curso
                const divCurso = document.createElement('div');
                divCurso.classList.add('curso-item', 'mb-3', 'p-3', 'border', 'border-light');
                divCurso.style.backgroundColor = '#f8f9fa';

                // Asignar un ID único al div del curso para poder actualizarlo luego
                divCurso.id = `curso-${nombreCurso.replace(/\s+/g, '-').toLowerCase()}`;

                // Añadir el contenido inicial del curso y un botón para abrir el modal
                divCurso.innerHTML = `
                    <h4 class="curso-nombre" data-curso="${nombreCurso}">Curso: ${nombreCurso}</h4>
                    <p>Profesor: ${profesorCurso}</p>
                    <p id="estudiantes-${nombreCurso.replace(/\s+/g, '-').toLowerCase()}">Estudiantes: 0</p> <!-- Contador de estudiantes -->
                `;

                listadoCursos.appendChild(divCurso);

                // Agregar la opción del curso al select del formulario de estudiantes
                const optionCurso = document.createElement('option');
                optionCurso.value = nombreCurso;
                optionCurso.textContent = nombreCurso;
                selectEstudianteCurso.appendChild(optionCurso);

                // Limpiar los campos del formulario
                formCurso.reset();
            } else {
                alert('Por favor, completa todos los campos del formulario.');
            }
        });

        // Evento para agregar estudiantes
        formEstudiante.addEventListener('submit', function (event) {
            event.preventDefault(); // Evita que el formulario se envíe y recargue la página

            const nombreEstudiante = document.getElementById('estudianteNombre').value;
            const edadEstudiante = document.getElementById('estudianteEdad').value;
            const notaEstudiante = document.getElementById('estudianteNota').value;
            const cursoSeleccionado = document.getElementById('estudianteCurso').value;

            if (nombreEstudiante && edadEstudiante && notaEstudiante && cursoSeleccionado) {
                // Encontrar el curso en la lista de cursos
                const curso = cursos.find(c => c.nombre === cursoSeleccionado);

                if (curso) {
                    // Crear un nuevo estudiante y agregarlo al curso
                    const nuevoEstudiante = new Estudiante(nombreEstudiante, edadEstudiante, parseFloat(notaEstudiante), curso.nombre);
                    curso.agregarEstudiante(nuevoEstudiante);

                    // Actualizar el contador de estudiantes en la interfaz
                    const contadorEstudiantes = document.getElementById(`estudiantes-${cursoSeleccionado.replace(/\s+/g, '-').toLowerCase()}`);
                    contadorEstudiantes.textContent = `Estudiantes: ${curso.estudiantes.length}`;

                    // Limpiar el formulario de estudiantes
                    formEstudiante.reset();
                } else {
                    alert('El curso seleccionado no se encuentra.');
                }
            } else {
                alert('Por favor, completa todos los campos del formulario.');
            }
        });

        // Evento para lanzar el modal cuando se haga clic en un curso
        listadoCursos.addEventListener('click', function (event) {
            if (event.target && event.target.classList.contains('curso-nombre')) {
                const cursoNombre = event.target.getAttribute('data-curso');

                // Buscar el curso correspondiente
                const curso = cursos.find(c => c.nombre === cursoNombre);

                if (curso) {
                    // Limpiar la lista de estudiantes del modal
                    listaEstudiantes.innerHTML = '';

                    // Agregar cada estudiante del curso a la lista
                    curso.estudiantes.forEach(estudiante => {
                        const li = document.createElement('li');
                        li.textContent = `${estudiante.nombre} (Edad: ${estudiante.edad}, Nota: ${estudiante.nota})`;
                        listaEstudiantes.appendChild(li);
                    });

                    // Abrir el modal
                    const modal = new bootstrap.Modal(document.getElementById('modalEstudiantes'));
                    modal.show();
                }
            }
        });
    } else {
        console.error("El formulario o el contenedor de cursos no se encuentran en el DOM.");
    }
});




document.addEventListener('DOMContentLoaded', ()=> 
{
    const formEstudiante = document.getElementById('formEstudiante');
    formEstudiante.addEventListener('submit',function(event){
        event.preventDefault();
        
        const nombre = document.getElementById('estudianteNombre');
        const edad = document.getElementById('estudianteEdad');
        const nota = document.getElementById('estudianteNota');
        const curso = document.getElementById('estudianteCurso');
    })
}
)

