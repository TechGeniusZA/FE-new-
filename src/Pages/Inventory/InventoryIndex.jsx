import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// TABS
import SKUBrands from './Components/InventoryTabs/SKUBrands/SKUBrands'
import PurchaseCategory from './Components/InventoryTabs/PurchaseCategories/PurchaseCategory'
import Bundles from './Components/InventoryTabs/Bundles/Bundles';
import PackSizes from './Components/InventoryTabs/PackSizes/PackSizes';
import SKUpackaging from './Components/InventoryTabs/SKUPackaging/SKUPackaging';
import SKU from './Components/InventoryTabs/SKU/SKU';
import SkuTags from './Components/InventoryTabs/SkuTags/SkuTags';

import UoMConversions from './Components/InventoryTabs/UoMConversions/UoMConversions'
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function InventoryIndex() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', margin : "0px 24px 0px 24px" }}>
        <Tabs  value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Purchase Categories" {...a11yProps(0)} />
          <Tab label="SKU Brands" {...a11yProps(1)} />
          <Tab label="SKU Packaging" {...a11yProps(2)} />
          <Tab label="Units Of Measure" {...a11yProps(3)} />
          <Tab label="UoM Conversions" {...a11yProps(4)} />
          <Tab label="SKUs" {...a11yProps(5)} />
          <Tab label="Pack Sizes" {...a11yProps(6)} />
          <Tab label="Bundles" {...a11yProps(7)} />
          <Tab label="SKU Tags" {...a11yProps(8)} />
          <Tab label="Ext SKU Packsizes" {...a11yProps(9)} />
        </Tabs>
      </Box>



      <TabPanel value={value} index={0} >
      <PurchaseCategory />
      </TabPanel>
      <TabPanel value={value} index={1}>
      < SKUBrands />
      </TabPanel>
      <TabPanel value={value} index={2}>
     <SKUpackaging />
      </TabPanel>
      <TabPanel value={value} index={3}>
      Unts of Measure
      </TabPanel>
      <TabPanel value={value} index={4}>
        <UoMConversions/>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <SKU />
      </TabPanel>
      <TabPanel value={value} index={6}>
      <PackSizes />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <Bundles />
      </TabPanel>
      <TabPanel value={value} index={8}>
       <SkuTags />
      </TabPanel>
      <TabPanel value={value} index={9}>
      Ext SKU Packsizes
      </TabPanel>
   
    </Box>
  );
}
