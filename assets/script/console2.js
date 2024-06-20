const botaoColarFoto = document.getElementById("botaoColarFoto");

// Função para remover o background
const removerBackgroundBtn = document.getElementById("removerBackgroundBtn");

removerBackgroundBtn.addEventListener("click", (event) => {
    event.preventDefault();
    removerBackground();
});

function removerBackground() {
    const backgroundImage = document.getElementById("backgroundJogo");
    const gradientOverlay = document.getElementById("gradientOverlay");

    backgroundImage.style.backgroundImage = "none";
    backgroundImage.innerHTML = "";
    gradientOverlay.style.display = "none";
}

// Função para remover setas
const setaCima = document.querySelector('.cima');
const setaBaixo = document.querySelector('.baixo');
const tirarSetasLink = document.getElementById('tirarSetas');
function tirarSetas() {
    if (setaCima.style.display === 'none' && setaBaixo.style.display === 'none') {
        setaCima.style.display = 'block';
        setaBaixo.style.display = 'block';
    } else {
        setaCima.style.display = 'none';
        setaBaixo.style.display = 'none';
    }
}
tirarSetasLink.addEventListener('click', (event) => {
    event.preventDefault()
    tirarSetas();
});

function handlePasteImage(targetElement, minWidth, minHeight, maxWidth, maxHeight) {
    navigator.clipboard.read().then((clipboardItems) => {
        for (const item of clipboardItems) {
            if (item.types.includes("image/png") || item.types.includes("image/jpeg")) {
                item.getType("image/png").then((blob) => {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const dataURL = event.target.result;
                        const img = new Image();
                        img.src = dataURL;
                        img.style.minWidth = minWidth;
                        img.style.minHeight = minHeight;
                        img.style.maxWidth = maxWidth;
                        img.style.maxHeight = maxHeight;
                        img.draggable = false; 
                        img.id = "draggableImage"; 
                        img.style.position = "absolute"; 
                        targetElement.innerHTML = "";
                        targetElement.appendChild(img);
                        const gradientOverlay = document.getElementById("gradientOverlay");
                        gradientOverlay.style.display = "block";
                        nomeFoto.focus();
                        imagemArrastavel(img);
                    };
                    reader.readAsDataURL(blob);
                });
                break;
            }
        }
    }).catch((error) => {
        console.error("Failed to read clipboard contents: ", error);
    });
}

botaoColarFoto.addEventListener("click", (event) => {
    event.preventDefault(); 
    handlePasteImage(backgroundJogo, "auto", "480px", "auto", "480px");
});

function changeImage() {
    var selectedConsole = document.getElementById("consoleGames").value;
    var logoJogo = document.getElementById("logoJogo");

    var gameImages = {
        "arcade": "assets/img/logo3/arcade.webp",
        "amiga": "assets/img/logo3/amiga.webp",
        "c64": "assets/img/logo3/c64.webp",
        "atomiswave": "assets/img/logo3/atomiswave.webp",
        "atari2600": "assets/img/logo3/atari2600.webp",
        "atari5200": "assets/img/logo3/atari5200.webp",
        "atari7800": "assets/img/logo3/atari7800.webp",
        "atarilynx": "assets/img/logo3/atarilynx.webp",
        "atarist": "assets/img/logo3/atarist.webp",
        "bandaiws": "assets/img/logo3/wonderswancolor.webp",
        "bandai": "assets/img/logo3/wonderswan.webp",
        "cps": "assets/img/logo3/cps.webp",
        "cps1": "assets/img/logo3/cps1.webp",
        "cps2": "assets/img/logo3/cps2.webp",
        "cps3": "assets/img/logo3/cps3.webp",
        "external": "assets/img/logo3/ports.webp",
        "easyrpg": "assets/img/logo3/easyrpg.webp",
        "gameandwatch": "assets/img/logo3/gameandwatch.webp",
        "pokemonmini": "assets/img/logo3/pokemini.webp",
        "gb": "assets/img/logo3/gb.webp",
        "gba": "assets/img/logo3/gba.webp",
        "gbc": "assets/img/logo3/gbc.webp",
        "snes": "assets/img/logo3/snes.webp",
        "snes2": "assets/img/logo3/snes2.webp",
        "famicom": "assets/img/logo3/famicom.webp",
        "mame": "assets/img/logo3/mame.webp",
        "gamegear": "assets/img/logo3/gamegear.webp",
        "dreamcast": "assets/img/logo3/dreamcast.webp",
        "naomi": "assets/img/logo3/naomi.webp",
        "megacd": "assets/img/logo3/segacd.webp",
        "megadrive": "assets/img/logo3/megadrive.webp",
        "megadrive2": "assets/img/logo3/megadrive2.webp",
        "sega32x": "assets/img/logo3/sega32x.webp",
        "sega32x2": "assets/img/logo3/sega32x2.webp",
        "sms": "assets/img/logo3/mastersystem.webp",
        "n64": "assets/img/logo3/n64.webp",
        "nds": "assets/img/logo3/nds.webp",
        "neogeo": "assets/img/logo3/neogeo.webp",
        "neogeocd": "assets/img/logo3/neogeocd.webp",
        "neogeopocket": "assets/img/logo3/ngp.webp",
        "neogeopocketc": "assets/img/logo3/ngpc.webp",
        "nes": "assets/img/logo3/nes.webp",
        "virtualboy": "assets/img/logo3/virtualboy.webp",
        "pce": "assets/img/logo3/pcengine.webp",
        "pcecd": "assets/img/logo3/pcenginecd.webp",
        "pcfx": "assets/img/logo3/pcfx.webp",
        "pico8": "assets/img/logo3/pico8.webp",
        "psp": "assets/img/logo3/psp.webp",
        "psx": "assets/img/logo3/psx.webp",
        "supergrafx": "assets/img/logo3/supergrafx.webp",
    };

    if (gameImages[selectedConsole]) {
        logoJogo.src = gameImages[selectedConsole];
    } else {
        logoJogo.src = "assets/img/logo/DEFAULT.png";
    }
}


const jogo = document.getElementById("jogo");
const nomeFoto = document.getElementById("nomeFoto");
const botaoConverterParaPNG = document.getElementById("converterParaPNG");

botaoConverterParaPNG.addEventListener("click", (event) => {
      event.preventDefault();
      salvarComoPNG(jogo, nomeFoto);
});

nomeFoto.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        salvarComoPNG(jogo, nomeFoto);
    }
});

function salvarComoPNG(element, input) {
    const nomeArquivo = input.value.trim() || "Imagem";
    const rect = element.getBoundingClientRect();

    domtoimage.toBlob(element, {
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top
    })
    .then(blob => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${nomeArquivo}.png`;
        link.click();
    })
    .catch(error => {
        console.error("Erro ao salvar como PNG: ", error);
    });
}

function imagemArrastavel(img) {
    let isDragging = false;
    let initialX, initialY;
    let offsetX, offsetY;
    img.addEventListener('mousedown', (event) => {
        isDragging = true;
        initialX = event.clientX;
        initialY = event.clientY;
        offsetX = img.offsetLeft;
        offsetY = img.offsetTop;
        img.style.zIndex = 1000; 
        
        document.addEventListener('mousemove', onMouseMove);
    });
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            img.style.zIndex = 2; 
            document.removeEventListener('mousemove', onMouseMove);
        }
    });
    function onMouseMove(event) {
        if (isDragging) {
            const currentX = event.clientX;
            const currentY = event.clientY;
            const dx = currentX - initialX;
            const dy = currentY - initialY;
            img.style.left = (offsetX + dx) + 'px';
            img.style.top = (offsetY + dy) + 'px'; 
        }
    }
}

let scale = 1;
zoomElements = document.querySelectorAll(".zoom");

function setTransform(el) {
    el.style.transform = "scale(" + scale + ")";
}

Array.prototype.map.call(zoomElements, item => {
    item.onwheel = function (e) {
        e.preventDefault();
        let delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
        (delta > 0) ? (scale *= 1.05) : (scale /= 1.05);
        setTransform(item.firstChild);
    }
});
