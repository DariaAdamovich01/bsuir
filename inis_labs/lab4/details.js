const shirt = JSON.parse(localStorage.getItem("item"))
let currentColor = 'white';

let name = shirt.name
    ? shirt.name
    : 'Unnamed Shirt';

let path = shirt.colors[currentColor]
    ? shirt.colors[currentColor].front
    : shirt.default.front;

document.getElementById('details-container').innerHTML =
    `<div class="detailed_item">
        <b class="shirt_name">${name}</b>
        <p class="shirt_price">${shirt.price}</p>
        <p class="description">Typed 'Funny' Text, as you asked =)</p>
        <br>
        <img class="shirt_img" id="shirt-img" src="${path}" alt="${name}_shirt_img">
        <div class="side_buttons">
            Side:
            <button class="side_button" onclick="setFront()">Front</button>
            <button class="side_button" onclick="setBack()">Back</button>
        </div>
        <div class="color_buttons" id="color-buttons">Color:</div>
    </div>`;


for (let color in shirt.colors) {
    let button = document.createElement('button');
    button.style.backgroundColor = color;
    button.className = 'color_button'
    button.innerText = color;
    button.onclick = () => {
        currentColor = color;
        path = shirt.colors[currentColor].front;
        document.getElementById('shirt-img').src = path;
    };
    document.getElementById('color-buttons').appendChild(button);
}

const setFront = () => {
    path = shirt.colors[currentColor].front;
    document.getElementById('shirt-img').src = path;
}

const setBack = () => {
    path = shirt.colors[currentColor].back;
    document.getElementById('shirt-img').src = path
}