const stringify = (d) =>{
    let text=d?.join(", ").toLowerCase().replace('_',' ')
    return text.charAt(0).toUpperCase() + text.slice(1);
}
export default stringify;