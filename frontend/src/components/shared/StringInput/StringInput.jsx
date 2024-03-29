import React, { useEffect } from 'react'
import { Input } from '@nextui-org/react'

const StringInput = ({fieldName, createdItem, setCreatedItem, index, color}) => {

    useEffect(() => {
        if (!createdItem.collectionItemCustomFields[index]?.fieldValue) {
            setCreatedItem(prevState => {
                const updatedCustomFields = [...prevState.collectionItemCustomFields];
                updatedCustomFields[index] = { fieldName, fieldValue: '' };
                return { ...prevState, collectionItemCustomFields: updatedCustomFields };
            });
        }
    }, [])

    const changeStringInputHandler = (e) => {
        if (!/^[\p{L}\s]*$/u.test(e.target.value)) {
            return;
        }

        setCreatedItem(prevState => {
            const updatedCustomFields = [...prevState.collectionItemCustomFields];
            updatedCustomFields[index] = { fieldName, fieldValue: e.target.value };
            return { ...prevState, collectionItemCustomFields: updatedCustomFields };
        });
    }

    return (
        <Input onChange={changeStringInputHandler} pattern="/^[\p{L}\s]*$/u" value={createdItem.collectionItemCustomFields[index]?.fieldValue || ''} key={index} label={fieldName} type='text' color={color} />
    )
}

export default StringInput