const capaJogo = document.getElementById("capaJogo");
const backgroundJogo = document.getElementById("backgroundJogo");
const botaoColarFoto = document.getElementById("botaoColarFoto");
const botaoColarFoto2 = document.getElementById("botaoColarFoto2");

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
                        const gradientOverlay = document.getElementById("gradientOverlay");

                        if (targetElement === backgroundJogo) {
                            gradientOverlay.style.display = "block";
                        }
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
    handlePasteImage(capaJogo, "212px", "186px", "212px", "186px");
});

botaoColarFoto2.addEventListener("click", () => {
    handlePasteImage(backgroundJogo, "640px", "480px", "640px", "480px");
});

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
