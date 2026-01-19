const btnMenu = document.getElementById('btnPerfil')
const menu = document.getElementById('menu')

btnMenu.addEventListener('click', (event) =>{
    event.stopPropagation();

    menu.classList.toggle('menu-ativo');
});