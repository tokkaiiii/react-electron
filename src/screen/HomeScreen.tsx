import { Link } from "react-router-dom";

const HomeScreen = () => {
  return (
    <div>
      <h1>HomeScreen</h1>
      <button onClick={() => alert('Hello World')}>Click me</button>
      <Link to="/about">About</Link>
      <Link to="/chat">Chat</Link>
    </div>
  );
};

export default HomeScreen;
