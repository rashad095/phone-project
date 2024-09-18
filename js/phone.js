// Data Add
const loadPhone = async (searchText='13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

// Data show

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);

    const phoneContainer = document.getElementById('phone-container');

    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    // console.log('is show all', isShowAll)

    if(!isShowAll){
        phones = phones.slice(0, 12);
    }


    // console.log(phones);
    phones.forEach(phone => {
        // console.log(phone);

        // 2 create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
        // 3 set inner html
        phoneCard.innerHTML = `
        <figure>
                <img src="${phone.image}"
                    alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-center">
                    <button onClick="handleShowDetail('${phone.slug}'); show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
                </div>
            </div>
        `;
        //  4 append child
        phoneContainer.appendChild(phoneCard);
    }); 

    toggleLoadingSpinner(false);
}

const handleShowDetail = async (id) =>{
    // console.log('clicked show detaiuls', id)

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone);
}


const showPhoneDetails = (phone) =>{
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;


const showDetailContainer = document.getElementById('show-detail-container');
showDetailContainer.innerHTML = `
<img src="${phone.image}" alt="" />
<p><span>Storage:</span>${phone?.mainFeatures?.storage}</P>
<p><span>DisplaySize:</span>${phone?.mainFeatures?.displaySize}</P>
<p><span>Memory:</span>${phone?.mainFeatures?.memory}</P>
<p><span>ChipSet:</span>${phone?.mainFeatures?.chipSet}</P>
<p><span>GPS:</span>${phone?.others?.GPS || 'No GPS available'}</P>
<p><span>Brand:</span>${phone?.brand}</P>
`

    show_details_modal.showModal();
}


// handle search button

const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText)
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = () =>{
    handleSearch(true);
}


loadPhone();