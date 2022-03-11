// Load Phones form JSON File
const loadPhones = () => {
    const searchField = document.getElementById('search-input');
    const searchText = searchField.value;
    searchField.value = '';
    toggleSpinner('block');
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data));
};

// Add Spinner Function
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
};

// Display Phones
const displayPhones = data => {
    if (data.length == 0) {
        const searchResult = document.getElementById('search-result');
        const error = document.getElementById('error-message');
        error.textContent = '';
        const div = document.createElement('div');
        div.innerHTML = `
        <h1 class="text-secondary">No Result Found!!</h1>
        <h1 class="bi bi-emoji-frown-fill text-center text-secondary"></h1>
        `;
        error.appendChild(div);
        toggleSpinner('none');
        searchResult.textContent = '';
    }
    else {
        const error = document.getElementById('error-message');
        error.textContent = '';
        const arr = data.slice(0, 20);
        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';
        arr.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            const searchField = document.getElementById('search-input');
            searchField.value;
            div.innerHTML =
                `
                        <div class="card h-100 bg-white border-0 rounded-3">
                            <img src="${phone.image}" class="card-img-top p-3" alt="...">
                            <div class="card-body">
                                <h6 class="card-title">${phone.brand}</h6>
                                <h5 class="card-title">${phone.phone_name}</h5>
                                <p><span class="fw-bold">Product ID:</span> ${phone.slug}</p>
                                <button class="btn btn-primary" onclick="deviceDetails('${phone.slug}')">Specification</button>
                            </div>
                        </div>
                    `;
            searchResult.appendChild(div);
            toggleSpinner('none');
        });
    }
    const deviceDetail = document.getElementById('device-detail');
    deviceDetail.textContent = '';
};

// Get Divice Details From JSON File
const deviceDetails = deviceID => {
    const url = (`https://openapi.programming-hero.com/api/phone/${deviceID}`);
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data));
};

// Display Device Details
const displayDetails = data => {
    console.log(data);
    const deviceDetail = document.getElementById('device-detail');
    deviceDetail.textContent = '';
    const div = document.createElement('div');
    const obj = data.data;
    console.log(obj);
    div.classList.add('col');
    div.innerHTML = obj.releaseDate != '' ? ` 
    <div class="card h-100 bg-white border-0 rounded-3">
        <div class="card-head mt-5">
            <h4 class="card-title text-center">${data.data.brand}</h4>
            <h2 class="card-title text-center">${data.data.name}</h2>
            <p class="text-center"><span class="fw-bold">Release Date:</span> ${data.data.releaseDate}</p>
            <p class="text-center"><span class="fw-bold">Product ID:</span> ${data.data.slug}</p>
            <img src="${data.data.image}" class="card-img-top p-5 w-100" alt="...">
        </div>
        <div class="card-body">
            <h3 class="text-center">Specification</h3>
            <p><span class="fw-bold">Chipset:</span> ${data.data.mainFeatures.chipSet}</p>
            <p><span class="fw-bold">Display:</span> ${data.data.mainFeatures.displaySize}</p>
            <p><span class="fw-bold">Memory:</span> ${data.data.mainFeatures.memory}</p>
            <p><span class="fw-bold">Storage:</span> ${data.data.mainFeatures.storage}</p>
            <p class="fw-bold">Sensors:</p>
            <ul>
                <li>${data.data.mainFeatures.sensors[0]}</li>
                <li>${data.data.mainFeatures.sensors[1]}</li>
                <li>${data.data.mainFeatures.sensors[2]}</li>
                <li>${data.data.mainFeatures.sensors[3]}</li>
                <li>${data.data.mainFeatures.sensors[4]}</li>
                <li>${data.data.mainFeatures.sensors[5]}</li>
            </ul>
        </div>
    </div>
    ` :
        `<div class="card h-100 bg-white border-0 rounded-3">
            <div class="card-head mt-5">
                <h4 class="card-title text-center">${data.data.brand}</h4>
                <h2 class="card-title text-center">${data.data.name}</h2>
                <p class="text-center"><span class="fw-bold">Release Date:</span> <span class="text-secondary">No Release Date Found!!</span></p>
                <p class="text-center"><span class="fw-bold">Product ID:</span> ${data.data.slug}</p>
                <img src="${data.data.image}" class="card-img-top p-5 img-fluid" alt="...">
            </div>
            <div class="card-body">
                <h3 class="text-center">Specification</h3>
                <p><span class="fw-bold">Chipset:</span> ${data.data.mainFeatures.chipSet}</p>
                <p><span class="fw-bold">Display:</span> ${data.data.mainFeatures.displaySize}</p>
                <p><span class="fw-bold">Memory:</span> ${data.data.mainFeatures.memory}</p>
                <p><span class="fw-bold">Storage:</span> ${data.data.mainFeatures.storage}</p>
                <p class="fw-bold">Sensors:</p>
                <ul>
                    <li>${data.data.mainFeatures.sensors[0]}</li>
                    <li>${data.data.mainFeatures.sensors[1]}</li>
                    <li>${data.data.mainFeatures.sensors[2]}</li>
                    <li>${data.data.mainFeatures.sensors[3]}</li>
                    <li>${data.data.mainFeatures.sensors[4]}</li>
                    <li>${data.data.mainFeatures.sensors[5]}</li>
                </ul>
            </div>
        </div>`;
    const other = document.createElement('div');
    other.classList.add('card-body');
    other.classList.add('bg-white');
    other.innerHTML = obj.hasOwnProperty('others') ? `
    <p class="fw-bold">Others:</p>
    <ul>
        <li><span class="fw-bold">Bluetooth:</span> ${data.data.others.Bluetooth}</li>
        <li><span class="fw-bold">GPS:</span> ${data.data.others.GPS}</li>
        <li><span class="fw-bold">Radio:</span> ${data.data.others.Radio}</li>
        <li><span class="fw-bold">NFC:</span> ${data.data.others.NFC}</li>
        <li><span class="fw-bold">WLAN:</span> ${data.data.others.WLAN}</li>
    </ul>
    `:
        `
        `;

    deviceDetail.appendChild(div);
    div.appendChild(other);
};