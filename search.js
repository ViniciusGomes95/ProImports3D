let catalogoProdutos = [];

// Carrega o banco de dados JSON assim que a página abre
fetch('produtos.json')
  .then(response => response.json())
  .then(data => {
    catalogoProdutos = data;
  })
  .catch(error => console.error('Erro ao carregar o catálogo JSON:', error));

function executarBuscaGlobal() {
  const input = document.getElementById('searchInput').value.toLowerCase().trim();
  const box = document.getElementById('searchResults');
  
  box.innerHTML = '';

  if (input.length < 2) {
    box.style.display = 'none';
    return;
  }

  // Pesquisa dinâmica no catálogo JSON
  const resultados = catalogoProdutos.filter(item => 
    item.nome.toLowerCase().includes(input) ||
    item.categoria.toLowerCase().includes(input) ||
    item.marca.toLowerCase().includes(input) ||
    (item.material && item.material.toLowerCase().includes(input))
  );

  if (resultados.length === 0) {
    box.innerHTML = `<div class="search-item-empty">Nenhum produto encontrado</div>`;
  } else {
    resultados.forEach(item => {
      const a = document.createElement('a');
      a.href = item.ancora;
      a.className = 'search-item';
      a.innerHTML = `
        <div>
          <strong>${item.nome}</strong>
          <small style="display:block; color: #64748b;">${item.marca}</small>
        </div>
        <span class="search-category">${item.categoria}</span>
      `;
      box.appendChild(a);
    });
  }

  box.style.display = 'block';
}

// Esconde o menu suspenso ao clicar fora
document.addEventListener('click', function(e) {
  const searchBox = document.querySelector('.search-box');
  if (searchBox && !searchBox.contains(e.target)) {
    const box = document.getElementById('searchResults');
    if (box) box.style.display = 'none';
  }
});
