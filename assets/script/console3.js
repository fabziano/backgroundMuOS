const botaoColarFoto = document.getElementById("botaoColarFoto");

const removerBackgroundBtn = document.getElementById("removerBackgroundBtn");
removerBackgroundBtn.addEventListener("click", removerBackground);

// Função para remover o background
function removerBackground() {
    const backgroundImage = document.getElementById("backgroundJogo");
    const gradientOverlay = document.getElementById("gradientOverlay");

    backgroundImage.style.backgroundImage = "none";
    backgroundImage.innerHTML = ""; // Limpar qualquer imagem que tenha sido colada pelo usuário
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
                        targetElement.innerHTML = "";
                        targetElement.appendChild(img);
                        const gradientOverlay = document.getElementById("gradientOverlay");
                        gradientOverlay.style.display = "block";
                        nomeFoto.focus();
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
    handlePasteImage(backgroundJogo, "640px", "480px", "640px", "480px");
});

function changeImage() {
    var selectedConsole = document.getElementById("consoleGames").value;
    var image = document.getElementById("capaJogo");

    var gameImages = {
        "apps": "assets/img/logo2/apps.png",
        "arcade": "assets/img/logo2/arcade.png",
        "atari2600": "assets/img/logo2/atari2600.png",
        "atarist": "assets/img/logo2/atarist.png",
        "bandaiws": "assets/img/logo2/wonderswancolor.png",
        "cps1": "assets/img/logo2/cps1.png",
        "cps2": "assets/img/logo2/cps2.png",
        "cps3": "assets/img/logo2/cps3.png",
        "external": "assets/img/logo2/ports.png",
        "easyrpg": "assets/img/logo2/easyrpg.png",
        "gameandwatch": "assets/img/logo2/gameandwatch.png",
        "pokemonmini": "assets/img/logo2/pokemini.png",
        "gb": "assets/img/logo2/gb.png",
        "gba": "assets/img/logo2/gba.png",
        "gbc": "assets/img/logo2/gbc.png",
        "snes": "assets/img/logo2/snes.png",
        "snes2": "assets/img/logo2/snes2.png",
        "famicom": "assets/img/logo2/famicom.png",
        "hbmame": "assets/img/logo2/hbmame.png",
        "mame": "assets/img/logo2/mame.png",
        "gamegear": "assets/img/logo2/gamegear.png",
        "dreamcast": "assets/img/logo2/dreamcast.png",
        "naomi": "assets/img/logo2/naomi.png",
        "megacd": "assets/img/logo2/segacd.png",
        "megadrive": "assets/img/logo2/megadrive.png",
        "sega32x": "assets/img/logo2/sega32x.png",
        "sms": "assets/img/logo2/mastersystem.png",
        "n64": "assets/img/logo2/n64.png",
        "nds": "assets/img/logo2/nds.png",
        "neogeo2": "assets/img/logo2/neogeo2.png",
        "neogeo": "assets/img/logo2/neogeo.png",
        "neogeocd": "assets/img/logo2/neogeocd.png",
        "neogeopocket": "assets/img/logo2/ngpc.png",
        "nes": "assets/img/logo2/nes.png",
        "pce": "assets/img/logo2/pcengine.png",
        "pcfx": "assets/img/logo2/pcfx.png",
        "pico8": "assets/img/logo2/pico8.png",
        "psp": "assets/img/logo2/psp.png",
        "psx": "assets/img/logo2/psx.png",
        "supergrafx": "assets/img/logo2/supergrafx.png",
    };

    if (gameImages[selectedConsole]) {
        image.src = gameImages[selectedConsole];
    } else {
        image.src = "assets/img/logo/DEFAULT.png";
    }
};

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
