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
            <table>
                <tbody>
                    {filtered.map(person => (
                        <Person key={person.name} person={person} />
                    ))}
                </tbody>
            </table>
    );
};

export default Print;
