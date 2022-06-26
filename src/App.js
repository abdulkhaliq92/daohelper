import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const stacks = [1, 2, 3, 4];
  const [items, setItems] = useState([
    { id: 1, stack: 1, position: 0, title: 'Write a blogpost for DAOHelper', content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in er', reward: '5', timeLeft: '2'},
    { id: 2, stack: 1, position: 1, title: 'Write a blogpost for DAOHelper', content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in er', reward: '5', timeLeft: '2' },
    { id: 3, stack: 1, position: 2, title: 'Write a blogpost for DAOHelper', content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in er', reward: '5', timeLeft: '2' },
    { id: 4, stack: 1, position: 3, title: 'Write a blogpost for DAOHelper', content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in er', reward: '5', timeLeft: '2'},
    { id: 5, stack: 2, position: 0, title: 'Write a blogpost for DAOHelper', content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in er', reward: '5', timeLeft: '2' },
    { id: 6, stack: 2, position: 1, title: 'Write a blogpost for DAOHelper', content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in er', reward: '5', timeLeft: '2'},
    { id: 7, stack: 2, position: 2, title: 'Write a blogpost for DAOHelper', content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in er', reward: '5', timeLeft: '2' },
    { id: 8, stack: 2, position: 3, title: 'Write a blogpost for DAOHelper', content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in er', reward: '5', timeLeft: '2' },
    { id: 9, stack: 3, position: 0, title: 'Write a blogpost for DAOHelper', content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in er', reward: '5', timeLeft: '2' },
    { id: 10, stack: 3, position: 1, title: 'Write a blogpost for DAOHelper', content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in er', reward: '5', timeLeft: '2' },
    { id: 11, stack: 3, position: 2, title: 'Write a blogpost for DAOHelper', content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in er', reward: '5', timeLeft: '2' },
    { id: 12, stack: 3, position: 3, title: 'Write a blogpost for DAOHelper', content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in er', reward: '5', timeLeft: '2' },
    { id: 13, stack: 4, position: 0, title: 'Write a blogpost for DAOHelper', content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in er', reward: '5', timeLeft: '2' },
    { id: 14, stack: 4, position: 1, title: 'Write a blogpost for DAOHelper', content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in er', reward: '5', timeLeft: '2' },
    { id: 15, stack: 4, position: 2, title: 'Write a blogpost for DAOHelper', content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in er', reward: '5', timeLeft: '2' },
    { id: 16, stack: 4, position: 3, title: 'Write a blogpost for DAOHelper', content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in er', reward: '5', timeLeft: '2' },
  ]);
  const [dragData, setDragData] = useState({});
  const [newDragData, setNewDragData] = useState({});
  const [targetStack, setTargetStack] = useState({});
  let [itemsInTargetStack, setItemsInTargetStack] = useState(0);

  const handleDragStart = (e, id, stack, position, value) => {
    setDragData({ id: id, stack: stack, position: position, value: value });
    // console.log(dragData);
  };

  const handleDragEnter = (e, newId, newStack, newPosition, title, content, reward, timeLeft) => {
    setNewDragData({
      id: newId,
      stack: newStack,
      position: newPosition,
      title: title,
      content: content,
      reward: reward,
      timeLeft:timeLeft
    });
    // console.log("NewdragData", newDragData);
  };

  // eslint-disable-next-line no-extend-native
  Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
  };

  const handleStackEnter = (e, droppedPosition) => {
    setTargetStack(droppedPosition);
  };

  const handleDragEnd = (e, id, stack, position, title, content, reward, timeLeft) => {
    if (newDragData.position === 1) {
      console.log("place in start");
      const arrOfItems = [...items];
      for (let i = 0; i < arrOfItems.length; i++) {
        if (arrOfItems[i].id === id) {
          arrOfItems.splice(i, 1);
          arrOfItems.unshift({
            id: id,
            stack: targetStack,
            position: 1,
            title: title,
            content: content,
            reward: reward,
            timeLeft:timeLeft
                    });
          setItems(arrOfItems);
          // return;
        }
      }
    } else if (newDragData.position !== 1) {
      if (newDragData.position < itemsInTargetStack) {
        console.log("place in mid");
        const arrOfItems = [...items];
        for (let i = 0; i < arrOfItems.length; i++) {
          if (arrOfItems[i].id === id) {
            arrOfItems.splice(i, 1);
            setItems(arrOfItems);
            for (let j = 0; j < arrOfItems.length; j++) {
              if (arrOfItems[j].id === newDragData.id) {
                arrOfItems.splice(j, 0, {
                  id: id,
                  stack: newDragData.stack,
                  position: newDragData.position,
                  title: title,
                  content: content,
                  reward: reward,
                  timeLeft:timeLeft                });
                setItems(arrOfItems);
                return;
              }
            }
          }
        }
      }
      if (newDragData.position >= itemsInTargetStack) {
        console.log("place in end");
        const arrOfItems = [...items];
        for (let i = 0; i < arrOfItems.length; i++) {
          if (arrOfItems[i].id === id) {
            arrOfItems.splice(i, 1);
            arrOfItems.push({
              id: id,
              stack: targetStack,
              position: 1,
              title: title,
              content: content,
              reward: reward,
              timeLeft:timeLeft            });
            setItems(arrOfItems);
            // return;
          }
        }
      }
    }
  };

  useEffect(() => {
    const arrOfItems = [...items];
    let noOfItems = 0;
    for (let i = 0; i < arrOfItems.length; i++) {
      if (arrOfItems[i].stack === targetStack) {
        noOfItems++;
      }
    }
    setItemsInTargetStack(noOfItems);
  }, [targetStack]);

  // console.log(`items in ${targetStack} are ${itemsInTargetStack}`);

  return (
    <div className="App">
      <div className="header">
        <h1>Bounties</h1>
      </div>
      <div className="stackContainer">
        <div class="stackHeader stack1">OPEN BOUNTIES</div>
        <div class="stackHeader stack2">ASSIGNED/IN PROGRESS</div>
        <div class="stackHeader stack3">UNDER REVIEW</div>
        <div class="stackHeader stack4">CLOSE / REWARDED</div>

        {stacks.map((stack, i) => (
          <div
            className="stack"
            onDragEnter={(e) => handleStackEnter(e, stack)}
            key={i}>
            {items
              .filter((item) => item.stack === stack)
              .map((item, i) => (
                <div
                  key={i}
                  className="card"
                  draggable
                  onDragStart={(e) =>
                    handleDragStart(e, item.id, stack, i + 1, item.title, item.content, item.reward, item.timeLeft)
                  }
                  onDragEnter={(e) =>
                    handleDragEnter(e, item.id, stack, i + 1, item.title, item.content, item.reward, item.timeLeft)
                  }
                  onDragEnd={(e) =>
                    handleDragEnd(e, item.id, stack, i + 1, item.title, item.content, item.reward, item.timeLeft)
                  }>
                  <h2>{item.title}</h2>
                  <p>{item.content}</p>
                  <div                   className={
                    item.stack === 1
                      ? "footer item1"
                      : item.stack === 2
                      ? "footer item2"
                      : item.stack === 3
                      ? "footer item3"
                      : item.stack === 4 && "footer item4"
                  } >
                  <span className="bottom-left">Reward: ${item.reward}</span>
                  <span className="bottom-right">Time Left: {item.timeLeft} Days</span>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
