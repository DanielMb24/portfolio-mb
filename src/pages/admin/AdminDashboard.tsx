
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminOverview from '@/components/admin/AdminOverview';
import PersonalInfoManager from '@/components/admin/PersonalInfoManager';
import ProjectManager from '@/components/admin/ProjectManager';
import SkillManager from '@/components/admin/SkillManager';
import ContactManager from '@/components/admin/ContactManager';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminOverview />} />
        <Route path="/personal-info" element={<PersonalInfoManager />} />
        <Route path="/projects" element={<ProjectManager />} />
        <Route path="/skills" element={<SkillManager />} />
        <Route path="/contacts" element={<ContactManager />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;
