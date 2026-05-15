async function buscarGeral() {
    await fetch ("http://localhost:5069/api/Cliente")
    .then(response => response.json())
    .then(cliente =>{
        const listaGeral = document.getElementById('cliente-lista')

        cliente.forEach(c => {
            const li = document.createElement('li')
            li.innerHTML = `Nome: ${c.nome} - Email: ${c.email}

            <button onclick="prepararEdicao('${c.idcliente}', '${c.nome}', '${c.email}')" style="background-color:cyan">Editar</button>
            <button onclick="DeletarCliente(${c.idcliente})" style="background-color:red">Excluir</button>`

            listaGeral.appendChild(li)
        });
    })

   
}

buscarGeral()


async function cadastrarCliente() {

    const nome = document.getElementById('nomeCliente').value 
    const email = document.getElementById('emailCliente').value

    await fetch(`http://localhost:5069/api/Cliente`,{
        method: 'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            nome: nome,
            email: email
        })
    })

    alert("Usuário cadastro com sucesso!!")

    window.location.reload()

}

    let editandoCliente = null;

    function prepararEdicao(id, nome, email) {
        document.getElementById('nomeCliente').value = nome
        document.getElementById('emailCliente').value = email

        editandoCliente = id
    }

    async function AtualizarCliente() {
        if (!editandoCliente) 
        return alert("Selecione um cliente")
   

        const nome = document.getElementById('nomeCliente').value
        const email = document.getElementById('emailCliente').value

    

    await fetch(`http://localhost:5069/api/Cliente/${editandoCliente}`,{

        method: 'PUT',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({idcliente:editandoCliente, nome: nome, email: email})

    })
    alert("Cliente Atualizado!!")
    editandoCliente = null
    window.location.reload()

}

async function DeletarCliente(id){
    if(confirm("Deseja excluir?")) {
        await fetch(`http://localhost:5069/api/Cliente/${id}`,{method: 'DELETE'})
            alert("Excluído!")
        window.location.reload()
    }
}

