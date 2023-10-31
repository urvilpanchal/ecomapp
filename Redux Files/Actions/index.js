export const addcartnew = (data) => {
    return {
        type: "ADD_CART",
        data: data
    }
}
export const removecartnew = (data) => {
    return {
        type: "REMOVE_CART",
        data: data
    }
}

export const increment = (ind) => {
    return {
        type: "INCREMENT",
        ind: ind
    }
}

export const decrement = (ind) => {
    return {
        type: "DECREMENT",
        ind: ind
    }
}



