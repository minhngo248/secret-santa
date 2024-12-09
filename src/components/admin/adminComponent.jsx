import {logout} from "../../services/authService.js";
import {assignSecretSantas} from "../../services/adminService.js";

const AdminComponent = () => {
    const handleLogout = () => {
        logout();
    };

    const handleAssignSantas = () => {
        assignSecretSantas()
            .then(r => alert(r))
            .catch(e => alert(e));
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2>Admin Page</h2>
                <div>
                    <button
                        onClick={handleAssignSantas}
                        style={{
                            backgroundColor: '#007BFF',
                            color: 'white',
                            padding: '8px 12px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            marginRight: '10px'
                        }}
                    >
                        Assign Santas
                    </button>
                    <button
                        onClick={handleLogout}
                        style={{
                            backgroundColor: '#FF5733',
                            color: 'white',
                            padding: '8px 12px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default AdminComponent;