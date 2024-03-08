import "./App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import ContactList from "./components/ContactList";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Contact from "./components/user/AddContact";
import Registration from "./components/user/Registration";

const DataClear = {
    name : "",
    number : "",
    email : "",
    created_date: ""
}

function App() {
	return (
			<Router>
				<Routes>
					<Route
						exact
						path="/"
						element={<ContactList />}
					/>
					<Route
						path="/about"
						element={<About />}
					/>
					
					<Route
						path="/contactus"
						element={<ContactUs />}
					/>

					<Route
						path="/user/AddContact"
						element={<Contact />}
					/>

					<Route
						path="/user/Registration"
						element={<Registration />}
					/>

					<Route
						path="*"
						element={<Navigate to="/" />}
					/>
				</Routes>
			</Router>
	);
}

export default App;
