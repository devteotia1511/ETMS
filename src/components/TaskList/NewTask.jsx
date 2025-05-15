import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const NewTask = ({ data }) => {
  const [userData, setUserData] = useContext(AuthContext);

  const handleAccept = () => {
    const updated = userData.map((emp) => {
      if (emp.tasks.some(task => task.taskTitle === data.taskTitle && task.taskDate === data.taskDate)) {
        const tasks = emp.tasks.map((task) => {
          if (task.taskTitle === data.taskTitle && task.taskDate === data.taskDate) {
            return {
              ...task,
              newTask: false,
              active: true,
            };
          }
          return task;
        });

        const taskCounts = {
          ...emp.taskCounts,
          newTask: emp.taskCounts.newTask - 1,
          active: emp.taskCounts.active + 1,
        };

        return {
          ...emp,
          tasks,
          taskCounts,
        };
      }
      return emp;
    });

    setUserData(updated);
    localStorage.setItem('employees', JSON.stringify(updated));

    const loggedIn = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedIn?.role === 'employee') {
      const updatedSelf = updated.find(
        (emp) => emp.firstName === loggedIn.data.firstName
      );
      localStorage.setItem(
        'loggedInUser',
        JSON.stringify({ role: 'employee', data: updatedSelf })
      );
    }
  };

  return (
    <div className='flex-shrink-0 h-full w-[300px] p-5 bg-green-400 rounded-xl'>
      <div className='flex justify-between items-center'>
        <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>{data.category}</h3>
        <h4 className='text-sm'>{data.taskDate}</h4>
      </div>
      <h2 className='mt-5 text-2xl font-semibold'>{data.taskTitle}</h2>
      <p className='text-sm mt-2'>{data.taskDescription}</p>
      <div className='mt-6'>
        <button
          className='bg-blue-500 rounded font-medium py-1 px-2 text-xs w-full'
          onClick={handleAccept}
        >
          Accept Task
        </button>
      </div>
    </div>
  );
};

export default NewTask;