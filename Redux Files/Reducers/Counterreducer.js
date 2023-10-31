import AsyncStorage from '@react-native-async-storage/async-storage';
export const cart_items = []; 0
const CounterReducer = (state = cart_items, action) => {
    switch (action.type) {

        case "ADD_CART":
            var isfound = false;
            state.map((t) => {
                if(t.id == action.data.id){
                    isfound = true
                }
            })
            if(!isfound){
                return [...state, action.data];
            }else{
                return state.map((t) => {
                    if(t.id === action.data.id){
                        t.qty+= 1
                        return t;
                    }else{
                        return t;
                    }
                })
            }
           

        case "REMOVE_CART":
            console.log("Remove Inedx=====", action.data)
            // return state
            return [...state.filter((item, index) => index != action.data)];

        case "INCREMENT":
            console.log("index", action.ind)
            return state.map((t, ind) => {
                if (ind === action.ind) {
                    console.log("index", ind)
                    if (t.qty == undefined) {
                        return {
                            ...t,
                            qty: 2
                        }
                    }
                    else {
                        t.qty += 1
                    }
                    return t;
                }
                else {
                    return t;
                }
            })

        case "DECREMENT":
            return state.map((t, ind) => {
                if (ind === action.ind) {
                    console.log("index", ind)
                    if (t.qty == undefined) {
                        return {
                            ...t,
                            qty: 2
                        }
                    }
                    else {
                        t.qty -= 1
                    }
                    return t;
                }else {
                    return t;
                }
            })
        


        default:
            return state;
    }
}

export default CounterReducer;