// import { useEffect, useState } from "react";
// import User from "./User";
// import './styles.css';

// export default function App() {
//   const [users, setUsers] = useState([]);
//   const [name, setName] = useState("");
//   const [skills, setSkills] = useState("");
//   const [contact, setContact] = useState("");
//   const [submitted, setSubmitted] = useState(false); // Track form submission
//   const [error, setError] = useState(null); // Track errors
//   const [searchTerm, setSearchTerm] = useState(""); // Search term for skills

//   useEffect(() => {
//     async function getUsers() {
//       try {
//         const res = await fetch("/api/users");
//         if (!res.ok) {
//           throw new Error("Failed to fetch users");
//         }
//         const users = await res.json();
//         setUsers(users);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         setError("Failed to fetch users. Please try again later.");
//       }
//     }
//     getUsers();
//   }, [submitted]); // Refresh users after form submission

//   const createUser = async (e) => {
//     e.preventDefault();
//     setError(null); // Clear previous errors
//     if (name && skills && contact) {
//       try {
//         const res = await fetch("/api/users", {
//           method: "POST",
//           body: JSON.stringify({ name, skills, contact }),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         if (!res.ok) {
//           throw new Error("Failed to create user");
//         }
//         const newUser = await res.json();
//         setUsers([...users, newUser]); // Update local state with new user
//         setName("");
//         setSkills("");
//         setContact("");
//         setSubmitted(true); // Trigger useEffect to refresh users
//       } catch (error) {
//         console.error("Error creating user:", error);
//         setError("Failed to create user. Please try again.");
//       }
//     } else {
//       console.warn("All fields are required!");
//     }
//   };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   // Filter users based on search term (skills)
//   const filteredUsers = users.filter(user =>
//     user.skills.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <main className="container">
//       <h1 className="title">Welcome to Skill Finder</h1>
//       <h2 className="welcome-message-2">Connect with individuals who share your skills and interests</h2>
//       <p className="welcome-message">
      
//          Create a profile, search for specific skills, and start collaborating!
//       </p>

//       <form className="form" onSubmit={createUser}>
//         <input 
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Name"
//           className="form__input"
//           required 
//         />
//         <input 
//           type="text"
//           value={skills}
//           onChange={(e) => setSkills(e.target.value)}
//           placeholder="Skills"
//           className="form__input"
//           required 
//         />
//         <input 
//           type="text"
//           value={contact}
//           onChange={(e) => setContact(e.target.value)}
//           placeholder="Contact No."
//           className="form__input"
//           required 
//         />
//         <button className="form__button" type="submit">Create</button>
//       </form>

//       {error && <p className="error-message">{error}</p>}

//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search by Skills"
//           value={searchTerm}
//           onChange={handleSearch}
//           className="search__input"
//         />
//       </div>

//       <div className="users">
//         {filteredUsers.length > 0 ? (
//           filteredUsers.map((user) => (
//             <User key={user._id} user={user} setUsers={setUsers} />
//           ))
//         ) : (
//           <p>No users found</p>
//         )}
//       </div>
//       <div className="hashtag">
//       <p>Made with ❤ by Amritesh Kumar </p>
//     </div>
//     </main>
//   );
// }


import { useEffect, useState } from "react";
import User from "./User";
import './styles.css';

export default function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [contact, setContact] = useState("");
  const [pin, setPin] = useState(""); // New pin state
  const [submitted, setSubmitted] = useState(false); // Track form submission
  const [error, setError] = useState(null); // Track errors
  const [searchTerm, setSearchTerm] = useState(""); // Search term for skills

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        const users = await res.json();
        setUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users. Please try again later.");
      }
    }
    getUsers();
  }, [submitted]); // Refresh users after form submission

  const createUser = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    if (name && skills && contact && pin) {
      try {
        const res = await fetch("/api/users", {
          method: "POST",
          body: JSON.stringify({ name, skills, contact, pin }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Failed to create user");
        }
        const newUser = await res.json();
        setUsers([...users, newUser]); // Update local state with new user
        setName("");
        setSkills("");
        setContact("");
        setPin("");
        setSubmitted(true); // Trigger useEffect to refresh users
      } catch (error) {
        console.error("Error creating user:", error);
        setError("Failed to create user. Please try again.");
      }
    } else {
      console.warn("All fields are required!");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter users based on search term (skills)
  const filteredUsers = users.filter(user =>
    user.skills.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="container">
      <h1 className="title">Welcome to Skill Finder</h1>
      <h2 className="welcome-message-2">Connect with individuals who share your skills and interests</h2>
      <p className="welcome-message">
        Create a profile, search for specific skills, and start collaborating!
      </p>

      <form className="form" onSubmit={createUser}>
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="form__input"
          required 
        />
        <input 
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Skills"
          className="form__input"
          required 
        />
        <input 
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Contact No."
          className="form__input"
          required 
        />
        <input 
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Pin"
          className="form__input"
          required 
        />
        <button className="form__button" type="submit">Create</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Skills"
          value={searchTerm}
          onChange={handleSearch}
          className="search__input"
        />
      </div>

      <div className="users">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <User key={user._id} user={user} setUsers={setUsers} />
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
      <div className="hashtag">
        <p>Developed by Amritesh Kumar </p>
      </div>
    </main>
  );
}


