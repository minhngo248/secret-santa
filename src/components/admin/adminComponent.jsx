import {logout} from "../../services/authService.js";

const AdminComponent = () => {
    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2>Admin Page</h2>
                <button
                    onClick={handleLogout}
                    style={{
                        backgroundColor: '#FF5733',
                        color: 'white',
                        padding: '8px 12px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginLeft: '10px'
                    }}
                >
                    Logout
                </button>
            </div>
        </>
    );
};

export default AdminComponent;