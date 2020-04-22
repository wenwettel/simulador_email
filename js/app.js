// variables 

const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');
const btnEnviar = document.getElementById('enviar');
const formularioEnviar = document.getElementById('enviar-mail');
const resetBtn = document.getElementById('resetBtn');



// EVENTLISTENERS

eventListeners();

function eventListeners() {
    // Inicio de la aplicacion y deshabilitar submit
    document.addEventListener('DOMContentLoaded', incioApp );

    // Campos del formulario

    email.addEventListener('blur', validarCampo );
    asunto.addEventListener('blur', validarCampo );
    mensaje.addEventListener('blur', validarCampo );

    //boton de enviar en el submit
    formularioEnviar.addEventListener('submit', enviarEmail);
    
    //boton de reset en el formulario
    resetBtn.addEventListener('click', resetFormulario );
}




//FUNCIONES

function incioApp() {
    //deshabilitar el envio

    btnEnviar.disabled = true;
}

//validar que el campo tenga algo escrito

function validarCampo(e, campo) {

    // Se valida la longitud del texto y que no este vacio

    if(campo){
        validarLongitud(campo);

        //validar unicamente el email
        if(campo.type === 'email') {
            validarEmail(campo);
        }
    }
    else {
        validarLongitud(this);

        //validar unicamente el email
        if(this.type === 'email') {
            validarEmail(this);
        }
    }

    let errores = document.querySelectorAll('.error');
    if(email.value !== '' && asunto.value !== '' && mensaje.value !== '') {
         if(errores.length === 0) {
             btnEnviar.disabled = false;
          }
        
    }

}

// resetear Formulario

function resetFormulario(e) {
    e.preventDefault();
    formularioEnviar.reset();
    validarCampo('' ,email);
    validarCampo('', mensaje);
    validarCampo('', asunto);
    
}

//cuando se envia el correo

function enviarEmail(e) {
    
    e.preventDefault();

    // Spinner al presionar enviar
    const spinnerGif = document.querySelector('#spinner');
    spinnerGif.style.display = 'block';

    // Gif que envia mail

    const enviado = document.createElement('img');
    enviado.src = 'img/mail.gif';
    enviado.style.display = 'block';

    //ocultar Spinner y mostrar Gif de mail.

    setTimeout(function () {
        spinnerGif.style.display ='none'

        document.querySelector('#loaders').appendChild(enviado);

        setTimeout(function() {
            enviado.remove();
            formularioEnviar.reset();
        }, 5000);


    }, 3000);

}

//verifica la longitud del texto en los campos
function validarLongitud(campo) {

   
    if(campo.value.length > 0) {
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    } else{
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}

function validarEmail(campo) {
    const mensaje = campo.value;
    if(mensaje.indexOf('@') !== -1){
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    } else{
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
    
}

