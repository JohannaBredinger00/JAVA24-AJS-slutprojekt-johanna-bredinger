// import React, {useState, useEffect} from 'react';
import React from 'react';
import {ref, update, remove} from 'firebase/database';
import{ database } from '../services/firebase';

const statusColors = {
    'new': 'border-blue-400 bg-blue-50',
    'in-progress': 'border-yellow-400 bg-yellow-50',
    'finished': 'border-green-400 bg-green-50',
};

const TaskCard = ({ task, taskId }) => {
    if (!task) return null;
    // Skapar funktion för att tillela en uppgift till en medlem
    const assignTask = async () => {
        const member = prompt("Tilldelad till (skriv namn exakt):");
        if(!member) return;

        // Kontorerllar att kategori matchar medlemmens roll
        await update(ref(database, `scrumboard/tasks/${taskId}`), {
            member, 
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
          ${statusColors[task.status] || 'border-gray-300 bg-white'}`}
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
    
          <div className="flex gap-2">
            {task.status === 'new' && (
              <button
                onClick={assignTask}
                className="flex-grow bg-blue-500 text-white rounded py-1 text-sm hover:bg-blue-600 transition"
              >
                Tilldela
              </button>
            )}
    
            {task.status === 'in-progress' && (
              <button
                onClick={markAsFinished}
                className="flex-grow bg-green-500 text-white rounded py-1 text-sm hover:bg-green-600 transition"
              >
                Markera som färdig
              </button>
            )}
    
            {task.status === 'finished' && (
              <button
                onClick={deleteTask}
                className="flex-grow bg-red-500 text-white rounded py-1 text-sm hover:bg-red-600 transition"
              >
                Radera
              </button>
            )}
          </div>
        </div>
      );
    };






















//     return (
//         <div className={`border-l-4 p-4 rounded-lg shadow-md mb-4 cursor-pointer hover-shadow-lg transition-shadow duraion-300
//             ${statusColors[task.status] || 'border-gray-300 bg-white'}`}
//             title={`Kategori: ${task.category} | Status: ${task.status}`}
//             >
//             <h3 className="font-semibold text-lg mb-1">{task.assignment}</h3>
//             <p className="text-sm text-gray-600 mb-1">Kategori: <span className="capitalize">{task.category}</span></p>
//             <p className="text-xs text-gray-400 mb-2">Skapad: {task.timestamp ? new Date(task.timestamp).toLocaleString() : 'Okänt'}</p>
//             {task.member && 
//             <p>Tilldelad till: {task.member}</p>}

//             {/* Visa rätt knapp beorende på status */}
//             {task.status === 'new' && (
//                 <button onClick={assignTask} className='mt-2 px-3 py-1 bg-blue-500 text-white rounded'>
//                     Tilldela
//                     </button>
//             )}

//             {task.status === 'in-progress' && (
//                 <button onClick={markAsFinished} className='mt-2 px-3 py-2 bg-green-500 text-white rounded'>
//                     Markera som färdig
//                     </button>

//             )}

            
//             {task.status === 'finished' && (
//                 <button onClick={deleteTask} className='mt-2 px-3 py-1 bg-red-500 text-white rounded'>
//                     Radera
//                     </button>
//             )}
//         </div>
//     );
// }

export default TaskCard;