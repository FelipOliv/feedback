const googleSS = require ("google-spreadsheet")
const credentials = require ("./key.json")

const spreadsheet = new googleSS ("chave da planilha aqui")

spreadsheet.useServiceAccountAuth (credentials, error => {

    if ( error )
    {
        console.log ("Falha ao sincronizar com a planilha")
    }
    else
    {
        console.log ("Planilha sicronizada")

        spreadsheet.getInfo ( (error, info) => {

            const workSheet = info.worksheets [ 0 ]

            workSheet.addRow ({

                campo: "valor do campo",
                campo2: "valor do campo"

            }, error => {

                if ( ! error )
                {
                    console.log ("Dados cadastrados na planilha.")
                }
            })
        } )
    }
} )