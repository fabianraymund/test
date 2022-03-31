
const menu = document.getElementById("menu")
const menuIcon = document.getElementById("menuIcon")
const menuCloseIcon = document.getElementById("menuCloseIcon")
const menuContent = document.getElementById("menu-content")


// call the menu class
menuDisplay(menu,menuIcon,menuContent,menuCloseIcon);

function menuDisplay(menu,menuIcon,Content, menuCloseIcon){
    menu.addEventListener('click',()=>{
    
        Content.classList.toggle("hidden");
        if(!Content.classList.contains('hidden')){
            menuIcon.classList.add('hidden')
            menuCloseIcon.classList.remove('hidden')
        }else{
            menuIcon.classList.remove('hidden')
            menuCloseIcon.classList.add('hidden')
        }
    })
}

