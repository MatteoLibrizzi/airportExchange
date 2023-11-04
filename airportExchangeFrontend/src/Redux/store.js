import { configureStore } from '@reduxjs/toolkit'
import appReducer from './appSlice'
import cartReducer from './cartSlice'
import leaveReducer from './leaveSlice'
import userReducer from './userSlice'

export default configureStore({
	reducer: {
		app: appReducer,
		cart: cartReducer,
		user: userReducer,
		leave: leaveReducer,
	},
})
