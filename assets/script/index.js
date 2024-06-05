const jogo = document.getElementById("jogo");
const nomeFoto = document.getElementById("nomeFoto");
document.getElementById("converterParaPNG").addEventListener("click", salvarComoPNG);

const totalElementos = 5;
const botaoImgs = [];
const imgs = [];
const checkboxs = [];
for (let i = 1; i <= totalElementos; i++) {
  const botaoImg = document.getElementById(`botaoImg${i}`);
  const img = document.getElementById(`img${i}`);
  const checkbox = document.getElementById(`checkbox${i}`);

  botaoImgs.push(botaoImg);
  imgs.push(img);
  checkboxs.push(checkbox);
}

checkboxs.forEach((checkbox, index) => {
    checkbox.addEventListener('change', (event) => {
        if (event.currentTarget.checked) {
            imgs[index].style.display = "block";
            botaoImgs[index].classList.remove("desliga");
        } else {
            imgs[index].style.display = "none";
            botaoImgs[index].classList.add("desliga");
        }
    });
});

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

botaoImgs.forEach((botaoImg, index) => {
    botaoImg.addEventListener("click", () => {
        const imagens = [img1, img2, img3, img4, img5];
        const alturas = ["480px", "auto", "auto", "auto", "auto"];
        const larguras = ["auto", "300px", "300px", "200px", "200px"];
        colarImagem(imagens[index], larguras[index], alturas[index], larguras[index], alturas[index]);
    });
});


let overlayPresente = false;

function adicionarOverlay() {
    const jogo = document.getElementById('jogo');
    const overlay = document.querySelector('.overlay');

    if (!overlayPresente) {
        overlayPresente = true;
        const novoOverlay = document.createElement('div');
        novoOverlay.classList.add('overlay');
        jogo.appendChild(novoOverlay);
    } else {
        overlayPresente = false;
        overlay.remove();
    }
}

document.getElementById("AplicarOverlay").addEventListener("click", function(event) {
    event.preventDefault(); 
    adicionarOverlay();
});

let gradientePresente = false;

function aplicarGradiente() {
    const jogo = document.getElementById('jogo');

    gradientePresente = !gradientePresente; 

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
    const jogo = document.getElementById('jogo');
    const gridOverlay = document.querySelector('.grid');

    if (!gridPresente) {
        gridPresente = true;
        const novoGrid = document.createElement('div');
        novoGrid.classList.add('grid');
        novoGrid.style.display = "block";
        jogo.appendChild(novoGrid);
    } else {
        gridPresente = false;
        gridOverlay.remove();
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

const imgElements = [];
const scaleImages = [1, 1, 1, 1, 1];

for (let i = 1; i <= totalElementos; i++) {
  const img = document.getElementById(`img${i}`);
  imgElements.push(img);
}

function setTransformImg(el, index) {
  el.style.transform = `scale(${scaleImages[index]})`;
}

imgElements.forEach((img, index) => {
  img.onwheel = function (e) {
    e.preventDefault();
    let delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
    delta > 0 ? (scaleImages[index] *= 1.05) : (scaleImages[index] /= 1.05);
    setTransformImg(img, index);
  };
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

nomeFoto.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        salvarComoPNG();
    }
});