const jogo = document.getElementById("jogo");
const logoJogo = document.getElementById("logoJogo");
const personagemJogo = document.getElementById("personagemJogo");
const nomeFoto = document.getElementById("nomeFoto");

const botaoColarLogo = document.getElementById("botaoColarLogo");
const botaoColarPersonagem = document.getElementById("botaoColarPersonagem");
const botaoConverterParaPNG = document.getElementById("converterParaPNG");

const defaultPersonagem = document.getElementById("defaultPersonagem");
const defaultLogo = document.getElementById("defaultLogo");

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
                        
                        if (targetElement === logoJogo) {
                            addDragAndDropFunctionality(img);
                            defaultLogo.style.display = "none";
                        }
                        else if(targetElement === personagemJogo){
                            addDragAndDropFunctionality(img);
                            defaultPersonagem.style.display = "none";
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

botaoColarLogo.addEventListener("click", () => {
    handlePasteImage(logoJogo, "200px", "auto", "200px", "auto");
});

botaoColarPersonagem.addEventListener("click", () => {
    handlePasteImage(personagemJogo, "auto", "300px", "auto", "300px");
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
            img.style.top = (offsetY + dy) + 'px'; 
        }
    }
}

nomeFoto.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        salvarComoPNG();
    }
});

// Zoom de Capa, Logo e Personagem
let scaleLogo = 1;
let scalePersonagem = 1;

const zoomLogoElements = document.querySelectorAll(".zoomLogo");
const zoomPersonagemElements = document.querySelectorAll(".zoomPersonagem");

function setTransformLogo(el) {
  el.style.transform = `scale(${scaleLogo})`;
}

function setTransformPersonagem(el) {
  el.style.transform = `scale(${scalePersonagem})`;
}

Array.prototype.map.call(zoomLogoElements, item => {
  item.onwheel = function (e) {
    e.preventDefault();
    let delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
    (delta > 0) ? (scaleLogo *= 1.05) : (scaleLogo /= 1.05);
    setTransformLogo(item.firstChild);
  }
});

Array.prototype.map.call(zoomPersonagemElements, item => {
  item.onwheel = function (e) {
    e.preventDefault();
    let delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
    (delta > 0) ? (scalePersonagem *= 1.05) : (scalePersonagem /= 1.05);
    setTransformPersonagem(item.firstChild);
  }
});


const PlanoDeFundo = document.querySelector('#capaJogo');
const seletor = document.getElementById('seletor');

seletor.addEventListener('input', () => {
    const corEscolhida = seletor.value;
    PlanoDeFundo.style.backgroundColor = corEscolhida;
});
