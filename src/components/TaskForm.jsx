import React, {useState} from 'react';
import { ref, push } from 'firebase/database';
import{database} from '../services/firebase';

const TaskForm = () => {
    const [assignment, setAssignment] = useState('');
    const [category, setCategory] = useState('ux');

    // Skapar en funktion för att skapa en ny upgift i databasen
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!assignment.trim()) return alert('Uppgiften får inte vara tom!');

        const tasksRef = ref(database, 'scrumboard/tasks');
        await push(tasksRef, {
            assignment,
            category,
            status: 'new',
            timestamp: Date.now(),
            member: ''
        });

        setAssignment(''); 
        setCategory('ux');
        // onClose();
    };


    return (
        <form onSubmit={handleSubmit} className='p-4 bg-gray-100 rounded shadow-md mb-4'>
            <h2 className='text-lg font-semibold mb-2'>Skapa ny uppgift</h2>
            <input
            type="text"
            value={assignment}
            onChange={(e) => setAssignment(e.target.value)}
            placeholder='Uppgiftstitel'
            className='w-full p-2 border rounded mb-2'
            />
            <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='w-full p-2 border rounded mb-2'
            >
                <option value="ux">UX</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                </select>
                <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded'>
                    Lägg till uppgift
                </button>
        </form>
    );
};


export default TaskForm;