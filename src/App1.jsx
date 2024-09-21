import React, { useState } from 'react';
 

function App1() {
 
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: '', description: '', price: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService((prev) => ({ ...prev, [name]: value }));
  };

  
  const addService = (e) => {
    e.preventDefault();
    if (!newService.name || !newService.description || !newService.price) {
      alert('All fields are required!');
      return;
    }

    setServices([...services, { ...newService, id: Date.now() }]);
    setNewService({ name: '', description: '', price: '' });
  };

  
  const deleteService = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  
  const editService = (service) => {
    setIsEditing(true);
    setCurrentService(service);
    setNewService(service);
  };

  
  const updateService = (e) => {
    e.preventDefault();
    setServices(
      services.map((service) =>
        service.id === currentService.id ? newService : service
      )
    );
    setNewService({ name: '', description: '', price: '' });
    setIsEditing(false);
    setCurrentService(null);
  };

  return (
    <div className="App">
      <h1>HEALTHCARE SERVICES</h1>

      
      <form onSubmit={isEditing ? updateService : addService}>
        <input
          type="text"
          name="name"
          placeholder="Service Name"
          value={newService.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Service Description"
          value={newService.description}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Service Price"
          value={newService.price}
          onChange={handleInputChange}
        />
        <button type="submit">{isEditing ? 'Update Service' : 'Add Service'}</button>
      </form>

     
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            <strong>{service.name}</strong>: {service.description} - ${service.price}
            <button onClick={() => editService(service)}>Edit</button>
            <button onClick={() => deleteService(service.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App1;

