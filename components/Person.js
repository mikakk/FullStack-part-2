import React from "react";

const Person = ({ person, deletePerson }) => {
    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.phone}</td>
            <td>
                <button type="button" onClick={deletePerson}>
                    poista
                </button>
            </td>
        </tr>
    );
};

export default Person;
