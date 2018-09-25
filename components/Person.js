import React from "react";

const Person = ({ person, deleteOne }) => {
    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.phone}</td>
            <td>
                <button type="button" onClick={deleteOne}>
                    poista
                </button>
            </td>
        </tr>
    );
};

export default Person;
