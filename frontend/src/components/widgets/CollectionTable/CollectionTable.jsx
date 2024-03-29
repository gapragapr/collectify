import {Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Tooltip, Chip} from '@nextui-org/react'

import React from 'react'

const CollectionTable = ({columns, items, renderCell, generateChipColor, className}) => {
    return (
        <Table className={`w-fit ${className}`} aria-label='table'>
            <TableHeader columns={columns}>
              {(column) => (
                column.type ? 
                    <TableColumn className='text-center' align='center'>
                        <Tooltip content={column.type}>
                            <Chip className='text-center' color={generateChipColor(column.type)}>{column.label}</Chip>
                        </Tooltip>
                    </TableColumn> 
                    : 
                    <TableColumn className='text-center' align='center'>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent={'No rows to display.'} className={`overflow-auto max-h-[75vh]`} items={items || []}>
                {(item) => (
                    <TableRow className='hover:bg-gray-100' key={item._id}>
                        {(columnKey) => (
                            <TableCell key={columnKey} className='text-center'>{renderCell(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default CollectionTable