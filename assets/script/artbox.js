const capaJogo = document.getElementById("capaJogo");
const nomeFoto = document.getElementById("nomeFoto");
const botaoColarFoto = document.getElementById("botaoColarFoto");
const botaoColarFoto2 = document.getElementById("botaoColarFoto2");
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
    handlePasteImage(capaJogo, "153px", "234px", "153px", "234px");
});

botaoColarFoto2.addEventListener("click", () => {
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

nomeFoto.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        salvarComoPNG();
    }
});
