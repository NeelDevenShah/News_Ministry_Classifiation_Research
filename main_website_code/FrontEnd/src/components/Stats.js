import React from 'react';
import { Bar, Pie } from 'react-chartjs-2'
import { useLocation } from 'react-router-dom'
import { Chart, ArcElement, LinearScale, CategoryScale, BarElement } from 'chart.js'
Chart.register(ArcElement);
Chart.register(LinearScale)
Chart.register(CategoryScale)
Chart.register(BarElement)

const Stats = () => {
    let location = useLocation()
    let { totalnewscount, real, fake, positive, negative, neutral, languagefrequency, authorFrequencyArray } = location.state?.stats

    const keyValuePairs = authorFrequencyArray.reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});

    const statisticsData = {
        totalNewsCount: totalnewscount,
        realNewsCount: real,
        fakeNewsCount: fake,
        positiveSentimentCount: positive,
        negativeSentimentCount: negative,
        neutralSentimentCount: neutral,
        authorFrequency: keyValuePairs,
        languageFrequency: languagefrequency
    };

    // Extract data for author frequency chart
    const authorLabels = Object.keys(statisticsData.authorFrequency);
    const authorData = Object.values(statisticsData.authorFrequency);

    // Extract data for language frequency chart
    const languageLabels = Object.keys(statisticsData.languageFrequency);
    const languageData = Object.values(statisticsData.languageFrequency);

    return (
        <>

            <div className="container text-center my-4">
                <div className="row justify-content-center m-2">

                    <div className="col-md-2 my-2 mx-5 ">
                        <div className="card text-start shadow" style={{ width: "250px", height: "345px", borderRadius: "25px" }}>
                            <div className="card-body ">
                                <h3 className="mb-3 mt-3">News Type Breakdown</h3>
                                <Pie
                                    data={{
                                        datasets: [
                                            {
                                                data: [statisticsData.realNewsCount, statisticsData.fakeNewsCount],
                                                backgroundColor: ['#36A2EB', '#FF6384'],
                                            },
                                        ],
                                        labels: ['Real', 'Fake']
                                    }}
                                    options={{
                                        responsive: true,
                                        animation: {
                                            animateScale: true,
                                            animateRotate: true
                                        },
                                    }}
                                    className='m-2'
                                />

                            </div>
                        </div>
                    </div>

                    <div className="col-md-2 my-2 mx-5 ">
                        <div className="card text-start shadow" style={{ width: "250px", height: "345px", borderRadius: "25px" }}>
                            <div className="card-body ">
                                <h3 className="mb-3 mt-3">Sentiment Analysis</h3>
                                <Pie
                                    className='m-2'
                                    data={{
                                        labels: ['Positive', 'Negative', 'Neutral'],
                                        datasets: [
                                            {
                                                data: [
                                                    statisticsData.positiveSentimentCount,
                                                    statisticsData.negativeSentimentCount,
                                                    statisticsData.neutralSentimentCount,
                                                ],
                                                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                                            },
                                        ],
                                    }}
                                    options={{
                                        responsive: true,
                                        animation: {
                                            animateScale: true,
                                            animateRotate: true
                                        },
                                    }}
                                />

                            </div>
                        </div>
                    </div>

                    <div className="col-md-2 my-2 mx-5 ">
                        <div className="card text-start shadow" style={{ width: "250px", height: "345px", borderRadius: "25px" }}>
                            <div className="card-body ">
                                <h3 className="mb-3 mt-3">Author Frequency</h3>
                                <Bar
                                    className='m-2'
                                    data={{
                                        labels: authorLabels,
                                        datasets: [
                                            {
                                                label: 'Frequency',
                                                data: authorData,
                                                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                                            },
                                        ],
                                    }}
                                    options={{
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                            },
                                        },
                                    }}
                                />

                            </div>
                        </div>
                    </div>

                    <div className="col-md-2 my-2 mx-5 ">
                        <div className="card text-start shadow" style={{ width: "250px", height: "345px", borderRadius: "25px" }}>
                            <div className="card-body ">
                                <h3 className="mb-3 mt-3">Language Frequency</h3>
                                <Bar
                                    className='m-2'
                                    data={{
                                        labels: languageLabels,
                                        datasets: [
                                            {
                                                label: 'Frequency',
                                                data: languageData,
                                                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                                            },
                                        ],
                                    }}
                                    options={{
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/* <div className="container mt-4" style={{ width: "60%" }}>
                <h2 className="text-center mb-5">News Statistics</h2>
                <hr />
                <div className="row mt-5 text-center">
                    <div className="card col-md-6 bg-light shadow mx-2" style={{ borderRadius: "25px", width: "48%" }}>
                        <h3 className="mb-3 mt-3">News Type Breakdown</h3>
                        <Pie
                            data={{
                                datasets: [
                                    {
                                        data: [statisticsData.realNewsCount, statisticsData.fakeNewsCount],
                                        backgroundColor: ['#36A2EB', '#FF6384'],
                                    },
                                ],
                                labels: ['Real', 'Fake']
                            }}
                            options={{
                                responsive: true,
                                animation: {
                                    animateScale: true,
                                    animateRotate: true
                                },
                            }}
                            className='m-2'
                        />
                    </div>
                    <div className="card col-md-6 bg-light shadow mx-2" style={{ borderRadius: "25px", width: "48%" }}>
                        <h3 className="mb-3 mt-3">Sentiment Analysis</h3>
                        <Pie
                            className='m-2'
                            data={{
                                labels: ['Positive', 'Negative', 'Neutral'],
                                datasets: [
                                    {
                                        data: [
                                            statisticsData.positiveSentimentCount,
                                            statisticsData.negativeSentimentCount,
                                            statisticsData.neutralSentimentCount,
                                        ],
                                        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                animation: {
                                    animateScale: true,
                                    animateRotate: true
                                },
                            }}
                        />
                    </div>
                </div>
                <hr />
                <div className="row mt-4">
                    <div className="card col-md-6 bg-light shadow mx-2" style={{ borderRadius: "25px", width: "48%" }}>
                        <h3 className="mb-3 mt-3">Author Frequency</h3>
                        <Bar
                            className='m-2'
                            data={{
                                labels: authorLabels,
                                datasets: [
                                    {
                                        label: 'Frequency',
                                        data: authorData,
                                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                                    },
                                ],
                            }}
                            options={{
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                    },
                                },
                            }}
                        />
                    </div>
                    <div className="card col-md-6 bg-light shadow mx-2" style={{ borderRadius: "25px", width: "48%" }}>
                        <h3 className="mb-3 mt-3">Language Frequency</h3>
                        <Bar
                            className='m-2'
                            data={{
                                labels: languageLabels,
                                datasets: [
                                    {
                                        label: 'Frequency',
                                        data: languageData,
                                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                                    },
                                ],
                            }}
                            options={{
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </div> */}

        </>
    )
}

export default Stats



{/* <div className="container text-center my-4">
                <div className="row justify-content-center m-2">
                
                <div className="col-md-2 my-2 mx-5 ">
                    <div className="card text-start shadow" style={{ width: "250px", borderRadius: "25px" }}>
                         <div className="card-body ">

                         <Pie
                            data={{
                                datasets: [
                                    {
                                        data: [statisticsData.realNewsCount, statisticsData.fakeNewsCount],
                                        backgroundColor: ['#36A2EB', '#FF6384'],
                                    },
                                ],
                                labels: ['Real', 'Fake']
                            }}
                            options={{
                                responsive: true,
                                animation: {
                                    animateScale: true,
                                    animateRotate: true
                                },
                            }}
                            className='m-2'
                        />
                            
                        </div>
                    </div>
                </div>
                </div>
            </div> */}