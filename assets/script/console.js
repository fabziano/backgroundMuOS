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
        "apps": "assets/img/logo/apps.png",
        "arcade": "assets/img/logo/arcade.png",
        "atari2600": "assets/img/logo/atari2600.png",
        "atari5200": "assets/img/logo/atari5200.png",
        "atari7800": "assets/img/logo/atari7800.png",
        "atarilynx": "assets/img/logo/atarilynx.png",
        "bandaiws": "assets/img/logo/wonderswancolor.png",
        "cps1": "assets/img/logo/cps1.png",
        "cps2": "assets/img/logo/cps2.png",
        "cps3": "assets/img/logo/cps3.png",
        "external": "assets/img/logo/ports.png",
        "gameandwatch": "assets/img/logo/gameandwatch.png",
        "pokemonmini": "assets/img/logo/pokemini.png",
        "gb": "assets/img/logo/gb.png",
        "gba": "assets/img/logo/gba.png",
        "gbc": "assets/img/logo/gbc.png",
        "snes": "assets/img/logo/snes.png",
        "snes2": "assets/img/logo/snes2.png",
        "famicom": "assets/img/logo/famicom.png",
        "hbmame": "assets/img/logo/hbmame.png",
        "mame": "assets/img/logo/mame.png",
        "gamegear": "assets/img/logo/gamegear.png",
        "dreamcast": "assets/img/logo/dreamcast.png",
        "naomi": "assets/img/logo/naomi.png",
        "megacd": "assets/img/logo/segacd.png",
        "megadrive": "assets/img/logo/megadrive.png",
        "sega32x": "assets/img/logo/sega32x.png",
        "sms": "assets/img/logo/mastersystem.png",
        "n64": "assets/img/logo/n64.png",
        "nds": "assets/img/logo/nds.png",
        "neogeo2": "assets/img/logo/neogeo2.png",
        "neogeo": "assets/img/logo/neogeo.png",
        "neogeocd": "assets/img/logo/neogeocd.png",
        "neogeopocket": "assets/img/logo/ngpc.png",
        "nes": "assets/img/logo/nes.png",
        "pce": "assets/img/logo/pcengine.png",
        "pcfx": "assets/img/logo/pcfx.png",
        "pico8": "assets/img/logo/pico8.png",
        "psp": "assets/img/logo/psp.png",
        "psx": "assets/img/logo/psx.png",
        "supergrafx": "assets/img/logo/supergrafx.png",
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
            "apps": "url(assets/img/background/apps.webp)",
            "arcade": "url(assets/img/background/arcade.webp)",
            "atari2600": "url(assets/img/background/atari2600.webp)",
            "atari5200": "url(assets/img/background/atari5200.webp)",
            "atari7800": "url(assets/img/background/atari7800.webp)",
            "atarilynx": "url(assets/img/background/atarilynx.webp)",
            "bandaiws": "url(assets/img/background/wonderswancolor.webp)",
            "cps1": "url(assets/img/background/cps1.webp)",
            "cps2": "url(assets/img/background/cps2.webp)",
            "cps3": "url(assets/img/background/cps3.webp)",
            "external": "url(assets/img/background/ports.webp)",
            "gameandwatch": "url(assets/img/background/gameandwatch.webp)",
            "pokemonmini": "url(assets/img/background/pokemini.webp)",
            "gb": "url(assets/img/background/gb.webp)",
            "gba": "url(assets/img/background/gba.webp)",
            "gbc": "url(assets/img/background/gbc.webp)",
            "snes": "url(assets/img/background/snes.webp)",
            "snes2": "url(assets/img/background/snes2.webp)",
            "famicom": "url(assets/img/background/famicom.webp)",
            "hbmame": "url(assets/img/background/hbmame.webp)",
            "mame": "url(assets/img/background/mame.webp)",
            "gamegear": "url(assets/img/background/gamegear.webp)",
            "dreamcast": "url(assets/img/background/dreamcast.webp)",
            "naomi": "url(assets/img/background/naomi.webp)",
            "megacd": "url(assets/img/background/segacd.webp)",
            "megadrive": "url(assets/img/background/megadrive.webp)",
            "sega32x": "url(assets/img/background/sega32x.webp)",
            "sms": "url(assets/img/background/mastersystem.webp)",
            "n64": "url(assets/img/background/n64.webp)",
            "nds": "url(assets/img/background/nds.webp)",
            "neogeo2": "url(assets/img/background/neogeo2.webp)",
            "neogeo": "url(assets/img/background/neogeo.webp)",
            "neogeocd": "url(assets/img/background/neogeocd.webp)",
            "neogeopocket": "url(assets/img/background/ngpc.webp)",
            "nes": "url(assets/img/background/nes.webp)",
            "pce": "url(assets/img/background/pcengine.webp)",
            "pcfx": "url(assets/img/background/pcfx.webp)",
            "pico8": "url(assets/img/background/pico8.webp)",
            "psp": "url(assets/img/background/psp.webp)",
            "psx": "url(assets/img/background/psx.webp)",
            "supergrafx": "url(assets/img/background/supergrafx.webp)",
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

