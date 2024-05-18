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

function salvarComoPNG() {
    const nomeArquivo = nomeFoto.value.trim();
    if (nomeArquivo !== "") {
        html2canvas(jogo, {
            width: 640,
            height: 480,
            scale: 1
        }).then((canvas) => {
            const link = document.createElement("a");
            link.download = nomeArquivo + ".png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        });
    } else {
        alert("Por favor, insira um nome para o arquivo.");
    }
}

      function changeImage() {
        var selectedConsole = document.getElementById("consoleGames").value;
        var image = document.getElementById("capaJogo");
        
        var gameImages = {
            "amiga": "assets/img/folder/amiga.png",
            "amstrad": "assets/img/folder/amstradcpc.png",
            "apps": "assets/img/folder/apps.png",
            "arcade": "assets/img/folder/arcade.png",
            "atari2600": "assets/img/folder/atari2600.png",
            "atari5200": "assets/img/folder/atari5200.png",
            "atari7800": "assets/img/folder/atari7800.png",
            "atarilynx": "assets/img/folder/atarilynx.png",
            "atarist": "assets/img/folder/atarist.png",
            "bandaiws": "assets/img/folder/wonderswancolor.png",
            "c64": "assets/img/folder/c64.png",
            "coleco": "assets/img/folder/colecovision.png",
            "cps1": "assets/img/folder/cps1.png",
            "cps2": "assets/img/folder/cps2.png",
            "cps3": "assets/img/folder/cps3.png",
            "dreamcast": "assets/img/folder/dreamcast.png",
            "external": "assets/img/folder/ports.png",
            "gameandwatch": "assets/img/folder/gameandwatch.png",
            "gamegear": "assets/img/folder/gamegear.png",
            "gb": "assets/img/folder/gb.png",
            "gba": "assets/img/folder/gba.png",
            "gbc": "assets/img/folder/gbc.png",
            "snes": "assets/img/folder/snes.png",
            "snes2": "assets/img/folder/snes2.png",
            "famicom": "assets/img/folder/famicom.png",
            "hbmame": "assets/img/folder/hbmame.png",
            "lowresnx": "assets/img/folder/lowresnx.png",
            "mame": "assets/img/folder/mame.png",
            "megacd": "assets/img/folder/segacd.png",
            "megadrive": "assets/img/folder/megadrive.png",
            "mobile": "assets/img/folder/j2me.png",
            "msx": "assets/img/folder/msx.png",
            "n64": "assets/img/folder/n64.png",
            "nds": "assets/img/folder/nds.png",
            "neogeocd": "assets/img/folder/neogeocd.png",
            "neogeopocket": "assets/img/folder/ngpc.png",
            "nes": "assets/img/folder/nes.png",
            "pce": "assets/img/folder/pcengine.png",
            "pc8000": "assets/img/folder/pc88.png",
            "pc98": "assets/img/folder/pc98.png",
            "pcfx": "assets/img/folder/pcfx.png",
            "pico8": "assets/img/folder/pico8.png",
            "pokemonmini": "assets/img/folder/pokemini.png",
            "psp": "assets/img/folder/psp.png",
            "psx": "assets/img/folder/psx.png",
            "rpgmaker": "assets/img/folder/easyrpg.png",
            "scummvm": "assets/img/folder/scummvm.png",
            "sega32x": "assets/img/folder/sega32x.png",
            "sms": "assets/img/folder/mastersystem.png",
            "supergrafx": "assets/img/folder/supergrafx.png",
            "vb": "assets/img/folder/virtualboy.png",
            "x68000": "assets/img/folder/x68000.png",
            "zxspectrum": "assets/img/folder/zxspectrum.png"
        };
        
        if (gameImages[selectedConsole]) {
            image.src = gameImages[selectedConsole];
        } else {
            image.src = "assets/img/folder/DEFAULT.png";
        }
    }

 function changeBackground() {
        var selectedConsole = document.getElementById("consoleGames").value;
        var backgroundImage = document.getElementById("backgroundJogo");
        
        var backgroundImages = {
            "amiga": "url(assets/img/folder2/amiga.webp)",
            "amstrad": "url(assets/img/folder2/amstradcpc.webp)",
            "apps": "url(assets/img/folder2/apps.webp)",
            "arcade": "url(assets/img/folder2/arcade.webp)",
            "atari2600": "url(assets/img/folder2/atari2600.webp)",
            "atari5200": "url(assets/img/folder2/atari5200.webp)",
            "atari7800": "url(assets/img/folder2/atari7800.webp)",
            "atarilynx": "url(assets/img/folder2/atarilynx.webp)",
            "atarist": "url(assets/img/folder2/atarist.webp)",
            "bandaiws": "url(assets/img/folder2/wonderswancolor.webp)",
            "c64": "url(assets/img/folder2/c64.webp)",
            "coleco": "url(assets/img/folder2/colecovision.webp)",
            "cps1": "url(assets/img/folder2/cps1.webp)",
            "cps2": "url(assets/img/folder2/cps2.webp)",
            "cps3": "url(assets/img/folder2/cps3.webp)",
            "dreamcast": "url(assets/img/folder2/dreamcast.webp)",
            "external": "url(assets/img/folder2/ports.webp)",
            "gameandwatch": "url(assets/img/folder2/gameandwatch.webp)",
            "gamegear": "url(assets/img/folder2/gamegear.webp)",
            "gb": "url(assets/img/folder2/gb.webp)",
            "gba": "url(assets/img/folder2/gba.webp)",
            "gbc": "url(assets/img/folder2/gbc.webp)",
            "snes": "url(assets/img/folder2/snes.webp)",
            "snes2": "url(assets/img/folder2/snes2.webp)",
            "famicom": "url(assets/img/folder2/famicom.webp)",
            "hbmame": "url(assets/img/folder2/hbmame.webp)",
            "lowresnx": "url(assets/img/folder2/lowresnx.webp)",
            "mame": "url(assets/img/folder2/mame.webp)",
            "megacd": "url(assets/img/folder2/segacd.webp)",
            "megadrive": "url(assets/img/folder2/megadrive.webp)",
            "mobile": "url(assets/img/folder2/j2me.webp)",
            "msx": "url(assets/img/folder2/msx.webp)",
            "n64": "url(assets/img/folder2/n64.webp)",
            "nds": "url(assets/img/folder2/nds.webp)",
            "neogeocd": "url(assets/img/folder2/neogeocd.webp)",
            "neogeopocket": "url(assets/img/folder2/ngpc.webp)",
            "nes": "url(assets/img/folder2/nes.webp)",
            "pce": "url(assets/img/folder2/pcengine.webp)",
            "pc8000": "url(assets/img/folder2/pc88.webp)",
            "pc98": "url(assets/img/folder2/pc98.webp)",
            "pcfx": "url(assets/img/folder2/pcfx.webp)",
            "pico8": "url(assets/img/folder2/pico8.webp)",
            "pokemonmini": "url(assets/img/folder2/pokemini.webp)",
            "psp": "url(assets/img/folder2/psp.webp)",
            "psx": "url(assets/img/folder2/psx.webp)",
            "rpgmaker": "url(assets/img/folder2/easyrpg.webp)",
            "scummvm": "url(assets/img/folder2/scummvm.webp)",
            "sega32x": "url(assets/img/folder2/sega32x.webp)",
            "sms": "url(assets/img/folder2/mastersystem.webp)",
            "supergrafx": "url(assets/img/folder2/supergrafx.webp)",
            "vb": "url(assets/img/folder2/virtualboy.webp)",
            "x68000": "url(assets/img/folder2/x68000.webp)",
            "zxspectrum": "url(assets/img/folder2/zxspectrum.webp)"
        };
        
        if (backgroundImages[selectedConsole]) {
            backgroundImage.style.backgroundImage = backgroundImages[selectedConsole];
            backgroundImage.style.backgroundSize = "640px 480px";
        } else {
            backgroundImage.style.backgroundSize = "640px 480px";
            backgroundImage.style.backgroundImage = "none";
        }
    }
