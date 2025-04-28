// src/components/HealthFacilitiesChart.jsx
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';

function HealthFacilitiesChart() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetch('http://localhost:5000/api/health-facilities')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Process the data
        const validData = data.filter(item => item.reported_date !== null);
        
        // Create a map of dates to facilities
        const dateFacilityMap = {};
        validData.forEach(item => {
          const date = new Date(item.reported_date).toISOString().split('T')[0];
          if (!dateFacilityMap[date]) {
            dateFacilityMap[date] = [];
          }
          dateFacilityMap[date].push(item.name);
        });

        // Sort dates chronologically
        const sortedDates = Object.keys(dateFacilityMap).sort();
        
        // Calculate cumulative counts and collect facility names
        let cumulativeCount = 0;
        const labels = [];
        const counts = [];
        const facilityNamesByDate = [];

        sortedDates.forEach(date => {
          const facilitiesAdded = dateFacilityMap[date];
          cumulativeCount += facilitiesAdded.length;
          labels.push(date);
          counts.push(cumulativeCount);
          facilityNamesByDate.push(facilitiesAdded);
        });

        // Create custom point labels without annotation plugin
        const pointLabels = counts.map((count, index) => ({
          x: labels[index],
          y: count,
          label: facilityNamesByDate[index].join(', '),
          font: {
            size: 10,
            family: 'Arial'
          }
        }));

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Cumulative Health Facilities Reported',
              data: counts,
              fill: true,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
              tension: 0.1,
              pointBackgroundColor: 'rgba(75, 192, 192, 1)',
              pointRadius: 6,
              pointHoverRadius: 8,
              facilityNames: facilityNamesByDate,
              pointLabels: pointLabels
            },
          ],
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          title: (context) => {
            return `Date: ${context[0].label}`;
          },
          label: (context) => {
            const count = context.raw;
            return `Total Facilities: ${count}`;
          },
          afterLabel: (context) => {
            const dataIndex = context.dataIndex;
            const facilityNames = context.dataset.facilityNames[dataIndex];
            return [
              `Facilities added:`,
              ...facilityNames.map(name => `• ${name}`)
            ];
          }
        },
        mode: 'index',
        intersect: false,
        displayColors: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 12
        },
        padding: 10
      },
      // Custom rendering for point labels
      afterDraw: (chart) => {
        const ctx = chart.ctx;
        chart.data.datasets.forEach((dataset, i) => {
          if (dataset.pointLabels) {
            const meta = chart.getDatasetMeta(i);
            meta.data.forEach((point, index) => {
              const label = dataset.pointLabels[index];
              if (label) {
                const x = point.x;
                const y = point.y - 15; // Position above the point
                
                ctx.font = `${label.font.size}px ${label.font.family}`;
                const textWidth = ctx.measureText(label.label).width;
                
                // Draw background for better readability
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.fillRect(
                  x - textWidth / 2 - 5,
                  y - 15,
                  textWidth + 10,
                  20
                );
                
                // Draw text
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = '#000';
                ctx.fillText(label.label, x, y - 5);
              }
            });
          }
        });
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          font: {
            weight: 'bold'
          }
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Facilities',
          font: {
            weight: 'bold'
          }
        },
        beginAtZero: true,
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  return (
    <Container fluid className="py-3">
      <Row className="justify-content-center">
        <Col xl={10} lg={10} md={12} sm={12}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h4 className="mb-0">Health Facilities Reported Over Time</h4>
              <p className="text-muted small mb-0">Cumulative count with facility names displayed</p>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                  <p className="mt-2 mb-0">Loading chart data...</p>
                </div>
              ) : error ? (
                <div className="text-center py-5 text-danger">
                  <p>Error loading chart: {error}</p>
                  <button 
                    className="btn btn-primary mt-2"
                    onClick={() => window.location.reload()}
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <div style={{ height: '600px', width: '100%' }}>
                  <Line data={chartData} options={options} />
                </div>
              )}
            </Card.Body>
            <Card.Footer className="bg-white text-muted small">
              <div className="d-flex flex-column flex-md-row justify-content-between">
                <span>Facility names are displayed on each data point</span>
                <span>Last updated: {new Date().toLocaleString()}</span>
                <span>Data source: Health Facilities API</span>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HealthFacilitiesChart;