const initialState = {
  city: "",
  cartDetails: {
    count: 0,
    food: [],   
    price: [], 
    quantity: [] 
  }
};

export const reducerFn = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CITY":
      return {
        ...state,
        city: action.payload
      };

    case "ADDED_TO_CART": {
      const index = state.cartDetails.food.findIndex(
        (item) => item === action.payload.items
      );

      let updatedFood = [...state.cartDetails.food];
      let updatedPrice = [...state.cartDetails.price];
      let updatedQuantity = [...(state.cartDetails.quantity || [])];

      if (index !== -1) {

        updatedQuantity[index] += 1;
      } else {
   
        updatedFood.push(action.payload.items);
        updatedPrice.push(action.payload.price);
        updatedQuantity.push(1);
      }

      const newCount = updatedQuantity.reduce((acc, qty) => acc + qty, 0);

      return {
        ...state,
        cartDetails: {
          food: updatedFood,
          price: updatedPrice,
          quantity: updatedQuantity,
          count: newCount
        }
      };
    }

    case "INCREMENT_QUANTITY": {
      const index = action.payload;
      const updatedQuantity = [...state.cartDetails.quantity];
      updatedQuantity[index] += 1;

      const newCount = updatedQuantity.reduce((acc, qty) => acc + qty, 0);

      return {
        ...state,
        cartDetails: {
          ...state.cartDetails,
          quantity: updatedQuantity,
          count: newCount
        }
      };
    }

    case "DECREMENT_QUANTITY": {
      const index = action.payload;
      const updatedQuantity = [...state.cartDetails.quantity];
      const updatedFood = [...state.cartDetails.food];
      const updatedPrice = [...state.cartDetails.price];

      if (updatedQuantity[index] === 1) {
        // Remove the item
        updatedQuantity.splice(index, 1);
        updatedFood.splice(index, 1);
        updatedPrice.splice(index, 1);
      } else {
        updatedQuantity[index] -= 1;
      }

      const newCount = updatedQuantity.reduce((acc, qty) => acc + qty, 0);

      return {
        ...state,
        cartDetails: {
          food: updatedFood,
          price: updatedPrice,
          quantity: updatedQuantity,
          count: newCount
        }
      };
    }

    default:
      return state;
  }
};
