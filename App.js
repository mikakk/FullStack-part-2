import React from "react";
import Person from "./components/Person";

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

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: [
                { name: "Arto Hellas", phone: "55555" },
                { name: "User Name", phone: "123" },
                { name: "Test Name", phone: "456" },
                { name: "another one", phone: "789" }
            ],
            newName: "",
            newPhone: "",
            filter: ""
        };
    }

    addPerson = event => {
        event.preventDefault();
        const contains = this.state.persons.filter(
            person => person.name === this.state.newName
        );
        if (contains.length) {
            return;
        }
        const personObject = {
            name: this.state.newName,
            phone: this.state.newPhone,
            id: this.state.persons.length + 1
        };

        const persons = this.state.persons.concat(personObject);

        this.setState({
            persons,
            newName: "",
            newPhone: ""
        });
    };

    handlePersonChange = event => {
        this.setState({ newName: event.target.value });
    };

    handlePhoneChange = event => {
        this.setState({ newPhone: event.target.value });
    };

    handleFilterChange = event => {
        this.setState({ filter: event.target.value });
    };

    render() {
        return (
            <div>
                <h1>Puhelinluettelo</h1>
                <div>
                    Rajaa näytettäviä:{" "}
                    <input
                        value={this.state.newFilter}
                        onChange={this.handleFilterChange}
                    />
                </div>
                <form onSubmit={this.addPerson}>
                    <h2>Lisää uusi</h2>
                    <div>
                        Nimi:{" "}
                        <input
                            value={this.state.newName}
                            onChange={this.handlePersonChange}
                        />
                    </div>
                    <div>
                        Numero:{" "}
                        <input
                            value={this.state.newPhone}
                            onChange={this.handlePhoneChange}
                        />
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                <Print
                    persons={this.state.persons}
                    filterValue={this.state.filter}
                />
            </div>
        );
    }
}

export default App;
