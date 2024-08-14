//votre code ici

export default function pairNumbers(min = 0, max = 0)
{
    if (typeof min === 'string') min = parseInt(min, 10)
    if (typeof max === 'string') max = parseInt(max, 10)
    
    if (min >= max) return ''

    let
    i = min + Math.abs(min) % 2,
    a = [i]

    while ((i += 2) <= max) a.push(i)

    return a.join()
}
