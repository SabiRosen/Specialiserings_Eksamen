import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import DefaultPage from "./views/DefaultPage";
import Rejsen from "./views/Rejsen";
import Intro from "./views/Intro";
import Story from "./views/Story";
import Quiz from "./views/Quiz";
import Results from "./views/Results";
import MiniGame1 from "./views/MiniGame1";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <DefaultPage />
      },
      {
        path: "/rejsen",
        element: <Rejsen />
      },
      {
        path: "/intro",
        element: <Intro />
      },
      {
        path: "/story",
        element: <Story />
      },
      {
        path: "/quiz",
        element: <Quiz />
      },
      {
        path: "/results",
        element: <Results />
      },
      {
        path: "/minigame1",
        element: <MiniGame1 />
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;