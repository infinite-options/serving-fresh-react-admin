import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import appColors from 'styles/AppColors';

const Product = (props) => {
  return (
    <Box key={props.key} property="div">
      <Grid item>
        <Box
          className="center-cropped"
          display="flex"
          alignItems="flex-start"
          position="relative"
        > 
          <img 
              src={props.img} 
              alt={props.name}
              style={{
                width: '170px',
                height: '170px',
              }}
            />
        </Box>
        <Box
          width="168px"
          p={0.1}
          style={{
            fontSize: '12px',
            backgroundColor: 'white',
            borderRadius: 5,
            border: '1px solid ' + appColors.border,
          }}
        >
          <Box display="flex">
            <Box textAlign="left">{props.name}</Box>
            <Box flexGrow={1} />
            <Box textAlign="right">
              $ {props.price} {props.unit === 'each' ? '' : '/ '}
              {props.unit}
            </Box>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default Product;
