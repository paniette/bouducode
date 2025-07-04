document.addEventListener('DOMContentLoaded', function() {
    // Exemple de données pour démonstration
    const items = [
        { id: 1, name: 'Item 1', category: 'Category A', boutdecode:''},
        { id: 2, name: 'Item 2', category: 'Category B' , boutdecode:''},
        { id: 3, name: 'Item 3', category: 'Category A' , boutdecode:''}
    ];

    // Fonction pour afficher les éléments
    function displayItems(items) {
        const content = document.getElementById('content');
        content.innerHTML = '';
        
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'item';
            div.innerHTML = `
                <h3>${item.name}</h3>
                <p>${item.category}</p>
            `;
            content.appendChild(div);
        });
    }

    // Initialisation de l'affichage
    displayItems(items);

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

    // Gestion des événements de la sidebar
    const menuItems = document.querySelectorAll('.sidebar nav ul li');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Retirer la classe active de tous les éléments
            menuItems.forEach(i => i.classList.remove('active'));
            // Ajouter la classe active à l'élément cliqué
            this.classList.add('active');
            
            // Ici, vous pouvez ajouter la logique de filtrage par catégorie
            const category = this.textContent;
            // Exemple de filtrage :
            // const filteredItems = items.filter(item => item.category === category);
            // displayItems(filteredItems);
        });
    });
    
    async function fetchBouts() {
        try {
            // Faire la requête fetch
            const response = await fetch('../data/bouts.json');
            
            // Vérifier si la requête a réussi
            if (!response.ok) {
                throw new Error(`HTTP bouts error! status: ${response.status}`);
            }
            
            // Convertir la réponse en JSON
            const data = await response.json();
            
            // Afficher les données dans la console
            console.log('Données bouts récupérées:', data);
            
           
            data.forEach(bout => {
                console.log(bout.id);
            });
    
        } catch (error) {
            console.error('Erreur lors de la récupération des bouts :', error);
        }
    }

    fetchBouts();
}); 