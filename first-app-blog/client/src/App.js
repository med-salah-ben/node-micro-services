import CreatePost from "./components/CreatePost";
import PostsList from "./components/PostsList";

function App() {
  return (
    <div className="container">
      <h1>Create Post</h1>
      <CreatePost />
      <hr />
      <h1>Posts List</h1>
      <PostsList />
    </div>
  );
}

export default App;
