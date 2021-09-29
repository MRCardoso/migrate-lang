const text2SpeechCache = null
export const shuffle = (o) => {
    for (let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
export const rand = (max, min) => Math.round(Math.random() * (max - min) + min);

export const copy = (value) =>{
    if(value){
        navigator.clipboard.writeText(value);
        return true
    }
    return false
}

export const validateNumber = (value, defValue) => {
    let newValue = parseInt(value)
    return (Number.isNaN(newValue)) ? defValue : newValue;
}

export const isGuestRoutes = (path) => {
    return (
        /(auth\/|404|frases)/.test(path)
    )
}

export const alphabetValues = ["A", "B", "C", "D", "E", "F","G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
export const numberValues = new Array(100).fill(0).map((_, i) => i + 1)
export const alphabetKeyIndex = alphabetValues.reduce((acc, value, index) => {
    acc[value] = index
    return acc
}, {})

export const enabledCloud = (action) => {
    const actions = process.env.NEXT_PUBLIC_ENABLED_CLOUD_STORAGE.split("|")
    return actions.indexOf(action)  !== -1 ? true: false    
}

export const text2Speech = (text, lang = 'en-US', state = null) => {
	if(typeof window === "undefined") return {}
	const synthesis = window.speechSynthesis;
	const textToSpeech = new SpeechSynthesisUtterance(text);
	textToSpeech.lang = lang
    textToSpeech.onstart = () => state !== null && state(true)
    textToSpeech.onend = () => state !== null && state(false)
	synthesis.speak(textToSpeech)
}
