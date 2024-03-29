import React, { useEffect } from 'react'
import { Input } from '@nextui-org/react'

const NumberInput = ({fieldName, createdItem, setCreatedItem, index, color}) => {

    useEffect(() => {
        if (!createdItem.collectionItemCustomFields[index]?.fieldValue) {
            setCreatedItem(prevState => {
                const updatedCustomFields = [...prevState.collectionItemCustomFields];
                updatedCustomFields[index] = { fieldName, fieldValue: 0 };
                return { ...prevState, collectionItemCustomFields: updatedCustomFields };
            });
        }
    }, [])

    const changeStringInputHandler = (e) => {
        setCreatedItem(prevState => {
            const updatedCustomFields = [...prevState.collectionItemCustomFields];
            updatedCustomFields[index] = { fieldName, fieldValue: e.target.value };
            return { ...prevState, collectionItemCustomFields: updatedCustomFields };
        });
    }
    
    return (
        <Input onChange={changeStringInputHandler} value={createdItem.collectionItemCustomFields[index]?.fieldValue || ''} key={index} label={fieldName} type='number' color={color} />
    )
}

export default NumberInput