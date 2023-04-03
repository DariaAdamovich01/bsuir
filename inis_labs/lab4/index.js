fetch('shirts.js')
    .then(response => response.text())
    .then(data => {
        data = data.replace('const shirts =', '');
        const shirts = JSON.parse(data);
        document.getElementById('square-container').innerHTML = shirts.reduce((prev, currentValue) => {
            let name = currentValue.name
                ? currentValue.name
                : 'Unnamed Shirt';
            let path = currentValue.colors.white
                ? currentValue.colors.white.front
                : currentValue.default.front;
            let amount = Object.keys(currentValue.colors).length;
            let shirt_string = `<div class="square-item">
                                    <img src="${path}" alt="${name}_shirt_img">
                                    <br>
                                    <b>${name}</b>
                                    <p>Available in ${amount} colors</p>
                                    <button onclick="showModal(this.parentElement)">Quick View</button>
                                    <button onclick="openDetails(this.parentElement)">See Page</button>
                                </div>`
            return prev + shirt_string;
        }, '');
    });

    const openDetails = async (squareItem) => {
        const name = squareItem.querySelector('b').innerText;
        const shirt = await fetchShirt(name)
        localStorage.setItem('item', JSON.stringify(shirt))
        location.href = "details.html"
    }

const showModal = async (squareItem) => {
    const path = squareItem.querySelector('img').src;
    const name = squareItem.querySelector('b').innerText;
    const amount = squareItem.querySelector('p').innerText.match(/\d+/)[0];
    const price = await fetchPrice(name);
    console.log(price)
    const modalHTML = `
        <div class="modal">
          <div class="modal-content">
            <span class="close-button" onclick="closeModal()">&times;</span>
            <img src="${path}" alt="${name}_shirt_img">
            <h2>${name}</h2>
            <p>Available in ${amount} colors</p>
            <p>Price: ${price}</p>
          </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
};

const closeModal = () => {
    const modal = document.querySelector('.modal');
    modal.remove();
}

const fetchShirt = async (name) => {
    return fetch('shirts.js')
        .then(response => response.text())
        .then(data => {
            data = data.replace('const shirts =', '');
            const shirts = JSON.parse(data);
            return shirts.find(shirt => shirt.name === name);
        });
}


const fetchPrice = (name) => {
    return fetch('shirts.js')
        .then(response => response.text())
        .then(data => {
            data = data.replace('const shirts =', '');
            const shirts = JSON.parse(data);
            let shirt = shirts.find(shirt => shirt.name === name);
            return shirt.price;
        });
}
