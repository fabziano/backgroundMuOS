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

    function changeBackground() {
        var selectedConsole = document.getElementById("consoleGames").value;
        var backgroundImage = document.getElementById("backgroundJogo");
        var gradientOverlay = document.getElementById("gradientOverlay"); 
        
        var backgroundImages = {
            "apps": "url(assets/img/background/apps.webp)",
            "arcade": "url(assets/img/background/arcade.webp)",
            "atari2600": "url(assets/img/background/atari2600.webp)",
            "atarist": "url(assets/img/background/atarist.webp)",
            "bandaiws": "url(assets/img/background/wonderswancolor.webp)",
            "cps1": "url(assets/img/background/cps1.webp)",
            "cps2": "url(assets/img/background/cps2.webp)",
            "cps3": "url(assets/img/background/cps3.webp)",
            "external": "url(assets/img/background/ports.webp)",
            "easyrpg": "url(assets/img/background/easyrpg.webp)",
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

        backgroundImage.innerHTML = ""; 

        if (backgroundImages[selectedConsole]) {
            backgroundImage.style.backgroundImage = backgroundImages[selectedConsole];
            backgroundImage.style.backgroundSize = "640px 480px";
            gradientOverlay.style.display = "block"; 
        } else {
            backgroundImage.style.backgroundSize = "640px 480px";
            backgroundImage.style.backgroundImage = "none";
            gradientOverlay.style.display = "none"; 
        }
    }

    const jogo = document.getElementById("jogo");
    const nomeFoto = document.getElementById("nomeFoto");
    const botaoConverterParaPNG = document.getElementById("converterParaPNG");
    
    botaoConverterParaPNG.addEventListener("click", () => salvarComoPNG(jogo, nomeFoto));
    
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
    