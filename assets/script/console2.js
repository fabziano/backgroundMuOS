const nomeFoto = document.getElementById("nomeFoto");
const botaoColarFoto = document.getElementById("botaoColarFoto");
const jogo = document.getElementById("jogo");
const botaoConverterParaPNG = document.getElementById("converterParaPNG");

botaoConverterParaPNG.addEventListener("click", salvarComoPNG);

const removerBackgroundBtn = document.getElementById("removerBackgroundBtn");
removerBackgroundBtn.addEventListener("click", removerBackground);

function removerBackground() {
    const backgroundImage = document.getElementById("backgroundJogo");
    const gradientOverlay = document.getElementById("gradientOverlay");

    backgroundImage.style.backgroundImage = "none";
    backgroundImage.innerHTML = "";
    gradientOverlay.style.display = "none";
}

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

botaoColarFoto.addEventListener("click", () => {
    handlePasteImage(backgroundJogo, "640px", "480px", "640px", "480px");
});

function changeImage() {
    var selectedConsole = document.getElementById("consoleGames").value;
    var image = document.getElementById("capaJogo");

    var gameImages = {
        "arcade": "assets/img/consoles/arcade/console.png",
        "atari2600": "assets/img/consoles/atari2600/console.png",
        "atarist": "assets/img/consoles/atarist/console.png",
        "cps": "assets/img/consoles/cps1/console.png",
        "famicom": "assets/img/consoles/famicom/console.png",
        "gameandwatch": "assets/img/consoles/gameandwatch/console.png",
        "gamegear": "assets/img/consoles/gamegear/console.png",
        "gb": "assets/img/consoles/gb/console.png",
        "gba": "assets/img/consoles/gba/console.png",
        "gbc": "assets/img/consoles/gbc/console.png",
        "mame": "assets/img/consoles/mame/console.png",
        "dreamcast": "assets/img/consoles/dreamcast/console.png",
        "mastersystem": "assets/img/consoles/mastersystem/console.png",
        "megacd": "assets/img/consoles/megacd/console.png",
        "megadrive": "assets/img/consoles/megadrive/console.png",
        "n64": "assets/img/consoles/n64/console.png",
        "nds": "assets/img/consoles/nds/console.png",
        "neogeo": "assets/img/consoles/neogeo/console.png",
        "nes": "assets/img/consoles/nes/console.png",
        "ngpc": "assets/img/consoles/ngpc/console.png",
        "pcengine": "assets/img/consoles/pcengine/console.png",
        "ports": "assets/img/consoles/ports/console.png",
        "psp": "assets/img/consoles/psp/console.png",
        "psx": "assets/img/consoles/psx/console.png",
        "sega32x": "assets/img/consoles/sega32x/console.png",
        "segacd": "assets/img/consoles/segacd/console.png",
        "sfc": "assets/img/consoles/sfc/console.png",
        "snes": "assets/img/consoles/snes/console.png",
        "supergrafx": "assets/img/consoles/supergrafx/console.png",
        "virtualboy": "assets/img/consoles/virtualboy/console.png",
        "wonderswancolor": "assets/img/consoles/wonderswancolor/console.png",
    };

    if (selectedConsole in gameImages) {
        image.src = gameImages[selectedConsole];
    } else {
        image.src = "assets/img/logo/DEFAULT.png";
    }
}

function salvarComoPNG() {
    const nomeArquivo = nomeFoto.value.trim() || document.getElementById("consoleGames").value;

    html2canvas(jogo, {
        width: 640,
        height: 480,
        scale: 1,
        backgroundColor: null 
    }).then((canvas) => {
        canvas.toBlob(function(blob) {
            if (blob) {
                const url = URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = url;
                link.download = nomeArquivo + '.png';

                link.click();

                URL.revokeObjectURL(url);
            } else {
                console.error('Erro ao gerar o blob da imagem.');
            }
        }, 'image/png');
    });
}
