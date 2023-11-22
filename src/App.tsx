import Plot from 'react-plotly.js';
import './App.css';
import { Data, PlotData } from 'plotly.js';
import jsonData from "./data.json";
import { useEffect, useState } from 'react';

function App() {
    const shapeMode = "linear";

    // const [plotData, setPlotData] = useState<Data[]>(jsonData as Data[]);
    const [plotData, setPlotData] = useState<Data[]>([
        {
            line: { color: "#00FF00", shape: shapeMode, width: 1 },
            mode: "lines",
            name: "Índice",
            showlegend: true,
            x: [ "2022-10-31", "2022-11-30", "2022-12-31", "2023-01-31", "2023-02-28", "2023-03-31", ],
            y: [ 0.3, 0.7, 0.5, 0.9, 0.8, 0.6 ]
        }, {
            line: { color: "#0000FF", shape: shapeMode, width: 3 },
            mode: "lines",
            name: "Data indicada de plantio no projeto: (01/01 28/01)",
            showlegend: true,
            x: [ "2022-10-31", "2022-11-30", "2022-12-31", "2023-01-31", "2023-02-28", "2023-03-31", ],
            y: [ null, null, null, null, null, null ]
        }
    ]);
    const [date, setDate] = useState<string>("");


    const extractDate = (value: string): string => value.split('(')[1].replaceAll(')', '');

    /**
     * realizado: 26/11/2022
     * 
     * indicada de plantio: 01/09 - 30/09
     * indicada de colheita: 20/12 - 07/02
     */

    useEffect(() => {
        console.clear();

        const TO_FIND_VALUES = {
            dataPlantio: "Data indicada de plantio no projeto",
            dataColheita: "Data indicada de colheita no projeto",
        } as const;

        plotData.forEach((plot) => {
            const plotted: PlotData = plot as PlotData;
            const plottedName = plotted.name;
            let date: string;

            if (
                plottedName.includes(TO_FIND_VALUES.dataPlantio)
                ||
                plottedName.includes(TO_FIND_VALUES.dataColheita)
            ) {
                date = extractDate(plottedName);
                console.log(date);
                setDate(date);
            }
        })
    }, [plotData])

    return (
        <div className="App">
            <section className="plot-section">
                <Plot
                    data={plotData}
                    layout={{
                        height: 500,
                        width: 1000,
                        yaxis: { autorange: false, range: [0, 1], showgrid: false, linewidth: 1 },
                        xaxis: { showgrid: false },
                        legend: {
                          bgcolor: '#F4F4F4',
                          orientation: 'h',
                          traceorder: 'normal',
                          xanchor: 'center',
                          x: 0.5,
                          y: -0.15,
                          itemsizing: 'constant',
                          itemwidth: 40,
                          borderwidth: 30,
                          bordercolor: '#F4F4F4',
                        },
                        plot_bgcolor: 'white',
                        paper_bgcolor: 'white',
                        margin: { l: 30, r: 10, t: 25 },
                        font: { family: '"Raleway",sans-serife', size: 14, color: '#053A65' },
                      }}
                      config={{ locale: 'pt-BR', responsive: true }}
                      revision={0}
                />
            </section>
        </div>
    );
}

export default App;
