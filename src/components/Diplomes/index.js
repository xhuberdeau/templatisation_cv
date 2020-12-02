import React, { useContext } from "react";
import AppContext from '../../contexts/appContext';
import Zone from '../Zone';
import './styles.css';

const Diplomes = () => {
    const { resume } = useContext(AppContext);

    if (Object.keys(resume.formation).length === 0) {
        return null;
    }

    return (
        <>
            <div className="category">
                Diplômes
            </div>
            <br />

            {Object.keys(resume.formation).map((key) => (
                <Zone key={`formation${key}`} zonePath={['formation', key]}>
                    <strong>{resume.formation[key].annee} :</strong> {resume.formation[key].libelle}
                    <div>{resume.formation[key].description}</div>
                    <br />
                </Zone>
            ))}
        </>
    );
}

export default Diplomes;
