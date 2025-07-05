 const initialState= {
    city:"",
    position: {
    latitude: "",
    longitude: ""
  }
 }

 export  const reducerFn= (state=initialState,action)=>{
    switch(action.type){
        case "ADD_CITY" : return {
            ...state, 
            city: action.payload
        }
        case "ADD_LOCATION" : return{
            ...state,
            position:action.payload
        }
        default : return state
    }
 }