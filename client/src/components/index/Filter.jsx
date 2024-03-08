import React, { useState, useEffect } from 'react';
import { itemsData } from "../../objects/commonObjects";
import '../../styles/components/Filter.css'; // 包含Vercel v0的样式
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"; // 导入Input组件

export default function Filter({ selectedCount, onCheckboxChange }) {
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // 新增搜索词状态

    useEffect(() => {
        onCheckboxChange(selectedItems);
    }, [selectedItems, onCheckboxChange]);

    const handleCheckboxChange = (index) => {
        const selectedItem = itemsData.knives[index];
        setSelectedItems(prevSelectedItems => {
            if (prevSelectedItems.includes(selectedItem)) {
                return prevSelectedItems.filter(item => item !== selectedItem);
            } else {
                return [...prevSelectedItems, selectedItem];
            }
        });
    };

    return (
        <div className="flex items-center h-[600px] max-w-xs border border-gray-200 rounded-lg overflow-hidden dark:border-gray-800">
            <div className="w-56">
                <div className="px-4 py-4">
                    <h3 className="text-lg font-semibold">Categories</h3>
                    <div className="mt-2">
                        <Input className="w-full" placeholder="Search..." type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-800">
                    <div className="h-[400px] overflow-auto">
                        <div className="px-4 py-2">
                            <header>
    {
                                (selectedCount > 0) ?
                                    (<h2>Filter ({selectedCount}) </h2>) :
                                    (<h2>Filter </h2>)
                            }
                            </header>

                            <ul>
                            {itemsData.knives.map((item, index) => (
                                <li key={index}>
                                    <input
                                        type="checkbox"
                                        className="item-checkbox"
                                        onChange={() => handleCheckboxChange(index)}
                                    />
                                    <label htmlFor={`item${index}`}>{item}</label>
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}




