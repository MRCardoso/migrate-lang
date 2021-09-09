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