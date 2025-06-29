 const initialState= {
    city:""
 }

 export  const reducerFn= (state=initialState,action)=>{
    switch(action.type){
        case "ADD_CITY" : return {
            ...state, 
            city: action.payload
        }
        default : return state
    }
 }