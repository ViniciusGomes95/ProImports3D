let catalogoProdutos = [];

// Carrega o banco de dados JSON assim que a página abre
fetch('produtos.json')
  .then(response => response.json())
  .then(data => {
    catalogoProdutos = data;
  })
  .catch(error => console.error('Erro ao carregar o catálogo JSON:', error));

// Função auxiliar para remover acentos e facilitar a busca
function normalizarTexto(texto) {
  if (!texto) return '';
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // Remove acentos (ex: "Chaveiro" vira "chaveiro")
}

function executarBuscaGlobal() {
  const inputElement = document.getElementById('searchInput');
  const box = document.getElementById('searchResults');
  
  if (!inputElement || !box) return;

  const termoBusca = normalizarTexto(inputElement.value.trim());
  box.innerHTML = '';

  // Se digitar menos de 2 caracteres, esconde a caixa de resultados
  if (termoBusca.length < 2) {
    box.style.display = 'none';
    return;
  }

  // Pesquisa ampla em múltiplos campos do JSON
  const resultados = catalogoProdutos.filter(item => {
    const nome = normalizarTexto(item.nome);
    const categoria = normalizarTexto(item.categoria);
    const marca = normalizarTexto(item.marca);
    const material = normalizarTexto(item.material);
    const descricao = normalizarTexto(item.descricao);

    return (
      nome.includes(termoBusca) ||
      categoria.includes(termoBusca) ||
      marca.includes(termoBusca) ||
      material.includes(termoBusca) ||
      descricao.includes(termoBusca)
    );
  });

  if (resultados.length === 0) {
    box.innerHTML = `<div class="search-item-empty">Nenhum produto encontrado</div>`;
  } else {
    resultados.forEach(item => {
      const a = document.createElement('a');
      a.href = item.ancora || '#';
      a.className = 'search-item';
      a.innerHTML = `
        <div>
          <strong>${item.nome}</strong>
          <small style="display:block; color: #64748b;">${item.marca || ''}</small>
        </div>
        <span class="search-category">${item.categoria || ''}</span>
      `;
      box.appendChild(a);
    });
  }

  box.style.display = 'block';
}

// Esconde o menu suspenso ao clicar fora da busca
document.addEventListener('click', function(e) {
  const searchBox = document.querySelector('.search-box');
  if (searchBox && !searchBox.contains(e.target)) {
    const box = document.getElementById('searchResults');
    if (box) box.style.display = 'none';
  }
});
