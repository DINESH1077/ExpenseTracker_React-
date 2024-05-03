

import './TrackerExpense.css'
import React, { useState } from 'react';

function ExpenseTracker() {
    const [expenses, setExpenses] = useState([]);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');

    const [editingIndex, setEditingIndex] = useState(null); // Track the index of the item being edited

    const handleAddExpense = () => {
        const newExpense = { name, date, amount: parseFloat(amount) };
        setExpenses([...expenses, newExpense]);
        setName('');
        setDate('');
        setAmount('');
    };

    const handleDeleteExpense = (index) => {
        const updatedExpenses = expenses.filter((_, i) => i !== index);
        setExpenses(updatedExpenses);
    };

    const handleUpdateExpense = (index) => {
        const updatedExpenses = [...expenses];
        updatedExpenses[index] = { name, date, amount: parseFloat(amount) };
        setExpenses(updatedExpenses);
        setEditingIndex(null); // Reset editing index after update
        setName('');
        setDate('');
        setAmount('');
    };

    const calculateTotal = () => {
        return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
    };

    return (
        <div>
            <h1 id='h1'>Expense Tracker</h1>    
            <div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Category"
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Date"
                />
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                />
                <button onClick={editingIndex !== null ? () => handleUpdateExpense(editingIndex) : handleAddExpense}>
                    {editingIndex !== null ? 'Update' : 'Add Expense'}
                </button>
            </div>
            <br></br>
            <br></br>
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Amount (Rs)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense, index) => (
                        <tr key={index}>
                            <td>{editingIndex === index ? (
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            ) : expense.name}</td>
                            <td>{editingIndex === index ? (
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            ) : expense.date}</td>
                            <td>{editingIndex === index ? (
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            ) : expense.amount}</td>
                            <td>
                                {editingIndex === index ? (
                                    <button onClick={() => handleUpdateExpense(index)}>Save</button>
                                ) : (
                                    <>
                                        <button onClick={() => setEditingIndex(index)}>Edit</button>
                                        <button onClick={() => handleDeleteExpense(index)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="total">Total Expenses: Rs {calculateTotal()}</div>
        </div>
    );
}

export default ExpenseTracker;
