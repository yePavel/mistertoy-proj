import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { toyService } from '../services/toy.service';

ChartJS.register(ArcElement, Tooltip, Legend);

export function ToysDashBoard() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const labels = toyService.getLabels()

    function getNumOfItems() {
        return [10, 11, 12, 13, 1, 2]
    }

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Number of items',
                data: getNumOfItems(),
                backgroundColor: [
                    'rgba(90, 90, 90, 0.8)',
                    'rgba(212, 0, 0, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(11, 132, 122, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                ],
                borderColor: [
                    'rgba(90, 90, 90, 1)',
                    'rgba(212, 0, 0, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(11, 132, 122, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 3,
            },
        ],
    };

    return <Doughnut data={data} />;
}
