async function carregarPost() {
    console.log("=== INICIO DA PAGINA ===");
    url = 'https://jsonplaceholder.typicode.com/posts/';
    const resultadoDaApi = await fetch(url, {
        method: 'GET'
    });
    const resultadoComoJson = await resultadoDaApi.json();
    // Mexendo no array para pegar pedaços que eu quero

    const postagens = resultadoComoJson.slice(0, 50);


    console.log(resultadoComoJson.id);

    // Limpar notícias
    $('#post').html("");
        // Montando um array com os HTML das notícias
        const listaDePostagens = postagens.map(postagem => {
            return templatePost({
                id: postagem.id,
                titulo: postagem.title,
                corpo: postagem.body,
            });

        })
        // Inserindo o HTML criado de cada notícia usando jQuery
    listaDePostagens.forEach(tabela => {
        $('#post').append(tabela);
    });
    
    
}


function templatePost({
    id,
    titulo,
    corpo

}) {
    return `
    
    <tr>
        <td class="id-post"><strong>${id}</strong></td>
        <td> <h3>${titulo}</h3>${corpo}</td>
        
    </tr>
      
    `;
}
$(async function () {
    carregarPost()
});