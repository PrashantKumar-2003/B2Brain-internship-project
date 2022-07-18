const searchBtn = document.getElementById("search");
const dismissBtn = document.getElementById("dismiss");
const srhInput = document.getElementById("srhInput");
const header = document.getElementById("header");
const textlinks = document.getElementById("textlinks");
const comments = document.getElementById("comments");
const apiSection = document.getElementById("apiSection");
const searchTerms = document.getElementById("searchTerms");

// async and await in fetchAPI to get data by GET method
async function fetJSON(){
    const response = await fetch('https://tva.staging.b2brain.com/search/autocomplete_org_all/',{
        method: 'GET'
      });
    const data = await response.json();
    return data;
}
const a = fetJSON();
a.then((data)=>{
    str = '';
    console.log(data);
    for (key in data) {
        str += `<div class="searchItem">
            <img src="./Media/CLogo.png" alt="company's logo">
            <h4>Harrow Inc.</h4>
            <p>www.harrow.com</p>
            <button type="button" id="${key}" class="fetchBtn" onclick="trackObj(this.id)">Track</button>
        </div>`;
            searchTerms.innerHTML = str;
}});

// event handler of searchbar
srhInput.addEventListener('keyup',(e)=>{
    const srhString = e.target.value;
    async function fetJSON(){
        const response = await fetch(`https://tva.staging.b2brain.com/search/autocomplete_org_all/?q=${srhString}`,{
            method: 'GET'
          });
        const data = await response.json();
        return data;
    }
    const a = fetJSON();
    a.then((data)=>{
        str = '';
        console.log(data);
        for (key in data) {
            str += `<div class="searchItem">
                <img src="./Media/CLogo.png" alt="company's logo">
                <h4>Harrow Inc.</h4>
                <p>www.harrow.com</p>
                <button type="button" id="${key}" class="fetchBtn" onclick="trackObj(this.id)">Track</button>
            </div>`;
                searchTerms.innerHTML = str;
    }});
});

// function to track orgName, org slug and timestamp
function trackObj(id, a = fetJSON()){
    a.then((data)=> {
        let company = data[id].company;
        let slug = data[id].slug;
        let time = new Date();
        let Timestamp = time.toLocaleTimeString();
        console.log(company+slug+" tracked at "+ Timestamp);
    });
    
}

srhInput.addEventListener('click', () => {
    apiSection.style.display = "block";
    searchBtn.style.display = "none";
    dismissBtn.style.display = "inline";
    header.style.display = "none";
    textlinks.style.display = "none";
    comments.style.display = "none";
})
searchBtn.addEventListener('click', () => {
    apiSection.style.display = "block";
    srhInput.focus();
    searchBtn.style.display = "none";
    dismissBtn.style.display = "inline";
    header.style.display = "none";
    textlinks.style.display = "none";
    comments.style.display = "none";
})
dismissBtn.addEventListener('click', () => {
    apiSection.style.display = "none";
    dismissBtn.style.display = "none";
    searchBtn.style.display = "inline";
    srhInput.value = '';
    header.style.display = "";
    textlinks.style.display = "";
    comments.style.display = "";
})