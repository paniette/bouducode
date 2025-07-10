document.addEventListener('DOMContentLoaded', function() {
    fetchBouts();
    
}); 

// Fonction pour afficher les éléments
function displayItems(items) {
    const content = document.getElementById('app');
    content.innerHTML = '';
    
    items.forEach(item => {        
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
            <h3>${item.name}</h3>           
            <p>${item.boutdecode}</p>
        `;
        content.appendChild(div);
    });
}

// Gestion de la recherche
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input',filterByInputEvent);
//gestion recherche par catégorie
function filterByInputEvent(e){
    const searchTerm = e.target.value.toLowerCase();
    const filteredItems = items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    displayItems(filteredItems);
}

function filterByCategory(catsearched){      
    const newUrl = window.location.href.split('#')[0] + '#'+catsearched;        
    window.history.pushState({}, '', newUrl);
    const filteredItems = items.filter(item => 
        item.category.toLowerCase().includes(catsearched.toLowerCase())
    );
    displayItems(filteredItems);
}

/**
 * @param {[string]} categoriesList 
 */
function displayCategories(categoriesList) {
    $("#navbar").empty();   
    const $ul = $("<ul>");
    $("#navbar").append($ul);
    
    categoriesList.map((item) => {
            const $li = $(`<li id="${item}">`);
            
            $li.text(item);
            $li.on('click', function(e) { handleClickCategory(e.target.id)});
            $ul.append($li);
        }
    )
    const $span = $("<span>");
    $span.addClass("underline");
    $ul.append($span);    
}

function selectCategory(textcat) {
    filterByCategory(textcat);        
    console.log("offset textcat :",+$("#"+textcat).outerHeight())
    moveUnderline($("#"+textcat).position().top+$("#"+textcat).outerHeight(),$("#"+textcat).outerWidth());
}

// Gestion des événements de la sidebar
function handleClickCategory(catselected) {
    console.log("action sur catelement : ",catselected)
    $("#"+catselected).siblings().removeClass("active");
    $("#"+catselected).addClass('active');
    selectCategory(catselected);       
}

function moveUnderline(totop,mywidth){
    //console.log("ton top ",totop)
    const $underline = $('.underline');
    console.log($underline)
    console.log(totop)
    console.log(mywidth)

    //const $underline = $('.underline');
    $underline.css('top',(totop)+'px');
    $underline.css('width',(mywidth)+'px');
}






const domain = "https://www.paniette.fr/projets/github/data/";
const jsonData = "bouts.json";//../data/bouts.json

async function fetchBouts() {
    try {
        // Faire la requête fetch
        const response = await fetch(domain+jsonData);
        
        // Vérifier si la requête a réussi
        if (!response.ok) {
            throw new Error(`HTTP bouts error! status: ${response.status}`);
        }
        
        // Convertir la réponse en JSON
        const data = await response.json();
        const categoriesList = [];
        
        data.forEach(bout => {
            if(!categoriesList.includes(bout.category)){categoriesList.push(bout.category)}
        });
        items = data;   //save list complete items
        displayItems(data);
        displayCategories(categoriesList);       

        
        
        window.location.href.includes("#") ?  handleClickCategory(window.location.href.split('#')[1]) : null;
        
    } catch (error) {
        console.error('Erreur lors de la récupération des bouts :', error);
    }
}
