
import React, { useMemo, useState, useCallback, useRef } from 'react';
import {
  SafeAreaView, View, Dimensions, TouchableWithoutFeedback, PanResponder
} from 'react-native';
import { range } from 'ramda';

const { width, height } = Dimensions.get("window");
const gridData = range(0, Math.floor(height / 10)).map(x => range(0, Math.floor(width / 10)).map(x => false))

function Cel({ cel }) {
  const backgroundColor = useMemo(() => cel ? '#ff00ff' : '#ffffff', [cel]);


  return (
    <View style={{ flex: 1, borderWidth: 1, backgroundColor }}></View>
  )
}

function Row({ cels }) {
  return (
    <>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        {cels.map(cel => <Cel cel={cel} />)}
      </View>
    </>
  )
}
function App() {
  const [grid, setGrid] = useState(gridData);


  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,


      onPanResponderGrant: (evt, gestureState) => {
        var pos = {
          x: Math.floor((gestureState.x0 + gestureState.dx) / 10),
          y: Math.floor((gestureState.y0 + gestureState.dy) / 10),
        };

        console.log(pos);

        setGrid(grid => {
          if (grid[pos.y][pos.x]) return grid;
          grid[pos.y][pos.x] = true;
          grid[pos.y] = [...grid[pos.y]];
          return [...grid];
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        var pos = {
          x: Math.floor((gestureState.x0 + gestureState.dx) / 10),
          y: Math.floor((gestureState.y0 + gestureState.dy) / 10),
        }; 

        setGrid(grid => {
          if (grid[pos.y][pos.x]) return grid;
          grid[pos.y][pos.x] = true;
          grid[pos.y] = [...grid[pos.y]];
          return [...grid];
        });
      },
    })
  ).current;
  return (
    <>
      <View
        style={{ flex: 1 }}
        {...panResponder.panHandlers}
      >
        {grid.map(row => <Row cels={row} />)}
      </View>

    </>
  );
};

export default App;
