const jogo = document.getElementById("jogo");
const nomeFoto = document.getElementById("nomeFoto");
const colarBackground = document.getElementById("colarBackground");
const backgroundJogo = document.getElementById("backgroundJogo");
const colarLogo = document.getElementById("colarLogo");
const logoJogo = document.getElementById("logoJogo");

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
                        
                        if (targetElement === backgroundJogo || targetElement === logoJogo) {
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

colarBackground.addEventListener("click", () => {
    handlePasteImage(backgroundJogo, "auto", "480px", "auto", "480px");
});

colarLogo.addEventListener("click", () => {
    handlePasteImage(logoJogo, "200px", "auto", "200px", "auto");
});

function salvarComoPNG() {
    const nomeArquivo = nomeFoto.value.trim() || "Imagem"; 
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
                img.style.left = (offsetX + dx) + 'px';
                img.style.left = (offsetX + dx) + 'px'; 
                img.style.top = (offsetY + dy) + 'px'; 
            
        }
    }
}

nomeFoto.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        salvarComoPNG();
    }
});

let scale = 1;
zoomElements = document.querySelectorAll(".zoom");

function setTransform(el) {
    el.style.transform = "scale(" + scale + ")";
}

Array.prototype.map.call(zoomElements, item => {
    item.onwheel = function (e) {
        e.preventDefault();
        let delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
        (delta > 0) ? (scale *= 1.05) : (scale /= 1.05);
        setTransform(item.firstChild);
    }
});
