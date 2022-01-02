import app from "../app"
import { __create, __update, __delete, __all, __one, __select, __preparePager, responsePaginator, queryPaginator, __byId } from "../crud"

const tableName = "phrases"

export const list = async (limit=null, pager=null, prev="0") => {
    const params = await queryPaginator(limit, pager, prev, tableName)
    params["order"] = ["content", "asc"]
    const response = await __all(tableName, params)
    const paginator = responsePaginator(response.docs, pager, prev)
    const items = response.docs.map(doc => ({id: doc.id, ...doc.data()}))
    return {items, paginator}
}

export const count = async () => {
    const response = await __all(tableName)
    return response.docs.length
}

export const remove = (docid) => {
    return __delete(tableName, docid)
}

export const save = async (value, reason, lang) => {
    const hit = (typeof reason === "boolean" ? (reason===true? 1 : 0) : reason.hit)
    const fail = (typeof reason === "boolean" ? (reason===false? 1 : 0) : reason.fail)
    const nextValue = String(value).toLowerCase().trim()
    
    const res = await __one(tableName, {where: ["content", "==", nextValue]})
    
    if(res.docs.length > 0){
        const [response] = res.docs
        const data = response.data()
        const values = {hit: (data.hit + hit), fail: (data.fail+fail), lang}
        if(hit > 0 || fail > 0){
            await __update(tableName, response.id, values)
        }
        return Promise.resolve(true)
    }
    
    await __create(tableName, {content: value, hit, fail, lang})
    
    return Promise.resolve(true)
}

export default app