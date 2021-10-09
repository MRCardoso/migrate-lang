export const appName = "Megrolang - pratiquei seu inglês"

export const keywords = (extraKeys = []) => {
    keys = ["fala", "falar", "inglês", "de graça", "praticar", "tradução", "língua", "pronuncia", "comunidade"];
    keys = keys.concat(extraKeys)
    return keys.join(', ')
}

export const noIndexPath = (path) => {
    return ['first-from-trip'].indexOf(path) !== -1
}

export const canonicalName = (path = '') => {
    return `https://megrolang.com.br/${path || ''}`
}

export const gameUri = 'https://mardozux.itch.io/the-imaginner'

export const paypalInfo = {
    key: '5GLEV64R9MAEU',
    uri: 'https://www.paypal.com/donate'
}