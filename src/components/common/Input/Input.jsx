import React from "react";

function Input({ name, label, type = "text", onChange, value }) {
    return (
        <div className="form-group">
            <label htmlFor={`${name}-input`}>{label}</label>
            {type === "text" ? (
                <input
                    type="text"
                    className="form-control"
                    id={`${name}-input`}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            ) : (
                    <input
                        type="number"
                        min="1"
                        step="0.1"
                        className="form-control"
                        id={`${name}-input`}
                        name={name}
                        value={value}
                        onChange={onChange}
                    />
                )}
        </div>
    );
}

export default Input;
