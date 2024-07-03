// import './styles.css';
// export default function User(props) {
//     const { user, setUsers } = props;

//     const deleteUser = async (userId) => {
//         const res = await fetch(`/api/users/${userId}`, {
//             method: "DELETE"
//         });
//         const json = await res.json();
//         if (json.acknowledged) {
//             setUsers(currentUsers => {
//                 return currentUsers.filter((currentUser) => currentUser._id !== userId);
//             });
//         }
//     };

//     return (
//         <div className="user">
//             <p><strong>Name:</strong> {user.name}</p>
//             <p><strong>Skills:</strong> {user.skills}</p>
//             <p><strong>Contact:</strong> {user.contact}</p>
//             <button className="user__delete" onClick={() => deleteUser(user._id)}>Delete</button>
//         </div>
//     )
// }

import React, { useState } from 'react';
import './styles.css';

export default function User(props) {
    const { user, setUsers } = props;
    const [pin, setPin] = useState("");
    const [error, setError] = useState("");

    const deleteUser = async (userId) => {
        try {
            const res = await fetch(`/api/users/${userId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ pin }),
            });

            if (!res.ok) {
                throw new Error("Pin is incorrect");
            }

            const json = await res.json();
            if (json.acknowledged) {
                setUsers(currentUsers => {
                    return currentUsers.filter((currentUser) => currentUser._id !== userId);
                });
                setPin("");
                setError("");
            } else {
                setError("PIN is incorrect. Please try again.");
                window.alert("PIN is incorrect. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            setError("pin is wrong, Please try again.");
        }
    };

    return (
        <div className="user">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Skills:</strong> {user.skills}</p>
            <p><strong>Contact:</strong> {user.contact}</p>
            <input 
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter Pin to Delete"
                className="user__input"
            />
            {error && <p className="error-message">{error}</p>}
            <button className="user__delete" onClick={() => deleteUser(user._id)}>Delete</button>
        </div>
    );
}
