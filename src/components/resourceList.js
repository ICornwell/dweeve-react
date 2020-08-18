import React, {useState} from 'react'
import Divider from '@material-ui/core/Divider';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import './resourceList.css'
import { Typography } from '@material-ui/core';

function  ResourceList(props) {
    
    const [listState, setListState] = useState({ list: props.list, newInput: '', currentIdx: -1 })

    const handleListItemChange = (event, index) => {
        const oldName = listState.list[index]
        const newName = event.target.value
        const newList = [...listState.list]
        newList[index] = newName
        setListState( {...listState, list: newList})
        if (props.onSelectedResource)
            props.onSelectedResource('update', oldName, newName)
    }

    const deleteItem = (index) => {
        const delName = listState.list[index]
        const newList = [...listState.list];
        newList.splice(index, 1);
        const currentIdx = index < (newList.length - 1) ? listState.currentIdx : newList.length-1
        setListState( {...listState, list: newList, currentIdx: currentIdx})
        if (props.onSelectedResource)
            props.onSelectedResource('delete', delName, newList[currentIdx])
    };

    const handleDeleteButtonClick = (index) => {
        return (event) => {
            // In order for the form not to be submitted
            event.preventDefault();
            deleteItem(index);
        }
    };

    function onSelected(idx) {
        setListState( {...listState, currentIdx: idx})
        if (props.onSelectedResource)
            props.onSelectedResource('select', listState.list[idx],listState.list[idx])
    }

    const getList = () => {
        return listState.list.map((elem, index) => {
            return (
                <li key={index}>
                    <div style={{display:'flex', flexDirection:'row'}}>
                    <input
                        style={{flex:'auto', marginRight:'5px',background:(index===listState.currentIdx) ? '#c0e0c0' : '#c0c0c0'}}
                        onFocus={()=>onSelected(index)}
                        className='input-field'
                        type='text'
                        value={elem}
                        placeholder={props.placeholder ? props.placeholder : 'new resource name'}
                        onChange={e => {
                            handleListItemChange(e, index);
                        }}
                    />
                     <DeleteForeverIcon style={{flex:'none', color:'#8080b0'}}
                        onClick={handleDeleteButtonClick(index)}>
                    </DeleteForeverIcon>
                    </div>
                </li>
            );
        });
    };

    const onChange = (event) => {
        setListState({...listState, newInput : event.target.value})
    };

    const onKeyUp = (event) => {
        if (event.key !== 'Enter' || event.target.value.trim(' ').length === 0) 
            return
        addItem(event.target.value)
    }

    const onClickPlus = (event) => {
        if (listState.newInput.trim(' ').length === 0) 
            return
        addItem(listState.newInput)
    }
            
    const addItem = (name) => {
        const newList = [...listState.list].concat(name)
        setListState( {list: newList, newInput: '', currentIdx: newList.length-1})

        if (props.onSelectedResource)
            props.onSelectedResource('add', name, name)
    }

    
    return (
        <div className='react-list-editable'>
            <ul className='no-bullet-list'>{getList()} </ul>
            <Divider></Divider>
            <Typography style={{fontSize:'0.7em', marginTop:'7px'}}>Create new resources here:</Typography>
            <div style={{marginTop:'3px', display:'flex', flexDirection:'row'}}>
           
            <input
                style={{flex:'auto', marginRight:'5px'}}
                name='newInput'
                className='input-field'
                onChange={onChange}
                onKeyUp={onKeyUp}
                placeholder='new resource'
                value={listState.newInput}/>
             <AddCircleOutlineIcon style={{flex:'none', color:'#a0a0d0'}}
                onClick={onClickPlus}></AddCircleOutlineIcon>
            </div>
        </div>
    )
}
export default ResourceList



