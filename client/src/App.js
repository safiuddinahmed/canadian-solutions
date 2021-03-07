import Navbar from "./Components/Navbar";
import { Provider } from "react-redux";
import store from "./store/index";
// import { ModalContainer, ModalRoute } from "react-router-modal";
// import CurrentPost from "./Components/CurrentPost";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
      </div>

      {/* <ModalRoute
          component={CurrentPost}
          path="/forums/test"
          className="test-modal test-modal-DiscoverWine"
        />

        <ModalContainer /> */}
    </Provider>
  );
}

export default App;
