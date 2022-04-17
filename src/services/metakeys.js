import { event } from "./gtag";

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

export const gameUri = 'https://store.steampowered.com/app/1946280/Small_phrases_Great_stories/'

export const paypalInfo = {
    key: '5GLEV64R9MAEU',
    uri: 'https://www.paypal.com/donate'
}

export const gaEventImaginner = () => {
    event({
        action: "bob_the_imaginner",
        category: "engagement",
        label: "The imaginner",
        value: "access link game"
    })
}

export const gaEventSocialMidia = (name) => {
    event({
        action: "social_midia",
        category: "engagement",
        label: name,
        value: `access ${name}`
    })
}

export const gaEventDonate = (name) => {
    event({
        action: "donate",
        category: "contribute",
        label: `Donate ${name}`,
        value: `access ${name}`
    })
}

export const gaEventTranslate = (state) => {
    event({
        action: "request_translate",
        category: "resources",
        label: `Translate ${state}`,
        value: `access ${state}`
    })
}

export const gaEventStories = (name) => {
    event({
        action: "read_stories",
        category: "engagement",
        label: name,
        value: `access ${name}`
    })
}