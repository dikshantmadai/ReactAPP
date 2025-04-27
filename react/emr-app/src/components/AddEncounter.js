// src/components/AddEncounter.js
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function AddEncounter() {
  const { id } = useParams();
  const [encounter, setEncounter] = useState({
    type: 'AMB',
    status: 'planned',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async () => {
    await axios.post(`${BASE_URL}/Encounter`, {
      resourceType: 'Encounter',
      status: encounter.status,
      class: { code: encounter.type },
      subject: { reference: `Patient/${id}` },
      period: { start: encounter.date }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Add encounter form fields */}
      <button type="submit">Save Encounter</button>
    </form>
  );
}