import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

function Ensemble(){
  return(
    <Search placeholder="input new ensemble name" enterButton="Create Ensemble" size="large"/>
  );
}

export default Ensemble;