import React, { useEffect, useRef, useState } from 'react'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'

const DateInput = ({fieldName, createdItem, setCreatedItem, index}) => {
    const inputRef = useRef(null)
    const [date, setDate] = useState(null)

    useEffect(() => {
        if (!createdItem.collectionItemCustomFields[index]?.fieldValue) {
            setCreatedItem(prevState => {
                const updatedCustomFields = [...prevState.collectionItemCustomFields];
                updatedCustomFields[index] = { fieldName, fieldValue: '' };
                return { ...prevState, collectionItemCustomFields: updatedCustomFields };
            });
        }
    }, [])

    const clickWrapperHandler = () => {
        inputRef.current.showPicker()
    }

    const changeDateInputHandler = (e) => {
        setDate(e.target.value)

        setCreatedItem(prevState => {
            const updatedCustomFields = [...prevState.collectionItemCustomFields];
            updatedCustomFields[index] = { fieldName, fieldValue: e.target.value };
            return { ...prevState, collectionItemCustomFields: updatedCustomFields };
        });
    }

    return (
        <div onClick={clickWrapperHandler} className='h-14 relative cursor-pointer bg-warning-100 hover:bg-warning-200 transition-all rounded-lg py-2 px-3 box-border flex justify-between items-center text-warning-400 hover:text-warning-600'>
            <p>{date || createdItem.collectionItemCustomFields[index]?.fieldValue || fieldName}</p>
            <input onChange={changeDateInputHandler} ref={inputRef} type="date" className='w-1 absolute right-7 opacity-0' />
            <CalendarDaysIcon className='w-6 mr-[6px]' />
        </div>
    )
}

export default DateInput