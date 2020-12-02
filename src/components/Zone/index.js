import React, { useContext } from "react";
import './styles.css';
import AppContext from '../../contexts/appContext';
import classnames from 'classnames';
import { path } from 'ramda';
const Zone = ({ children, zonePath, className }) => {
    const { showAllZones, updateZones, selectedZones, downloading, preview, resume } = useContext(AppContext);

    return path(zonePath, resume) ? (
        <div onClick={() => !preview && updateZones(zonePath)} className={classnames({className: className ?? false, 'zone': !preview, 'highlight': !downloading && showAllZones, 'selected': !downloading && path(zonePath, selectedZones)})}>
            {children}
        </div>
    ) : null;
}

export default Zone;
