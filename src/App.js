import FruitsMaster from "./components/FruitsMaster";
import FruistDetails from "./components/FruitsDetails";
import Cart from "./components/Cart";
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <FruitsMaster/>,
    children: [
      {
        path: "fruits/:fruitId",
        element: <FruistDetails id={":/fruiId"}/>
      },  
      {
        path: "cart",
        element: <Cart/>
      }
    ],
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
