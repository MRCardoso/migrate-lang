import { enabledCloud } from "../../utils"
import app from "../app"
import { __create, __update, __delete, __all, __one, __select, __getDocId} from "../crud"

const tableName = "histories"
const tableChapter = "chapters"

export const list = async () => {
    if (!enabledCloud) return Promise.resolve([])
    
    const response = await __all(tableName, {order: ["content", "asc"]})
    return response.docs.map(doc => ({id: doc.id, ...doc.data()}))
}

export const getChapter = async (history) => {
    if (!enabledCloud) return Promise.resolve([])
    
    const response = await __all(tableChapter, {where: ["history", "==", __getDocId(tableName, history)]})
    return response.docs.map(doc => ({id: doc.id, ...doc.data()}))
}

export const remove = (docid) => {
    if (!enabledCloud) return Promise.reject({message: "função desabilitada no momento"})

    return __delete(tableName, docid)
}

export const create = async (data) => {
    const docRef = await __create(tableName, {content: data.content, lang: data.lang})
    const promises = []
    data.chapters.map((chapter, index) => {
        promises.push(
            __create(tableChapter, {content: chapter.content, order: (index+1), history: __getDocId(tableName, docRef.id)})
        )
    })
    
    await Promise.all(promises)

    return Promise.resolve(docRef)
}

export default app