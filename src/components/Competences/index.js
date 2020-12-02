import React, { useContext } from "react";
import AppContext from '../../contexts/appContext';
import Zone from '../Zone';
import './styles.css';

const Competences = () => {
    const { resume } = useContext(AppContext);

    if (Object.keys(resume.competences_techniques).length === 0) {
        return null;
    }

    return (
        <>
            <div className="category">
                Compétences techniques
            </div><br />

            {Object.keys(resume.competences_techniques).map((key) => (
                <Zone key={`competences${key}`} zonePath={['competences_techniques', key]}>
                    <strong>{resume.competences_techniques[key].libelle} :</strong> {resume.competences_techniques[key].valeur}
                    <br />
                </Zone>
            ))}
        </>
    );
}

export default Competences;
