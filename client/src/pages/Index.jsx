import React, {useState, useEffect, useRef} from 'react';
import Filter from "../components/index/Filter";
import Trades from "../components/index/Trades";
import Activity from "../components/index/Activity";
import '../styles/pages/Index.css';

import { SERVER_URL } from '../config'; // 请根据实际路径调整  //SERVER_URL+'
import Banner from './Banner';
import { Button } from "../components/ui/button"; // 确保路径正确

export default function Index() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [offerData, setOfferData] = useState([]);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const hasRendered = useRef(false);
    const hasRenderedOffers = useRef(false);

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

    return (
        <>
            <section className="w-full py-12 md:py-24 lg:py-32">
    <div className="container space-y-12 px-4 md:px-6">
    <div className="grid gap-4 items-center lg:grid-cols-2 xl:gap-8">
        <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tighter lg:text-5xl xl:text-6xl">The Best Deals in Town</h1>
        <p className="text-gray-500 dark:text-gray-400">
            Find the hottest deals, newly added products, and user recommendations.
        </p>
        </div>
        <div className="flex items-center justify-start space-x-4">
        <Button size="lg" variant="outline">
            View All
        </Button>
        </div>
    </div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-2">
        <img
            alt="Product 1"
            className="aspect-[16/9] object-cover rounded-lg overflow-hidden"
            height="300"
            src="/placeholder.svg"
            width="500"
        />
        <div className="flex flex-col gap-1.5">
            <h3 className="text-base font-medium leading-none">Product Title</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
            Product description that might be two lines on mobile but can be longer on tablet and desktop to show
            more information about the product.
            </p>
            <div className="flex items-center gap-1">
            <h4 className="text-sm font-medium">$29.00</h4>
            <Button size="sm">Buy</Button>
            </div>
        </div>
        </div>
        <div className="flex flex-col gap-2">
        <img
            alt="Product 2"
            className="aspect-[16/9] object-cover rounded-lg overflow-hidden"
            height="300"
            src="/placeholder.svg"
            width="500"
        />
        <div className="flex flex-col gap-1.5">
            <h3 className="text-base font-medium leading-none">Product Title</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
            Product description that might be two lines on mobile but can be longer on tablet and desktop to show
            more information about the product.
            </p>
            <div className="flex items-center gap-1">
            <h4 className="text-sm font-medium">$29.00</h4>
            <Button size="sm">Buy</Button>
            </div>
        </div>
        </div>
        <div className="flex flex-col gap-2">
        <img
            alt="Product 3"
            className="aspect-[16/9] object-cover rounded-lg overflow-hidden"
            height="300"
            src="/placeholder.svg"
            width="500"
        />
        <div className="flex flex-col gap-1.5">
            <h3 className="text-base font-medium leading-none">Product Title</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
            Product description that might be two lines on mobile but can be longer on tablet and desktop to show
            more information about the product.
            </p>
            <div className="flex items-center gap-1">
            <h4 className="text-sm font-medium">$29.00</h4>
            <Button size="sm">Buy</Button>
            </div>
        </div>
        </div>
    </div>
    </div>
            </section>

            {/* 原有 Index 页面内容 */}
            <div className="grid-container">
                <div className="left-sidebar">
                    <Filter selectedCount={selectedCheckboxes.length} onCheckboxChange={handleCheckboxChange} />
                </div>
                <div className="content">
                    <Trades data={filteredData} />
                </div>
                <div className="right-sidebar">
                    <Activity data={offerData} />
                </div>
            </div>
        </>
    );
}





