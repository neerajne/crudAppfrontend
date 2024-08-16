import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from '../components/Home';
import { Edit } from '../components/Edit';
import { Add } from '../components/Add';
export const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="edit" element={<Edit />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </div>
  );
}
