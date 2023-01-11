import * as React from 'react';
import { getRandomColor, hashCode } from '../utilities';
var ELEMENTS = 4;
var SIZE = 80;
function generateColors(name, colors) {
    var numFromName = hashCode(name);
    var range = colors && colors.length;
    var colorsList = Array.from({ length: ELEMENTS }, function (_, i) {
        return getRandomColor(numFromName + i, colors, range);
    });
    return colorsList;
}
var AvatarSunset = function (props) {
    var sunsetColors = generateColors(props.name, props.colors);
    var name = props.name.replace(/\s/g, '');
    return (<svg viewBox={'0 0 ' + SIZE + ' ' + SIZE} fill='none' role='img' xmlns='http://www.w3.org/2000/svg' width={props.size} height={props.size}>
      {props.title && <title>{props.name}</title>}
      <mask id='mask__sunset' maskUnits='userSpaceOnUse' x={0} y={0} width={SIZE} height={SIZE}>
        <rect width={SIZE} height={SIZE} rx={props.square ? undefined : SIZE * 2} fill='#FFFFFF'/>
      </mask>
      <g mask='url(#mask__sunset)'>
        <path fill={'url(#gradient_paint0_linear_' + name + ')'} d='M0 0h80v40H0z'/>
        <path fill={'url(#gradient_paint1_linear_' + name + ')'} d='M0 40h80v40H0z'/>
      </g>
      <defs>
        <linearGradient id={'gradient_paint0_linear_' + name} x1={SIZE / 2} y1={0} x2={SIZE / 2} y2={SIZE / 2} gradientUnits='userSpaceOnUse'>
          <stop stopColor={sunsetColors[0]}/>
          <stop offset={1} stopColor={sunsetColors[1]}/>
        </linearGradient>
        <linearGradient id={'gradient_paint1_linear_' + name} x1={SIZE / 2} y1={SIZE / 2} x2={SIZE / 2} y2={SIZE} gradientUnits='userSpaceOnUse'>
          <stop stopColor={sunsetColors[2]}/>
          <stop offset={1} stopColor={sunsetColors[3]}/>
        </linearGradient>
      </defs>
    </svg>);
};
export default AvatarSunset;
