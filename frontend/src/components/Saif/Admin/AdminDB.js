//https://getbootstrap.com/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDB.css';
import Snavbar from './Snavbar';
const AdminDB = () => {
  const [collections, setCollections] = useState([]);
  const [documents, setDocuments] = useState({});
  const [selectedCollection, setSelectedCollection] = useState('');
 
  useEffect(() => {
    fetchCollections();
  }, []);
  useEffect(() => {
    document.body.style.backgroundColor = '#172026';
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);
  const fetchCollections = async () => {
    try {
      const response = await axios.get('http://localhost:5000/collections');
      setCollections(response.data);
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  };

  const fetchDocuments = async (collectionName) => {
    try {
      const response = await axios.get(`http://localhost:5000/collections/${collectionName}`);
      setDocuments((prev) => ({ ...prev, [collectionName]: response.data }));
      setSelectedCollection(collectionName);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleInputChange = (collectionName, docId, key, value) => {
    setDocuments((prev) => ({
      ...prev,
      [collectionName]: prev[collectionName].map((doc) =>
        doc._id === docId ? { ...doc, [key]: value } : doc
      ),
    }));
  };

  const handleUpdateDocument = async (collectionName, documentId, updatedData) => {
    try {
      await axios.put(`http://localhost:5000/collections/${collectionName}/${documentId}`, updatedData);
      fetchDocuments(collectionName);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '', }}>
             <div style={{ width: '100px', height: "", flexShrink: 0 }}>
                <Snavbar />
            </div>
    <div className="terminal">
      <h1>MongoDB Collections</h1>
      <div>
        {collections.map((collection) => (
          <button key={collection.name} onClick={() => fetchDocuments(collection.name)}>
            {collection.name}
          </button>
        ))}
      </div>
      {selectedCollection && documents[selectedCollection] && (
        <div>
          <h2>Documents in {selectedCollection}</h2>
          {documents[selectedCollection].map((doc) => (
            <div className="document" key={doc._id}>
              {Object.entries(doc).map(([key, value]) => (
                <div key={key}>
                  <label>{key}</label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) =>
                      handleInputChange(selectedCollection, doc._id, key, e.target.value)
                    }
                  />
                </div>
              ))}
              <button onClick={() => handleUpdateDocument(selectedCollection, doc._id, doc)}>
                Save
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>

  );
};

export default AdminDB;
