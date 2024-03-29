import React, { useEffect, useRef } from 'react'
import {Modal, ModalContent, ModalBody, ModalFooter, Button, Input, Textarea, Select, SelectItem, Accordion, AccordionItem, Chip, Tooltip, useDisclosure} from "@nextui-org/react";
import { useState } from 'react';
import useGenerateChipColor from '../../../hooks/useGenerateChipColor';

import { FolderPlusIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux';
import { useCreateCollectionMutation } from '../../../api/userApi';

const CreateCollectionModal = ({refetch}) => {
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
    const {user} = useSelector(state => state.userSlice)

    const inputFileRef = useRef(null)
    const inputFieldName = useRef(null)

    const [createCollection, {isLoading, data}] = useCreateCollectionMutation()

    const [collectionQueryDataErrors, setCollectionQueryDataErrors] = useState({ collectionName: { errorMessage: null }, collectionTopic: { errorMessage: null },})
    const [customField, setCustomField] = useState({ fieldName: null, fieldType: null })
    const [selectedImage, setSelectedImage] = useState({ url: null });

    useEffect(() => {
      if (data) {
        setSelectedImage({
          url: null,
        })
        setCollectionQueryData({
          userInitiatorId: user._id,
          collectionData: {
            collectionAuthor: user._id,
            collectionName: null,
            collectionDescription: '',
            collectionTopic: null,
            collectionCustomFields: []
          }
        })
        onClose()
        refetch()
      }
    }, [data])

    const [collectionQueryData, setCollectionQueryData] = useState({
      userInitiatorId: user._id,
      collectionData: {
        collectionAuthor: user._id,
        collectionName: null,
        collectionDescription: '',
        collectionTopic: null,
        collectionCustomFields: []
      }
    })

    const changeCollectionBaseInfoHandler = (e, type) => {
      setCollectionQueryData(prevState => ({
        ...prevState,
        collectionData: {
          ...prevState.collectionData,
          [type]: e.target.value
        }
      }))
      setCollectionQueryDataErrors({
        ...collectionQueryDataErrors,
        [type]: {
          errorMessage: null
        }
      })
    }

    const changeFileSpaceHandler = (event, file) => {
      event.preventDefault();
    
      const reader = new FileReader();
    
      reader.onloadend = () => {
        setSelectedImage({
          url: reader.result,
        });
      };
    
      reader.readAsDataURL(file);
    };

    const changeCustomFieldInputHandler = (e) => {
      setCustomField({
        ...customField,
        fieldName: e.target.value
      })
    }

    const changeCustomFieldSelectHandler = (e) => {
      const updatedCustomField = {
        ...customField,
        fieldType: e.target.value
      };
    
      setCustomField({
        fieldName: null,
        fieldType: null
      });
    
      setCollectionQueryData(prevState => ({
        ...prevState,
        collectionData: {
          ...prevState.collectionData,
          collectionCustomFields: [
            ...prevState.collectionData.collectionCustomFields,
            updatedCustomField
          ]
        }
      }));
    
      inputFieldName.current.value = '';
      e.target.value = '';
    }

    const deleteFieldHandler = (indexToRemove) => {
      setCollectionQueryData(prevState => ({
        ...prevState,
        collectionData: {
          ...prevState.collectionData,
          collectionCustomFields: prevState.collectionData.collectionCustomFields.filter((_, index) => index !== indexToRemove)
        }
      }));
    }

    const clickCreateCollectionButtonHandler = (onClose) => {
      let updatedFormError = { ...collectionQueryDataErrors };
      Object.keys(collectionQueryData.collectionData).forEach(key => {
          if (!collectionQueryData.collectionData[key]) {
              updatedFormError = {
                  ...updatedFormError,
                  [key]: {
                      errorMessage: `Enter ${key}, please`
                  }
              };
              
          }
      });

      setCollectionQueryDataErrors(updatedFormError);

      if (Array.from(Object.values(collectionQueryData.collectionData)).every(item => item !== null)) {
        createCollection({...collectionQueryData, collectionImage: selectedImage.url})
     }
    }

    return (
      <>
        <Button endContent={<FolderPlusIcon className='w-6'/>} color='primary' onPress={onOpen}>Create collection</Button>
        <Modal backdrop={'blur'} placement='center' hideCloseButton isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody className='py-6'>
                  {!selectedImage.url && 
                    <div 
                      onClick={() => inputFileRef.current.click()} 
                      onDrop={(event) => changeFileSpaceHandler(event, event.dataTransfer.files[0])}
                      onDragOver={(event) => event.preventDefault()}
                      className='h-80 w-full cursor-pointer flex justify-center items-center rounded-xl border-dashed border-2 border-gray-300 mt-7'>
                        <span className='text-gray-400 font-bold'>Drop or select image</span>
                    </div>
                  } 
                  {selectedImage.url && 
                    <img 
                      src={selectedImage.url} 
                      onClick={() => inputFileRef.current.click()} 
                      onDrop={(event) => changeFileSpaceHandler(event, event.dataTransfer.files[0])}
                      onDragOver={(event) => event.preventDefault()}
                      className='h-80 w-full object-cover cursor-pointer' 
                      alt="Selected"/>}
                  <input ref={inputFileRef} onChange={(event) => changeFileSpaceHandler(event, event.target.files[0])} className='hidden' type='file' />
                  <Accordion selectionMode='multiple' defaultExpandedKeys={["1"]}>
                    <AccordionItem key={'1'} title={'Base settings'}>
                      <Input 
                        isInvalid={collectionQueryDataErrors.collectionName.errorMessage !== null}
                        errorMessage={collectionQueryDataErrors.collectionName.errorMessage} 
                        label={'Collection name'} 
                        className='mb-3 font-bold'
                        defaultValue={collectionQueryData.collectionData.collectionName || ''}
                        onChange={(e) => changeCollectionBaseInfoHandler(e, 'collectionName')} /> 
                      <Textarea 
                        label={'Collection description'} 
                        className='mb-3 font-bold relative'
                        defaultValue={collectionQueryData.collectionData.collectionDescription || ''}
                        onChange={(e) => changeCollectionBaseInfoHandler(e, 'collectionDescription')}
                        endContent={
                          <div className='absolute top-2 right-2'>
                            <Tooltip offset={-3} closeDelay={0} content={'You can use markdown'}>
                              <InformationCircleIcon className='w-6 stroke-gray-500' />
                            </Tooltip>
                          </div>
                        }/>
                      <Input 
                        isInvalid={collectionQueryDataErrors.collectionTopic.errorMessage !== null}
                        errorMessage={collectionQueryDataErrors.collectionTopic.errorMessage} 
                        label={'Topic'} 
                        className='mb-3 font-bold'
                        defaultValue={collectionQueryData.collectionData.collectionTopic || ''}
                        onChange={(e) => changeCollectionBaseInfoHandler(e, 'collectionTopic')} />
                    </AccordionItem>
                    <AccordionItem key={'2'} title={'Custom fields'}>
                      <div className='flex mb-3'>
                        <Input ref={inputFieldName} value={customField.fieldName || ''} label={'Custom field name'} onChange={changeCustomFieldInputHandler} className='mr-3 w-2/3' />
                        <Select selectedKeys={[]} onChange={changeCustomFieldSelectHandler} isDisabled={customField.fieldName == null} label={'Type'} className='w-1/3 mr-3'>
                          <SelectItem color='success' variant='flat' key={'String'}>String</SelectItem>
                          <SelectItem color='secondary' variant='flat' key={'Number'}>Number</SelectItem>
                          <SelectItem color='primary' variant='flat' key={'Boolean'}>Boolean</SelectItem>
                          <SelectItem color='warning' variant='flat' key={'Date'}>Date</SelectItem>
                        </Select>
                      </div>
                      <div>
                        {collectionQueryData.collectionData.collectionCustomFields.map((item, index) => {
                          return (
                            <Tooltip key={index} offset={-5} closeDelay={0} content={item.fieldType}>
                              <Chip 
                                color={useGenerateChipColor(item.fieldType)} 
                                variant={'flat'} 
                                className='mr-3 mb-3' 
                                onClose={() => deleteFieldHandler(index)} >
                                  {item.fieldName}
                              </Chip>
                            </Tooltip>
                          )
                        })}
                      </div>
                    </AccordionItem>
                  </Accordion>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button isLoading={isLoading} color="primary" onPress={() => clickCreateCollectionButtonHandler(onClose)}>
                    Create
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    )
}

export default CreateCollectionModal