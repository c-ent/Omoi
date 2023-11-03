    "use client"
    import React, { useState } from 'react';



       

    export function Checkbox({ post, checked }) {
        const [checkedItems, setCheckedItems] = useState([]);
        const [isChecked, setIsChecked] = useState(false);
        const handleCheckboxChange = () => {
            setIsChecked(!isChecked);
            
            if (isChecked) {
                setCheckedItems([...checkedItems, post._id]);
                console.log(checkedItems)
            } else {
                setCheckedItems(checkedItems.filter((id) => id !== post._id))
                console.log(checkedItems)
            }
        };
        
        return (
            <div>
                <label>
                    <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    />
                    Check this box
                </label>

            </div>
        );
    }


