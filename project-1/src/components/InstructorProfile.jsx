import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function InstructorProfile() {
  const { id } = useParams();
  const [instructor, setInstructor] = useState(null);

  useEffect(() => {
    // i thought this woould work but it didnt i dont think i need useeffect
    axios.get(`/api/instructor/${id}`)
      .then(({ data }) => {
        setInstructor(data);
      })
      .catch((error) => {
        console.error('Error fetching instructor data:', error);
      });
  }, [id]);

  if (!instructor) {
    // loading message durinng fetch
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{instructor.name}</h2>
      <h6>{instructor.age}</h6>
      <h6>{instructor.location}</h6>
      <h6>{instructor.certification}</h6>
      <p>{instructor.bio}</p>
     
    </div>
  );
}

export default InstructorProfile;
