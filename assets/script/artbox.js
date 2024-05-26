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
    const nomeArquivo = nomeFoto.value.trim() || "Imagem"; // Usando "Imagem" como nome padrão
    const jogo = document.getElementById("jogo");
    const rect = jogo.getBoundingClientRect(); 

    domtoimage.toBlob(jogo, { 
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

nomeFoto.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        salvarComoPNG();
    }
});
