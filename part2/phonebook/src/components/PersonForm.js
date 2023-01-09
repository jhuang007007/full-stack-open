const PersonForm = ({ newName, handleNameChange, newNumber, handleNumberChange, addName }) => {
  return(
    <form>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
          number: <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button onClick={addName}>add</button>
        </div>
    </form>
  )
}
  
export default PersonForm