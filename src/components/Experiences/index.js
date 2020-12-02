import React, { useContext } from "react";
import AppContext from '../../contexts/appContext';
import Zone from '../Zone';
import './styles.css';

const Experiences = () => {
    const { resume } = useContext(AppContext);

    if (Object.keys(resume.experiences).length === 0) {
        return null;
    }

    return (
        <>
            <div className="category">
                Expériences professionnelles
            </div>
            <br />
            {Object.keys(resume.experiences).map((key) => (
                <Zone key={`experiences${key}`} zonePath={['experiences', key]}>
                    <span className="titre">{resume.experiences[key].titre}</span>
                    <br />
                    {resume.experiences[key].poste && (
                        <>
                            <span className="poste">{resume.experiences[key].poste}</span>
                            <br />
                            <br />
                        </>
                    )}
                    {resume.experiences[key].projet && (
                        <>
                            <span className="projet"><strong>Projet :</strong> {resume.experiences[key].projet}</span>
                            <br />
                            <br />
                        </>
                    )}
                    {resume.experiences[key].contexte && (
                        <>
                            <span className="contexte"><strong>Contexte :</strong> {resume.experiences[key].contexte}</span>
                            <br />
                        </>
                    )}
                    <span className="description" dangerouslySetInnerHTML={{__html: resume.experiences[key].description}} />
                    <span
                        className="environnement">Environnement technique : {resume.experiences[key].environnement}</span>
                    <br />
                    <br />
                    <br />
                </Zone>
            ))}
        </>
    );
}

export default Experiences;
