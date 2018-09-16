import React from "react";

const Kurssit = ({ kurssit }) => {
    return kurssit.map(kurssi => <Kurssi key={kurssi.id} kurssi={kurssi} />);
};

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko kurssi={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    );
};

const Otsikko = ({ kurssi }) => {
    return <h1>{kurssi}</h1>;
};

const Sisalto = ({ osat }) => {
    return (
        <div>
            <Osat osat={osat} />
        </div>
    );
};

const Osat = ({ osat }) =>
    osat.map(osa => (
        <p key={osa.id}>
            {osa.nimi} {osa.tehtavia}
        </p>
    ));

const Yhteensa = ({ osat }) => {
    let initial = 0;
    return (
        <p>yhteensä {osat.reduce((acc, cur) => acc + cur.tehtavia, initial)}</p>
    );
};

export default Kurssit