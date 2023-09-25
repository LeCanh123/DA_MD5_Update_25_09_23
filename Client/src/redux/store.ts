import { configureStore,combineReducers } from '@reduxjs/toolkit'; 
import MenReducer from "./MenReducer/reducer"
import cartReducer from "./cartReducer/reducer"
import { userReducer } from './userReducer/user.slice';

// Kết hợp reducer
const rootReducer = combineReducers({
  MenReducer,
  cartReducer,
  userReducer
});


// Xuất ra store type
export type StoreType = ReturnType<typeof rootReducer>;


export const store = configureStore({
  reducer: rootReducer,
  })

