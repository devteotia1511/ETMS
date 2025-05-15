import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const AcceptTask = ({ data }) => {
  const [userData, setUserData] = useContext(AuthContext);

  const handleComplete = () => {
    const updated = userData.map(emp => {
      const updatedTasks = emp.tasks.map(task => {
        if (task.taskTitle === data.taskTitle && task.taskDate === data.taskDate) {
          return { ...task, active: false, completed: true };
        }
        return task;
      });

      if (emp.tasks.some(task => task.taskTitle === data.taskTitle)) {
        return {
          ...emp,
          tasks: updatedTasks,
          taskCounts: {
            ...emp.taskCounts,
            active: emp.taskCounts.active - 1,
            completed: emp.taskCounts.completed + 1,
          }
        };
      }

      return emp;
    });

    setUserData(updated);
    localStorage.setItem("employees", JSON.stringify(updated));

    const loggedIn = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedIn?.role === "employee") {
      const updatedSelf = updated.find(emp => emp.firstName === loggedIn.data.firstName);
      localStorage.setItem("loggedInUser", JSON.stringify({ role: 'employee', data: updatedSelf }));
    }
  };

  return (
    <div className='flex-shrink-0 h-full w-[300px] p-5 bg-yellow-400 rounded-xl'>
      <div className='flex justify-between items-center'>
        <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>{data.category}</h3>
        <h4 className='text-sm'>{data.taskDate}</h4>
      </div>
      <h2 className='mt-5 text-2xl font-semibold'>{data.taskTitle}</h2>
      <p className='text-sm mt-2'>{data.taskDescription}</p>
      <div className='mt-6'>
        <button onClick={handleComplete} className='w-full bg-green-600 rounded font-medium py-1 px-2 text-xs'>
          Mark Complete
        </button>
      </div>
    </div>
  );
};

export default AcceptTask;