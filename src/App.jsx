//import { NotePage } from "./Modules/Notes/pages/NotePage";
import { BrowserRouter } from "react-router-dom";
import { Dashboard } from "./Modules/dashboard/pages/Dashboard";
import {Provider} from 'react-redux';
import store from "./Shared/Store/store";
function App() {
  return (
    <div className="m-4 ">
      <Provider store = {store}>
      <BrowserRouter><Dashboard/></BrowserRouter>
      </Provider>
    </div>
      
  );
}

export default App;
