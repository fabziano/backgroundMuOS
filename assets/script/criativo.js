const jogo = document.getElementById("jogo");

const colarImg1 = document.getElementById("botaoImg1");
const colarImg2 = document.getElementById("botaoImg2");
const colarImg3 = document.getElementById("botaoImg3");
const colarImg4 = document.getElementById("botaoImg4");
const colarImg5 = document.getElementById("botaoImg5");

const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");
const img4 = document.getElementById("img4");
const img5 = document.getElementById("img5");

const nomeFoto = document.getElementById("nomeFoto");
const botaoConverterParaPNG = document.getElementById("converterParaPNG");
botaoConverterParaPNG.addEventListener("click", salvarComoPNG);

function colarImagem(targetElement, minWidth, minHeight, maxWidth, maxHeight) {
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
                        imagemArrastavel(img);
                    };
                    reader.readAsDataURL(blob);
                });
                break;
            }
        }
    }).catch((error) => {
        console.error("Falha ao colar imagem: ", error);
    });
}

colarImg1.addEventListener("click", () => {
    colarImagem(img1, "auto", "480px", "auto", "480px");
});

colarImg2.addEventListener("click", () => {
    colarImagem(img2, "200px", "auto", "200px", "auto");
});

colarImg3.addEventListener("click", () => {
    colarImagem(img3, "200px", "auto", "200px", "auto");
});

colarImg4.addEventListener("click", () => {
    colarImagem(img4, "200px", "auto", "200px", "auto");
});

colarImg5.addEventListener("click", () => {
    colarImagem(img5, "200px", "auto", "200px", "auto");
});

let overlayPresente = false;

function adicionarOverlay() {
    if (!overlayPresente) {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        jogo.appendChild(overlay);
        overlayPresente = true;
    } else {
        const overlay = document.querySelector('.overlay');
        overlay.remove();
        overlayPresente = false;
    }
}

AplicarOverlay.addEventListener("click", function(event) {
    event.preventDefault(); 
    adicionarOverlay();
});

let gradientePresente = false;

function aplicarGradiente() {
    gradientePresente = !gradientePresente; // Inverte o estado do gradiente
    if (gradientePresente) {
        jogo.classList.add('gradiente');
    } else {
        jogo.classList.remove('gradiente');
    }
}

document.getElementById("AplicarGradient").addEventListener("click", function(event) {
    event.preventDefault(); 
    aplicarGradiente();
});

let gridPresente = false;

function adicionarGrid() {
    if (!gridPresente) {
        const gridOverlay = document.createElement('div');
        gridOverlay.classList.add('grid');
        gridOverlay.style.display = "block"; // Certifique-se de que a grade esteja visível
        jogo.appendChild(gridOverlay);
        gridPresente = true;
    } else {
        const gridOverlay = document.querySelector('.grid');
        gridOverlay.remove();
        gridPresente = false;
    }
}

document.getElementById("AplicarGrid").addEventListener("click", function(event) {
    event.preventDefault();
    adicionarGrid();
});

function imagemArrastavel(img) {
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

nomeFoto.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        salvarComoPNG();
    }
});

const imgElements = [
    document.getElementById("img1"),
    document.getElementById("img2"),
    document.getElementById("img3"),
    document.getElementById("img4"),
    document.getElementById("img5")
  ];
  
  const scaleImages = [1, 1, 1, 1, 1];
  
  function setTransformImg(el, index) {
    el.style.transform = `scale(${scaleImages[index]})`;
  }
  imgElements.forEach((img, index) => {
    img.onwheel = function (e) {
      e.preventDefault();
      let delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
      delta > 0 ? (scaleImages[index] *= 1.05) : (scaleImages[index] /= 1.05);
      setTransformImg(img.firstChild, index);
    };
  });
  
