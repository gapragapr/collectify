import React, { useEffect, useState } from 'react'
import { Checkbox } from '@nextui-org/react'

const BooleanInput = ({fieldName, createdItem, setCreatedItem, index}) => {
    const [isSelected, setIsSelected] = useState(false)

    useEffect(() => {
        if (!createdItem.collectionItemCustomFields[index]?.fieldValue) {
            setCreatedItem(prevState => {
                const updatedCustomFields = [...prevState.collectionItemCustomFields];
                updatedCustomFields[index] = { fieldName, fieldValue: false };
                return { ...prevState, collectionItemCustomFields: updatedCustomFields };
            });
        }
    }, [])

    const clickWrapperHandler = () => {
        setIsSelected(!isSelected)

        setCreatedItem(prevState => {
            const updatedCustomFields = [...prevState.collectionItemCustomFields];
            updatedCustomFields[index] = { fieldName, fieldValue: !isSelected };
            return { ...prevState, collectionItemCustomFields: updatedCustomFields };
        });
    }

    return (
        <div onClick={clickWrapperHandler} className='h-14 cursor-pointer bg-sky-100 hover:bg-sky-200 transition-all rounded-lg py-2 px-3 box-border flex justify-between items-center text-sky-400'>
            <p>{fieldName}</p>
            <Checkbox onClick={clickWrapperHandler} isSelected={createdItem.collectionItemCustomFields[index]?.fieldValue || isSelected} color='primary'/>
        </div>
    )
}

export default BooleanInput