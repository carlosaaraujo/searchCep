var submitButton = document.querySelector('#app form button')
var zipCodeField = document.querySelector('#app form input')
var content = document.querySelector('#app main')

submitButton.addEventListener('click', run)

function run(event)
{
    event.preventDefault()
    var zipCode = zipCodeField.value

    // Tratativa do CEP que vai ser inserido no campo
    zipCode = zipCode.replace(' ', '')
    zipCode = zipCode.replace('.', '')
    zipCode = zipCode.trim()

    // usando a api do ajax (axios) para fazer localStorage
    axios.get('https://viacep.com.br/ws/' + zipCode + '/json/')
    .then(function (response) {
        if (response.data.erro) {
            throw new Error('CEP Inválido')
        }
        content.innerHTML = ''
        createLine(response.data.logradouro)
        createLine(response.data.localidade + '/' + response.data.uf)
        createLine(response.data.bairro)
    })
    .catch(function (error) {
        content.innerHTML = ''
        createLine('Ops, algo deu errado!')
    })
}

function createLine(text) {
    var line = document.createElement('p')
    var text = document.createTextNode(text)

    line.appendChild(text)
    content.appendChild(line)
}