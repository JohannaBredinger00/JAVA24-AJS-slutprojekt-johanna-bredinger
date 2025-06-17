
import React, { useEffect, useState} from 'react';
import { ref, onValue} from 'firebase/database';
import{database} from '../services/firebase';
import TaskCard from './TaskCard';
import FilterSortPanel from './FilterSortPanel';

const TaskBoard = () => { 
    // Skapar tillstånd för alla uppgifter
    const [tasks, setTasks] = useState([]);

const [members, setMembers] = useState([]);

// Skapar tillstånd för filter och sprtering 
const [filters, setFilters] = useState({
    member: '',
    category: '',
    sort: 'timestamp-desc'
});

// Hämtar alla uppgifter från Firestpre när komponenten laddas
useEffect (() => {
    const tasksRef = ref(database, 'scrumboard/tasks');
    const unsubscribe = onValue(tasksRef, (snapshot) => {
        const data = snapshot.val();
        const taskList = data
        ? Object.entries(data).map(([id, value]) => ({
            id,
            ...value
        })) : [];
        setTasks(taskList);

        
    });
    
    return () => unsubscribe();
}, []);


// Delar upp uppgifterna i grupper baserat på status 
const groupedTasks = {
    new: [],
    'in-progress': [],
    finished: []
};

// Lägger varje uppgift i rätt grupp
tasks.forEach((task) => {
  if(!task || !task.status) return;
    if (groupedTasks[task.status]) {
        groupedTasks[task.status].push(task);
    }
});

return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-8">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-blue-900">Scrum Board</h1>
  
      {/* Filterpanel */}

      <FilterSortPanel
      filters={filters}
      setFilters={setFilters}
      members={members}
      categories={['ux', 'frontend', 'backend']}
    />
     
      
      
      {/* Scrumboard med tre kolumner */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {['new', 'in-progress', 'finished'].map((status) => (
          <div key={status} className="bg-white rounded-lg shadow-lg p-6 flex flex-col max-h-[75vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 capitalize border-b border-blue-300 pb-2 text-blue-700">
              {status.replace('-', ' ')}
            </h2>
  
            {groupedTasks[status]
              .filter((t) => (filters.member ? t.member === filters.member : true))
              .filter((t) => (filters.category ? t.category === filters.category : true))
              .sort((a, b) => {
                if (filters.sort === 'timestamp-desc') return b.timestamp - a.timestamp;
                if (filters.sort === 'timestamp-asc') return a.timestamp - b.timestamp;
                if (filters.sort === 'title-asc') return a.assignment.localeCompare(b.assignment);
                if (filters.sort === 'title-desc') return b.assignment.localeCompare(a.assignment);
                return 0;
              })
              .map((task) => <TaskCard key={task.id} task={task} taskId={task.id} />)}
  
            {groupedTasks[status].length === 0 && (
              <p className="text-gray-400 italic mt-4">Inga uppgifter här.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default TaskBoard;

