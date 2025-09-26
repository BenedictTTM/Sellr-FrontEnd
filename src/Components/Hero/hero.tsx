'use client';

import React, { useState, useEffect } from 'react';
import CatergorySideBar from '../Categories/categorySidebar';

export default function HeroSection() {


  return (
    <div className="flex h-80 relative">
      {/* Sidebar */}
      <div className="w-64">
        <CatergorySideBar />
      </div>

    </div>
  );
}
