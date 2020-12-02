import React from "react";
import Certifications from '../Certifications';
import Competences from '../Competences';
import Diplomes from '../Diplomes';
import Experiences from '../Experiences';
import Header from '../Header';
import './styles.css';

const ResumeRenderer = () => {
    return (
        <div className="resume-container">
            <Header />
            <div className="spacer" />
            <Certifications />
            <div className="spacer" />
            <Competences />
            <div className="spacer" />
            <Experiences />
            <div className="spacer" />
            <Diplomes />
        </div>
    );
}

export default ResumeRenderer;
