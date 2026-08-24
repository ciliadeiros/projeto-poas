import React from 'react';
import './FormInput.css';

export default function FormInput({ id, label, type = 'text', value, onChange, ...props }) {
  return (
    <div className="glog-input-group">
      <label className="glog-input-group__label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        className="glog-input-group__field"
        placeholder="Digite:"
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}
