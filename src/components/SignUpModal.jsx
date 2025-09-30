import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const SignUpModal = ({ onClose, onSave }) => {
    const [name, setName] = useState('');

    const handleSubmit = () => {
        if (name.trimEnd()) {
            localStorage.setItem('username', name);
            onSave(name);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-[#1e2235] p-8 rounded-xl shadow-lg text-center">
                <h2 className="text-xl font-bold mb-4">Let's Get Started!</h2>
                <input 
                    type="text"
                    placeholder="Enter your name"
                    className="p-2 rounded mb-4 border dark:bg-gray-800"
                    value={name}
                    onChange={(e) => setName(e.target.value)}  />
                    <div className="flex justify-center gap-4">
                        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Save
                        </button>
                        <button onClick={onClose} className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-4 py-2 rounded">
                            Cancel
                        </button>
                    </div>
            </div>
        </div>
    );
};


export default SignUpModal;

