const contenedorConversores = document.getElementById("contenedor_conversores")
const btnAgregarBase = document.getElementById("btn_agregar_base")

let inputs = [
    "input_10",
    "input_2",
    "input_8",
    "input_16"
]

class Conversor {
    constructor (id, name, texto){
        this.id = id
        this.name = name
        this.texto = texto
    }
}


function renderizarConversor(conversor) {
    const contenedorNuevo = `
        <div id="${conversor.id}_container">
            <label for=${conversor.id}>${conversor.texto}</label>
            <button class="btn_eliminar fa-solid fa-trash-can" data-input-id=${conversor.id} id="btn_eliminar_${conversor.id}" ></button>
            <input type="text" id=${conversor.id} name=${conversor.name} min="0" placeholder= "0" />
        </div>
        `
    contenedorConversores.innerHTML += contenedorNuevo 
    inputs.push(conversor.id)       
}

function convertir(base, valorIntroducido) {
    const valorEnDecimal = parseInt(valorIntroducido, parseInt(base))

    inputs.forEach(conversor => {
        const input = document.getElementById(conversor)
        if (!isNaN(valorEnDecimal)) {
            input.value = valorEnDecimal.toString(parseInt(input.name)).toUpperCase()
        } else {
            input.value = ""
        }
    });

}

btnAgregarBase.addEventListener("click", () => {
    swal({
        icon: "info",
        title: "Nuevo conversor",
        text: "Ingrese una base entre 2 y 36", 
        buttons: true,
        content: {
            element: "input",
            attributes:{
            type: "number",
            min: "2",
            max: "36"
            }
        }
    })
    .then((baseIngresada) => {
        let input
        for(input of inputs){
            input = document.getElementById(input)
            if (input.name == baseIngresada) {
                swal({
                    icon: "error",
                    title: "Ese conversor ya existe",
                    text: "Elija una base que no exista previamente",
                    dangerMode: true
                })
                return
            }
        }
        
        if (baseIngresada >= 2 && baseIngresada <= 36) {
            let nuevoConversor = new Conversor("input_" + baseIngresada, baseIngresada, "Base " + baseIngresada);
            if (baseIngresada == 10) {
                nuevoConversor.texto = "Decimal"
            } else if (baseIngresada == 16) {
                nuevoConversor.texto = "Hexadecimal"
            } else if (baseIngresada == 8){
                nuevoConversor.texto = "Octal"
            } else if (baseIngresada == 2){
                nuevoConversor.texto = "Binario"
            }
            
            renderizarConversor(nuevoConversor)        
        } else  if (baseIngresada !== null) {
            swal({
                title: "Error",
                text: "Ingrese una base valida",
                icon: "error",
                dangerMode: true,
            })
        }
    })
})

contenedorConversores.addEventListener("input", (event) => {
    const target = event.target
    convertir(target.name, target.value)
})

contenedorConversores.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("btn_eliminar")) {
        const inputId = target.getAttribute("data-input-id");
        eliminarInput(inputId);
    }
})


function eliminarInput(inputId) {
    const inputContainer = document.getElementById(`${inputId}_container`);
    inputContainer.remove();
    
    inputs = inputs.filter((input) => input !== inputId);
}

let drag = document.querySelector("#contenedor_conversores")

new Sortable(drag , {
    animation: 500
})