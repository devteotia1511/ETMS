import React, { createContext, useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        setLocalStorage();
        const { employees } = getLocalStorage();
        const today = new Date().toISOString().split("T")[0];

        const updatedEmployees = employees.map(emp => {
            let failedCount = emp.taskCounts.failed;
            let activeCount = emp.taskCounts.active;

            const updatedTasks = emp.tasks.map(task => {
                if (!task.completed && !task.failed && new Date(task.taskDate) < new Date(today)) {
                    if (task.active) activeCount--;
                    failedCount++;
                    return { ...task, failed: true, active: false };
                }
                return task;
            });

            return {
                ...emp,
                tasks: updatedTasks,
                taskCounts: {
                    ...emp.taskCounts,
                    failed: failedCount,
                    active: activeCount
                }
            };
        });

        setUserData(updatedEmployees);
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));

        const loggedIn = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedIn?.role === "employee") {
            const updatedSelf = updatedEmployees.find(emp => emp.firstName === loggedIn.data.firstName);
            localStorage.setItem("loggedInUser", JSON.stringify({ role: 'employee', data: updatedSelf }));
        }
    }, []);

    return (
        <div>
            <AuthContext.Provider value={[userData, setUserData]}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;