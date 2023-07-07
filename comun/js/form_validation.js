const d = document;
const $form = d.querySelector(".main-container__form");
const $envioExitoso = d.querySelectorAll(".main-container__p")[1];
const $loader = d.querySelector(".main-container__svg");
const $inputs = d.querySelectorAll(".main-container__input[required]"); //Lista de elementos que tengan la clase y que tengan el atributo "required"

export default function formValidation() {
    $inputs.forEach(input => { //por cada elemento de la lista de elementos crea un span con sus atributos y el texto que va a contener
        const $span = d.createElement("span");
        $span.classList.add("main-container__span", "none");
        $span.setAttribute("id", input.getAttribute("name"));
        $span.textContent = input.getAttribute("title");
        input.insertAdjacentElement("afterend", $span);//Se inserta como elemento hermano el span por cada elemento de la lista de elementos
    });

    d.addEventListener("keyup", e => {//"keyup" evento cada que deje de presionar una tecla
        if(e.target.matches(".main-container__input[required]")) { //si el elemento que origina el evento es igual a 
            const exreg = new RegExp(e.target.getAttribute("pattern"));//expresion regular del elemento que origina el evento
            if((exreg.exec(e.target.value) === null) && e.target.value !== "") {//El método "exec" valida si la expresion regular se cumple, si no se cumple retorna un null
                d.getElementById(e.target.getAttribute("name")).classList.add("is-active");//Se le asigna al span la clase "is-active"
            }else {
                d.getElementById(e.target.getAttribute("name")).classList.remove("is-active");//si la expresion regular se cumple remueve la clase "is-active".
            }
        }
    });

    d.addEventListener("submit", e => {//Evento submit para el envío de los datos del formulario
        $loader.classList.remove("none");//Cuando el evento se active al loader del HTML se le retirará la clase "none"
        setTimeout(() => { //Mendiante un setTimeOut se simulará la carga y el envío de los datos del formulario
            $loader.classList.add("none");//Una vez pasado el tiempo del setTimeOut se agregará la clase none al loader del HTML
            $envioExitoso.classList.remove("none");//Se removerá la clase "none" al mensaje que notifica al usuario que el envío ha sido exitoso
            $form.reset();//Se resetearán los datos del formulario
            setTimeout(() => {//Cuando hayan pasado el tiempo indicado en este setTimeOut volverá a agregarse la clase "none" al mensaje de "envío exitoso"
                $envioExitoso.classList.add("none");
            }, 3000);
        }, 3000);
    });

}
 