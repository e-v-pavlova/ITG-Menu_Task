const menu = document.getElementById('menu-wrap');
const topItems = menu.querySelectorAll(".menu-item");
drawPointers(menu.querySelectorAll("li"));

menu.onclick = function(event){
    var target = event.target;
    while (target != menu){
        if (target.tagName == "LI"){
            const list = target.querySelector('ul');
            if (list){
                if (!list.classList.contains('hidden')){
                    hide(list);
                    const lowItems = list.querySelectorAll('ul');
                    for (let i = 0; i < lowItems.length; i++){
                        hide(lowItems[i]);
                    }
                    if (target.classList.contains("menu-item")){
                        for (let i = 0; i < topItems.length; i++){
                            show(topItems[i]);
                        }
                    }
                    const pointers = target.querySelectorAll(".close-pointer");
                    for (let i = 0; i < pointers.length; i++){
                        pointers[i].className="open-pointer";
                    }
                }else{
                    show(list);
                    for (let i = 0; i < topItems.length; i++){
                        if (!topItems[i].contains(list))
                            hide(topItems[i]);
                        else{
                            target.querySelector(".open-pointer").className = "close-pointer";
                            topItems[i].querySelector("li").style.borderTop = "1px solid #f1f8fe";
                        }
                            
                    }
                }
            }
            return;
        }
        target = target.parentNode;
    }
};

const menuIcon = document.getElementById('menu-icon');
menuIcon.onclick = function(){
    hide(menuIcon);
    menuAnimation("toLeft");
}
const menuHider = document.getElementById('menu-hider');
menuHider.onclick = function(){
    show(menuIcon);
    menuAnimation("toRight");
}

/*
TO DO: lang-menu

const langMenu = document.getElementById('lang-menu');
const langMenuFirst = langMenu.querySelector('li:first-of-type');
langMenuFirst.onclick = function(){
    const elems = langMenu.querySelectorAll('li');
    for (let i = 0; i < elems.length; i++){
        show(elems[i]);
    }
}*/

function drawPointers(items){
    for (let i = 0; i < items.length; i++){
        let list = items[i].querySelector('ul');
        if (list){
            let pointer = document.createElement('div');
            pointer.className = "open-pointer";
            items[i].insertBefore(pointer, list);
        }
    }
}
function menuAnimation(param){
    switch (param) {
        case "toLeft":
            menu.style.transform= 'translateX(-' + menu.offsetWidth + 'px)';
            break;
        case "toRight":
            menu.style.transform= 'translateX(' + menu.offsetWidth + 'px)';
    }
    menu.style.transitionDuration = '1s';
}
function hide(elem){
    elem.classList.add('hidden');
}
function show(elem){
    elem.classList.remove('hidden');
}
