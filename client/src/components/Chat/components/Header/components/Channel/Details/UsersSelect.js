import React, {useState} from 'react';
import {arrayOf, shape, func, string} from 'prop-types';
import {ArrowForwardIos,DoneRounded, CloseRounded} from '@material-ui/icons';

const UsersSelect = ({
    users, onChange, selected, removeFromList
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="users-select">
            <div
                role="tabpanel"
                className="select-item"
                onClick={() => setOpen(!open)}
            >
            {selected.length === 0 ? (
                <>
                    <span className="default-text">Choose members to add...</span>
                    <span>{<ArrowForwardIos/>}</span>
                </>
            ): (
                <>
                    <span className="selected">
                        {selected.filter((_, i) => i < 2).map(item => <li key={item._id}>{item.displayName}</li>)}
                    </span>
                    <span className="arrow">{<ArrowForwardIos/>}</span>
                </>
            )}
            {open && (
                <div className="select-content">
                    <div className="items-container">
                        {users.map(user => (
                            <div key={user._id} className="item" role="tabpanel" onClick={e => onChange(e, user)}>
                                <div className="text">{user.displayName}</div>
                                {selected.filter(selectedItem => selectedItem._id === user._id).length !== 0 ? (
                                    <div className="icons">
                                        <DoneRounded/>
                                        <div className="clear" onClick={e => removeFromList(e, user)}> <CloseRounded/></div>
                                    </div>
                                ) : null}
                            </div>
                        ))}
                    </div>
                </div>
                )}
            </div>
        </div>
    )
};

UsersSelect.propTypes = {
    users: arrayOf(shape).isRequired,
    onChange: func.isRequired,
    removeFromList: func.isRequired,
    selected: arrayOf(shape).isRequired
};

export default UsersSelect;
