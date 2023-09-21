import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [sortedPosts, setSortedPosts] = useState([]);
  const [tag, setTag] = useState('');
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [userId, setUserId] = useState('');
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    fetch('http://localhost:5000/fetchPosts') // Assumes your backend is running on the same domain
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
        // Update posts state here
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const sortPostsAsc = () => {
    fetch('http://localhost:5000/sortPostsAsc') // Assumes your backend is running on the same domain
      .then((response) => response.json())
      .then((data) => {
        setSortedPosts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const sortPostsDesc = () => {
    fetch('http://localhost:5000/sortPostsDesc') // Assumes your backend is running on the same domain
      .then((response) => response.json())
      .then((data) => {
        setSortedPosts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const searchPosts = () => {
    fetch(`http://localhost:5000/searchPosts/${tag}`) // Assumes your backend is running on the same domain
      .then((response) => response.json())
      .then((data) => {
        setSearchedPosts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const findPostsByUserId = () => {
    fetch(`http://localhost:5000/findPostsByUserId/${userId}`) // Assumes your backend is running on the same domain
      .then((response) => response.json())
      .then((data) => {
        setUserPosts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <h1>Posts</h1>
      {/* <button onClick={fetchPosts}>Fetch Posts</button> */}
      <h1>Posts</h1>
      <button onClick={fetchPosts}>Fetch Posts</button>

      
      <button onClick={sortPostsAsc}>Sort Posts (ASC)</button>
      <button onClick={sortPostsDesc}>Sort Posts (DESC)</button>
      <input
        type="text"
        placeholder="Enter tag to search"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
      <button onClick={searchPosts}>Search Posts</button>
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={findPostsByUserId}>Find Posts by User ID</button>
            {/* <div className="posts">
       {posts.map((post) => (
          <div key={post.id}>             
          <p>{post.title}</p>
            <p>{post.body}</p>
            <p>Reactions: {post.reactions}</p>
          </div>
        ))}
       </div> */}
       {/* <div className="posts">
        {posts.map((post) => (
          <div key={post.id}>
            <p>{post.title}</p>
            <p>Reactions: {post.reactions}</p>
          </div>
        ))}
      </div> */}
      <div className="posts">
        {sortedPosts.length > 0 && (
          <div>
            <h2>Sorted Posts:</h2>
            {sortedPosts.map((post) => (
              <div key={post.id}>
                <p>{post.title}</p>
                <p>Reactions: {post.reactions}</p>
              </div>
            ))}
          </div>
        )}

        {searchedPosts.length > 0 && (
          <div>
            <h2>Searched Posts:</h2>
            {searchedPosts.map((post) => (
              <div key={post.id}>
                <p>{post.title}</p>
                <p>Reactions: {post.reactions}</p>
              </div>
            ))}
          </div>
        )}

        {userPosts.length > 0 && (
          <div>
            <h2>Posts by User ID:</h2>
            {userPosts.map((post) => (
              <div key={post.id}>
                <p>{post.title}</p>
                <p>Reactions: {post.reactions}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;


// import React, { useEffect, useState } from 'react';
// import './App.css';

// function App() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const fetchPosts = () => {
//     fetch('http://localhost:5000/fetchPosts') // Replace with your backend API endpoint
//       .then((response) => response.json())
//       .then((data) => {
//         setPosts(data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   return (
//     <div className="App">
//       <h1>Posts</h1>
//       <button onClick={fetchPosts}>Fetch Posts</button>

//       <div className="posts">
//         {posts.map((post) => (
//           <div key={post.id}>
//             <p>{post.title}</p>
//             <p>{post.body}</p>
//             <p>Reactions: {post.reactions}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;
// import React, { useEffect, useState } from 'react';
// import './App.css';

// function App() {
//   const [posts, setPosts] = useState([]);

//   const fetchPosts = () => {
//     fetch('http://localhost:5000/fetchPosts') // Replace with your backend API endpoint
//       .then((response) => response.json())
//       .then((data) => {
//         setPosts(data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   return (
//     <div className="App">
//       <h1>Posts</h1>
//       <button onClick={fetchPosts}>Fetch Posts</button>

//       <div className="posts">
//         {posts.map((post) => (
//           <div key={post.id}>
//             <p>{post.title}</p>
//             <p>Reactions: {post.reactions}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;

