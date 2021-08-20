import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';

import { CREATE_TECH } from '../utils/mutations';


export default function AddTechForm({ techList, setTechList }) {

    const [formData, setFormData] = useState({
        name: '...'
    });
    const [classNames, setClassNames] = useState({
        addTechError: 'hidden'
    })
    const { addTechError } = classNames

    const [createTech, { error }] = useMutation(CREATE_TECH)
    useEffect(() => { console.log(error) }, [error])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleInputClick = () => {
        if (formData.name === '...') setFormData({ name: '' })
        if (addTechError !== 'hidden') resetAddTech()
    }

    const resetAddTech = () => {
        setClassNames({ ...classNames, addTechError: 'hidden' })
        setFormData({ ...formData, name: '' })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const { name } = formData
        try {
            if (!validateFormSubmit()) return setClassNames({ ...classNames, addTechError: 'error' })

            const { data } = await createTech({ variables: { name } })
            console.log(data["createTech"])
            resetAddTech()
            setTechList([...techList, data["createTech"]])
        } catch (error) {
            setClassNames({ ...classNames, addTechError: 'error' })
            console.log(error)
        }
    }

    const validateFormSubmit = () => {
        const { name } = formData
        if (name.trim() === '') return false
        if (name.trim() === '...') return false
        return true
    }

    return (
        <form className="add-tech-form" onSubmit={handleFormSubmit}>
            <div className="display-flex-error">
                <label htmlFor="name" >Add Tech:</label>
                <p className={addTechError}>{!validateFormSubmit() ? `please enter a technology` : `${formData.name} already added`}</p>
            </div>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onClick={handleInputClick}
            />
            <button className="btn btn-primary add-tech" type="submit">Add</button>
        </form>
    )
}
