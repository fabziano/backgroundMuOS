const capaJogo = document.getElementById("capaJogo");
const jogo = document.getElementById("jogo");
const logoJogo = document.getElementById("logoJogo");
const nomeFoto = document.getElementById("nomeFoto");
const botaoColarFoto = document.getElementById("botaoColarFoto");
const botaoColarFoto2 = document.getElementById("botaoColarFoto2");
const botaoColarFoto3 = document.getElementById("botaoColarFoto3");
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
                        img.draggable = false; 
                        img.id = "draggableImage"; 
                        img.style.position = "absolute"; 
                        targetElement.innerHTML = "";
                        targetElement.appendChild(img);
                        nomeFoto.focus();
                        
                        if (targetElement === capaJogo || targetElement === logoJogo) {
                            addDragAndDropFunctionality(img);
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
    handlePasteImage(capaJogo, "auto", "480px", "auto", "480px");
});

botaoColarFoto2.addEventListener("click", () => {
    handlePasteImage(backgroundJogo, "640px", "480px", "640px", "480px");
});

botaoColarFoto3.addEventListener("click", () => {
    handlePasteImage(logoJogo, "250px", "auto", "250px", "auto");
});

function salvarComoPNG() {
    const nomeArquivo = nomeFoto.value.trim();
    if (nomeArquivo !== "") {
        const jogo = document.getElementById("jogo");

        domtoimage.toBlob(jogo)
            .then(blob => {
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = `${nomeArquivo}.png`;
                link.click();
            })
            .catch(error => {
                console.error("Erro ao salvar como PNG: ", error);
            });
    } else {
        alert("Por favor, insira um nome para o arquivo.");
    }
}

function addDragAndDropFunctionality(img) {
    let isDragging = false;
    let initialX, initialY;
    let offsetX, offsetY;
    
    img.addEventListener('mousedown', (event) => {
        isDragging = true;
        initialX = event.clientX;
        initialY = event.clientY;
        offsetX = img.offsetLeft;
        offsetY = img.offsetTop;
        img.style.zIndex = 1000; 
        
        document.addEventListener('mousemove', onMouseMove);
    });
    
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            img.style.zIndex = 2; 
            document.removeEventListener('mousemove', onMouseMove);
        }
    });
    
    function onMouseMove(event) {
        if (isDragging) {
            const currentX = event.clientX;
            const currentY = event.clientY;
            const dx = currentX - initialX;
            const dy = currentY - initialY;
            
            if (img.parentElement === capaJogo) {
                img.style.left = (offsetX + dx) + 'px';
            } else {
                img.style.left = (offsetX + dx) + 'px'; 
                img.style.top = (offsetY + dy) + 'px'; 
            }
        }
    }
}

nomeFoto.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        salvarComoPNG();
    }
});