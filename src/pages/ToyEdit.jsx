import React from 'react';
import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, TextField } from "@mui/material";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toyService } from "../services/toy.service.js";
import { saveToy } from "../store/actions/toy.actions.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";


export function ToyEdit() {
    const navigate = useNavigate()
    const { toyId } = useParams()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())

    const labels = toyService.getLabels()

    const toySchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Name is required'),
        price: Yup.number()
            .min(1, 'Price must be higher 1')
            .required('Price is required'),
    });

    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => {
                setToyToEdit(toy)
            })
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    function onSaveToy(values, { setSubmitting }) {
        saveToy(values)
            .then(() => {
                showSuccessMsg('Toy saved!')
                navigate('/toy')
            })
            .catch(err => showErrorMsg('Error saving toy...', err))
    }

    console.log('toyToEdit:', toyToEdit)
    return <section className="edit-toy-container">
        <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

        <Formik
            enableReinitialize // to get the values from toyToEdit even if its not the first time it runs
            initialValues={toyToEdit}
            validationSchema={toySchema}
            onSubmit={onSaveToy}
        >
            {({ errors, touched, values: toyToEdit, handleChange }) => (
                <Form>
                    <Field
                        as={TextField}
                        label='Toy Name'
                        name="name"
                        placeholder="Enter toy name..."
                        value={toyToEdit.name}
                        onChange={handleChange}
                        error={touched.name && errors.name}
                        helperText={touched.name && errors.name}
                        required
                    />

                    <Field
                        as={TextField}
                        label='Toy Price'
                        name="price"
                        placeholder="Insert price..."
                        value={toyToEdit.price}
                        onChange={handleChange}
                        error={touched.price && errors.price}
                        helperText={touched.price && errors.price}
                        required
                    />

                    <FormControl margin='normal'>
                        <InputLabel id="labels-label">Labels</InputLabel>
                        <Select
                            multiple
                            label='Labels'
                            labelId="labels-label"
                            id="labels"
                            name='labels'
                            value={toyToEdit.labels}
                            renderValue={selected => selected.join(',')}
                            onChange={handleChange}
                            style={{ minWidth: '250px' }}
                        >
                            {labels.map(label => (
                                <MenuItem key={label} value={label}>
                                    <Checkbox checked={toyToEdit.labels.includes(label)} />
                                    <ListItemText primary={label} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button
                        variant="contained"
                        color='primary'
                        type='submit'>
                        {toyToEdit._id ? 'Save' : 'Add'}
                    </Button>
                </Form>
            )}

        </Formik>
    </section>

}