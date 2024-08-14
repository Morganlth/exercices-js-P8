const DECIMAL_INPUT = document.getElementById('decimalInput')

const BINARY_RESULT = document.getElementById('binaryResult')

function convertToBinary()
{
    const VALUE = DECIMAL_INPUT.value

    BINARY_RESULT.innerText = /\D/gm.test(VALUE) ? '' : parseFloat(VALUE).toString(2)
}