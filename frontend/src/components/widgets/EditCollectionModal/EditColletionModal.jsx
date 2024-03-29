import React, { useCallback, useEffect, useState } from 'react'

import { Modal, ModalHeader, ModalContent, ModalBody, ModalFooter, Button, Image, Chip, Popover, PopoverTrigger, PopoverContent, Input, Checkbox, Tooltip } from '@nextui-org/react'
import { TrashIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import DateInput from '../../shared/DateInput/DateInput'
import BooleanInput from '../../shared/BooleanInput/BooleanInput'
import StringInput from '../../shared/StringInput/StringInput'
import NumberInput from '../../shared/NumberInput/NumberInput'
import CollectionTable from '../CollectionTable/CollectionTable'

import { useCreateCollectionItemMutation, useDeleteCollectionItemMutation } from '../../../api/userApi'
import { useGetCollectionQuery } from '../../../api/sharedApi'
import { useParams } from 'react-router-dom'
import useGenerateChipColor from '../../../hooks/useGenerateChipColor'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useSelector } from 'react-redux'

const EditColletionModal = ({collectionData, actionFn}) => {
    const {username} = useParams()
    const {user} = useSelector(state => state.userSlice)

    const [createCollectionItem, createItemQueryData] = useCreateCollectionItemMutation()
    const [deleteCollectionItem, deleteItemQueryData] = useDeleteCollectionItemMutation()
    const {refetch, data} = useGetCollectionQuery(`/${username}/${collectionData._id}`)

    useEffect(() => {
        if (!createItemQueryData.isError && createItemQueryData.data){
            refetch()
            setCreatedItem({
                name: '',
                collectionItemCustomFields: [],
                tags: []
            })
            setStep(1)
            setPopoverIsOpen(false)

        }
    }, [createItemQueryData])

    useEffect(() => {
        if (!deleteItemQueryData.isError && deleteItemQueryData.data){
            refetch()
        }
    }, [deleteItemQueryData])

    const [step, setStep] = useState(1)
    const [isOpen, setIsOpen] = useState(true)
    const [popoverIsOpen, setPopoverIsOpen] = useState(false)
    const [createdItem, setCreatedItem] = useState({
        name: '',
        collectionItemCustomFields: [],
        tags: []
    })
    const [createdTag, setCreatedTag] = useState({tagName: ''})

    const customFieldsColumns = collectionData.collectionCustomFields.map(field => ({
        key: field.fieldName,
        label: field.fieldName,
        type: field.fieldType
    }));
    
    const columns = [
        {
            key: 'index',
            label: 'INDEX'
        },
        {
            key: 'id',
            label: 'ID'
        },
        {
            key: 'name',
            label: 'NAME'
        },
        ...customFieldsColumns,
        {
            key: 'tags',
            label: 'TAGS'
        },
        {
            key: 'options',
            label: 'OPTIONS'
        }
    ];

    const changeCreatedItemNameInputHandler = (e) => {
        setCreatedItem({
            ...createdItem,
            name: e.target.value
        })
    }
 
    const renderCell = useCallback((item, columnKey) => {
        const customField = item.collectionItemCustomFields.find(field => field.fieldName === columnKey)

        switch (columnKey) {
            case 'index':
                return data.userCollection.collectionItems.findIndex(collectionItem => item._id === collectionItem._id) + 1
            case 'id':
                return <Tooltip offset={-5} content={item._id}><p className='max-w-20 text-ellipsis overflow-hidden'>{item._id}</p></Tooltip>
            case 'name':
                return <Tooltip offset={-5} content={item.collectionItemName}><p className='max-w-20 text-ellipsis overflow-hidden'>{item.collectionItemName}</p></Tooltip>
            case 'tags':
                return item.collectionItemTags.map(tag => <p>{tag.tagName}</p>)
            case 'options':
                return <div className='flex justify-evenly'>
                          <TrashIcon onClick={() => clickDeleteItemButtonHandler(item)} className='w-5 cursor-pointer stroke-rose-500' />
                       </div>
            default:
                if (typeof customField?.fieldValue == 'boolean'){
                   return <Checkbox isSelected={customField?.fieldValue} isDisabled /> 
                }
                return customField?.fieldValue

        }        
    })

    const clickAddItemButtonHandler = () => {
        createCollectionItem({
            collectionId: collectionData._id,
            collectionAuthorId: collectionData.collectionAuthor,
            userInitiatorId: user._id,
            collectionItemData: {
                collectionItemName: createdItem.name,
                collectionItemTags: createdItem.tags,
                collectionItemCustomFields: createdItem.collectionItemCustomFields
            }
        })
    }

    const clickDeleteItemButtonHandler = (item) => {
        deleteCollectionItem({
            collectionId: collectionData._id,
            collectionAuthorId: collectionData.collectionAuthor,
            userInitiatorId: user._id,
            collectionItemId: item._id
        })
    }

    const changeTagInputHandler = (e) => {
        setCreatedTag({
            tagName: e.target.value
        })
    }

    const enterTagInputHandler = (e) => {
        if (e.keyCode === 13 && createdTag.tagName !== '' && createdTag.tagName !== null) {
            e.preventDefault()

            setCreatedItem(prevState => {
                const index = prevState.tags.findIndex(item => item.tagName === createdTag.tagName)
                if (index == -1) {
                    const updatedTags = [...prevState.tags, createdTag]
                    setCreatedTag({
                        tagName: ''
                    })
                    e.target.value = ''
                    return { ...prevState, tags: updatedTags }
                }
                return prevState;
            });
        }
    }

    const clickCloseTagHandler = (indexToRemove) => {
        setCreatedItem({
            ...createdItem,
            tags: createdItem.tags.filter((_, index) => index !== indexToRemove)
        })
    }

    const generateInputWithCurrentType = (field, index) => {
        switch (field.fieldType) {
            case 'String':
                return <StringInput key={index} index={index} createdItem={createdItem} setCreatedItem={setCreatedItem} fieldName={field.fieldName} color={useGenerateChipColor(field.fieldType)} />
            case 'Number':
                return <NumberInput key={index} index={index} createdItem={createdItem} setCreatedItem={setCreatedItem} fieldName={field.fieldName} color={useGenerateChipColor(field.fieldType)} />
            case 'Boolean':
                return <BooleanInput key={index} index={index} createdItem={createdItem} setCreatedItem={setCreatedItem} fieldName={field.fieldName}/>
            case 'Date':
                return <DateInput key={index} index={index} createdItem={createdItem} setCreatedItem={setCreatedItem} fieldName={field.fieldName} />
        } 
    }

    return (
        <>
            <Modal isOpen={isOpen} hideCloseButton className='max-w-fit'>
                <ModalContent>
                  {() => (
                    <>
                      <ModalHeader className="flex justify-between">
                        <div className='flex'>
                            <div className='w-40 h-40'>
                                <Image className='w-40 h-40' src={collectionData.collectionImg}/>
                            </div>
                            <div className='ml-6 flex flex-col justify-between'>
                                <p className='font-bold text-xl'>{collectionData.collectionName}</p>
                                <Markdown  className={'font-thin text-sm min-h-10 bg-gray-100 p-3 rounded-md text-md max-h-[150px] overflow-auto'} remarkPlugins={[remarkGfm]}>{collectionData.collectionDescription || 'No description'}</Markdown>
                                <div className='flex justify-between items-center'>
                                    <Chip variant='dot' color='secondary' size='lg'>{collectionData.collectionTopic}</Chip>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-end items-end'>
                            <Popover isOpen={popoverIsOpen} showArrow placement='bottom' onClick={(e) => {setPopoverIsOpen(false)}} backdrop='opaque'>
                                <PopoverTrigger>
                                    <Button onClick={() => setPopoverIsOpen(true)} color='primary' className='ml-6' variant='flat'>Add item</Button>
                                </PopoverTrigger>
                                <PopoverContent onClick={(e) => e.stopPropagation()} className="w-[240px]">
                                    {() => (
                                      <div className="px-1 py-2 w-full">
                                        <p className="text-small font-bold text-foreground">
                                          {step == 1 && 'Base info'}
                                          {step == 2 && 'Custom fields info'}
                                        </p>
                                        <div className="mt-2 flex flex-col gap-2 w-full">
                                          {step == 1 && 
                                            <>
                                                <Input 
                                                    label="Name" 
                                                    onChange={changeCreatedItemNameInputHandler} 
                                                    value={createdItem.name || ''} 
                                                    size="sm" 
                                                    variant="bordered" 
                                                    isInvalid={createdItem.name == ''}
                                                    errorMessage={createdItem.name == '' && 'Enter item name, please'}
                                                />
                                                <Input label="Tags" value={createdTag.tagName} onChange={changeTagInputHandler} onKeyDown={enterTagInputHandler} className='relative' size="sm" variant="bordered" endContent={
                                                    <div className='absolute top-1 right-1'>
                                                      <Tooltip offset={-3} closeDelay={0} content={'Use "Enter" to add a tag, please'}>
                                                        <InformationCircleIcon className='w-5 stroke-gray-400' />
                                                      </Tooltip>
                                                    </div>
                                                  }/>
                                                <div className='flex flex-wrap'>
                                                    {createdItem.tags.map((tag, index) => {
                                                        return <Chip onClose={() => clickCloseTagHandler(index)} key={index} size='md' color='success' className='mb-2' variant='dot'>{tag.tagName}</Chip>
                                                    })}
                                                </div>
                                                {collectionData.collectionCustomFields.length > 0 
                                                    ? <Button color='primary' variant='ghost' className='mt-3' onClick={() => {if (createdItem.name !== '') setStep(2)}} >Next step</Button>
                                                    : <Button color='success' variant='ghost' className='mt-3' isLoading={createItemQueryData.isLoading} onClick={clickAddItemButtonHandler} >Confirm</Button>
                                                }
                                            </>
                                          }
                                          {step == 2 &&
                                            <>
                                                {collectionData.collectionCustomFields.map((field, index) => {
                                                    return generateInputWithCurrentType(field, index)
                                                })}
                                                <div className='flex items-center justify-around mt-3'>
                                                    <Button color='warning' variant='flat' onClick={() => setStep(1)}>Prev step</Button>
                                                    <Button color='success' variant='ghost' isLoading={createItemQueryData.isLoading} onClick={clickAddItemButtonHandler}>Confirm</Button>
                                                </div>
                                            </>
                                          }
                                        </div>
                                      </div>
                                    )}
                                </PopoverContent>
                            </Popover>
                        </div>
                      </ModalHeader>
                      <ModalBody>
                        <CollectionTable className="w-full" columns={columns} items={data?.userCollection?.collectionItems} generateChipColor={useGenerateChipColor} renderCell={renderCell} />
                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" variant="light" onPress={() => {setIsOpen(false); actionFn(null)}}>
                          Close
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditColletionModal