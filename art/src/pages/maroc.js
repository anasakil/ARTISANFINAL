import React from 'react';
import MoroccoMap from '../Map/MoroccoMap';


const Maroc = () => {
    return (
        <div className="flex" style={{ height: '150px' }}>
            <div className="flex-1 order-2">
                <MoroccoMap/>
            </div>
            <div className="flex-1 order-1">
                {/* Your text content here */}
            </div>
        </div>
    );
};

export default Maroc;
