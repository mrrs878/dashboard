import React, { useEffect, useState } from 'react';
import { Axis, Chart, Coordinate, Interval, Line, Point, Tooltip } from 'bizcharts';
import { compose } from 'ramda';
import { GET_DASHBOARD_DATA } from '../../api/dashboard';

interface PVChartDataI {
  page: string;
  view: number;
}
interface UVChartDataI {
  date: string;
  view: number;
}

function formatPVChartData(src: Array<DashboardDataI>) {
  return src.filter((item) => item.group === 'pv').map((item) => ({ page: item.label, view: item.value }));
}
function formatUVChartData(src: Array<DashboardDataI>) {
  return src.filter((item) => item.group === 'uv').map((item) => ({
    date: new Date(+item.label).toLocaleDateString(),
    view: item.value,
  }));
}
function getTotalView(uvData: Array<UVChartDataI>) {
  return uvData.reduce((pre, cur) => ({ date: '', view: pre.view + cur.view }));
}

const Dashboard = () => {
  const [commonData, setCommonData] = useState<Array<DashboardDataI>>([]);
  const [pvData, setPVData] = useState<Array<PVChartDataI>>([]);
  const [uvData, setUVData] = useState<Array<UVChartDataI>>([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await GET_DASHBOARD_DATA();
        if (!res.success) return;
        setCommonData(res.data.filter((item) => item.group === 'common'));
        compose(setPVData, formatPVChartData)(res.data);
        compose(setUVData, formatUVChartData)(res.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <div className="container">
      <div className="top" />
      <div className="center">
        <Chart height={320} autoFit data={uvData} padding={[10, 100, 50, 100]} scale={{ view: { alias: '访问量', min: 0 }, date: { alias: '日期' } }}>
          <Axis name="date" title={{ autoRotate: true }} />
          <Axis name="view" title={{ autoRotate: true }} />
          <Line position="date*view" shape="smooth" />
          <Point position="date*view" />
        </Chart>
      </div>
      <div className="bottom">
        <Chart height={400} data={pvData} autoFit>
          <Coordinate type="theta" radius={0.75} />
          <Tooltip showTitle={false} />
          <Axis visible={false} />
          <Interval
            position="view"
            adjust="stack"
            color="page"
            label={['*', {
              content: (data) => `${data.page}: ${data.view}`,
            }]}
          />
        </Chart>
      </div>
    </div>
  );
};

export default Dashboard;
