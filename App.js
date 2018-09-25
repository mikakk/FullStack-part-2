import React from "react";
/*import Print from "./components/Print";*/
import personService from "./services/persons";
import Person from "./components/Person";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: [],
            newName: "",
            newPhone: "",
            filter: ""
        };
    }

    componentWillMount() {
        personService.getAll().then(persons => {
            this.setState({ persons });
        });
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
            id: this.state.newName
        };

        personService
            .create(personObject)
            .then(newPerson => {
                this.setState({
                    persons: this.state.persons.concat(newPerson),
                    newName: "",
                    newPhone: ""
                });
            })
            .catch(error => {
                alert(
                    `henkilön '${personObject.name} ${
                        personObject.phone
                    }' lisäys epäonnistui`
                );
            });
    };

    deleteOne = id => {
        return () => {
            const person = this.state.persons.find(n => n.id === id);
            if (
                !window.confirm(`Poistetaanko ${person.name}, ${person.phone}?`)
            ) {
                return;
            }
            personService
                .deleteOne(id)
                .then(idd => {
                    this.setState({
                        persons: this.state.persons.filter(n => n.id !== id)
                    });
                })
                .catch(error => {
                    alert(
                        `henkilö '${
                            person.name
                        }' on jo valitettavasti poistettu palvelimelta`
                    );
                    this.setState({
                        persons: this.state.persons.filter(n => n.id !== id)
                    });
                });
        };
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
        let filtered = this.state.persons;
        if (this.state.filter.length) {
            filtered = this.state.persons.filter(person =>
                person.name
                    .toLowerCase()
                    .includes(this.state.filter.toLowerCase())
            );
        }
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

                <table>
                    <tbody>
                        {filtered.map(person => (
                            <Person
                                key={person.name}
                                person={person}
                                deleteOne={this.deleteOne(person.id)}
                            />
                        ))}
                    </tbody>
                </table>

                {/*
                    <Print
                        persons={this.state.persons}
                        filterValue={this.state.filter}
                        deleteOne={this.deleteOne(person.id)}
                    />
                */}
            </div>
        );
    }
}

export default App;
