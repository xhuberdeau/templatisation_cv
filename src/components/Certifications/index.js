import React, { useContext } from "react";
import AppContext from '../../contexts/appContext';
import Zone from '../Zone';
import './styles.css';

const Certifications = () => {
    const { resume } = useContext(AppContext);

    if (Object.keys(resume.certifications).length === 0) {
        return null;
    }

    return (
        <>
            <div className="category">
                Certifications
            </div>
            <br />
            {Object.keys(resume.certifications).map((key) => (
                <Zone key={`certifications${key}`} zonePath={['certifications', key]}>
                    <strong>{resume.certifications[key].annee} {resume.certifications[key].libelle}</strong>
                    <br />
                </Zone>
            ))}
        </>
    );
}

export default Certifications;
