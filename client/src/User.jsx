import './styles.css';
export default function User(props) {
    const { user, setUsers } = props;

    const deleteUser = async (userId) => {
        const res = await fetch(`/api/users/${userId}`, {
            method: "DELETE"
        });
        const json = await res.json();
        if (json.acknowledged) {
            setUsers(currentUsers => {
                return currentUsers.filter((currentUser) => currentUser._id !== userId);
            });
        }
    };

    return (
        <div className="user">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Skills:</strong> {user.skills}</p>
            <p><strong>Contact:</strong> {user.contact}</p>
            <button className="user__delete" onClick={() => deleteUser(user._id)}>Delete</button>
        </div>
    )
}

