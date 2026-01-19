import { createClient } from "https://esm.sh/@supabase/supabase-js";

const URLsupaBase = "https://ojrtertbnekmxdudvcwg.supabase.co"
const ChaveSupaBase = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qcnRlcnRibmVrbXhkdWR2Y3dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5OTQ0NzYsImV4cCI6MjA4MDU3MDQ3Nn0.Rnih5XtRIqtUmSeUGsFAh518H5sINC6fOL7j-OZIlns"
const supabase = createClient(URLsupaBase, ChaveSupaBase)

async function carregarCategoria (){

    const [resCategorias, resProdutos] = await Promise.all([
        supabase.from('categorias').select('id, nome, imagem_url'),
        supabase.from('produtos').select('id, nome, descricao, valor, imagem_url, categoria_id')
    ])

    const {data: categorias, error:errorCat} = resCategorias
    const {data: produtos, error:errorProd} = resProdutos
    
    if (errorCat || errorProd) {
        console.error("error ao buscar: ", error);
        return;
    }

    const containerCategorias = document.getElementById('containerCategorias')
    const containerProdutos = document.getElementById('containerProdutos') 

    containerCategorias.innerHTML = ''
    containerProdutos.innerHTML = ''

    categorias.forEach(categoria => {
        const cardCat = `
            <div class='cardCategoria'>
                <img class="imagemCategoria" src="${categoria.imagem_url}">
                <h3 class="tenor-sans-regular">${categoria.nome}</h3>
            </div>
        `

        containerCategorias.innerHTML += cardCat;
    });

    produtos.forEach(produto =>{
        const preco = parseFloat(produto.valor || 0).toFixed(2);
        const cardProd = `
            <div class = 'cardProduto'>
                <img class='imagemProduto' src="${produto.imagem_url}">
                <h3 class="tenor-sans-regular nomeProduto">${produto.nome}</h1>
                <label class="tenor-sans-regular">${produto.descricao}</label>
                <h4 class='tenor-sans-regular'>R$ ${preco}</h4>
                </div>
        `
        containerProdutos.innerHTML += cardProd
    });
}

carregarCategoria()

const btnMenu = document.getElementById('btnPerfil')
const menu = document.getElementById('menu')

btnMenu.addEventListener('click', (event) =>{
    event.stopPropagation();

    menu.classList.toggle('menu-ativo');
});

/**pra mandar */