//@ts-nocheck
// FilterComponent.tsx
import React, { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function FilterComponent({ onFilterChange }) {
  const [filters, setFilters] = useState({
    all: true,
    pending: false,
    shipped: false,
    delivered: false
  });

  // 处理复选框变更的函数
  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [id]: checked
    }));
  };

  // 当筛选条件变更时，触发外部回调函数
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  return (
    <div className="flex flex-col gap-2">
      <div className="font-semibold">Filters</div>
      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <Checkbox className="mr-2" id="all" checked={filters.all} onChange={handleCheckboxChange} />
          <Label className="cursor-pointer" htmlFor="all">All</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox className="mr-2" id="pending" checked={filters.pending} onChange={handleCheckboxChange} />
          <Label className="cursor-pointer" htmlFor="pending">Pending</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox className="mr-2" id="shipped" checked={filters.shipped} onChange={handleCheckboxChange} />
          <Label className="cursor-pointer" htmlFor="shipped">Shipped</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox className="mr-2" id="delivered" checked={filters.delivered} onChange={handleCheckboxChange} />
          <Label className="cursor-pointer" htmlFor="delivered">Delivered</Label>
        </div>
      </div>
    </div>
  );
}
