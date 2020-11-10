import { Card, Typography } from 'antd';
import React from "react";
const { Title, Text } = Typography;

function index({stats, title, change, isIncreased}) {
   return (
      <Card
         bordered={ false }
         style={{width: 218, height: 166, boxShadow: "0px 0px 30px rgba(0, 9, 44, 0.1)"}}
         bodyStyle={{padding: 16, textAlign: "center"}}
      >
         <Title style={{fontSize: 64, marginBottom: 16}}>{ stats }</Title>
         <Text strong style={ { display: "block" } }>{ title }</Text>
         <Text style={{color: "#9E9EA7"}}>
            { isIncreased
               ? <span style={{color: "#02C038"}}>&uarr; { change }% </span>
               : <span style={{color: "#FF5858"}}>&darr; { change }% </span>
            }
            dari bulan lalu
         </Text>
      </Card>
   );
}

export default index;
