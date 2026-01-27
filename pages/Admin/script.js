import { createClient } from "https://esm.sh/@supabase/supabase-js";

const URLsupaBase = "https://ojrtertbnekmxdudvcwg.supabase.co"
const ChaveSupaBase = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qcnRlcnRibmVrbXhkdWR2Y3dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5OTQ0NzYsImV4cCI6MjA4MDU3MDQ3Nn0.Rnih5XtRIqtUmSeUGsFAh518H5sINC6fOL7j-OZIlns"
const supabase = createClient(URLsupaBase, ChaveSupaBase)

//função dos produtos da API

//função Mostrar CheckBox
async function checkbox() {
    const exibirCheckbox = document.getElementById('mostrarCheckbox');

    try {
        const { data: categorias, error } = await supabase
            .from('categorias')
            .select('*')

        if (error) throw error;

        exibirCheckbox.innerHTML = ''

        categorias.forEach(categoria => {
            exibirCheckbox.innerHTML += `
                    <div class='divCheckbox'>
                        <label class='lblCheckbox tenor-sans-regular'>
                        <input type="radio" name='catSelecionada' class="enviarCheckbox" value=' ${categoria.id} '>
                            <div class='conteudo'>
                                <img class='imgCheckbox' src="${categoria.imagem_url}">
                                ${categoria.nome}
                            </div>
                        </label>
                    </div>
            `
        })
    } catch (error) {
        console.log("erro: ", error.message)
    }
}
checkbox()

//função AdicionarProduto
const adicionarProduto = async (evento) => {
    evento.preventDefault();

    const btn = document.getElementById('enviar');
    btn.innerHTML = "Enviando...";
    btn.disabled = true;

    const catMarcada = document.querySelector('input[name="catSelecionada"]:checked')
    const dados = {
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        valor: document.getElementById('valor').value,
        imagem_url: document.getElementById('imagem').value,
        categoria_id: catMarcada ? catMarcada.value : null
    }

    try {
        const { data, error } = await supabase
            .from('produtos')
            .insert(dados);
        if (error) throw error;

        alert('produto adicionado com sucesso');
        document.getElementById('telaAdmin').reset();
        exibirProduto();
    }
    catch (error) {
        console.error('erro', error.message);
        alert('erro', error.message);
    }
    finally {
        btn.innerHTML = "Enviar";
        btn.disabled = false;
    }
};

document.getElementById('telaAdmin').addEventListener('submit', adicionarProduto);

//função exibir produtos
async function exibirProduto() {
    const exibicaoProd = document.getElementById('exibirProduto');

    try {
        const [resCat, resProd] = await Promise.all([
            supabase.from('categorias').select('*'),
            supabase.from('produtos').select('*')
        ])

        const { data: categorias, errorCat } = resCat
        const { data: produtos, errorProd } = resProd

        if (errorCat || errorProd) {
            console.log('erro: ', errorCat?.message || errorProd?.message)
            return;
        }

        exibicaoProd.innerHTML = ''

        produtos.forEach(produto => {
            const categoriaProd = categorias.find(categoria => categoria.id == produto.categoria_id)
            const imagemCat = categoriaProd ? categoriaProd.imagem_url : 'null'
            const nomeCat = categoriaProd ? categoriaProd.nome : 'null'

            exibicaoProd.innerHTML += `
            <div class='cardProduto'>
                <img class= 'imagemProduto' src="${produto.imagem_url}">
                <div class='juncaoCard'>
                    <label class= 'lblNome tenor-sans-regular'>${produto.nome}</label>
                    <label class= 'lblDescricao tenor-sans-regular'>${produto.descricao}</label>
                    <label class= 'lblValor tenor-sans-regular'>${parseFloat(produto.valor || 0).toFixed(2)}</label>
                </div>
                <div class='CatProdContainer'>
                    <div class='categoriaNoProduto'>
                        <img src='${imagemCat}' class='imgcatNoProd'>
                        <label>${nomeCat}</label>
                    </div>
                </div>
                <div class='botao'>
                    <button type='button' onclick='preencherForm(${produto.id})' class= 'material-symbols-outlined'>edit</button>
                    <button type='button' onclick="excluirProduto(${produto.id})" class= 'material-symbols-outlined btnDeletar'>delete</button>
                </div>
            </div>
            `
        })
    }
    catch (error) {
        console.error('erro', error.message)
    };
}
exibirProduto();

//função excluir produto
async function excluirProduto(id) {
    try {
        const { error } = await supabase
            .from('produtos')
            .delete()
            .eq('id', id);

        if (error) throw error;

        exibirProduto();
    } catch (error) {
        alert('erro', error.message)
    }
};
window.excluirProduto = excluirProduto

//preencher formulario para a função editar
let idEdit

async function preencherForm(id) {
    idEdit = id;

    try {

        const { data: produto, error } = await supabase
            .from('produtos')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        document.getElementById('nome').value = produto.nome;
        document.getElementById('descricao').value = produto.descricao;
        document.getElementById('valor').value = produto.valor;
        document.getElementById('imagem').value = produto.imagem_url;

        const btn = document.getElementById('enviar')
        btn.innerHTML = 'Salvar';

        const form = document.getElementById('telaAdmin');
        form.removeEventListener('submit', adicionarProduto);
        form.onsubmit = editarProduto;
    } catch (error) {
        alert('error', error.message)
    }
}
window.preencherForm = preencherForm

//função editar produto
async function editarProduto(evento) {
    if (evento) evento.preventDefault();

    const catMarcada = document.querySelector('input[name="catSelecionada"]:checked')

    const dados = {
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        valor: document.getElementById('valor').value,
        imagem_url: document.getElementById('imagem').value,
        categoria_id: catMarcada ? catMarcada.value : null
    };
    try {
        const { error } = await supabase
            .from('produtos')
            .update(dados)
            .eq('id', idEdit)

        if (error) throw error;

        const form = document.getElementById('telaAdmin');
        form.reset();
        form.onsubmit = null
        form.addEventListener('submit', adicionarProduto);

        document.getElementById('enviar').innerHTML = "Enviar"
        idEdit = null;
        exibirProduto();

    } catch (error) {
        alert('erro', error.message)
    }
    exibirProduto();
}
window.editarProduto = editarProduto

// Função das Categorias da API

// função Exibir Categorias
async function exibirCategorias() {
    const exibicaoCat = document.getElementById('exibirCategoria')

    try {
        const { data: categorias, error } = await supabase
            .from('categorias')
            .select('*')

        if (error) throw error;

        exibicaoCat.innerHTML = ''

        categorias.forEach(categoria => {
            exibicaoCat.innerHTML += `
            <div class='cardCategoria'>
                <img class='imagemCat' src='${categoria.imagem_url}'>
                <h2 class='lblNomeCat tenor-sans-regular'>${categoria.nome}</h2>
                <div class='botao'>
                    <button type='button' onclick='preencherCampo(${categoria.id})' class= 'material-symbols-outlined'>edit</button>
                    <button type='button' onclick="excluirCategoria(${categoria.id})" class= 'material-symbols-outlined btnDeletar'>delete</button>
                </div>
            </div>
            `
        })
    } catch (error) {
        console.log('erro: ', error)
    }
}
exibirCategorias()

//função de preencher os campos
let idEditCat
async function preencherCampo(id) {
    idEditCat = id;

    try {
        const { data: categoria, error } = await supabase
            .from('categorias')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        document.getElementById('inputNome').value = categoria.nome;
        document.getElementById('inputUrl').value = categoria.imagem_url

        const btn = document.getElementById('btnEnviarCat')
        btn.innerHTML = 'Salvar'

        const form = document.getElementById('telaAdminCategoria')
        form.removeEventListener('submit', adicionarCategoria);
        form.onsubmit = editarCategoria
    } catch (error) {
        alert('erro: ', error.message)
    }
}
window.preencherCampo = preencherCampo

//função de Adicionar Categoria
async function adicionarCategoria(evento) {
    evento.preventDefault();

    const btn = document.getElementById('btnEnviarCat')
    btn.disabled = true;
    btn.innerHTML = 'Adicionando...'

    const dados = {
        nome: document.getElementById('inputNome').value,
        imagem_url: document.getElementById('inputUrl').value
    }
    try {
        const { error } = await supabase
            .from('categorias')
            .insert(dados)
        if (error) throw error;

        alert('Categoria Adicionada')
        document.getElementById('telaAdminCategoria').reset();
        exibirCategorias();
    } catch (error) {
        console.log('erro:', error)
        alert('Erro ao adicionar')
    } finally {
        btn.innerHTML = 'Enviar'
        btn.disabled = false
    }
}
document.getElementById('telaAdminCategoria').addEventListener('submit', adicionarCategoria);

//função de Editar categoria
async function editarCategoria(evento) {
    if (evento) evento.preventDefault();

    const dados = {
        nome: document.getElementById('inputNome').value,
        imagem_url: document.getElementById('inputUrl').value
    }

    try {
        const { error } = await supabase
            .from('categorias')
            .update(dados)
            .eq('id', idEditCat)

        if (error) throw error;

        const form = document.getElementById('telaAdminCategoria')
        form.reset();
        form.onsubmit = null
        form.addEventListener('submit', adicionarCategoria)

        document.getElementById('btnEnviarCat').innerHTML = "Enviar"
        idEditCat = null;
        exibirCategorias();
    } catch (error) {
        alert('erro:', error.message)
    }
    exibirCategorias();
}
window.editarCategoria = editarCategoria

//função de excluir Produto
async function excluirCategoria(id) {
    try {
        const { error } = await supabase
            .from('categorias')
            .delete()
            .eq('id', id)
        if (error) throw error;

        exibirCategorias();
    } catch (error) {
        console.log('erro: ', error, message)
    }
}
window.excluirCategoria = excluirCategoria



// Selecionar Produto ou Categoria
const btnProduto = document.getElementById('btnProduto')
const btnCategoria = document.getElementById('btnCategoria')
const menuProduto = document.getElementById('menuProduto')
const menuCategoria = document.getElementById('menuCategoria')

function alternarCatProd (tipo) {
    if (tipo == 'produto') {
        menuProduto.classList.add('menuAtivo');
        btnProduto.classList.add('btnAtivo');

        menuCategoria.classList.remove('menuAtivo');
        btnCategoria.classList.remove('btnAtivo');
    }else{
        menuCategoria.classList.add('menuAtivo');
        btnCategoria.classList.add('btnAtivo');

        menuProduto.classList.remove('menuAtivo')
        btnProduto.classList.remove('btnAtivo')
    }
}

btnProduto.addEventListener('click', (x) => {
    x.preventDefault();
    alternarCatProd('produto');
})

btnCategoria.addEventListener('click', (x) => {
    x.preventDefault();
    alternarCatProd('categoria')
})

alternarCatProd('produto')



// Função para a rolagem do mause mover no eixo y
const horizontalScroll = document.getElementById('mostrarCheckbox');

horizontalScroll.addEventListener ('wheel', (evento) =>{
    evento.preventDefault();

    horizontalScroll.scrollLeft += evento.deltaY;
});