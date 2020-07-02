async function carregarAlbum() {
    console.log("=== INICIO DA PAGINA ===");
    url = 'https://jsonplaceholder.typicode.com/albums/';
    const resultadoDaApi = await fetch(url, {
        method: 'GET'
    });
    urlPhotos = 'https://jsonplaceholder.typicode.com/photos/';
    const resultadoDaApiPhoto = await fetch(urlPhotos, {
        method: 'GET'
    });
    const resultadoPhotoComoJson = await resultadoDaApiPhoto.json()
    const resultadoComoJson = await resultadoDaApi.json();
    // Mexendo no array para pegar pedaços que eu quero

    const albuns = resultadoComoJson.slice(0, 50);
    const albunsPhoto = resultadoPhotoComoJson.slice(0, 100);
    console.log(albunsPhoto);
    // Limpar notícias
    $('#post').html("");
        // Montando um array com os HTML das notícias
        const listaDePostagens = albuns.map(album => {
            return templateAlbum({
                id: album.id,
                titulo: album.title,
            });

        })
        // Inserindo o HTML criado de cada notícia usando jQuery
    listaDePostagens.forEach(tabela => {
        $('#album').append(tabela);
    });
    $(document).ready( function () {
        $('#corpo').DataTable();
    } );
    
    
}


function templateAlbum({
    id,
    titulo

}) {
    return `
    
    <tr>
        <td class="id-post"><strong>${id}</strong></td>
        <td><a href="#"><h3>${titulo}</h3></a></td>
        
    </tr>
      
    `;
}
$(async function () {
    carregarAlbum()
});