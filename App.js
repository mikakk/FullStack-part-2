import React from "react";
import personService from "./services/persons";
import Person from "./components/Person";
import Message from "./components/Message";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: [],
            newName: "",
            newPhone: "",
            filter: "",
            messageType: "",
            message: null
        };
    }

    componentWillMount() {
        personService.getAll().then(persons => {
            this.setState({ persons });
        });
    }

    updatePerson = (id, name, phone) => {
        if (
            !window.confirm(
                `${name} on jo luettelossa, korvataanko vanha numero uudella?`
            )
        ) {
            return;
        }
        const personObject = {
            name: name,
            phone: phone,
            id: id
        };
        personService
            .update(personObject.id, personObject)
            .then(updatedPerson => {
                const persons = this.state.persons.filter(
                    n => n.id !== personObject.id
                );
                this.setState({
                    persons: persons.concat(updatedPerson),
                    newName: "",
                    newPhone: "",
                    messageType: "success",
                    message: `henkilön '${personObject.name} ${
                        personObject.phone
                    }' korvaus onnistui`
                });
                setTimeout(() => {
                    this.setState({ message: null });
                }, 5000);
            })
            .catch(error => {
                /* delete not found person from state */
                this.setState({
                    persons: this.state.persons.filter(
                        n => n.id !== personObject.id
                    )
                });
                /* add person as new */
                this.addPerson(null);
            });
    };

    addPerson = event => {
        if (event != null) {
            event.preventDefault();
        }
        const contains = this.state.persons.filter(
            person => person.name === this.state.newName
        );
        if (contains.length) {
            this.updatePerson(
                contains[0].id,
                contains[0].name,
                this.state.newPhone
            );
            return;
        }
        const personObject = {
            name: this.state.newName,
            phone: this.state.newPhone
        };

        personService
            .create(personObject)
            .then(newPerson => {
                this.setState({
                    persons: this.state.persons.concat(newPerson),
                    newName: "",
                    newPhone: "",
                    messageType: "success",
                    message: `henkilön '${personObject.name} ${
                        personObject.phone
                    }' lisäys onnistui`
                });
                setTimeout(() => {
                    this.setState({ message: null });
                }, 5000);
            })
            .catch(error => {
                this.setState({
                    messageType: "error",
                    message: `henkilön '${personObject.name} ${
                        personObject.phone
                    }' lisäys epäonnistui`
                });
                setTimeout(() => {
                    this.setState({ message: null });
                }, 5000);
            });
    };

    deletePerson = id => {
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
                        persons: this.state.persons.filter(n => n.id !== id),
                        messageType: "success",
                        message: `henkilön '${person.name} ${
                            person.phone
                        }' poisto onnistui`
                    });
                    setTimeout(() => {
                        this.setState({ message: null });
                    }, 5000);
                })
                .catch(error => {
                    this.setState({
                        persons: this.state.persons.filter(n => n.id !== id),
                        messageType: "error",
                        message: `henkilö '${
                            person.name
                        }' on jo valitettavasti poistettu palvelimelta`
                    });
                    setTimeout(() => {
                        this.setState({ message: null });
                    }, 5000);
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
                <Message
                    type={this.state.messageType}
                    message={this.state.message}
                />
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
                                deletePerson={this.deletePerson(person.id)}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App;
