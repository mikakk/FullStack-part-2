import React from "react";
import Person from "./Person";

const Print = ({ persons, filterValue }) => {
    let filtered = persons;
    if (filterValue.length) {
        filtered = persons.filter(person =>
            person.name.toLowerCase().includes(filterValue.toLowerCase())
        );
    }
    return (
        <div>
            {filtered.map(person => (
                <Person key={person.name} person={person} />
            ))}
        </div>
    );
};

export default Print;
