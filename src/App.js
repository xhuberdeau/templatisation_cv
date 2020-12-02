import React, { useRef, useState } from 'react';
import Pdf from "react-to-pdf";
import './App.css';
import Modal from './components/Modal';
import ResumeRenderer from './components/ResumeRenderer';
import AppContext from './contexts/appContext';
import cv from './cv_example.json'
import { path, assocPath, clone, dissocPath } from 'ramda';

const filterZones = (selectedPath) => {
    let filteredCv = clone(cv);
    selectedPath.forEach((path) => {
        filteredCv = dissocPath(path, filteredCv);
    })

    return filteredCv;
}

const App = () => {
    const ref = useRef(null);
    const [showAllZones, setShowAllZones] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [seeHelp, setSeeHelp] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [selectedZones, setSelectedZones] = useState({})
    const [paths, setPaths] = useState([]);
    const [resume, setResume] = useState(cv);
    const [filteredCv, setFilteredCv] = useState(cv);

    return (
        <div className="container">
            <div className="resume">
                <div ref={ref}>
                    <AppContext.Provider value={{
                        showAllZones,
                        downloading,
                        selectedZones,
                        resume,
                        updateZones: (zonePath) => {
                            const pathExists = path(zonePath, selectedZones);
                            let newPaths;
                            if (pathExists) {
                                let tmpPaths = clone(paths);
                                const index = tmpPaths.findIndex((elemPath) => elemPath.reduce((acc, val, index) => {
                                    return acc && val === zonePath[index];
                                }, true));
                                tmpPaths.splice(index, 1);
                                newPaths = tmpPaths;
                                setPaths(tmpPaths);
                            } else {
                                newPaths = [...paths, zonePath];
                                setPaths(newPaths);
                            }
                            setSelectedZones(assocPath(zonePath, !pathExists, selectedZones));
                            setFilteredCv(filterZones(newPaths));
                        }
                    }}
                    >
                        <ResumeRenderer />
                    </AppContext.Provider>
                </div>
            </div>
            <Modal show={seeHelp} close={() => setSeeHelp(false)}>
                <p>
                    L'outil permet de sélectionner les éléments du CV <strong>qu'on ne veut pas</strong> voir dans la version finale.
                </p>
                <ul>
                    <li>Cliquez sur le bouton "Afficher les zones" pour afficher les éléments du CV que l'on peut afficher / cacher.</li>
                    <li>Cliquez sur une zone du CV pour sélectionner une information à cacher dans la version finale, l'élément apparaît alors en rouge strié. Cliquez à nouveau dessus pour le rendre visible dans la version finale.</li>
                    <li>Le bouton "Preview" permet de prévisualiser le rendu final.</li>
                    <li>Enfin, le bouton "Télécharger" permet de récupérer un fichier PDF contenant le rendu final.</li>
                </ul>
            </Modal>
            <Modal show={downloading}>
                Chargement...
            </Modal>
            <Modal show={showPreview} close={() => setShowPreview(false)}>
                <AppContext.Provider value={{resume: filteredCv, preview: showPreview}}>
                    <ResumeRenderer />
                </AppContext.Provider>
            </Modal>
            <div className="buttons">
                <button onClick={() => setSeeHelp(true)}>Aide</button>
                <button onClick={() => setShowAllZones(!showAllZones)}>{showAllZones ? 'Cacher' : 'Afficher'} les zones</button>
                <button onClick={() => setShowPreview(true)}>Preview</button>
                <Pdf targetRef={ref} filename="cv.pdf" scale={0.5} x={40} onComplete={() => {
                    setResume(cv);
                    setDownloading(false);
                }}>
                    {({ toPdf }) => (
                        <button onClick={() => {
                            setDownloading(true);
                            setResume(filteredCv)

                            setTimeout(toPdf, 1000);
                        }} >Télécharger</button>
                    )}
                </Pdf>

            </div>
        </div>
    );
}

export default App;
