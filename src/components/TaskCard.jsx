import React, {useState, useEffect} from 'react';
import React from 'react';
import {ref, onValue, update, remove} from 'firebase/database';
import{ database } from '../services/firebase';

const statusColors = {
    'new': 'border-blue-400 bg-blue-50',
    'in-progress': 'border-yellow-400 bg-yellow-50',
    'finished': 'border-green-400 bg-green-50',
};

const TaskCard = ({ task, taskId }) => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');

  if(!task || !task.status) return null;
  

  useEffect (() => {
    const membersRef = ref(database, 'scrumboard/members');
    const unsubscribe = onValue(membersRef, (onSnapshot) => {
      const data = onSnapshot.val();
      if(data) {
        const memberList = Object.entries(data).map(([id, value]) => ({
          id, 
          ...value
        }));
        setMembers(memberList);
      }
    });

    return () => unsubscribe();
  }, []);

  const eligibleMembers = members.filter(
    (m) => m.category === task.category
  );



    // Skapar funktion för att tillela en uppgift till en medlem
    const assignTask = async () => {
      if(!selectedMember) return alert("Välj en medlem först.");
      const found = eligibleMembers.find((m) => m.name === selectedMember);
      if(!found) return alert ("Ogiltig medlem för denna kategori");


        // Kontorerllar att kategori matchar medlemmens roll
        await update(ref(database, `scrumboard/tasks/${taskId}`), {
            member: selectedMember, 
            status: 'in-progress'
        });
    };

    // Skapar en funktion för att markera som färdig 
    const markAsFinished = async () => {
        await update(ref(database, `scrumboard/tasks/${taskId}`), {
            status: 'finished'
        });
    };

    // Skapar en funktion för att ta bort en uppgift 
    const deleteTask = async () => {
        if(window.confirm('Är du säker på att du vill ta bort uppgiften"')) {
            await remove(ref(database, `scrumboard/tasks/${taskId}`));
        }
    };


    return (
    <div
      className={`border-l-4 p-4 rounded-lg shadow-md mb-4 cursor-pointer hover:shadow-lg transition-shadow duration-300
        ${statusColors[task?.status]?? 'border-gray-300 bg-white'}`}
      title={`Kategori: ${task.category} | Status: ${task.status}`}
    >
      <h3 className="font-semibold text-lg mb-1">{task.assignment}</h3>
      <p className="text-sm text-gray-600 mb-1">Kategori: <span className="capitalize">{task.category}</span></p>
      <p className="text-xs text-gray-400 mb-2">
        Skapad: {task.timestamp ? new Date(task.timestamp).toLocaleString() : 'Okänt'}
      </p>

      {task.member && (
        <p className="text-sm mb-2">
          Tilldelad till: <span className="font-medium">{task.member}</span>
        </p>
      )}

      <div className="flex flex-col gap-2">
        {task.status === 'new' && (
          <>
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              className="px-2 py-1 rounded border"
            >
              <option value="">Välj medlem</option>
              {eligibleMembers.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
            <button
              onClick={assignTask}
              className="bg-blue-500 text-white rounded py-1 text-sm hover:bg-blue-600 transition"
            >
              Tilldela
            </button>
          </>
        )}

        {task.status === 'in-progress' && (
          <button
            onClick={markAsFinished}
            className="bg-green-500 text-white rounded py-1 text-sm hover:bg-green-600 transition"
          >
            Markera som färdig
          </button>
        )}

        {task.status === 'finished' && (
          <button
            onClick={deleteTask}
            className="bg-red-500 text-white rounded py-1 text-sm hover:bg-red-600 transition"
          >
            Radera
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;


