async function carregarTodos() {
    console.log("=== INICIO DA PAGINA ===");
    url = 'https://jsonplaceholder.typicode.com/todos/';
    const resultadoDaApi = await fetch(url, {
        method: 'GET'
    });
    const resultadoComoJson = await resultadoDaApi.json();
    // Mexendo no array para pegar pedaços que eu quero

    const todos = resultadoComoJson.slice(0, 50);


    console.log(resultadoComoJson.id);

    // Limpar notícias
    $('#todos').html("");
        // Montando um array com os HTML das notícias
        const listaDeTodos = todos.map(todo => {
            return templateTodos({
                id: todo.id,
                titulo: todo.title,
            });

        })
        // Inserindo o HTML criado de cada notícia usando jQuery
    listaDeTodos.forEach(tabela => {
        $('#todos').append(tabela);
    });

    $(document).ready( function () {
        $('#corpo').DataTable();
    } );
    
}


function templateTodos({
    id,
    titulo,
    corpo

}) {
    return `
    
    <tr>
        <td class="id-post"><strong>${id}</strong></td>
        <td> <h3>${titulo}</h3></td>
        
    </tr>
      
    `;
}
$(async function () {
    carregarTodos()
});