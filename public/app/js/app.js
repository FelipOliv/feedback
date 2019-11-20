window.onload = () => {

    // development -> const clog = args => console.log (args)

    const getElement = selector => document.querySelector (selector)

    const getAllElements = elements => document.querySelectorAll (elements)

    const buttonsChangeStep = Array.from ( getAllElements (".button-toggle-step") )

    buttonsChangeStep.map ( button => {

        button.onclick = ({target}) => {

            getElement (target.dataset.steph).classList.toggle ("step-hidden") // [steph] -> step for hidden (h)
            getElement (target.dataset.steps).classList.toggle ("step-hidden") // [steps] -> step for show (s)
        }
    })

    // get Data and set on inputs

    const locale = "pt-BR"

    const date = new Date

    getElement (".date").value = date.toLocaleDateString (locale)
    getElement (".hour").value = date.toLocaleTimeString (locale)
}