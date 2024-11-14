
function MudaImgSeta() {
    var seta = document.getElementById("setaRelatorio");
    var menuRelatorios = document.getElementById("menuRelatorios");
    
    // Verifica o estado da seta e altera a imagem e mostra o submenu
    if (seta.src.includes("icon-setaCima.png")) {
        menuRelatorios.classList.add("show"); 
        seta.src = "/img/icon-setaBaixo.png"; 
    } else {
        menuRelatorios.classList.remove("show");
        seta.src = "/img/icon-setaCima.png";
    }
    
}