let conversores = []
const contenedorConversores = document.getElementById("contenedor_conversores")

const btnAgregarBase = document.getElementById("btn_agregar_base")

let inputs = []
let botonesEliminar = []

class Conversor {
    constructor (id, name, texto){
        this.id = id
        this.name = name
        this.texto = texto
    }
}

const conversorDec = new Conversor("input_10","10","Decimal")
const conversorBin = new Conversor("input_2","2","Binario")
const conversorOct = new Conversor("input_8","8","Octal")
const conversorHex = new Conversor("input_16","16","Hexadecimal")

conversores.push(conversorDec,conversorBin,conversorOct,conversorHex)


function mostrarConversor(conversor) {
    agregandoConversores = `
        <div id="${conversor.id}_container">
            <label for=${conversor.id}>${conversor.texto}</label>
            <button class="btn_eliminar fa-solid fa-trash-can" data-input-id=${conversor.id} id="btn_eliminar_${conversor.id}" ></button>
            <input type="text" id=${conversor.id} name=${conversor.name} min="0" placeholder= "0" />
        </div>
        `
    contenedorConversores.innerHTML += agregandoConversores 

    let inputNue = document.getElementById(conversor.id)
    inputs.push(inputNue)        
    agregarListeners()
}

function convertir(base, input) {
    const num = document.getElementById(input).value
    const numDec = parseInt(num, parseInt(base))

    inputs.forEach(conversor => {
        let input = document.getElementById(conversor.id)
        if (!isNaN(numDec)) {
            input.value = numDec.toString(parseInt(conversor.name)).toUpperCase()
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
    .then((base) => {
        for(input of inputs){
            if (input.name == base) {
                swal({
                    icon: "error",
                    title: "Ese conversor ya existe",
                    text: "Elija una base que no exista previamente",
                    dangerMode: true
                })
                return
            }
        }
        if (base >= 2 && base <= 36) {
            let nuevoConversor = new Conversor("input_" + base, base, "Base " + base);
            if (base == 10) {
                nuevoConversor.texto = "Decimal"
            } else if (base == 16) {
                nuevoConversor.texto = "Hexadecimal"
            } else if (base == 8){
                nuevoConversor.texto = "Octal"
            } else if (base == 2){
                nuevoConversor.texto = "Binario"
            }
            
            mostrarConversor(nuevoConversor)        
        } else  if (base !== null) {
            swal({
                title: "Error",
                text: "Ingrese una base valida",
                icon: "error",
                dangerMode: true,
            })
        }
    })
})

function agregarListeners() {
    contenedorConversores.addEventListener("input", (event) => {
        const target = event.target
        convertir(target.name, target.id)
    })

    contenedorConversores.addEventListener("click", (event) => {
        const target = event.target;
        if (target.classList.contains("btn_eliminar")) {
            const inputId = target.getAttribute("data-input-id");
            eliminarInput(inputId);
        }
    })
}

function eliminarInput(inputId) {
    const inputContainer = document.getElementById(`${inputId}_container`);
    inputContainer.remove();
    
    inputs = inputs.filter((input) => input.id !== inputId);
    conversores = conversores.filter((conversor) => conversor.id !== inputId);
}

window.addEventListener("load", () => {
    conversores.forEach(conversor => {
        mostrarConversor(conversor)
    });
})