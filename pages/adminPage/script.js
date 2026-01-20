import { createClient } from "https://esm.sh/@supabase/supabase-js";

const URLsupaBase = "https://ojrtertbnekmxdudvcwg.supabase.co"
const ChaveSupaBase = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qcnRlcnRibmVrbXhkdWR2Y3dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5OTQ0NzYsImV4cCI6MjA4MDU3MDQ3Nn0.Rnih5XtRIqtUmSeUGsFAh518H5sINC6fOL7j-OZIlns"
const supabase = createClient(URLsupaBase, ChaveSupaBase)

//função da API

const adicionarProduto = async (evento) => {
    evento.preventDefault();

    const btn = document.getElementById('enviar');
    btn.innerHTML = "Enviando...";
    btn.disabled = true;

    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const valor = document.getElementById('valor').value;
    const imagem = document.getElementById('imagem').value;

    try {
        const { data, error } = await supabase
            .from('produtos')
            .insert([{ nome: nome, descricao: descricao, valor: valor, imagem_url: imagem }]);
        if (error) throw error;

        alert('produto adicionado com sucesso');
        document.getElementById('telaAdmin').reset();
        exibirProduto();
    }
    catch (error) {
        console.error('erro', error.message);
        alert('erro', error);
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
        const { data: produtos, error } = await supabase
            .from('produtos')
            .select('*')

        if (error) throw error;

        exibicaoProd.innerHTML = ''

        produtos.forEach(produto => {
            exibicaoProd.innerHTML += `
            <div class='cardProduto'>
                <img class= 'imagemProduto' src="${produto.imagem_url}">
                <div class='juncaoCard'>
                    <h3 class= 'tenor-sans-regular'>${produto.nome}</h3>
                    <h4 class= 'tenor-sans-regular'>ID: ${produto.id}</h4>
                    <label class= 'tenor-sans-regular'>${produto.descricao}</label>
                    <h3 class= 'tenor-sans-regular'>${produto.valor}</h3>
                </div>
                <label class= 'tenor-sans-regular'>Categoria: ${produto.categoria_id}</label>
                <div class='botao'>
                    <button type='button' onclick='preencherForm(${produto.id})' class= 'material-symbols-outlined'>edit</button>
                    <button type='button' onclick\="excluirProduto(${produto.id})" class= 'material-symbols-outlined btnDeletar'>delete</button>
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

    const dados = {
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        valor: document.getElementById('valor').value,
        imagem_url: document.getElementById('imagem').value
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