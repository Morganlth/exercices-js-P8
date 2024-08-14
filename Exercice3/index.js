// Créez votre fonction ici

// Exemples d'utilisation de la fonction
console.log(calculateAverage([5, 10, 15])) // retourne 10
console.log(calculateAverage([10, 20, 30, 20])) // retourne 20
console.log(calculateAverage()) // No numbers to calculate average

export default function calculateAverage(a = [])
{
    const L = a.length

    return L ? a.reduce((acc, n) => acc += n, 0) / L : 'No numbers to calculate average'
}
