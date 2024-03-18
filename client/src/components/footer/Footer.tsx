// src/components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';

//import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer-container">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0ff]">关于我们</h2>
          <p className="text-sm">我们是一家专注于虚拟物品交易的平台，提供安全可靠的买卖服务。</p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0ff]">联系信息</h2>
          <p className="text-sm">地址：虚拟交易中心</p>
          <p className="text-sm">电话：123-456-7890</p>
          <p className="text-sm">邮箱：support@virtualtrade.com</p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0ff]">快速链接</h2>
          <Link to="/" className="text-sm hover:text-[#0ff]">首页  </Link>
          <Link to="/trade" className="text-sm hover:text-[#0ff]">交易  </Link>
          <Link to="/blindbox" className="text-sm hover:text-[#0ff]">盲盒  </Link>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0ff]">关注我们</h2>
            <div className="flex space-x-4">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#0ff] hover:text-[#00ffff]">Facebook</a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#0ff] hover:text-[#00ffff]">Twitter</a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#0ff] hover:text-[#00ffff]">Instagram</a>
            </div>

        </div>
      </div>
      <div className="text-center py-4 text-sm text-white"> {/* 更亮的文本颜色 */}
        <p>© 2024 Virtual Trade Platform. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
