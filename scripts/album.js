async function carregarAlbum() {
    console.log("=== INICIO DA PAGINA ===");
    url = 'https://jsonplaceholder.typicode.com/albums/';
    const resultadoDaApi = await fetch(url, {
        method: 'GET'
    });


    const resultadoComoJson = await resultadoDaApi.json();

    const albuns = resultadoComoJson.slice(0, 5);

    const listaDeAlbuns = [];
    for (const album of albuns) {
        const listaDePhotos = await carregarPhotos(album.id);
        listaDeAlbuns.push(templateAlbum({
            titulo: album.title,
            listaDePhotos: listaDePhotos
        })
        );
    }

    listaDeAlbuns.forEach(tabela => {
        $('#album').append(tabela);
    });

}


function templateAlbum({
    titulo,
    listaDePhotos
}) {
    return `
    
    <tr>
        <td class="album"><h3>${titulo}</h3></td>
        <td>
            <table>
                <tbody>
                    ${listaDePhotos}
                </tbody>
            </table>
        </td>
    </tr>
      
    `;
}

$(async function () {
    carregarAlbum()
});
async function carregarPhotos(idAlbum) {
    console.log("=== COMENTARIOS ===");
    url = 'https://jsonplaceholder.typicode.com/albums/' + idAlbum + '/photos';
    const resultadoDaApiF = await fetch(url, {
        method: 'GET'
    });
    const fresultadoComoJson = await resultadoDaApiF.json();
    // Mexendo no array para pegar pedaços que eu quero
    const fotos = fresultadoComoJson.slice(0, 2);

    let listaDefotos = ``;
    // Montando um array com os HTML das notícias
    for (const foto of fotos) {
        const photo = templateComments({
            tituloF: foto.title,
            urlF: foto.url
        });

        listaDefotos += photo;
    }
    
    return new Promise((resolve) => {
        resolve(listaDefotos);
    });
}

function templateComments({
    tituloF,
    urlF

}) {
    return `
        <tr>
            <td>
                <h4>${tituloF}</h4>
                <img src="${urlF}" alt="">
            </td>
        </tr>
        `;
}

