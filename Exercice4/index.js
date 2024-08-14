const MY_BUTTON = document.getElementById('myButton')

MY_BUTTON?.addEventListener('click', mybutton_eClick)

let button_CLICKED = false

function mybutton_eClick()
{
    if (!button_CLICKED)
    {
        MY_BUTTON.insertAdjacentHTML('afterend', '<p>Bonjour, vous avez cliqué sur le bouton !</p>')

        button_CLICKED = true
    }
}