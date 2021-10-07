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
