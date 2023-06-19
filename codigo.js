let conversores = []
let contenedorConversores = document.getElementById("contenedor_conversores")
let contenedorConversoresOpcionales = document.getElementById("contenedor_conversores_opcionales")

let btnAgregarBase = document.getElementById("btn_agregar_base")

let inputs = []
let botonesEliminar = []

class Conversor {
    constructor (id, name, texto){
        this.id = id
        this.name = name
        this.texto = texto
    }
}

let conversorDec = new Conversor("input_decimal","10","Decimal")
let conversorHex = new Conversor("input_hexadecimal","16","Hexadecimal")
let conversorBin = new Conversor("input_binario","2","Binario")
let conversorOct = new Conversor("input_octal","8","Octal")

conversores.push(conversorDec,conversorBin,conversorHex,conversorOct)


function iniciar() {
    conversores.forEach(conversor => {
        agregandoConversores = `
            <div id="${conversor.id}_container">
                <p>
                    <label for=${conversor.id}>${conversor.texto}</label>
                    <button class="btn_eliminar fa-solid fa-trash-can" data-input-id=${conversor.id} id="btn_eliminar_${conversor.id}" ></button>
                    <input type="text" id=${conversor.id} name=${conversor.name} min="0" value= "0" />
                </p>
            </div>
            `
        contenedorConversores.innerHTML += agregandoConversores 

        let inputNue = document.getElementById(conversor.id)
        inputs.push(inputNue)        
    })

    contenedorConversores.addEventListener("input", (event) => {
        revisar()
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

    contenedorConversores.addEventListener("mouseover", (event) => {
        const target = event.target;
        if (target.classList.contains("btn_eliminar")) {
            target.className = "btn_eliminar fa-solid fa-trash-can fa-beat"
        }
    })

    contenedorConversores.addEventListener("mouseout", (event) => {
        const target = event.target;
        if (target.classList.contains("fa-beat")) {
            target.className = "btn_eliminar fa-solid fa-trash-can"
        }
    })
}

//Evita que se rompa el codigo cuando se vacia un input
function revisar() {
    inputs.forEach(conversor => {
        let input = document.getElementById(conversor.id)
        if (input.value == "") {
            input.value = 0
        }
    })
}

function convertir(base, input) {
    const num = document.getElementById(input).value
    const numDec = parseInt(num, parseInt(base))


    inputs.forEach(conversor => {
        let input = document.getElementById(conversor.id)
        input.value = numDec.toString(parseInt(conversor.name)).toUpperCase()
    });

}


btnAgregarBase.addEventListener("click", () => {
    let base = prompt("Ingrese una base entre 2 y 36")
    if (base >= 2 && base <= 36) {
        let nuevoConversor = new Conversor("input_" + base, base, "Base " + base);
        let agregandoConversores = `
            <div id="${nuevoConversor.id}_container">
                <p>
                    <label for= ${nuevoConversor.id} > ${nuevoConversor.texto} </label>
                    <button class="btn_eliminar fa-solid fa-trash-can" data-input-id=${nuevoConversor.id}></button>
                    <input type="text" id= ${nuevoConversor.id}  name=${nuevoConversor.name} min="0" value= "0" />
                </p>
            </div>
                `
        contenedorConversoresOpcionales.innerHTML += agregandoConversores

        let inputNue = document.getElementById(nuevoConversor.id)
        
        inputs.push(inputNue)

        contenedorConversoresOpcionales.addEventListener("input", (event) => {
            revisar()
            const target = event.target
            convertir(target.name, target.id)
        })

        contenedorConversoresOpcionales.addEventListener("click", (event) => {
            const target = event.target;
            if (target.classList.contains("btn_eliminar")) {
                const inputId = target.getAttribute("data-input-id");
                eliminarInput(inputId);
            }
        })

        contenedorConversoresOpcionales.addEventListener("mouseover", (event) => {
            const target = event.target;
            if (target.classList.contains("btn_eliminar")) {
                target.className = "btn_eliminar fa-solid fa-trash-can fa-beat"
            }
        })
    
        contenedorConversoresOpcionales.addEventListener("mouseout", (event) => {
            const target = event.target;
            if (target.classList.contains("fa-beat")) {
                target.className = "btn_eliminar fa-solid fa-trash-can"
            }
        })

        conversores.push(nuevoConversor)


    } else {
        alert("Ingrese un numero valido")
    }
})

function eliminarInput(inputId) {
    const inputContainer = document.getElementById(`${inputId}_container`);
    inputContainer.remove();
    
    inputs = inputs.filter((input) => input.id !== inputId);
    conversores = conversores.filter((conversor) => conversor.id !== inputId);
}

window.addEventListener("load",iniciar)