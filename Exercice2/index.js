// Créez votre fonction ici

// Exemples d'utilisation de la fonction
console.log(calculate(5, 3, '+'));   // Affiche 8
console.log(calculate(10, 4, '-'));  // Affiche 6
console.log(calculate(7, 2, '*'));   // Affiche 14
console.log(calculate(12, 3, '/'));  // Affiche 4
console.log(calculate(8, 0, '/'));   // Affiche "Division by zero is not allowed"
console.log(calculate(4, 5, '%'));   // Affiche "Invalid operator"

export default function calculate(n1 = 0, n2 = 0, operator = '')
{
    if (typeof n1 === 'string') n1 = parseInt(n1, 10)
    if (typeof n2 === 'string') n2 = parseInt(n2, 10)
    
    switch (operator)
    {
        case    '+': return n1 + n2
        case    '-': return n1 - n2
        case    '*': return n1 * n2
        case    '/': return n2 ? n1 / n2 : 'Division by zero is not allowed'
        default    : return 'Invalid operator'
    }
}
