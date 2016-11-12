/**
 *
 * @param regex
 * @param string
 * @returns {Array}
 */
export const regex = (regex, string) => {

    let m
    let arrMatches = []

    while ((m = regex.exec(string)) !== null) {

        if (m.index === regex.lastIndex) regex.lastIndex++

        m.forEach((match) => arrMatches.push(match) )
    }

    return arrMatches
}