async function carregarUsers() {
    console.log("=== INICIO DA PAGINA ===");
    url = 'https://jsonplaceholder.typicode.com/users';
    const resultadoDaApi = await fetch(url, {
        method: 'GET'
    });


    const resultadoComoJson = await resultadoDaApi.json();

    const usuarios = resultadoComoJson.slice(0, 10);

    const listaDeUsuarios = [];
    for (const usuario of usuarios) {
        const listaDeTodos = await carregarTodos(usuario.id);
        listaDeUsuarios.push(templateAlbum({
            id: usuario.id,
            name: usuario.name,
            username: usuario.username,
            email: usuario.email,
            listaDeTodos: listaDeTodos
        })
        );
    }

    listaDeUsuarios.forEach(tabela => {
        $('#todos').append(tabela);
    });
    $(document).ready( function () {
        $('#corpo').DataTable();
    } );

}


function templateAlbum({
    id,
    name,
    username,
    email,
    listaDeTodos
}) {
    return `
    <tr>
        <td>
            <h3>${id}</h3>
        </td>
        <td>
            <p>Nome: ${name}</p>
            <p>Username: ${username}</p>
            <p>Email: ${email}</p>
        </td>
        <td>
            ${listaDeTodos}
            
        </td>
    </tr>   
    `;
}

$(async function () {
    carregarUsers()
});
async function carregarTodos(idUser) {
    console.log("=== COMENTARIOS ===");
    url = 'https://jsonplaceholder.typicode.com/users/' + idUser + '/todos';
    const resultadoDaApiT = await fetch(url, {
        method: 'GET'
    });
    const tresultadoComoJson = await resultadoDaApiT.json();
    // Mexendo no array para pegar pedaços que eu quero
    const todos = tresultadoComoJson.slice(0, 10);

    let listaDeTodos = ``;
    // Montando um array com os HTML das notícias
    for (const todo of todos) {
        const tudo = templateTodos({
            tituloT: todo.title
        });

        listaDeTodos += tudo;
    }
    
    return new Promise((resolve) => {
        resolve(listaDeTodos);
    });
}

function templateTodos({
    tituloT

}) {
    return `
        <h4>${tituloT}</h4><hr>
        `;
}

