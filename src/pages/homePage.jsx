import { Fragment } from 'react';
import ListUsers from "../components/user/listUsers.jsx";
import AddUserField from "../components/fieldBox/addUserField.jsx";

const HomePage = () => {
    return (
        <Fragment>
            <AddUserField />
            <ListUsers />
        </Fragment>
    );
};

export default HomePage;