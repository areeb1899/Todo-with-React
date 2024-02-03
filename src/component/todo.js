import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';



const Todo = () => {
    const [inputData, setInputData] = useState('');
    const [todo, setTodo] = useState([]);



    // Load todos from local storage on component mount
    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            setTodo(JSON.parse(storedTodos));
        }
    }, []);
    // Save todos to local storage whenever todo change
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todo));
    }, [todo]);


    //adding the todos in the setTodo in an array form.
    function addTodo() {
        if (!inputData) {
            alert('Please input todo')
        } else {
            setTodo([...todo, inputData]);
            setInputData('')
        }
    }

    function changeInput(e) {
        setInputData(e.target.value);
    }

    //deleting the todo through filter method which returns the new array
    function deleteTodo(id) {
        const updateTodo = todo.filter((elem, ind) => {
            return ind !== id //if the ind is not equal to id it will stay in array.
        })
        setTodo(updateTodo);

    }

    //toggling the todos when the user clicks on the task if it is done or no.
    function toggleTodoStatus(id) {
        const updatedTodos = todo.map((elem, ind) => {
            if (ind === id) {
                // Toggle the status of the todo when clicked
                return elem.startsWith('✅') ? elem.slice(1) : `✅${elem}`;
            }
            return elem;
        });
        setTodo(updatedTodos);
    }

    //removing the todos from the array
    function removeAll() {

        setTodo([])
    }

    return (
        <>
            <h1>Todo App</h1>

            <div className='container'>

                <div className='input'>
                    <input type='text' placeholder='Enter your todo' value={inputData} onChange={changeInput} onKeyDown={(e) => e.key === 'Enter' && addTodo()} />
                    <FontAwesomeIcon icon={faPlus} onClick={addTodo} className='faPlus' />
                </div>
                <div className='second-container'>
                    {
                        todo.map((elem, ind) => {
                            return (
                                <div className='todoBody' key={ind}>
                                    <h3 onClick={() => toggleTodoStatus(ind)} style={{ cursor: 'pointer' }}>{elem}</h3>
                                    <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(ind)} className='faTrash' />
                                </div>

                            )
                        })
                    }

                </div>

                {
                    todo.length ? <button onClick={removeAll}>Remove All</button> : null
                }



            </div>
        </>
    );
}

export default Todo;
