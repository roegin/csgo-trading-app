import React, { useEffect } from 'react';

const SERVER_URL = 'http://alex.shinestu.com:4000'; // 请替换为你的后端服务器地址

// 随机生成物品名称和稀有度
const generateRandomItem = (index) => {
    const rarityTypes = ['普通', '稀有', '罕见', '传说'];
    const rarity = rarityTypes[Math.floor(Math.random() * rarityTypes.length)];
    return { itemName: `物品${index}`, rarity };
};

// 创建100个随机示例物品
const sampleItems = Array.from({ length: 100 }, (_, index) => generateRandomItem(index + 1));

export default function AddSampleItems() {
    useEffect(() => {
        const addItemsToDatabase = async () => {
            try {
                const response = await fetch(`${SERVER_URL}/api/items/add`, { // 注意这里的URL已根据后端实际接口进行了更改
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(sampleItems),
                });
                const data = await response.json();
                if (response.ok) {
                    console.log('添加成功:', data);
                    alert('示例物品添加成功！');
                } else {
                    console.error('添加失败:', data.message);
                    alert('示例物品添加失败：' + data.message);
                }
            } catch (error) {
                console.error('网络错误:', error);
                alert('网络错误，请稍后再试');
            }
        };

        addItemsToDatabase();
    }, []);

    return (
        <div>
            <h2>添加示例物品到数据库</h2>
            <p>查看控制台以了解操作结果。</p>
        </div>
    );
}

// Note: 确保你的后端实现了 `/add-items` 的 POST 路由来接收和处理这些物品信息。
// 例如，在你的Express应用中，你可能需要写一个路由处理函数来读取请求体中的物品数组，并将它们保存到数据库。
