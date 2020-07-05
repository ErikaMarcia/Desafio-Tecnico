
async function carregarPost() {
    console.log("=== INICIO DA PAGINA ===");
    url = 'https://jsonplaceholder.typicode.com/posts/';
    const resultadoDaApi = await fetch(url, {
        method: 'GET'
    });
    const resultadoComoJson = await resultadoDaApi.json();

    const postagens = resultadoComoJson.slice(0, 10);
  
    const listaDePostagens = [];
    for (const postagem of postagens) {
        const listaDeComentarios = await carregarComments(postagem.id);
        listaDePostagens.push(
            templatePost({
                id: postagem.id,
                titulo: postagem.title,
                corpo: postagem.body,
                listaDeComentarios: listaDeComentarios
            })
        );
        console.log(listaDeComentarios);
    }


    listaDePostagens.forEach(tabela => {
        $('#corpo').append(tabela);
    });


}


function templatePost({
    id,
    titulo,
    corpo,
    listaDeComentarios

}) {
    return `
    <tbody >
        
        <tr>
            <td  class="postagem"><h3>${titulo}</h3>${corpo}</td>
                <td>
                    <table>
                        <tbody class ="comments">
                        <tr>
                            <th><img src="./assets/bate-papo.svg"><strong>Comentários</strong></th>
                        </tr>
                            ${listaDeComentarios}                  
                        </tbody>
                    </table>
                </td>
        </tr>                
    </tbody>
        
    
      
    `;
}

$(async function () {
    carregarPost()
});

async function carregarComments(idPost) {
    console.log("=== COMENTARIOS ===");
    url = 'https://jsonplaceholder.typicode.com/posts/' + idPost + '/comments';
    const resultadoDaApiC = await fetch(url, {
        method: 'GET'
    });
    const cresultadoComoJson = await resultadoDaApiC.json();
    // Mexendo no array para pegar pedaços que eu quero
    const comentarios = cresultadoComoJson.slice(0, 2);



    // Montando um array com os HTML das notícias
    const listaDeComentarios = comentarios.map(comentario => {
        return templateComments({
            tituloCom: comentario.name,
            corpoCom: comentario.body,
            email: comentario.email
        });

    })
    return new Promise((resolve) => {
        resolve(listaDeComentarios);
    });

}


function templateComments({
    tituloCom,
    corpoCom,
    email

}) {
    return `
            <tr>
                <td>
                    <h4>${tituloCom}</h4>${corpoCom}<p>${email}</p>
                </td>
            </tr>
        `;
}




