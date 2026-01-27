import { createClient } from "https://esm.sh/@supabase/supabase-js";

const URLsupaBase = "https://ojrtertbnekmxdudvcwg.supabase.co"
const ChaveSupaBase = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qcnRlcnRibmVrbXhkdWR2Y3dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5OTQ0NzYsImV4cCI6MjA4MDU3MDQ3Nn0.Rnih5XtRIqtUmSeUGsFAh518H5sINC6fOL7j-OZIlns"
const supabase = createClient(URLsupaBase, ChaveSupaBase)

// Função para mostrar ou não a senha
function mostrarSenha () {
    const senha = document.getElementById('textBoxSenha')
    const btn = document.getElementById('btnSenha')
    
    if (senha.type == 'password'){
        senha.type = 'text';
        btn.innerHTML = 'visibility'
    }
    else {
        senha.type = 'password';
        btn.innerHTML = 'visibility_off'
    }
}
window.mostrarSenha = mostrarSenha

// Função de adicionar usuario na API
async function adicionarUsuario(evento) {
    evento.preventDefault();

    const btn = document.getElementById('btnCriarUsuario')
    btn.innerHTML = 'Criando Usuario';
    btn.disabled = true;

    const dadosUsuarios = {
        nome: document.getElementById('inputNome').value,
        email: document.getElementById('inputEmail').value,
        senha: document.getElementById('textBoxSenha').value
    }

    try {
        const { data, error} = await supabase
            .from('usuarios')
            .insert(dadosUsuarios);
        
        if (error) throw error;
        
        alert('usuario criado com sucesso')
        document.getElementById('textBox').classList.add('desligado')
        document.getElementById('btnLogar').classList.add('ligado')
    }catch (error) {
        console.log('erro: ' + error.message)
        alert('erro' + error.message)
    }
}
document.getElementById('textBox').addEventListener('submit', adicionarUsuario)