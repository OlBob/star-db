const compose = (...funcs) => (component) => {
    return funcs.reduceRight((prevValue, func) => func(prevValue), component)
}

export default compose;