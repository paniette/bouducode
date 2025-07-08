document.addEventListener('DOMContentLoaded', function() {
    // Exemple de données pour démonstration
    const items = [
        { id: 1, name: 'Item 1', category: 'Category A', boutdecode:''},
        { id: 2, name: 'Item 2', category: 'Category B' , boutdecode:''},
        { id: 3, name: 'Item 3', category: 'Category A' , boutdecode:''}
    ];





    // Fonction pour afficher les éléments
    function displayItems(items) {
        const content = document.getElementById('app');
        content.innerHTML = '';
        
        items.forEach(item => {
            console.log("displayitem",item)
            const div = document.createElement('div');
            div.className = 'item';
            div.innerHTML = `
                <h3>${item.name}</h3>
                <p>${item.category}</p>
                <p>${item.boutdecode}</p>
            `;
            content.appendChild(div);
        });
    }







    // Initialisation de l'affichage
    //displayItems(items);
    
    // Gestion de la recherche
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredItems = items.filter(item => 
            item.name.toLowerCase().includes(searchTerm) ||
            item.category.toLowerCase().includes(searchTerm)
        );
        displayItems(filteredItems);
    });


    
// Fonction pour afficher les éléments
function displayCategories(categoriesList) {
    $("#navbar").empty();   
    const $ul = $("<ul>");
    $("#navbar").append($ul);
    
    categoriesList.map((item) => {
            const $li = $("<li>");
            $li.text(item);
            $li.on('click', function(e) { handleClick(e)});
            $ul.append($li);
        }
    )
    const $span = $("<span>");
    $span.addClass("underline");
    $ul.append($span);
    console.log("CREATION CATEGORIES !!! :",$span.offset())
}

    function filterByCategory(){
        //displayItems
    }



    // Gestion des événements de la sidebar
    
    const $menuItems = $('#sidebar ul li').on('click', function(e) {
        // Retirer la classe active de tous les éléments
        //$menuItems.forEach(i => i.removeClass('active'));
        // Ajouter la classe active à l'élément cliqué
       
       handleClick(e);
                
    });

    function handleClick(e) {
        console.log("action sur this : ",e.currentTarget)
        $(e.target).siblings().removeClass("active");
        $(e.target).addClass('active');

        moveUnderline($(e.target).offset().top);

    }

    function moveUnderline(totop){
        console.log("ton top ",totop)
      const $underline = $('.underline');
      console.log($underline)
      //const $underline = $('.underline');
      $underline.css('top',(totop-26)+'px');
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
            // Afficher les données dans la console
            console.log('Données bouts récupérées:', data);
            
           
            data.forEach(bout => {
                if(!categoriesList.includes(bout.category)){categoriesList.push(bout.category)}
                console.log(bout.boutdecode);
            });
            displayItems(data);
            displayCategories(categoriesList);
            
        } catch (error) {
            console.error('Erreur lors de la récupération des bouts :', error);
        }
    }

    fetchBouts();
}); 