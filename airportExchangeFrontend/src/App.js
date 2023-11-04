import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import {
	CustomSnackbar,
	Footer,
	Header,
	PrivateRoute,
	Redirect,
} from './Components'
import {
	Account,
	Cart,
	Checkout,
	Error,
	FindAirport,
	GetObjects,
	Home,
	LeaveObjects,
	Login,
	Shipping,
	SignUp,
	SingleProductPage,
} from './Pages'

const App = () => {
	const { url } = useSelector((state) => state.cart)
	return (
		<>
			<CustomSnackbar />
			<Routes>
				<Route
					path='/'
					element={
						<>
							<Header />
							<Home />
						</>
					}
				/>
				<Route
					path='/findAirport'
					element={
						<>
							<Header />
							<FindAirport />
							<Footer />
						</>
					}
				/>
				<Route
					path='/get/:airportId'
					element={
						<>
							<GetObjects />
						</>
					}
				/>
				<Route
					path='/leaveTextForm/:airportId'
					element={
						<>
							<LeaveObjects />
						</>
					}
				/>
				<Route
					path='/leaveImageForm'
					element={
						<>
							<LeaveObjects />
						</>
					}
				/>
				<Route
					path='/account'
					element={
						<PrivateRoute>
							<Header />
							<Account />
							<Footer />
						</PrivateRoute>
					}
				/>
				<Route
					path='/cart'
					element={
						<PrivateRoute>
							<Header />
							<Cart />
							<Footer />
						</PrivateRoute>
					}
				/>
				{url === '' ? (
					<Route
						path='/checkout'
						element={
							<PrivateRoute>
								<Header />
								<Checkout />
								<Footer />
							</PrivateRoute>
						}
					/>
				) : (
					<Route path='/checkout' element={<Redirect url={url} />} />
				)}

				<Route
					path='/products/:id'
					element={
						<>
							<Header />
							<SingleProductPage />
							<Footer />
						</>
					}
				/>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<SignUp />} />
				<Route
					path='*'
					element={
						<>
							<Header />
							<Error />
						</>
					}
				/>
				<Route
					path='/shipping'
					element={
						<PrivateRoute>
							<Header />
							<Shipping />
							<Footer />
						</PrivateRoute>
					}
				/>
			</Routes>
		</>
	)
}

export default App
