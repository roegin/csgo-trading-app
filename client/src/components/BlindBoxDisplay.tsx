// filepath: client\src\components\BlindBoxDisplay.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
//@ts-ignore
import { SERVER_URL } from '../config';

interface BlindBox {
  id: string;
  title: string;
  imageUrl: string;
  // 添加更多需要的属性，例如价格、描述等
}

export const BlindBoxDisplay: React.FC = () => {
  const [blindBoxes, setBlindBoxes] = useState<BlindBox[]>([]);

  useEffect(() => {
    const fetchBlindBoxes = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/boxes/all`); // 更新 API 路径
        setBlindBoxes(response.data);
      } catch (error) {
        console.error("获取盲盒数据失败:", error);
        // 可以添加错误处理逻辑
      }
    };

    fetchBlindBoxes();
  }, []);

  return (
    <div className="blind-box-display">
      {blindBoxes.map((box) => (
        <div key={box.id}>
          <img src={box.imageUrl} alt={box.title} />
          <h3>{box.title}</h3>
          {/* 可以根据需要显示更多属性 */}
        </div>
      ))}
    </div>
  );
};
