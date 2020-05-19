import React from 'react';
import {arrayOf, shape, func, string} from 'prop-types';

const UsersSelect = ({
    users, onChange, value
}) => (
    <select value={value} className="users-select" onChange={onChange}>
        <option>bar</option>
        <option>bar2</option>
        <option>bar3</option>
    </select>
);

UsersSelect.propTypes = {
    users: arrayOf(shape).isRequired,
    onChange: func.isRequired,
    value: arrayOf(string).isRequired
};

export default UsersSelect;
