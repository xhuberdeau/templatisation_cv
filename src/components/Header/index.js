import React, { useContext } from 'react';
import AppContext from '../../contexts/appContext';
import Zone from '../Zone';
import './styles.css';

const Header = () => {
    const { resume } = useContext(AppContext);
    return (
        <>
            <div className="header">
                <Zone zonePath={['candidat', 'nom_complet']}>
                    {resume.candidat.nom_complet}
                </Zone>
                <div>{resume.candidat.poste}</div>
                <div className="key-skills-container">
                {
                    Object.keys(resume.competences_clefs)
                        .map(
                            (key) => <Zone key={key} zonePath={['competences_clefs', key]}>
                                #{resume.competences_clefs[key]}&nbsp;
                            </Zone>
                        )
                }
                </div>
                <div className="seniority">
                    <Zone zonePath={['candidat', 'experience']}>{resume.candidat.experience} d'xp</Zone>
                </div>
            </div>
            <div className="additional-info-container">
                <div className="addittional-info-col">
                    <Zone zonePath={['candidat', 'tests']}>
                        {resume.candidat.tests && Object.keys(resume.candidat.tests).map((key, index) =>
                            <div key={key}>
                                {key} {resume.candidat.tests[key]}
                            </div>

                        )}
                    </Zone>
                </div>
                <div className="addittional-info-col">
                        <Zone zonePath={['candidat', 'tarif']}>
                            Tarif&nbsp;{resume.candidat.tarif}
                        </Zone>
                        <Zone zonePath={['candidat', 'disponibilite']}>
                            Disponibilite&nbsp;{resume.candidat.disponibilite}
                        </Zone>
                </div>
            </div>
        </>
    );
}

export default Header;
