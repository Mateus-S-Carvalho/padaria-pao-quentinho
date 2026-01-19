import { createClient } from "https://esm.sh/@supabase/supabase-js";

const URLsupaBase = "https://ojrtertbnekmxdudvcwg.supabase.co"
const ChaveSupaBase = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qcnRlcnRibmVrbXhkdWR2Y3dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5OTQ0NzYsImV4cCI6MjA4MDU3MDQ3Nn0.Rnih5XtRIqtUmSeUGsFAh518H5sINC6fOL7j-OZIlns"
const supabase = createClient(URLsupaBase, ChaveSupaBase)

async function carregarCategoria (){

    const {data: categorias, error} = await supabase
        .from('categorias')
        .select("*");
    
    if (error) {
        console.error("error ao buscar as categorias: ", error);
        return;
    }

    const containerCategorias = document.getElementById('containerCategorias')

    containerCategorias.innerHTML = ''

    categorias.forEach(categoria => {
        const card = `
            <div class='cardCategorias'>
                <img src="${categoria.imagem_url}">
                <h3 class="tenor-sans-regular">${categoria.nome}</h3>
            </div>
        `

        containerCategorias.innerHTML += card;
    });
}

carregarCategoria()