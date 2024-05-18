import React, { useState, useEffect } from "react";
import { getAvailableSpaceTypes } from "../api/ApiFunctions";

const ParqueaderoTypeSelector = ({ handleSpaceInputChange, newSpace }) => {
    const [spaceType, setSpaceType] = useState("");

    useEffect(() => {
        getAvailableSpaceTypes().then((data) => {
            if (data.length > 0) {
                setSpaceType(data[0]);
                handleSpaceInputChange({ target: { name: "spaceType", value: data[0] } });
            }
        });
    }, [handleSpaceInputChange]);

    return (
        <div>
            {spaceType && (
                <select
                    required
                    className="form-select"
                    name="spaceType"
                    onChange={handleSpaceInputChange}
                    value={newSpace.spaceType}
                >
                    <option value={spaceType}>{spaceType}</option>
                </select>
            )}
        </div>
    );
};

export default ParqueaderoTypeSelector;
