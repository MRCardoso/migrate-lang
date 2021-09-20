const S_KEY_DATA = "storage-words-list";
const S_KEY_LANG = "storage-active-language";

const dataKey = (state) => {
    return `${state}-en-us`
}
const read = (key) => {
    if(typeof localStorage === "undefined") return null
    return localStorage.getItem(key)
}

const store = (key, value) => {
    if(typeof localStorage === "undefined") return null
    localStorage.setItem(key, value)
}

/** 
 * Adaptation of new feature in phrases save, including a database on cloud in firebase
 * implement the system control of pronounces OK and FAIL
*/
const migrateToV2 = (content) => {
    return content.reduce((acc, v, i) => {
        const d = new Date()
        d.setSeconds(d.getSeconds() + i)
        
        acc.push({id: d.getTime(), content: v, hit: 0, fail: 0, synced: false})
        return acc
    }, [])
}

export const save = (content, reason, saveCloud) => {
    return new Promise(resolve => {
        try {
            const hit = (reason===true? 1 : 0)
            const fail = (reason===false? 1 : 0)
            const key = dataKey(S_KEY_DATA)
            const nextValue = String(content).toLowerCase().trim()
            const newItem = {id: Date.now(), content: nextValue, hit, fail, synced: saveCloud }
            const newList = []
            
            let items = read(key)
            items = (items ? JSON.parse(items) : [])

            if (typeof items[0] === "string"){
                items = migrateToV2(items)
            }

            items.forEach(i => {
                if(i.content === nextValue.toLowerCase()){
                    newItem.hit += i.hit
                    newItem.fail += i.fail
                } else{
                    newList.push(i)
                }
            })
            newList.push(newItem)
            
            store(key, JSON.stringify(newList))
            resolve(true)
        } catch(e){
            resolve(false)
        }
    })
}

export const list = () =>{
    return new Promise(resolve => {
        try {
            let content = read(dataKey(S_KEY_DATA))
            if(content){
                content = JSON.parse(content)
                
                if (typeof content[0] === "string"){
                    content = migrateToV2(content)
                    store(dataKey(S_KEY_DATA), JSON.stringify(content))
                }
                content.sort((a, b) => {
                    if(a.content < b.content) { return -1; }
                    if(a.content > b.content) { return 1; }
                    return 0;
                })
            } else {
                content = []
            }
            resolve(content)
        } catch (error) {
            resolve([])
        }
    })
}

export const remove = (id) => {
    return new Promise(resolve => {
        list().then(phrases => {
            const newPhrases = phrases.filter(p => p.id !== id)
            store(dataKey(S_KEY_DATA), JSON.stringify(newPhrases))
            resolve(true)
        })
    })
}

export const setLanguage = (value) => {
    store(S_KEY_LANG, value)
}

export const getLanguage = () => {
    return read(S_KEY_LANG) || 'en-US'
}

export const getLanguageLabel = () =>{
    const lang = getLanguage().toLowerCase()
    const available = {
        'en-ca': 'Inglês(CA)', 
        'en-us': 'Inglês', 
        'pt-br': 'Português', 
        'fr-ca': 'Francês'
    }
    return available[lang] || 'idioma'
}

export const getDateFromValue = (value) => {
    const list = value.split(' ')
    if(list.length !== 3){
        console.log('#0')
        return null;
    }
    let [month, day, year] = list
    month = String(month).toLowerCase()
    day = parseInt(String(day).replace(/[^0-9]/ig, ''))
    const currentYear = (new Date()).getFullYear() - 20
    const available = { 
        'en-us': ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"], 
        'pt-br': ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]
    }
    const lang = getLanguage().toLowerCase()
    
    if (year < currentYear || year > 3000){
        console.log('#1')
        return null
    }

    if(!available[lang]) {
        console.log('#2')
        return null;
    }

    const index = available[lang].indexOf(month)
    if( index === -1 ){
        console.log('#3')
        return null
    }
    const months = available[lang]
    const thirtyOne = [months[0], months[2], months[4], months[6], months[7], months[9], months[11]]
    const isThirdyOne = thirtyOne.indexOf(month) !== -1
    const isFeb = month === months[1]
    const validThirdyOne = day === 31 && isThirdyOne
    const validThirdy = day <= 30
    const validFebruary = isFeb && day <= 28
    const validLeap = day === 29 && isFeb && ( (year%400 == 0) || (year%4==0 && year%100!=0) )

    if(day >= 1 && (validThirdyOne || validThirdy || validFebruary || validLeap) ){
        return `${month}, ${day < 10 ? '0': ''}${day}, ${year}`
    }
    console.log('#4')
    return null
}

export const removeall = () => localStorage.remove