//Crear un usuario

const arr = []
const usuarios = []

const form= document.getElementById("formulario")

form.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const nombre = form_name.value
    const apellido = form_secondname.value
    const email = form_email.value
    
    const usuario = {
        nombre: nombre,
        apellido: apellido,
        email: email
    }

    usuarios.push(usuario)
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
    alert ('Usuario Creado!')

    const contenedorsaludo = document.getElementById('saludo')
    contenedorsaludo.innerText= "Hola, " + nombre

    form.reset()

})

//Json Comentarios
const contenedorcomentarios = document.getElementById('coment')            

const comentarios = () => {

    const data = []

    fetch(`https://jsonplaceholder.typicode.com/comments`)
    .then ( (resp) => resp.json())
    .then ( ( data) => {
         
        const arr = data

        contenedorcomentarios.innerHTML = ''

        for(i=0; i<= 5;i++){
            const div = document.createElement('div')
            div.innerHTML =            
            `
             <h3>${arr[i].email}</h3>
             <p>${arr[i].body}</p><hr>
            `
            contenedorcomentarios.appendChild(div)
        }
       
    })

    
}

comentarios()