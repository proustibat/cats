import CatAppWithMirakl from "./components/CatAppWithMirakl";
import { fetchBreeds } from "./apis/the-cat";
import "./styles.css";

const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
};

const fetchIt = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return await response.json();
};

export default function App() {
  return (
    <>
      <h1>Hello cats!</h1>
    </>
  );
}
