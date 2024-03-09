import React from 'react';
import {NavLink} from 'react-router-dom';
import {convertWear} from "../../utilities/Utilities";
import '../../styles/components/Trades.css';
import '../../styles/globals.css';

import { CardContent, Card } from "@/components/ui/card";

export default function Trades({ data }) {
    const gridItems = data.map((trade, index) => (
        <Card key={index} className="mb-4 flex flex-col">
            <CardContent className="flex flex-col justify-between h-full">
                <div>
                    <div className="flex flex-row items-center mb-4">
                        <img src="/path/to/your/item-icon.png" alt="Item Icon" className="w-10 h-10 mr-4" />
                        <div>
                            <div className="flex flex-col mb-2">
                                <span className="text-lg font-semibold">Have</span>
                                {trade.have.map((item, itemIndex) => (
                                    <span key={itemIndex}>{item.knife} | {item.finish} ({convertWear(item.wear)})</span>
                                ))}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold">Want</span>
                                {trade.want.map((item, itemIndex) => (
                                    <span key={itemIndex}>{item.knife} | {item.finish} ({convertWear(item.wear)})</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    {trade.status === "active" ? (
                        <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                            Make Offer
                        </button>
                    ) : (
                        <span className="text-green-500">Completed</span>
                    )}
                </div>
            </CardContent>
        </Card>
    ));

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gridItems}
        </div>
    );
}