import React from "react";
import Person from "./components/Person";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: [{ name: "Arto Hellas", phone: "55555" }],
            newName: "",
            newPhone: ""
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

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <form onSubmit={this.addPerson}>
                    <div>
                        nimi:{" "}
                        <input
                            value={this.state.newName}
                            onChange={this.handlePersonChange}
                        />
                    </div>
                    <div>
                        numero:{" "}
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
                {this.state.persons.map(person => (
                    <Person key={person.name} person={person} />
                ))}
            </div>
        );
    }
}

export default App;
