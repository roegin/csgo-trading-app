//@ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import Filter from "../components/index/Filter";
import Trades from "../components/index/Trades";
import Activity from "../components/index/Activity";
import '../styles/pages/Index.css';
import '../styles/globals.css';
import { SERVER_URL } from '../config'; // 请根据实际路径调整 //SERVER_URL+' 
import Banner from './Banner';
import { Button } from "@/components/ui/button"; // 确保路径正确
import { BlindBoxDisplay } from '@/components/blindBox/BlindBoxDisplay';

export default function Index() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [offerData, setOfferData] = useState([]);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const hasRendered = useRef(false);
    const hasRenderedOffers = useRef(false);
    const [activeTab, setActiveTab] = useState('blindBox'); // 新增tab状态


    useEffect(() => {
        let events = null;

        if (!hasRendered.current) {
            events = new EventSource(SERVER_URL+'/trades/all');

            events.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);

                setData(parsedData);
            };

            hasRendered.current = true;
        }

        return () => {
            if (events) {
                events.close();
                hasRendered.current = false;
            }
        };
    }, []);

    useEffect(() => {
        let offerEvents = null;

        if (!hasRenderedOffers.current) {
            offerEvents = new EventSource(SERVER_URL+'/offers/all');

            offerEvents.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);

                setOfferData((offerData) => offerData.concat(parsedData));
            };

            hasRenderedOffers.current = true;
        }

        return () => {
            if (offerEvents) {
                offerEvents.close();
                hasRenderedOffers.current = false;
            }
        };
    }, []);

    useEffect(() => {
        if (selectedCheckboxes.length === 0) {
            setFilteredData(data);
            return;
        }

        const filteredItems = data.filter((trade) => {
            const haveItems = trade.have;
            const wantItems = trade.want;

            return (
                haveItems.some((haveItem) => selectedCheckboxes.includes(haveItem.knife)) ||
                wantItems.some((wantItem) => selectedCheckboxes.includes(wantItem.knife))
            );
        });

        setFilteredData(filteredItems);
    }, [selectedCheckboxes, data]);

    const handleCheckboxChange = (selectedItems) => {
        setSelectedCheckboxes(selectedItems);
    };

    // Tab切换逻辑
    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <div className="homepage w-full h-full">
            <div className="container mx-auto p-4">
                <Banner />

                {/* Tab切换按钮 */}
                <div className="flex border-b mb-4">
                    <div onClick={() => handleTabChange('blindBox')}
                         className={`py-2 px-6 ${activeTab === 'blindBox' ? 'bg-primary text-primary-foreground border-b-4 border-accent' : 'bg-background text-foreground border-b-4 border-transparent hover:border-accent hover:text-accent'}`}>
                        盲盒
                    </div>
                    <div onClick={() => handleTabChange('trade')}
                         className={`py-2 px-6 ${activeTab === 'trade' ? 'bg-primary text-primary-foreground border-b-4 border-accent' : 'bg-background text-foreground border-b-4 border-transparent hover:border-accent hover:text-accent'}`}>
                        交易
                    </div>
                </div>

                {/* 根据选中的Tab渲染相应组件 */}
                {activeTab === 'blindBox' && <BlindBoxDisplay />}
                {activeTab === 'trade' && 
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="col-span-1 md:col-span-1">
                            <Filter onCheckboxChange={handleCheckboxChange} />
                        </div>
                        <div className="col-span-2 md:col-span-2">
                            <Trades data={filteredData} />
                        </div>
                        <div className="col-span-1 md:col-span-1">
                            <Activity data={offerData} />
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}





