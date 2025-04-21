import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import "./admin.css";

function Admin() {
  const [items, setItems] = useState([]);
  // catagory coming soon 
  const [categoryData, setCategoryData] = useState({
    name: '',
    photoUrl: '',
    isVisible: true
  });
  //marches
  const [marchData, setMarchData] = useState({
    name: '',
    photoUrl: '',
    isVisible: true
  });
  // to add items
  const [formData, setFormData] = useState({
    name: '',
    photoUrl: '',
    pricePerDay: '',
    pricePerWeek: '',
    pricePerMonth: '',
    category: '',
    isPopular: false,
    brand: '',
    isVisible: true
  });
  // edit mode and search using name
  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
// background color using useeffect
  useEffect(() => {
    document.body.style.backgroundColor = '#172026';
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  useEffect(() => {
    fetchItems();
  }, []);
// to get items from db linked with endpoint
  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };
// coming soon
  const handleMarchChange = (e) => {
    const { name, value } = e.target;
    setMarchData(prev => ({ ...prev, [name]: value }));
  };
// coming soon
  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setCategoryData(prev => ({ ...prev, [name]: value }));
  };
// this is to add marches like apple etc...
  const submitMarch = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/marches', marchData);
      alert('March added successfully');
      setMarchData({ name: '', photoUrl: '', isVisible: true });
    } catch (error) {
      console.error('Error adding march:', error);
      alert('Error adding march');
    }
  };
// coming soon
  const submitCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/categories', categoryData);
      alert('Category added successfully');
      setCategoryData({ name: '', photoUrl: '', isVisible: true });
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Error adding category');
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert('You must be logged in .');
      return;
    }

    const idToken = await user.getIdToken();
    const url = editMode ? `http://localhost:5000/items/${editItemId}` : 'http://localhost:5000/items';
    const method = editMode ? 'patch' : 'post';

    try {
      await axios({
        method: method,
        url: url,
        headers: { 'Authorization': `Bearer ${idToken}` },
        data: formData
      });

      alert(`Item ${editMode ? 'updated' : 'added'} successfully`);
      setFormData({ name: '', photoUrl: '', pricePerDay: '', pricePerWeek: '', pricePerMonth: '', category: '', isPopular: false, brand: '', isVisible: true });
      setEditMode(false);
      setEditItemId(null);
      fetchItems();
    } catch (error) {
      console.error(`Failed to ${editMode ? 'update' : 'add'} item:`, error);
      alert(`Error ${editMode ? 'updating' : 'adding'} item`);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      photoUrl: item.photoUrl,
      pricePerDay: item.pricePerDay,
      pricePerWeek: item.pricePerWeek,
      pricePerMonth: item.pricePerMonth,
      category: item.category,
      isPopular: item.isPopular,
      brand: item.brand,
      isVisible: item.isVisible
    });
    setEditMode(true);
    setEditItemId(item._id);
    // this is when i click edit on item scroll me up to edit 
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
// this is for delete items from db and list 
  const handleDelete = async (itemId) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert('You must be logged in.');
      return;
    }

    const idToken = await user.getIdToken();

    try {
      await axios.delete(`http://localhost:5000/items/${itemId}`, {
        headers: { 'Authorization': `Bearer ${idToken}` },
      });

      alert('Item deleted successfully');
      fetchItems();
    } catch (error) {
      console.error('Failed to delete item:', error);
      alert('Error deleting item');
    }
  };
//search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
//coming soon
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (// the desgin build using boot strap and some css
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="card p-4 mb-4" style={{ backgroundColor: '#F26800' }}>
            <h1>Admin View</h1>
          </div>
        </div>
        <div className="col-12 col-md-6 mb-4">
          <div className="card p-4">
            <h2>{editMode ? 'Edit Item' : 'Add New Item'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Item Name"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="photoUrl"
                  value={formData.photoUrl}
                  onChange={handleChange}
                  placeholder="Photo URL"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  name="pricePerDay"
                  value={formData.pricePerDay}
                  onChange={handleChange}
                  placeholder="Price per Day"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  name="pricePerWeek"
                  value={formData.pricePerWeek}
                  onChange={handleChange}
                  placeholder="Price per Week"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  name="pricePerMonth"
                  value={formData.pricePerMonth}
                  onChange={handleChange}
                  placeholder="Price per Month"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Category"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="isPopular"
                    checked={formData.isPopular}
                    onChange={handleChange}
                    id="isPopularCheck"
                  />
                  <label className="form-check-label" htmlFor="isPopularCheck">
                    Mark as Popular
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Brand"
                  className="form-control"
                />
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="isVisible"
                  checked={formData.isVisible}
                  onChange={handleChange}
                  id="isVisibleCheck"
                />
                <label className="form-check-label" htmlFor="isVisibleCheck">
                  Visible on Home
                </label>
              </div>
              <button type="submit" className={`btn ${editMode ? 'btn-success' : 'btn-primary'} mt-3`}>{editMode ? 'Update' : 'Add'} Item</button>
              {editMode && <button type="button" onClick={() => setEditMode(false)} className="btn btn-secondary mt-3 ms-2">Cancel Edit</button>}
            </form>
          </div>
        </div>
        <div className="col-12 col-md-6 mb-4">
          <div className="card p-4">
            <h2>Add New March</h2>
            <form onSubmit={submitMarch}>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  value={marchData.name}
                  onChange={handleMarchChange}
                  placeholder="March Name"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="photoUrl"
                  value={marchData.photoUrl}
                  onChange={handleMarchChange}
                  placeholder="Photo URL photo 270 270"
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">Add March</button>
            </form>
            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="checkbox"
                name="isVisible"
                checked={marchData.isVisible}
                onChange={handleMarchChange}
                id="marchVisibleCheck"
              />
              <label className="form-check-label" htmlFor="marchVisibleCheck">
                Visible on Home
              </label>
            </div>
          </div>
          <div className="col-12 mt-4">
          <div className="card p-4">
            <h2>Add New Category</h2>
            <form onSubmit={submitCategory}>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  value={categoryData.name}
                  onChange={handleCategoryChange}
                  placeholder="Category Name"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="photoUrl"
                  value={categoryData.photoUrl}
                  onChange={handleCategoryChange}
                  placeholder="Photo URL"
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">Add Category</button>
            </form>
          </div>
        </div>
        </div>
       
        <div className="col-12">
          <div className="card p-4">
            <h3>Items List</h3>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search by item name"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="list-group list-items">
              {filteredItems.map(item => (
                <div key={item._id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img
                      src={item.photoUrl}
                      alt={item.name}
                      className="card-img-top aitems me-3"
                      style={{ width: 'auto', maxWidth: '100px', height: 'auto' }}
                    />
                    <div>
                      <h5>{item.name}</h5>
                      <p>Category: {item.category} | Brand: {item.brand}</p>
                      <p>Price per Day: ${item.pricePerDay}, Week: ${item.pricePerWeek}, Month: ${item.pricePerMonth}</p>
                    </div>
                  </div>
                  <div>
                    <button onClick={() => handleEdit(item)} className="btn btn-primary me-2">Edit</button>
                    <button onClick={() => handleDelete(item._id)} className="btn btn-danger">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
