const botaoColarFoto = document.getElementById("botaoColarFoto");

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
        "amstradcpc": "assets/img/wheels/amstradcpc.png",
        "apps": "assets/img/wheels/apps.png",
        "arcade": "assets/img/wheels/arcade.png",
        "atari2600": "assets/img/wheels/atari2600.png",
        "atari5200": "assets/img/wheels/atari5200.png",
        "atari7800": "assets/img/wheels/atari7800.png",
        "atarilynx": "assets/img/wheels/atarilynx.png",
        "colecovision": "assets/img/wheels/colecovision.png",
        "cps1": "assets/img/wheels/cps1.png",
        "cps2": "assets/img/wheels/cps2.png",
        "cps3": "assets/img/wheels/cps3.png",
        "daphne": "assets/img/wheels/daphne.png",
        "ports": "assets/img/wheels/ports.png",
        "gb": "assets/img/wheels/gb.png",
        "gba": "assets/img/wheels/gba.png",
        "gbc": "assets/img/wheels/gbc.png",
        "msx": "assets/img/wheels/msx.png",
        "nds": "assets/img/wheels/nds.png",
        "neogeo": "assets/img/wheels/neogeo.png",
        "neogeocd": "assets/img/wheels/neogeocd.png",
        "ngpc": "assets/img/wheels/ngpc.png",
        "n64": "assets/img/wheels/n64.png",
        "nes": "assets/img/wheels/nes.png",
        "openbor": "assets/img/wheels/openbor.png",
        "pcengine": "assets/img/wheels/pcengine.png",
        "pce-cd": "assets/img/wheels/pce-cd.png",
        "psp": "assets/img/wheels/psp.png",
        "psx": "assets/img/wheels/psx.png",
        "sega32x": "assets/img/wheels/sega32x.png",
        "segacd": "assets/img/wheels/segacd.png",
        "gamegear": "assets/img/wheels/gamegear.png",
        "mastersystem": "assets/img/wheels/mastersystem.png",
        "megadrive": "assets/img/wheels/megadrive.png",
        "naomi": "assets/img/wheels/naomi.png",
        "sg-1000": "assets/img/wheels/sg-1000.png",
        "x68000": "assets/img/wheels/x68000.png",
        "zxspectrum": "assets/img/wheels/zxspectrum.png",
        "snes": "assets/img/wheels/snes.png",
        "tic80": "assets/img/wheels/tic80.png",
        "vectrex": "assets/img/wheels/vectrex.png",
        "wonderswancolor": "assets/img/wheels/wonderswancolor.png"
    };
    

    if (selectedConsole in gameImages) {
        image.src = gameImages[selectedConsole];
    } else {
        image.src = "assets/img/logo/DEFAULT.png";
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
