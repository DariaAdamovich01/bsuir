const id = localStorage.getItem('id');
const detail = document.querySelector('.detail_content');
const shirtName = document.createElement('div');
shirtName.classList.add('shirtName');
shirtName.textContent = shirts[id].name;
const contentContainer = document.createElement('div');
contentContainer.classList.add('contentConteiner');
const shirtPrice = document.createElement('div');
shirtPrice.textContent =shirts[id].price;
const image = document.createElement('img');
image.id = 'image';
image.src = shirts[id].colors.white.front;
const shirtDescription = document.createElement('div');
shirtDescription.textContent =shirts[id].description;
const topButtons = document.createElement('div');
topButtons.classList.add('buttons')
const sideText = document.createElement('div');
sideText.textContent = 'Side: ';
topButtons.appendChild(sideText);
const sideButtonFront = document.createElement('button');
sideButtonFront.textContent = 'Front';
sideButtonFront.onclick=function(){
    const chek=document.getElementById('image');
    chek.getAttribute('src');
    let str = chek.getAttribute('src').replace('back', 'front');
    chek.src = str;
}
topButtons.appendChild(sideButtonFront);
const sideButtonBack = document.createElement('button');
sideButtonBack.textContent = 'Back';
topButtons.appendChild(sideButtonBack);
sideButtonBack.onclick=function(){
    const chek=document.getElementById('image');
    chek.getAttribute('src');
    let str = chek.getAttribute('src').replace('front', 'back');
    chek.src = str;
}
const bottomButtons = document.createElement('div');
bottomButtons.classList.add('buttons');
const colorText = document.createElement('div');
colorText.textContent = 'Color: ';
bottomButtons.appendChild(colorText);
for (let i = 0; i < Object.keys(shirts[id].colors).length; i++) {
    let color = Object.keys(shirts[id].colors)[i];
    const colorButton = document.createElement('button');
    colorButton.onclick = function(){
        image.src = Object.values(shirts[id].colors)[i].front;
    }
    colorButton.textContent = color;
    colorButton.style.backgroundColor = color;
    bottomButtons.appendChild(colorButton);
}
const exitButton = document.createElement('button');
exitButton.textContent = 'Back';
exitButton.classList.add('exitButton');
exitButton.onclick =  function(){document.location.href = "index.html";};
contentContainer.appendChild(shirtPrice);
contentContainer.appendChild(shirtDescription);
contentContainer.appendChild(topButtons);
contentContainer.appendChild(bottomButtons);
detail.appendChild(shirtName);
detail.appendChild(image);
detail.appendChild(contentContainer);
detail.appendChild(exitButton);