const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');

async function searchTravelData(searchType) {
    console.log(searchType);
    try {
        const response = await fetch('travel_recommendation_api.json'); // Replace with actual path
        const data = await response.json();

        switch (searchType.toLowerCase()) {
            case 'temples':
            case 'temple':
                return data.temples;

            case 'beaches':
            case 'beach':
                return data.beaches;

            case 'countries':
            case 'country':
                return data.countries;

            default:
                return data.countries
                    .filter(country => country.name.toLowerCase().includes(searchKeyword))
                    .map(country => country.name);
        }
    } catch (error) {
        console.error('Error fetching or processing data:', error);
        return [];
    }
}

function resetSearch() {
    const input = document.getElementById('conditionInput');
    input.value = "";
    const resultDiv = document.getElementById('search-result');
    const mainDiv = document.getElementById('main');
    resultDiv.innerHTML = '';
    mainDiv.style.display = 'block';
}

function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultDiv = document.getElementById('search-result');
    const mainDiv = document.getElementById('main');
    resultDiv.innerHTML = '';
    searchTravelData(input).then(data => {
        
        if(data.length > 0){
            const innderDiv = data.map(entry=>{
                return(`<div class="col">
                    <div class="card">
                        <img src="./images/${entry.imageUrl}" class="card-img-top" alt="...">
                        <div class="card-body">
                            
                            <h5 class="card-title">${entry.name}</h5>
                            <p class="card-text">${entry.description}</p>
                        </div>
                    </div>
                </div>`)
            })
            let resultDivData = `<div class="row row-cols-1 row-cols-md-3 g-4">${innderDiv}</div>`;
            mainDiv.style.display = 'none';
            resultDiv.innerHTML = resultDivData;
            
        }
    });
}
btnSearch.addEventListener('click', searchCondition);
btnReset.addEventListener('click', resetSearch);