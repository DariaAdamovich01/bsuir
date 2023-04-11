let hide = function(){
    document.getElementById('modal').style.display = 'none';
    document.getElementById('filter').style.display = 'none';
    document.body.style.overflow = 'visible';
}

for (let i = 0; i < shirts.length; i++) {
const box  = document.querySelector('.content');
const box1  = document.createElement('div');
box1.classList.add('shirts');
box.append(box1);
const contentBox = document.querySelectorAll('.shirts');
const image = document.createElement('img');
if(shirts[i].colors.white.front!="" && shirts[i].colors.white.front!= undefined)
{
    image.src = shirts[i].colors.white.front;
}
else{
    image.src = shirts[i].default.front;
}
image.alt = 'No image';
const shirtName = document.createElement('div');
shirtName.classList.add('contentName');
if(shirts[i].name!="" && shirts[i].name!= undefined)
{
    shirtName.innerText = shirts[i].name;
}
else{
    shirtName.innerText = 'No name';
}

const smallContent = document.createElement('div');
smallContent.classList.add('smallContent');
smallContent.innerText = 'Avaliable in ' + Object.keys(shirts[i].colors).length + ' colors';
const prevView = document.createElement('button');
prevView.innerText = 'Quick view';
prevView.onclick = function(){
    document.getElementById('modal').style.display = 'block';
    document.getElementById('filter').style.display = 'block';
    document.body.style.overflow = 'hidden';
    const mod = document.getElementById('modal');
    mod.textContent = '';
    const imageFront = document.createElement('img');
    const imageBack = document.createElement('img');
    imageFront.src = shirts[i].colors.white.front;
    imageBack.src = shirts[i].colors.white.back;
    const name = document.createElement('div');
    name.innerText = shirts[i].name;
    const price = document.createElement('div');
    price.innerText = shirts[i].price;
    mod.append(imageFront);
    mod.append(imageBack);
    mod.append(name);
    mod.append(price);
}
const seePage = document.createElement('button');
seePage.innerText = 'See page';
seePage.onclick = function(){
    document.location.href = 'secound.html';
    localStorage.setItem('id', i);

}
seePage.style.float = 'right';
contentBox[i].append(image);
contentBox[i].append(shirtName);
contentBox[i].append(smallContent);
contentBox[i].append(prevView);
contentBox[i].append(seePage);
}