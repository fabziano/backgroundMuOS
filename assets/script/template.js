const jogo = document.getElementById("jogo");

const capaJogo = document.getElementById("capaJogo");

const logoJogo = document.getElementById("logoJogo");

const botaoColarFoto = document.getElementById("botaoColarFoto");
const botaoColarFoto2 = document.getElementById("botaoColarFoto2");
const botaoColarFoto3 = document.getElementById("botaoColarFoto3");

let gradientePresente = false;

function aplicarGradiente() {
    gradientePresente = !gradientePresente;
    if (gradientePresente) {
        jogo.classList.add('gradiente');
    } else {
        jogo.classList.remove('gradiente');
    }
}

document.getElementById("AplicarGradient").addEventListener("click", function (event) {
    event.preventDefault();
    aplicarGradiente();
});

const formatoCapa = document.getElementById("formatoCapa");

formatoCapa.addEventListener("click", (event) => {
    event.preventDefault();
    const currentWidth = capaJogo.style.width;
    if (currentWidth === "220px" || currentWidth === "") {
        capaJogo.style.width = "280px";
    } else {
        capaJogo.style.width = "220px";
    }
});


function handlePasteImage(targetElement, minWidth, minHeight, maxWidth, maxHeight) {
    navigator.clipboard.read().then((clipboardItems) => {
        for (const item of clipboardItems) {
            if (item.types.includes("image/png") || item.types.includes("image/jpeg")) {
                item.getType("image/png").then((blob) => {
                    const reader = new FileReader();
                    reader.onload = function (event) {
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
                        const gradientOverlay = document.getElementById("gradientOverlay");
                        addDragAndDropFunctionality(img);
                        if (targetElement === backgroundJogo) {
                            gradientOverlay.style.display = "block";
                            jogo.style.backgroundColor = "#202020"
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
    handlePasteImage(backgroundJogo, "auto", "480px", "auto", "480px");
});

botaoColarFoto3.addEventListener("click", () => {
    handlePasteImage(logoJogo, "250px", "auto", "250px", "auto");
});

const nomeFoto = document.getElementById("nomeFoto");
const botaoConverterParaPNG = document.getElementById("converterParaPNG");
botaoConverterParaPNG.addEventListener("click", salvarComoPNG);

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

nomeFoto.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        salvarComoPNG();
    }
});

//Zoom de Capa e Logo

const imgElements = [
    document.getElementById("logoJogo"),
    document.getElementById("capaJogo"),
    document.getElementById("backgroundJogo"),
];

const scaleImages = [1, 1, 1];

function setTransformImg(el, index) {
    if (index === 1) {
        el.style.transform = `scale(${scaleImages[index]}) skewX(6deg)`;
    } else {
        el.style.transform = `scale(${scaleImages[index]})`;
    }
}

imgElements.forEach((img, index) => {
    img.onwheel = function (e) {
        e.preventDefault();
        let delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
        delta > 0 ? (scaleImages[index] *= 1.05) : (scaleImages[index] /= 1.05);
        setTransformImg(img.firstChild, index);
    };
});
