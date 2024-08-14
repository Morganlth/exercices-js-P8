const DISPLAY = document.getElementById('display')

let
display_RESET = false
,
display_LAST_NUMBER = 0
,
display_LAST_OPERATOR = void 0
,
display_SIGNED_NUMBER = ''
,
display_OPERATORS = [],
display_NUMBERS   = []

function display_getPriorityAndCalc(char = '')
{
    switch (char)
    {
        case    '+': return [1, (n1, n2) => n1 + n2]
        case    '-': return [1, (n1, n2) => n1 - n2]
        case    '*': return [2, (n1, n2) => n1 * n2]
        case    '/': return [2, (n1, n2) =>
                     {
                        if (!n2) throw new Error('Division by zero is not allowed')
            
                        return n1 / n2
                     }]
        default    : return [0, 0]
    }
}

function display_getOperatorObject(priority = 1, operator = '', calc = () => void 0)
{
    return {
        priority,
        operator,
        index   : display_OPERATORS.length,
        calc
    }
}

function display_updateOperators()
{
    const OPERATOR = display_getOperatorObject(...arguments)

    if (display_LAST_OPERATOR)
    {
        const
        VALUE = DISPLAY.value,
        INDEX = display_OPERATORS.length - 1

        DISPLAY.value = VALUE.slice(0, VALUE.length - 3)

        OPERATOR.index = INDEX

        display_OPERATORS[INDEX] = OPERATOR
    }
    else
    {
        display_OPERATORS.push(OPERATOR)
        display_NUMBERS  .push(display_NUMBERS[display_NUMBERS.length - 1])
    }

    display_LAST_OPERATOR = OPERATOR
}

function display_updateNumbers(char = '')
{
    if (!display_LAST_NUMBER)
    {
        const VALUE = DISPLAY.value

        if (!display_LAST_OPERATOR) DISPLAY.value = VALUE.slice(0, VALUE.length - 1)

        display_LAST_NUMBER = parseInt(display_SIGNED_NUMBER + char, 10)
    }
    else display_LAST_NUMBER = display_LAST_OPERATOR ? parseInt(display_SIGNED_NUMBER + char, 10) : parseInt(display_LAST_NUMBER + char, 10)

    display_NUMBERS[display_NUMBERS.length - 1] = display_LAST_NUMBER
}

function display_appendSignedNumber(sign = '')
{
    if (display_SIGNED_NUMBER)
    {
        const VALUE = DISPLAY.value

        DISPLAY.value = VALUE.slice(0, VALUE.length - 1)
    }

    DISPLAY.value += display_SIGNED_NUMBER = sign
}

function appendToDisplay(char = '')
{
    const [PRIORITY, CALC] = display_getPriorityAndCalc(char)

    if (display_RESET)
    {
        DISPLAY.value = '0'

        display_RESET = false
    }

    if (PRIORITY)
    {
        if   (display_LAST_OPERATOR?.priority === 2) return display_appendSignedNumber(char)
        else
        {
            display_updateOperators(PRIORITY, char, CALC)

            display_SIGNED_NUMBER = ''
        }
    }
    else
    {
        display_updateNumbers(char)

        display_LAST_OPERATOR = void 0
    }

    DISPLAY.value += PRIORITY ? ` ${char} ` : char
}

function clearDisplay(value = '0')
{
    DISPLAY.value = value

    display_RESET = true

    display_NUMBERS = [display_LAST_NUMBER = display_OPERATORS.length = 0]

    display_LAST_OPERATOR = void 0

    display_SIGNED_NUMBER = ''
}

function calculateResult()
{
    const
    OPERATORS = display_OPERATORS.sort((a, b) => b.priority - a.priority).map(({operator, index, calc}) => [index, calc, operator]),
    NUMBERS   = [...display_NUMBERS]

    let result = 0

    for (let i = 0, max = OPERATORS.length; i < max; i++)
    {
        const [INDEX, calc, OPERATOR] = OPERATORS[i]

        const
        N1 = NUMBERS[INDEX    ],
        N2 = NUMBERS[INDEX + 1]
        
        try { result = calc(N1, N2) } catch ({message}) { return clearDisplay(message) }

        NUMBERS.splice(INDEX, 2, result)

        // console.log(N1, OPERATOR, N2, '=', result, ', index:', INDEX, ', numbers', NUMBERS)

        for (let j = i + 1; j < max; j++) if (OPERATORS[j][0] > INDEX) OPERATORS[j][0] -= 1
    }

    clearDisplay(result)
}

clearDisplay()