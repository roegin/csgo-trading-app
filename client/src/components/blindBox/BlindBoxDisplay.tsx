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
 const [boxesPerPage] = useState(24); //功能: 假设每页显示6个盲盒

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
      return "/blindBox/rare.jpg";
    // 添加更多类型及对应的图片...
    default:
      return "/blindBox/normal.jpg";
  }
};

 return (
  <main className="flex flex-col items-center bg-transparent p-4 gap-4">
            <header className="w-full max-w-2xl">
            <h1 className="text-3xl font-bold text-center text-white ">BlindBox</h1>
          </header>
      {/* 筛选按钮 */}
      <div className="w-full flex justify-between items-center mb-4">
      <div className="flex gap-2">
        <button onClick={() => filterBoxes("All")} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition duration-150">All</button>
        <button onClick={() => filterBoxes("rare")} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition duration-150">Rare</button>
        {/* 更多按钮样式调整 */}
      </div>
            {/* 考虑在这里添加搜索输入框 */}
          </div>
      {/* 盲盒展示 */}
      <section className="grid grid-cols-dynamic gap-4 w-full ">
        {currentBoxes.map((box) => (
          <div key={box._id} className="card bg-gray-800 shadow-lg rounded-lg overflow-hidden"> {/* 卡片背景色调整 */}
            <img
              alt={box.title}
              className="w-full h-48 object-cover"
              src={selectImageByType(box.type)}
              style={{
                aspectRatio: "200/200",
                objectFit: "cover",
              }}
            />
            <div className="p-4 text-white"> {/* 修改这里的文本颜色为亮色 */}
              <h2 className="text-2xl font-bold">{box.title}</h2> {/* 保持原样 */}
              <p>type: {box.type}</p>
              <p className="font-bold">price: ${box.price}</p>
            </div>
          </div>
        ))}
      </section>
      {/* 分页按钮 */}
      <div className="w-full max-w-2xl flex justify-center items-center gap-2 mt-4">
      <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition duration-150" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      {/* 分页按钮遵循同样的颜色方案 */}
      {[...Array(Math.ceil(filteredBlindBoxes.length / boxesPerPage)).keys()].map(number => (
        <button key={number + 1} onClick={() => paginate(number + 1)} className={`px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition duration-150 ${currentPage === number + 1 ? "bg-gray-700" : ""}`}>
          {number + 1}
        </button>
      ))}
      <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition duration-150" onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredBlindBoxes.length / boxesPerPage)}>
        Next
      </button>
    </div>
    <div style={{ height: '120px' }}></div>
  </main>
 );
};



