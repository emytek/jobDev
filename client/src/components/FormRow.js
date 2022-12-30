const FormRow = ({ type, name, value, handleChange, labelText, errorMessage }) => {
    return (
      <div className='form-row'>
        <label htmlFor={name} className='form-label'>
          {labelText || name}
        </label>
        <input
          type={type}
          value={value}
          name={name}
          onChange={handleChange}
          className='form-input'
          required
        />
        <span className="err">{errorMessage}</span>
      </div>
    )
  }
  
  export default FormRow
  