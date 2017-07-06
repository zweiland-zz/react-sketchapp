import React from 'react';
import PropTypes from 'prop-types';
import { render, Artboard, Text, View } from 'react-sketchapp';
import chroma from 'chroma-js';

// take a hex and give us a nice text color to put over it
const textColor = (hex) => {
  const vsWhite = chroma.contrast(hex, 'white');
  if (vsWhite > 4) {
    return '#FFF';
  }
  return chroma(hex).darken(3).hex();
};

const Swatch = ({ name, hex }) => (
  <View
    name={`Swatch ${name}`}
    style={{
      height: 96,
      width: 96,
      margin: 4,
      backgroundColor: hex,
      padding: 8,
    }}
  >
    <Text name="Swatch Name" style={{ color: textColor(hex), fontWeight: 'bold' }}>
      {name}
    </Text>
    <Text name="Swatch Hex" style={{ color: textColor(hex) }}>
      {hex}
    </Text>
  </View>
);

const Color = {
  hex: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

Swatch.propTypes = Color;

const Document = ({ colors }) => (
  <Artboard
    name="Swatches"
    style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: (96 + 8) * 4,
    }}
  >
    {Object.keys(colors).map(color => <Swatch name={color} hex={colors[color]} key={color} />)}
  </Artboard>
);

Document.propTypes = {
  colors: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default (context) => {
  const colorList = {
    Blue: '#3575D3',
    'Dark Blue': '#154EA3',
    Teal: '#1BB0DD',
    Curious: '#3B8EC3',
    Green: '#00C11A',
    Red: '#F72F26',
    Orange: '#F89C24',
    Magenta: '#E620B1',
    Black: '#344154',
    Steel: '#576373',
    Slate: '#758397',
    Silver: '#9DAFBD',
    'Water': '#BFCFDB',
    'Dark Smoke': '#D7DBE0',
    'Dark Snow': '#EDF4F9',
    Snow: '#F1F5F7',
  };

  render(<Document colors={colorList} />, context.document.currentPage());
}
