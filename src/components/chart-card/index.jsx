import { Card, Typography } from 'antd';
import { Chart, LineAdvance } from 'bizcharts';
import React from "react";
const { Title, Text } = Typography;

function index({ isLost, data }) {

   //lost #F58634
   //Found #1B68B1

   return (
      <Card
         bordered={ false }
         style={ { width: 502, height: 300, boxShadow: "0px 0px 30px rgba(0, 9, 44, 0.1)" } }
         bodyStyle={ { padding: 16 } }
      >
         <Title style={ { display: "inline" } } level={ 4 }>Barang { isLost ? "hilang" : "ditemukan" }</Title>
         <Text style={ { color: "#9E9EA7" } }> dari minggu lalu</Text>
         <Chart height={ 220 } width={ 470 } autoFit data={ data } padding="auto" appendPadding={ [20, 0, 0, 0] } >
            <LineAdvance
               shape="smooth"
               point
               area
               position="dayName*items"
               color={isLost ? "#F58634" : "#1B68B1"}
            />
         </Chart>
      </Card>
   );
}

export default index;
