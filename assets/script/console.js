const nomeFoto = document.getElementById("nomeFoto");
const botaoColarFoto = document.getElementById("botaoColarFoto");
const jogo = document.getElementById("jogo");
const botaoConverterParaPNG = document.getElementById("converterParaPNG");

botaoConverterParaPNG.addEventListener("click", salvarComoPNG);

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
            "apps": "assets/img/folder/apps.png",
            "arcade": "assets/img/folder/arcade.png",
            "atari2600": "assets/img/folder/atari2600.png",
            "atari5200": "assets/img/folder/atari5200.png",
            "atari7800": "assets/img/folder/atari7800.png",
            "atarilynx": "assets/img/folder/atarilynx.png",
            "bandaiws": "assets/img/folder/wonderswancolor.png",
            "cps1": "assets/img/folder/cps1.png",
            "cps2": "assets/img/folder/cps2.png",
            "cps3": "assets/img/folder/cps3.png",
            "external": "assets/img/folder/ports.png",
            "gameandwatch": "assets/img/folder/gameandwatch.png",
            "pokemonmini": "assets/img/folder/pokemini.png",
            "gb": "assets/img/folder/gb.png",
            "gba": "assets/img/folder/gba.png",
            "gbc": "assets/img/folder/gbc.png",
            "snes": "assets/img/folder/snes.png",
            "snes2": "assets/img/folder/snes2.png",
            "famicom": "assets/img/folder/famicom.png",
            "hbmame": "assets/img/folder/hbmame.png",
            "mame": "assets/img/folder/mame.png",
            "gamegear": "assets/img/folder/gamegear.png",
            "dreamcast": "assets/img/folder/dreamcast.png",
            "naomi": "assets/img/folder/naomi.png",
            "megacd": "assets/img/folder/segacd.png",
            "megadrive": "assets/img/folder/megadrive.png",
            "sega32x": "assets/img/folder/sega32x.png",
            "sms": "assets/img/folder/mastersystem.png",
            "n64": "assets/img/folder/n64.png",
            "nds": "assets/img/folder/nds.png",
            "neogeo2": "assets/img/folder/neogeo2.png",
            "neogeo": "assets/img/folder/neogeo.png",
            "neogeocd": "assets/img/folder/neogeocd.png",
            "neogeopocket": "assets/img/folder/ngpc.png",
            "nes": "assets/img/folder/nes.png",
            "pce": "assets/img/folder/pcengine.png",
            "pcfx": "assets/img/folder/pcfx.png",
            "pico8": "assets/img/folder/pico8.png",
            "psp": "assets/img/folder/psp.png",
            "psx": "assets/img/folder/psx.png",
            "rpgmaker": "assets/img/folder/easyrpg.png",
            "scummvm": "assets/img/folder/scummvm.png",
            "supergrafx": "assets/img/folder/supergrafx.png",
            "vb": "assets/img/folder/virtualboy.png",
        };
        
        if (gameImages[selectedConsole]) {
            image.src = gameImages[selectedConsole];
        } else {
            image.src = "assets/img/folder/DEFAULT.png";
        }
    };

    function changeBackground() {
        var selectedConsole = document.getElementById("consoleGames").value;
        var backgroundImage = document.getElementById("backgroundJogo");
        
        var backgroundImages = {
            "apps": "url(assets/img/folder2/apps.webp)",
            "arcade": "url(assets/img/folder2/arcade.webp)",
            "atari2600": "url(assets/img/folder2/atari2600.webp)",
            "atari5200": "url(assets/img/folder2/atari5200.webp)",
            "atari7800": "url(assets/img/folder2/atari7800.webp)",
            "atarilynx": "url(assets/img/folder2/atarilynx.webp)",
            "bandaiws": "url(assets/img/folder2/wonderswancolor.webp)",
            "cps1": "url(assets/img/folder2/cps1.webp)",
            "cps2": "url(assets/img/folder2/cps2.webp)",
            "cps3": "url(assets/img/folder2/cps3.webp)",
            "external": "url(assets/img/folder2/ports.webp)",
            "gameandwatch": "url(assets/img/folder2/gameandwatch.webp)",
            "pokemonmini": "url(assets/img/folder2/pokemini.webp)",
            "gb": "url(assets/img/folder2/gb.webp)",
            "gba": "url(assets/img/folder2/gba.webp)",
            "gbc": "url(assets/img/folder2/gbc.webp)",
            "snes": "url(assets/img/folder2/snes.webp)",
            "snes2": "url(assets/img/folder2/snes2.webp)",
            "famicom": "url(assets/img/folder2/famicom.webp)",
            "hbmame": "url(assets/img/folder2/hbmame.webp)",
            "mame": "url(assets/img/folder2/mame.webp)",
            "gamegear": "url(assets/img/folder2/gamegear.webp)",
            "dreamcast": "url(assets/img/folder2/dreamcast.webp)",
            "naomi": "url(assets/img/folder2/naomi.webp)",
            "megacd": "url(assets/img/folder2/segacd.webp)",
            "megadrive": "url(assets/img/folder2/megadrive.webp)",
            "sega32x": "url(assets/img/folder2/sega32x.webp)",
            "sms": "url(assets/img/folder2/mastersystem.webp)",
            "n64": "url(assets/img/folder2/n64.webp)",
            "nds": "url(assets/img/folder2/nds.webp)",
            "neogeo2": "url(assets/img/folder2/neogeo2.webp)",
            "neogeo": "url(assets/img/folder2/neogeo.webp)",
            "neogeocd": "url(assets/img/folder2/neogeocd.webp)",
            "neogeopocket": "url(assets/img/folder2/ngpc.webp)",
            "nes": "url(assets/img/folder2/nes.webp)",
            "pce": "url(assets/img/folder2/pcengine.webp)",
            "pcfx": "url(assets/img/folder2/pcfx.webp)",
            "pico8": "url(assets/img/folder2/pico8.webp)",
            "psp": "url(assets/img/folder2/psp.webp)",
            "psx": "url(assets/img/folder2/psx.webp)",
            "rpgmaker": "url(assets/img/folder2/easyrpg.webp)",
            "scummvm": "url(assets/img/folder2/scummvm.webp)",
            "supergrafx": "url(assets/img/folder2/supergrafx.webp)",
            "vb": "url(assets/img/folder2/virtualboy.webp)",
        };

        backgroundImage.innerHTML = ""; // Limpar qualquer imagem personalizada

        
        if (backgroundImages[selectedConsole]) {
            backgroundImage.style.backgroundImage = backgroundImages[selectedConsole];
            backgroundImage.style.backgroundSize = "640px 480px";
        } else {
            backgroundImage.style.backgroundSize = "640px 480px";
            backgroundImage.style.backgroundImage = "none";
        }
    }


function salvarComoPNG() {
    let nomeArquivo = nomeFoto.value.trim();
    const consoleSelecionado = document.getElementById("consoleGames").value;

    if (nomeArquivo === "") {
        nomeArquivo = consoleSelecionado;
    }

    html2canvas(jogo, {
        width: 640,
        height: 480,
        scale: 1,
        background: null
    }).then((canvas) => {
        const link = document.createElement("a");
        link.download = nomeArquivo + ".png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}


nomeFoto.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        salvarComoPNG();
    }
});

