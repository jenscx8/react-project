import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";


function InstructorTableHeader() {
  return (
    <tr>
      <th>instructor list</th>
    </tr>
  )
}

function EditableRowModeButtons({ isEditing, onEditClick, onSaveClick, onDeleteClick }) {
  return isEditing ? (
    <td>
      <button onClick={onSaveClick}>Save</button>
    </td>
  ) : (
    <td>
      <button onClick={onDeleteClick}>Delete</button>
      <button onClick={onEditClick}>Edit</button>
    </td>
  );
}

function EditableNameCell({ value, isEditing, onValueChange }) {
  return isEditing ? (
    <td>
      <input type="text" value={value} onChange={(e) => onValueChange(e.target.value)} />
    </td>
  ) : (
    <td>{value}</td>
  );
}

function EditableBioCell({ value, isEditing, onValueChange }) {
  return isEditing ? (
    <td>
      <input type="text" value={value} onChange={(e) => onValueChange(e.target.value)} />
    </td>
  ) : (
    <td>{value}</td>
  );
}

function EditableCertCell({ value, isEditing, onValueChange }) {
  return isEditing ? (
    <td>
      <input type="text" value={value} onChange={(e) => onValueChange(e.target.value)} />
    </td>
  ) : (
    <td>{value}</td>
  )
}
// locationn cell
function EditableLocationCell({ value, isEditing, onValueChange }) {
  return isEditing ? (
    <td>
      <input type="text" value={value} onChange={(e) => onValueChange(e.target.value)} />
    </td>
  ) : (
    <td>{value}</td>
  )
}
// age cell, figure out how to display age based on dob
function EditableAgeCell({ value, isEditing, onValueChange }) {
  return isEditing ? (
    <td>
      <input type="text" value={value} onChange={(e) => onValueChange(e.target.value)} />
    </td>
  ) : (
    <td>{value}</td>
  )
}


function InstructorTableRow({ initialInstructorData, initialIsEditing, onDeleteRow, id }) {
  const [isEditing, setIsEditing] = useState(initialIsEditing)

  const [name, setName] = useState(initialInstructorData.name)
  const [bio, setBio] = useState(initialInstructorData.bio)
  const [certification, setCertification] = useState(initialInstructorData.certification)
  const [location, setLocation] = useState(initialInstructorData.location)
  const [age, setAge] = useState(initialInstructorData.age)

  const setEditMode = () => setIsEditing(true)
  const setNormalMode = async () => {
    const {data} = await axios.post(`/api/instructor/${id}`, {
      name,
      age,
      bio,
      certification,
      location
    })

    if(!data.error) {
      setName(data.name)
      setAge(data.age)
      setBio(data.bio)
      setCertification(data.certification)
      setLocation(data.location)
    }

    setIsEditing(false)
  }
  return (
    <tr>
      <EditableRowModeButtons
        isEditing={isEditing}
        onEditClick={setEditMode}
        onSaveClick={setNormalMode}
        onDeleteClick={onDeleteRow}
      />
      <EditableNameCell
        value={name}
        isEditing={isEditing}
        onValueChange={setName}
      />
      <EditableAgeCell
        value={age}
        isEditing={isEditing}
        onValueChange={setAge}
      />
      <EditableLocationCell
        value={location}
        isEditing={isEditing}
        onValueChange={setLocation}
      />
      <EditableBioCell
        value={bio}
        isEditing={isEditing}
        onValueChange={setBio}
      />
      <EditableCertCell
        value={certification}
        isEditing={isEditing}
        onValueChange={setCertification}
      />
    </tr>
  )
}

function InstructorTableAddButton({ onClick }) {
  return (
    <tr>
      <td></td>
      <td colSpan="4">
        <button onClick={onClick}>Add</button>
      </td>
    </tr>
  );
}

function InstructorTable({ initialInstructorList }) {
  const [instructorList, setInstructorList] = useState(initialInstructorList)
  const addInstructorRow = async () => {
    const {data} = await axios.post('/api/instructor', {bio: 'ibo'})
    const newInstructor = {...data}
    setInstructorList([...instructorList, newInstructor])
  }

  const deleteInstructorRow = async (id) => {
    const {data} = await axios.post(`/api/instructor/delete/${id}`)

    if(!data.error) {
      const newInstructorList = [...instructorList]
      const index = newInstructorList.findIndex((instructor) => instructor.id === id);
    newInstructorList.splice(index, 1);
    setInstructorList(newInstructorList);
    }
  }

  const rows = instructorList.map(({ id, name, age, certification, bio, isEditing }) => (
    //i wanted to wrap this in a Link tag to go to the instructor profile bbut it wasnt working
    <Link to={`/instructor/${id}`} key={id}>
    <InstructorTableRow
      key={id}
      initialInstructorData={{ name, age, bio, certification }}
      initialIsEditing={isEditing}
      onDeleteRow={() => deleteInstructorRow(id)}
      id={id}
    />
   </Link>
  ));

  return (
    <table>
      <thead>
        <InstructorTableHeader />
      </thead>
      <tbody>{rows}</tbody>
      <tfoot>
        <InstructorTableAddButton onClick={addInstructorRow} />
      </tfoot>
    </table>
  );
}

export default InstructorTable