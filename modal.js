const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-login')
const botonCerrar = document.getElementById('loginCerrar')
const modalLogin = document.getElementsByClassName('modal-login')[0]

botonAbrir.addEventListener('click', () => {
    contenedorModal.classList.toggle('modal-active')
})

botonCerrar.addEventListener('click', () => {
    contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', () => {
    botonCerrar.click()
})

modalLogin.addEventListener('click', (event) => {
    event.stopPropagation()
})