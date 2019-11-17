const express = require ("express")
const path = require ("path") // já está no core do node, ou seja, não precisa do npm install
const googleSS = require ("google-spreadsheet")
const credentials = require ("./key.json")

const app = express()

// ~ configs ~ //

const spreadSheet_ID = "..."
const spreadSheet_Index = 0

// configurando o ejs como template engine //
app.set ("view engine", "ejs")

// especificando onde estão as views do app (onde o express deve buscar as views) //
app.set ("views", path.resolve (__dirname, "views")) // path.resolve ? -> no windows usa-se o \ (contra-barra) para expecificar caminhos, no linux usa-se / (barra), então o path.resolve vai cuidar disso

// parseando as requisições POST para Objetos JSON
app.use (express.json())
app.use ( express.urlencoded ( { extended: true } ) )

// routes //

app.get ("/", (request, response) => response.render ("form"))

app.post ("/", (request, response) => {

    const spreadsheet = new googleSS ( spreadSheet_ID )

    spreadsheet.useServiceAccountAuth (credentials, error => {

        if ( error )
        {
            console.log ("Falha ao sincronizar com a planilha")
        }
        else
        {
            const { } = request.body

            console.log ("Planilha sicronizada...")

            spreadsheet.getInfo ( (error, info) => {

                const workSheet = info.worksheets [ spreadSheet_Index ]

                workSheet.addRow ({ }, error => {

                    if ( ! error )
                    {
                        console.log ("Dados cadastrados na planilha.")

                        response.send ("Obrigado pelo feedback :)")
                    }
                })
            })
        }
    })
})

// ~ server ~ //

app.listen(3000, error => {

    if ( error )
    {
        console.log ("Falha ao subnir a aplicação => ", error)
    }
    else
    {
        console.log("Aplicação rodando em https://localhost:3000")
    }
})