import React, { useEffect, useState } from 'react';
import axios from 'axios';
//@ts-ignore
import { SERVER_URL } from '../../config';

interface BlindBox {
 _id: string;
 title: string;
 imageUrl: string;
 type: string;
 price: number|string;
}

export const BlindBoxDisplay: React.FC = () => {
 const [blindBoxes, setBlindBoxes] = useState<BlindBox[]>([]);
 const [filteredBlindBoxes, setFilteredBlindBoxes] = useState<BlindBox[]>([]);
 const [currentPage, setCurrentPage] = useState(1);
 const [boxesPerPage] = useState(6); // 假设每页显示6个盲盒

 useEffect(() => {
  const fetchBlindBoxes = async () => {
   try {
    const response = await axios.get(SERVER_URL+'/api/boxes/all');
    console.log('box',response.data)
    setBlindBoxes(response.data);
    setFilteredBlindBoxes(response.data); // 初始时，过滤后的列表与总列表相同
   } catch (error) {
    console.error("获取盲盒数据失败:", error);
   }
  };

  fetchBlindBoxes();
 }, []);

 // 筛选逻辑
 const filterBoxes = (type: string) => {
  if(type === "All") {
   setFilteredBlindBoxes(blindBoxes);
  } else {
   const filtered = blindBoxes.filter(box => box.type === type);
   setFilteredBlindBoxes(filtered);
  }
  setCurrentPage(1); // 重置页码至第一页
 };

 // 计算当前页的盲盒
 const indexOfLastBox = currentPage * boxesPerPage;
 const indexOfFirstBox = indexOfLastBox - boxesPerPage;
 const currentBoxes = filteredBlindBoxes.slice(indexOfFirstBox, indexOfLastBox);

 // 更改页码
 const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

 const selectImageByType = (type: string) => {
  switch(type) {
    case "normal":
      return "/blindBox/normal.jpg";
    case "rare":
      return "/path-to-rare-type-image.jpg";
    // 添加更多类型及对应的图片...
    default:
      return "/blindBox/normal.jpg";
  }
};

 return (
  <div>
   {/* 筛选按钮 */}
   <button onClick={() => filterBoxes("All")}>全部</button>
   <button onClick={() => filterBoxes("Rare")}>稀有</button>
   {/* 盲盒展示 */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {blindBoxes.map((box) => (
        <div key={box._id} className="card shadow-lg rounded-lg overflow-hidden">
          <img
            alt={box.title}
            className="w-full h-48 object-cover"
            src={selectImageByType(box.type)}
            style={{
              aspectRatio: "200/200",
              objectFit: "cover",
            }}
          />
          <div className="p-4">
            <h2 className="text-xl font-bold">{box.title}</h2>
            <p>Type: {box.type}</p>
            <p>Price: ${box.price}</p>
          </div>
        </div>
      ))}
    </div>
   {/* 分页按钮 */}
   <nav>
    <ul className='flex'>
     {[...Array(Math.ceil(filteredBlindBoxes.length / boxesPerPage)).keys()].map(number => (
      <li key={number + 1}>
       <a onClick={() => paginate(number + 1)} href='#'>
        {number + 1}
       </a>
      </li>
     ))}
    </ul>
   </nav>
  </div>
 );
};



