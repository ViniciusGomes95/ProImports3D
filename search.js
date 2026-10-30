// Índice de produtos e variações exatas do site
const siteCatalog = [
  // FILAMENTOS - PETG MASTERPRINT
  { name: "PETG Verde Masterprint 1kg", category: "Filamento", link: "filamentos.html#petg-verde", keywords: "petg verde masterprint filamento" },
  { name: "PETG Preto Masterprint 1kg", category: "Filamento", link: "filamentos.html#petg-preto", keywords: "petg preto masterprint filamento" },
  { name: "PETG Azul Translúcido 1kg", category: "Filamento", link: "filamentos.html#petg-azul-translucido", keywords: "petg azul translucido masterprint" },

  // FILAMENTOS - PLA MASTERPRINT
  { name: "PLA Silk Ouro Masterprint 1kg", category: "Filamento", link: "filamentos.html#pla-silk-ouro", keywords: "pla silk ouro dourado masterprint" },
  { name: "PLA Preto Fosco Masterprint 1kg", category: "Filamento", link: "filamentos.html#pla-preto-fosco", keywords: "pla preto fosco masterprint" },

  // IMPRESSÕES 3D / PROJETOS
  { name: "Chaveiro Gol GTI 3D", category: "Impressão 3D", link: "impressoes.html#chaveiro-gti", keywords: "chaveiro gol gti vw automotivo" },
  { name: "Chaveiro Porsche GT3 3D", category: "Impressão 3D", link: "impressoes.html#chaveiro-porsche", keywords: "chaveiro porsche gt3 automotivo" },
  { name: "Cortador de Biscoito/Massa PETG", category: "Impressão 3D", link: "impressoes.html#cortador-biscoito-massa", keywords: "cortador massa biscoito petg culinaria" }
];

function buscarItem() {
  const input = document.getElementById('globalSearch').value.toLowerCase().trim();
  const box = document.getElementById('searchDropdown');
  
  box.innerHTML = '';

  if (input.length < 2) {
    box.style.display = 'none';
    return;
  }

  // Filtra os itens que combinam com o que foi digitado
  const resultados = siteCatalog.filter(item => 
    item.name.toLowerCase().includes(input) || 
    item.keywords.toLowerCase().includes(input)
  );

  if (resultados.length === 0) {
    box.innerHTML = `<div class="search-no-result">Nenhum produto encontrado</div>`;
  } else {
    resultados.forEach(item => {
      const option = document.createElement('a');
      option.href = item.link;
      option.className = 'search-option';
      option.innerHTML = `
        <span class="item-title">${item.name}</span>
        <span class="item-badge">${item.category}</span>
      `;
      box.appendChild(option);
    });
  }

  box.style.display = 'block';
}

// Esconde a lista ao clicar fora da busca
document.addEventListener('click', function(e) {
  const searchContainer = document.querySelector('.search-container');
  if (searchContainer && !searchContainer.contains(e.target)) {
    const box = document.getElementById('searchDropdown');
    if (box) box.style.display = 'none';
  }
});
