import React from 'react';
import './Covid.css';

const Covid = ({name,confirmed,active,recovered,deceased}) => {
    return (
        <div className='state-container'>
            <div className='state-row'>
                <div className='state-data'>
                    
                    <p className='state'>{name}</p>
                    <p className='confirmed'>{confirmed}</p>
                    <p className='active'>{active}</p>
                    <p className='recovered'>{recovered}</p>
                    <p className='deceased'>{deceased}</p>
                    
                </div>
            </div>
            
        </div>
    );
};

export default Covid;
