import React, { useState } from 'react';
import { ref, push } from 'firebase/database';
import { database } from '../services/firebase';

const MemberForm = () => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('ux');

    // Skapar ufnktion för att lägga till ny medlem 
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!name.trim()) return alert('Namnet får inte vara tomt!');

        const membersRef = ref(database, 'scrumboard/members');
        await push(membersRef, {
            name,
            category: role
        });

        setName('');
        setRole('ux');
        };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded shadow-md mb-4">
            <h2 className="text-lg font-semibold mb-2">Lägg till en team member</h2>
            <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Namn'
            className='w-full p-2 border rounded mb-2'
        />
        <select 
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className='w-full p-2 border rounded mb-2'
        >
            <option value="ux">UX</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
        </select>
        <button type='submit' className='w-full bg-green-600 text-white py-2 rounded'>
            Lägg till medlem
        </button>
        </form>
    );
};

export default MemberForm;